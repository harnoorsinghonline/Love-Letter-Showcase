import { useState, useRef, useEffect } from "react";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sang Rahiyo - Using uploaded MP3 file
  const audioUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sang-Rahiyo-se3G3kXbWni3EU24P3iX5VN5irnfFg.mp3";

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(() => {
          // Autoplay might be blocked by browser, user can click play button
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
      {/* Hidden audio element */}
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
