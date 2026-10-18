import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest("a, button, [role=button], input, textarea");
      if (ringRef.current) {
        ringRef.current.style.width = hoverable ? "46px" : "26px";
        ringRef.current.style.height = hoverable ? "46px" : "26px";
        ringRef.current.style.borderColor = hoverable
          ? "rgba(111,211,240,0.9)"
          : "rgba(111,211,240,0.5)";
      }
    };

    const tick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) {
        const size = ringRef.current.offsetWidth || 26;
        ringRef.current.style.transform = `translate3d(${rx - size / 2}px, ${ry - size / 2}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    document.body.classList.add("custom-cursor-active");
    window.addEventListener("pointermove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[400] hidden h-[6px] w-[6px] rounded-full bg-accent sm:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[400] hidden h-[26px] w-[26px] rounded-full border sm:block"
        style={{
          borderColor: "rgba(111,211,240,0.5)",
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
