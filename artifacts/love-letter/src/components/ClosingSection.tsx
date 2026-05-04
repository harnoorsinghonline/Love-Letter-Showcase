import { motion } from "framer-motion";

export default function ClosingSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(180,30,80,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative">
        {/* Big heart */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: "spring", stiffness: 60 }}
          className="text-8xl mb-8 inline-block"
          style={{ animation: "heartbeat 2s ease-in-out infinite" }}
        >
          💖
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="shimmer-text mb-6"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(2rem, 6vw, 3.5rem)",
          }}
        >
          Every day, I choose you.
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="ornamental-divider mb-8"
        >
          <span className="text-rose-400/60 text-xl">❧</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-rose-200/75 leading-loose italic"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)" }}
        >
          "Not having any appetite for confusion mtlb being fullllllyyyy sure.
          <br />
          Jithe tenu v pta hove and menu v — that no matter what the storm is,
          <br />
          we are together."
        </motion.p>

        {/* Row of foods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex justify-center gap-4 mt-12 flex-wrap"
        >
          {["🥘", "🥟", "🍕", "🍮", "🍩", "🍫", "💝"].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-4xl cursor-default select-none"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              title={emoji}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Footer poem */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1 }}
          className="mt-16 pt-12 border-t border-rose-900/30"
        >
          <p
            className="text-rose-300/50 text-xs uppercase tracking-widest mb-3"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Made with every heartbeat
          </p>
          <p
            className="text-rose-400/40 text-sm italic"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            ✦ &nbsp; For you, Priya &nbsp; ✦
          </p>
        </motion.div>
      </div>
    </section>
  );
}
