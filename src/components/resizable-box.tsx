import React, { useState, useRef } from "react";

interface ResizableBoxProps {
  initialWidth: number;
  initialHeight: number;
  className: string;
}

const ResizableBox: React.FC<ResizableBoxProps> = ({
  initialWidth,
  initialHeight,
  className,
}) => {
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const resizingRef = useRef(false);
  const startPosRef = useRef({ x: 100, y: 100 });

  const startResizing = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    resizingRef.current = true;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!resizingRef.current) return;
    const currentX = e.clientX;
    const currentY = e.clientY;
    const deltaX = currentX - startPosRef.current.x;
    const deltaY = currentY - startPosRef.current.y;
    setSize((prevState) => ({
      width: Math.max(prevState.width + deltaX, 100), // Minimum width: 100px
      height: Math.max(prevState.height + deltaY, 100), // Minimum height: 100px
    }));
    startPosRef.current = { x: currentX, y: currentY };
  };

  const stopResizing = () => {
    resizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  };

  return (
    <div
      className={className}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        resize: "both",
        overflow: "auto",
        position: "relative",
        border: "1px solid black",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          cursor: "nwse-resize",
          width: "20px",
          height: "20px",
          backgroundColor: "red",
        }}
        onMouseDown={startResizing}
      />
      <div
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          cursor: "nwse-resize",
          width: "20px",
          height: "20px",
          backgroundColor: "red",
        }}
        onMouseDown={startResizing}
      />
    </div>
  );
};

export default ResizableBox;
