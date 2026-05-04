import { useState, useRef, useEffect } from "react";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Sang Rahiyo - Jubin Nautiyal (popular YouTube video)
  const videoId = "Zs-iBGuvyas";

  useEffect(() => {
    setLoaded(true);
  }, []);

  const togglePlay = () => {
    setPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setMuted(prev => !prev);
  };

  const src = `https://www.youtube.com/embed/${videoId}?autoplay=${playing ? 1 : 0}&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Hidden YouTube iframe */}
      {loaded && (
        <iframe
          ref={iframeRef}
          src={src}
          allow="autoplay"
          style={{ width: 0, height: 0, position: "absolute", opacity: 0, pointerEvents: "none" }}
          title="Background Music"
        />
      )}

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
