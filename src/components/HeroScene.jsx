import { useEffect, useRef } from "react";

function seeded(index, salt) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export default function HeroScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const points = Array.from({ length: 84 }, (_, index) => ({
      x: seeded(index, 1),
      y: seeded(index, 2),
      speed: 0.2 + seeded(index, 3) * 0.55,
      size: 1 + seeded(index, 4) * 2.2,
    }));

    let frame;
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.8);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const render = (time) => {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1;

      points.forEach((point, index) => {
        const x = point.x * width + Math.sin(time * 0.00028 * point.speed + index) * 34;
        const y = point.y * height + Math.cos(time * 0.00032 * point.speed + index) * 28;

        context.beginPath();
        context.fillStyle = index % 3 === 0 ? "rgba(61, 220, 151, 0.85)" : "rgba(82, 182, 255, 0.62)";
        context.arc(x, y, point.size, 0, Math.PI * 2);
        context.fill();

        if (index % 3 === 0) {
          const next = points[(index + 17) % points.length];
          const nextX = next.x * width + Math.sin(time * 0.00028 * next.speed + index) * 34;
          const nextY = next.y * height + Math.cos(time * 0.00032 * next.speed + index) * 28;
          context.beginPath();
          context.strokeStyle = "rgba(245, 165, 36, 0.13)";
          context.moveTo(x, y);
          context.lineTo(nextX, nextY);
          context.stroke();
        }
      });

      context.beginPath();
      context.strokeStyle = "rgba(245, 242, 232, 0.1)";
      context.ellipse(width * 0.67, height * 0.46, width * 0.24, height * 0.16, -0.4, 0, Math.PI * 2);
      context.stroke();

      frame = requestAnimationFrame(render);
    };

    resize();
    frame = requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-75"
    />
  );
}
