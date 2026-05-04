import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const FOODS = [
  {
    emoji: "🥘",
    name: "Chole Kulche",
    desc: "Spiced chickpeas with soft, pillowy kulche — the kind that makes every bite a little celebration.",
    color: "from-amber-900/40 to-orange-900/30",
    border: "border-amber-600/30",
    glow: "rgba(217, 119, 6, 0.3)",
  },
  {
    emoji: "🍛",
    name: "Chole Bhature",
    desc: "Crispy golden bhature, puffed with love, paired with tangy chole that warm the soul.",
    color: "from-yellow-900/40 to-amber-900/30",
    border: "border-yellow-600/30",
    glow: "rgba(202, 138, 4, 0.3)",
  },
  {
    emoji: "🥟",
    name: "Momos",
    desc: "Steamed little dumplings — each one a tiny pocket of happiness, best shared.",
    color: "from-sky-900/40 to-blue-900/30",
    border: "border-sky-600/30",
    glow: "rgba(14, 165, 233, 0.3)",
  },
  {
    emoji: "🍕",
    name: "Cheese Loaded Pizza",
    desc: "Overflowing with cheese, rich and indulgent — just like the feelings that can't be held back.",
    color: "from-red-900/40 to-rose-900/30",
    border: "border-red-600/30",
    glow: "rgba(239, 68, 68, 0.3)",
  },
  {
    emoji: "🍮",
    name: "Rasmalai",
    desc: "Delicate, creamy, melt-in-your-mouth sweetness — some things are just too beautiful for words.",
    color: "from-pink-900/40 to-fuchsia-900/30",
    border: "border-pink-600/30",
    glow: "rgba(236, 72, 153, 0.3)",
  },
  {
    emoji: "🍩",
    name: "Gulab Jamun Chocolate",
    desc: "Where tradition meets sweetness — a fusion as unexpected and delightful as this feeling.",
    color: "from-purple-900/40 to-violet-900/30",
    border: "border-purple-600/30",
    glow: "rgba(147, 51, 234, 0.3)",
  },
];

function FoodCard({ food, index }: { food: typeof FOODS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`food-card relative p-6 rounded-2xl border bg-gradient-to-br ${food.color} ${food.border} backdrop-blur-sm cursor-default overflow-hidden`}
      style={{ boxShadow: `0 4px 30px ${food.glow}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(circle at 50% 30%, ${food.glow} 0%, transparent 70%)` }}
      />

      {/* Sparkles on hover */}
      {hovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-yellow-300 text-xs pointer-events-none"
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: (Math.random() - 0.5) * 80,
                y: -Math.random() * 60 - 20,
              }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              style={{ left: `${20 + Math.random() * 60}%`, top: "30%" }}
            >
              ✦
            </motion.span>
          ))}
        </>
      )}

      <div className="relative z-10">
        <div
          className="food-emoji text-6xl mb-4 text-center block"
          style={{
            animation: hovered ? "heartbeat 0.8s ease-in-out" : "float-up 3s ease-in-out infinite",
            animationDelay: `${index * 0.3}s`,
            display: "block",
            textAlign: "center",
          }}
        >
          {food.emoji}
        </div>

        <h3
          className="text-center text-xl font-semibold text-rose-100 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {food.name}
        </h3>

        <p
          className="text-center text-rose-200/70 text-sm leading-relaxed"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
        >
          {food.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function FoodBay() {
  return (
    <section className="relative py-24 px-6">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(120,20,60,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="text-rose-300/60 text-sm uppercase tracking-[0.4em] mb-4"
             style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            ✦ &nbsp; Our little universe &nbsp; ✦
          </p>
          <h2
            className="shimmer-text mb-6"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            }}
          >
            The Things We'd Share
          </h2>
          <p
            className="text-rose-200/60 max-w-md mx-auto italic"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
          >
            Every great love story has its food memories. Here are ours — waiting to happen.
          </p>
        </motion.div>

        {/* Food grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FOODS.map((food, i) => (
            <FoodCard key={food.name} food={food} index={i} />
          ))}
        </div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="ornamental-divider">
            <span className="text-rose-400/60 text-2xl">❧</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
