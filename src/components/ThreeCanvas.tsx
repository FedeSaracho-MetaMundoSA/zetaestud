/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#090a0f", 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    // 3. Renderer setup with proper container size handling
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      containerRef.current.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL not supported or context lost:", e);
      setIsSupported(false);
      return;
    }

    // 4. Create Architectural Grid & Structural Wireframe
    const group = new THREE.Group();
    scene.add(group);

    // Base Grid Floor (CAD style)
    const gridHelper = new THREE.GridHelper(20, 20, "#3a3f58", "#1c2030");
    gridHelper.position.y = -2;
    group.add(gridHelper);

    // Abstract Modernist Pavilion / Buildings
    const geometries: THREE.BufferGeometry[] = [];
    
    // Tower 1 (Main structure)
    const geom1 = new THREE.BoxGeometry(2, 6, 2);
    geom1.translate(-2, 1, 0);
    geometries.push(geom1);

    // Tower 2 (Cantilever building)
    const geom2 = new THREE.BoxGeometry(3, 2.5, 3);
    geom2.translate(1, -0.75, 1);
    geometries.push(geom2);

    // Tower 3 (High-rise slab)
    const geom3 = new THREE.BoxGeometry(1.5, 4.5, 1.5);
    geom3.translate(2, 0.25, -2);
    geometries.push(geom3);

    // Floating structural canopies (Architectural planes)
    const geomPlane = new THREE.BoxGeometry(5, 0.1, 5);
    geomPlane.translate(0.5, 2.2, 0.5);
    geometries.push(geomPlane);

    // Apply Wireframes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#00f3ff",
      transparent: true,
      opacity: 0.18,
    });

    const highlightMaterial = new THREE.LineBasicMaterial({
      color: "#ff007f",
      transparent: true,
      opacity: 0.35,
    });

    geometries.forEach((geom, idx) => {
      const edges = new THREE.EdgesGeometry(geom);
      const line = new THREE.LineSegments(
        edges,
        idx === 1 ? highlightMaterial : lineMaterial
      );
      group.add(line);
    });

    // 5. Ambient particles
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 30; // x
      positions[i + 1] = Math.random() * 10 - 2; // y
      positions[i + 2] = (Math.random() - 0.5) * 30; // z
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: "#00f3ff",
      size: 0.05,
      transparent: true,
      opacity: 0.3,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Interaction logic
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 7. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const currentTime = performance.now();
      const elapsedTime = (currentTime - lastTime) / 1000;
      const totalTime = currentTime / 1000;

      // Smooth mouse follow (easing)
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate group based on mouse and subtle continuous spin
      group.rotation.y = totalTime * 0.03 + targetX * 0.4;
      group.rotation.x = targetY * 0.2;

      // Float particles
      const particlePositions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particlePositions.length; i += 3) {
        particlePositions[i] += Math.sin(totalTime + i) * 0.0015;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    // 8. Resize Observer (Reliable Canvas sizing)
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const entry = entries[0];
      const newWidth = Math.floor(entry.contentRect.width);
      const newHeight = Math.floor(entry.contentRect.height);

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      if (renderer) {
        renderer.setSize(newWidth, newHeight);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (renderer && renderer.domElement && containerRef.current) {
        try {
          containerRef.current.removeChild(renderer.domElement);
          renderer.dispose();
        } catch (e) {
          // Ignore container changes on cleanup
        }
      }
    };
  }, []);

  if (!isSupported) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500 font-mono">
        [3D WebGL Canvas Muted - Fallback Activo]
      </div>
    );
  }

  return (
    <div
      id="three-canvas-container"
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen"
      style={{ zIndex: 0 }}
    />
  );
}
