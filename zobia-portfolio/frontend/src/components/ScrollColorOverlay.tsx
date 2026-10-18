import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollColorOverlay() {
  const { scrollYProgress } = useScroll();

  const background = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      "radial-gradient(circle at 50% 0%, rgba(111,211,240,0.10), transparent 65%)",
      "radial-gradient(circle at 50% 0%, rgba(255,158,196,0.10), transparent 65%)",
      "radial-gradient(circle at 50% 0%, rgba(183,156,255,0.10), transparent 65%)",
      "radial-gradient(circle at 50% 0%, rgba(79,195,217,0.10), transparent 65%)",
      "radial-gradient(circle at 50% 0%, rgba(255,215,122,0.10), transparent 65%)",
      "radial-gradient(circle at 50% 0%, rgba(111,211,240,0.10), transparent 65%)",
    ]
  );

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] mix-blend-screen"
      style={{ background }}
    />
  );
}
