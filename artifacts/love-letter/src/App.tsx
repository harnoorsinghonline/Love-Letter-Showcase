import { useEffect } from "react";
import { Router, Route } from "wouter";
import StarField from "@/components/StarField";
import FloatingFood from "@/components/FloatingFood";
import HeroSection from "@/components/HeroSection";
import LetterSection from "@/components/LetterSection";
import AudioPlayer from "@/components/AudioPlayer";
import Analytics from "@/pages/analytics";
import { trackPageView } from "@/lib/analytics";

function HomePage() {
  useEffect(() => {
    // Track page view on mount
    trackPageView();

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
      <StarField />
      <FloatingFood />

      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 60% at 0% 20%, rgba(100,10,50,0.12) 0%, transparent 60%), radial-gradient(ellipse 100% 80% at 100% 80%, rgba(80,10,60,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <HeroSection />

        <div className="ornamental-divider max-w-xs mx-auto px-6 my-4">
          <span className="text-rose-500/40 text-xl select-none">❧</span>
        </div>

        <LetterSection />
      </div>

      <AudioPlayer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/analytics27" component={Analytics} />
    </Router>
  );
}
