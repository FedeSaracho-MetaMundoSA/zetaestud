import express from "express";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Video Streaming Route
  app.get("/api/video", async (req, res) => {
    try {
      const fileId = "1WLIvOPCewzQGcokxFPccygQOKVvZPltq";
      const initialUrl = `https://docs.google.com/uc?export=download&id=${fileId}`;

      // 1. Fetch initial headers or page content to check for virus warning
      const firstResponse = await fetch(initialUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });

      let downloadUrl = initialUrl;
      const contentType = firstResponse.headers.get("content-type") || "";

      // If the response is HTML, it means Google Drive has a virus scan warning/confirmation page
      if (contentType.includes("text/html")) {
        const html = await firstResponse.text();
        
        // Regex to find confirm=xxxx in the HTML form/links
        const confirmMatch = html.match(/confirm=([a-zA-Z0-9_-]+)/);
        if (confirmMatch && confirmMatch[1]) {
          const confirmCode = confirmMatch[1];
          downloadUrl = `https://docs.google.com/uc?export=download&id=${fileId}&confirm=${confirmCode}`;
        } else {
          // Alternative regex in case it's in a different format
          const altConfirmMatch = html.match(/id="confirm_button" href="([^"]+)"/);
          if (altConfirmMatch && altConfirmMatch[1]) {
            // Unescape HTML entities
            const decodedUrl = altConfirmMatch[1].replace(/&amp;/g, "&");
            if (decodedUrl.startsWith("/")) {
              downloadUrl = `https://docs.google.com${decodedUrl}`;
            } else {
              downloadUrl = decodedUrl;
            }
          }
        }
      }

      // 2. Fetch the actual video stream
      const videoResponse = await fetch(downloadUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          ...(req.headers.range ? { Range: req.headers.range } : {})
        }
      });

      if (!videoResponse.ok) {
        return res.status(videoResponse.status).send("Failed to stream video from source");
      }

      // Propagate crucial video response headers
      res.setHeader("Content-Type", videoResponse.headers.get("content-type") || "video/mp4");
      
      const contentLength = videoResponse.headers.get("content-length");
      if (contentLength) {
        res.setHeader("Content-Length", contentLength);
      }
      
      const contentRange = videoResponse.headers.get("content-range");
      if (contentRange) {
        res.setHeader("Content-Range", contentRange);
      }
      
      res.setHeader("Accept-Ranges", "bytes");

      if (videoResponse.status === 206) {
        res.status(206);
      }

      // Pipe the stream to client
      if (videoResponse.body) {
        const reader = videoResponse.body.getReader();
        const pump = async () => {
          const { done, value } = await reader.read();
          if (done) {
            res.end();
            return;
          }
          res.write(value);
          pump();
        };
        pump().catch((err) => {
          console.error("Stream pipe interrupted:", err);
          res.end();
        });
      } else {
        res.status(500).send("No stream body");
      }
    } catch (error) {
      console.error("Error streaming video:", error);
      res.status(500).send("Internal streaming error");
    }
  });

  // Robust, high-performance Range-Streaming router for local video files
  // This satisfies strict Safari/iOS requirements and is resilient to any build/deploy path layout
  app.get("/multimedia/:filename", (req, res, next) => {
    const filename = req.params.filename;
    if (!filename.toLowerCase().endsWith(".mp4")) {
      return next();
    }

    const rootDir = process.cwd();
    const possiblePaths = [
      path.join(rootDir, "public", "multimedia", filename),
      path.join(rootDir, "dist", "multimedia", filename),
      path.join(rootDir, "multimedia", filename),
    ];

    let videoPath = "";
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        videoPath = p;
        break;
      }
    }

    if (!videoPath) {
      return res.status(404).send("Video not found");
    }

    return res.sendFile(videoPath, (err) => {
      if (err && !res.headersSent) {
        console.error(`[Video Server] Error sending file ${videoPath}:`, err);
      }
    });
  });

  // Robust path resolution using process.cwd() which works in both development and production
  const rootDir = process.cwd();
  const publicPath = path.join(rootDir, "public");
  const distPath = path.join(rootDir, "dist");

  // Serve public assets explicitly (provides solid HTTP Range / Streaming support for videos)
  app.use(express.static(publicPath));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
