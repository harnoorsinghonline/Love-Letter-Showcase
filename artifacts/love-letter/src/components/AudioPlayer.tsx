import { useState, useRef, useEffect } from "react";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sang Rahiyo - Using uploaded MP3 file
  const audioUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sang-Rahiyo-tcFwlkTXzKKJjwmaTF6HJoHpqPEySC.mp3";

  // Start autoplay on mount
  useEffect(() => {
    const autoplayAudio = async () => {
      if (audioRef.current) {
        try {
          // Attempt to play without sound first
          await audioRef.current.play();
        } catch (err) {
          // If autoplay is blocked, try muted approach
          if (audioRef.current) {
            audioRef.current.muted = true;
            try {
              await audioRef.current.play();
              // After first user interaction, unmute
              const handleFirstInteraction = () => {
                if (audioRef.current) {
                  audioRef.current.muted = false;
                  setMuted(false);
                }
                document.removeEventListener("click", handleFirstInteraction);
                document.removeEventListener("touchstart", handleFirstInteraction);
              };
              document.addEventListener("click", handleFirstInteraction);
              document.addEventListener("touchstart", handleFirstInteraction);
            } catch (muteError) {
              console.log("[v0] Audio playback failed");
            }
          }
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(autoplayAudio, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(() => {
          setPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  const togglePlay = () => {
    setPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setMuted(prev => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Hidden audio element - starts muted for autoplay, unmutes on first interaction */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        title="Background Music - Sang Rahiyo"
      />
      {/* Music control pill */}
      <div className="audio-btn rounded-full px-4 py-3 flex items-center gap-3 cursor-pointer select-none">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2 text-rose-200 hover:text-rose-100 transition-colors"
          title={playing ? "Pause music" : "Play Sang Rahiyo"}
        >
          <span className="text-xl">{playing ? "⏸" : "▶"}</span>
          <span className="text-sm font-medium" style={{ fontFamily: "'Dancing Script', cursive" }}>
            {playing ? "Sang Rahiyo..." : "Play ♪ Sang Rahiyo"}
          </span>
        </button>
        {playing && (
          <button
            onClick={toggleMute}
            className="text-rose-300 hover:text-rose-100 transition-colors text-lg"
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        )}
      </div>

      {/* Music waves animation when playing */}
      {playing && !muted && (
        <div className="flex items-end gap-0.5 h-6 px-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className="w-1 rounded-full"
              style={{
                background: "linear-gradient(to top, #f43f5e, #fb7185)",
                height: `${Math.random() * 16 + 8}px`,
                animation: `wave-text ${0.5 + i * 0.1}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
