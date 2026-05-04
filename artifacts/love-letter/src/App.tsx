import { useEffect } from "react";
import StarField from "@/components/StarField";
import FloatingFood from "@/components/FloatingFood";
import HeroSection from "@/components/HeroSection";
import FoodBay from "@/components/FoodBay";
import LetterSection from "@/components/LetterSection";
import ClosingSection from "@/components/ClosingSection";
import AudioPlayer from "@/components/AudioPlayer";

export default function App() {
  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0d0308 0%, #130510 15%, #1a0614 30%, #120408 50%, #150610 70%, #0d0308 100%)",
      }}
    >
      {/* Star field — fixed background */}
      <StarField />

      {/* Floating food — fixed overlay */}
      <FloatingFood />

      {/* Full-page gradient mesh overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 60% at 0% 20%, rgba(100,10,50,0.12) 0%, transparent 60%), radial-gradient(ellipse 100% 80% at 100% 80%, rgba(80,10,60,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Scrollable content */}
      <div className="relative z-10">
        <HeroSection />

        {/* Transition divider */}
        <div className="ornamental-divider max-w-xs mx-auto px-6 my-4">
          <span className="text-rose-500/40 text-xl select-none">✦</span>
        </div>

        <FoodBay />

        <div className="ornamental-divider max-w-xs mx-auto px-6 my-4">
          <span className="text-rose-500/40 text-xl select-none">❧</span>
        </div>

        <LetterSection />
        <ClosingSection />
      </div>

      {/* Fixed audio player */}
      <AudioPlayer />
    </div>
  );
}
