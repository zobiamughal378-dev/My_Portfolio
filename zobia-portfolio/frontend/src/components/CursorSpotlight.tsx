import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || !ref.current) return;

    let raf = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    function onMove(e: PointerEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function tick() {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[500px] w-[500px] rounded-full opacity-[0.06] sm:block"
      style={{
        background: "radial-gradient(circle, #00d4ff 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
