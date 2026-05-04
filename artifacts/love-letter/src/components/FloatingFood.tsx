import { useMemo } from "react";

const FOODS = [
  { emoji: "🥘", label: "Chole Kulche" },
  { emoji: "🍛", label: "Chole Bhature" },
  { emoji: "🥟", label: "Momos" },
  { emoji: "🍕", label: "Cheese Pizza" },
  { emoji: "🍮", label: "Rasmalai" },
  { emoji: "🍩", label: "Gulab Jamun" },
  { emoji: "🍫", label: "Chocolate" },
  { emoji: "❤️", label: "Love" },
  { emoji: "🌹", label: "Rose" },
  { emoji: "✨", label: "Sparkle" },
  { emoji: "💝", label: "Heart" },
  { emoji: "🌸", label: "Blossom" },
];

export default function FloatingFood() {
  const items = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => {
      const food = FOODS[i % FOODS.length];
      return {
        id: i,
        emoji: food.emoji,
        left: Math.random() * 95 + "%",
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 15,
        size: Math.random() * 1.2 + 1.2,
        swayDuration: Math.random() * 3 + 2,
      };
    }), []);

  const petals = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 12,
    })), []);

  return (
    <>
      {items.map(item => (
        <div
          key={item.id}
          className="food-float"
          style={{
            left: item.left,
            fontSize: `${item.size}rem`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          {item.emoji}
        </div>
      ))}
      {petals.map(p => (
        <div
          key={`p-${p.id}`}
          className="petal"
          style={{
            left: p.left,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          🌸
        </div>
      ))}
    </>
  );
}
