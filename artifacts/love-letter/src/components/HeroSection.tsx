import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Glowing backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(180,40,80,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Top decorative arch */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="flex items-center justify-center gap-3 text-rose-300/60 text-2xl">
          <span>✦</span>
          <span className="text-rose-400/80">❧</span>
          <span>✦</span>
        </div>
      </motion.div>

      {/* "For You" subtitle */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, letterSpacing: "0.35em" }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="text-rose-300/70 text-sm uppercase tracking-widest mb-4"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        ✦ &nbsp; A letter for &nbsp; ✦
      </motion.p>

      {/* Main title */}
      <motion.h1
        initial={{ opacity: 0, y: 30, filter: "blur(20px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
        transition={{ duration: 1.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(5rem, 15vw, 11rem)",
          lineHeight: 1,
          background: "linear-gradient(135deg, #fce7f3 0%, #f9a8d4 30%, #fb7185 55%, #fca5a5 75%, #fce7f3 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
          filter: "drop-shadow(0 0 40px rgba(251, 113, 133, 0.4))",
        }}
      >
        Priya
      </motion.h1>

      {/* Ornamental heart */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 1.2, type: "spring", stiffness: 80 }}
        className="my-6 text-5xl"
        style={{ animation: "heartbeat 2.4s ease-in-out infinite", display: "inline-block" }}
      >
        💖
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="text-rose-100/80 max-w-lg mx-auto leading-relaxed"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontStyle: "italic" }}
      >
        "You have taken infinite breaths in my thoughts..."
      </motion.p>

      {/* Decorative bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
        className="mt-12 flex items-center gap-4 text-rose-300/50"
      >
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-rose-400/40" />
        <span className="text-lg">✦</span>
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-rose-400/40" />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-rose-300/50 text-xs uppercase tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Scroll to read
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-rose-400/60 text-xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
