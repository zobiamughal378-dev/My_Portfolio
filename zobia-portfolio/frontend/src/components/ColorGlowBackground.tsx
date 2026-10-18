export default function ColorGlowBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden bg-[#070d24]" aria-hidden="true">
      <div className="glow-blob absolute -left-[10%] top-[-10%] h-[55vw] w-[55vw] rounded-full bg-sky-400/25 blur-[120px]" />
      <div className="glow-blob-2 absolute right-[-15%] top-[15%] h-[50vw] w-[50vw] rounded-full bg-pink-300/20 blur-[130px]" />
      <div className="glow-blob-3 absolute bottom-[-15%] left-[20%] h-[45vw] w-[45vw] rounded-full bg-blue-500/25 blur-[130px]" />
      <div className="glow-blob absolute bottom-[5%] right-[5%] h-[35vw] w-[35vw] rounded-full bg-yellow-200/10 blur-[110px]" />
    </div>
  );
}
