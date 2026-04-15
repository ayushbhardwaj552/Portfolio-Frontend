import { useEffect, useRef } from "react";

const STATIC_STOP_MS = 4000;
const RESUME_DELAY_MS = 2500;

const CursorEffect = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const splatsRef = useRef([]);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, lastX: window.innerWidth / 2, lastY: window.innerHeight / 2 });
  const lastMoveAtRef = useRef(Date.now());
  const isActiveRef = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const addSplat = (x, y, force = 1) => {
      const hue = 180 + (x / window.innerWidth) * 120;
      for (let i = 0; i < 3; i += 1) {
        splatsRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * (2 + force * 5),
          vy: (Math.random() - 0.5) * (2 + force * 5),
          radius: 10 + Math.random() * 18,
          alpha: 0.22 + Math.random() * 0.26,
          hue: hue + (Math.random() * 20 - 10),
          life: 1,
        });
      }
    };

    const scheduleResume = () => {
      if (resumeTimerRef.current) return;
      resumeTimerRef.current = setTimeout(() => {
        isActiveRef.current = true;
        resumeTimerRef.current = null;
      }, RESUME_DELAY_MS);
    };

    const move = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      const dx = x - mouseRef.current.lastX;
      const dy = y - mouseRef.current.lastY;
      const speed = Math.hypot(dx, dy);

      mouseRef.current = { x, y, lastX: x, lastY: y };
      lastMoveAtRef.current = Date.now();

      if (!isActiveRef.current) {
        scheduleResume();
        return;
      }

      addSplat(x, y, Math.min(speed / 25, 2.2));
    };

    const render = () => {
      const now = Date.now();
      if (now - lastMoveAtRef.current >= STATIC_STOP_MS) {
        isActiveRef.current = false;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (isActiveRef.current) {
        addSplat(mouseRef.current.x, mouseRef.current.y, 0.35);
      }

      splatsRef.current = splatsRef.current.filter((splat) => splat.life > 0.02);
      splatsRef.current.forEach((splat) => {
        splat.x += splat.vx;
        splat.y += splat.vy;
        splat.vx *= 0.97;
        splat.vy *= 0.97;
        splat.radius *= 0.992;
        splat.life *= 0.965;
        splat.alpha *= 0.968;

        const gradient = ctx.createRadialGradient(splat.x, splat.y, 1, splat.x, splat.y, splat.radius);
        gradient.addColorStop(0, `hsla(${splat.hue}, 100%, 68%, ${splat.alpha})`);
        gradient.addColorStop(1, `hsla(${splat.hue}, 100%, 68%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(splat.x, splat.y, splat.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(render);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    window.addEventListener("mousemove", move, { passive: true });
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", move);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-effect-layer" aria-hidden="true" />;
};

export default CursorEffect;
