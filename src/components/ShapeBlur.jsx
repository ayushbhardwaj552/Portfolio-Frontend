import { useEffect, useRef } from "react";

const ShapeBlur = ({
  variation = 0,
  pixelRatioProp = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
  shapeSize = 1,
  roundness = 0.5,
  borderSize = 0.05,
  circleSize = 0.25,
  circleEdge = 1,
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, pixelRatioProp));
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const blobs = [
      { x: 0.22, y: 0.35, r: 120, vx: 0.00035, vy: 0.0002, color: "46,204,113" },
      { x: 0.72, y: 0.25, r: 150, vx: -0.00028, vy: 0.00024, color: "59,130,246" },
      { x: 0.58, y: 0.72, r: 170, vx: 0.00022, vy: -0.0003, color: "147,51,234" },
    ];

    let t = 0;
    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      blobs.forEach((blob, idx) => {
        blob.x += blob.vx * (1 + variation * 0.2);
        blob.y += blob.vy * (1 + variation * 0.2);

        if (blob.x > 1.05 || blob.x < -0.05) blob.vx *= -1;
        if (blob.y > 1.05 || blob.y < -0.05) blob.vy *= -1;

        const pulse = 1 + Math.sin(t * 0.8 + idx) * 0.06 * shapeSize;
        const radius = blob.r * pulse;
        const cx = blob.x * width;
        const cy = blob.y * height;

        const grad = ctx.createRadialGradient(
          cx,
          cy,
          radius * borderSize,
          cx,
          cy,
          radius * (1 + circleSize * circleEdge)
        );
        grad.addColorStop(0, `rgba(${blob.color}, ${0.22 + roundness * 0.1})`);
        grad.addColorStop(0.5, `rgba(${blob.color}, 0.12)`);
        grad.addColorStop(1, `rgba(${blob.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      t += 0.01;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [variation, pixelRatioProp, shapeSize, roundness, borderSize, circleSize, circleEdge]);

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />;
};

export default ShapeBlur;
