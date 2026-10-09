import React, { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  /** Speed in seconds for a complete loop (lower is faster) */
  speed?: number;
  pauseOnHover?: boolean;
  /** Slow down instead of completely pausing when hovered */
  slowOnHover?: boolean;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  direction = "left",
  speed = 45,
  pauseOnHover = true,
  slowOnHover = false,
  className = "",
}) => {
  // Convert children into an array to duplicate it easily for the seamless loop
  const childrenArray = React.Children.toArray(children);

  // We can build inline styles to dynamically control animation duration and hover state
  const trackStyle: React.CSSProperties = {
    display: "flex",
    width: "max-content",
    gap: "20px",
    animationName: direction === "left" ? "marquee-left" : "marquee-right",
    animationDuration: `${speed}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  };

  return (
    <div className={`overflow-hidden w-full relative flex items-center ${className}`}>
      <div
        className={`flex w-max gap-5 will-change-transform ${
          pauseOnHover && !slowOnHover
            ? "hover:[animation-play-state:paused]"
            : ""
        } ${
          slowOnHover
            ? "transition-[animation-duration] duration-500 hover:[animation-duration:120s]"
            : ""
        }`}
        style={trackStyle}
      >
        {/* Render first iteration */}
        <div className="flex gap-5 shrink-0 items-center">
          {childrenArray}
        </div>
        
        {/* Render second iteration for infinite loop seamless connection */}
        <div className="flex gap-5 shrink-0 items-center" aria-hidden="true">
          {childrenArray}
        </div>
      </div>
    </div>
  );
};
