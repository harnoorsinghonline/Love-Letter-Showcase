import { motion } from "framer-motion";

const LETTER_PARAGRAPHS = [
  "You have known me as Charming Singh and maybe you don't know but you have taken infinite breaths in my thoughts. You have laughed and your giggles have brought smile to my face.",
  "I have been holding these words inside me for longer than I should have, and now they feel too alive to stay unspoken.",
  "I won't pretend I wasn't hesitant. I was. Not because I did not feel something but actually because I did. And when something feels real, I don't want to rush it, or mistake it, or risk getting it wrong. I needed to be sure that what I feel isn't just admiration from a distance, or a passing moment but something deeper, something that could actually mean something tomorrow… and the day after… and beyond that.",
  "And now I know.",
  "There is a strange kind of certainty in the way you have settled into my thoughts. It's not loud or overwhelming it's steady, calming, peaceful (yet makes me eager to message you)",
  "The kind that makes me think about how your smile must feel in real life, not just on a screen (because you have already laughed infinitely in my imagination tons of time🤣🤣) and you know we have laughed at every every everyyyyy situation.",
  "I want to know your silences much more than your laughter, the way your mind works when no one's watching. And not just the version we show to the world. That conservative one. Naii bilkul ni. I want us to be naked in our emotions where you feel safe crying ranting talking endlessly about same things/ a new thing every day and yet you feel comfortable. Where I touch these naked thoughts of yours with delicacy to protect you from your own self. Where you just sleep peacefully and where you just know it's alll good now, finally!!",
  "I didn't wanted to come out of sudden and wanted to give alllll the time to be certain.",
  "And now I want to show up, honestly and openly, and see where this path leads.",
  "If someone would ask me how I want to love my partner, I could tell the obvious things. Flowers, chocolates, planning dates, being the best listener, kisses and hugs all day, efforts.",
  "And I love all these things.",
  "But if you would ask me what I really wanna give to my partner, then I would tell that I want the more beautiful things which are not even physical.",
  "Not having any appetite for confusion mtlb being fullllllyyyy sure. Jithe tenu v pta hove and menu v that no matter what the storm is we are together.",
  "I want every moment where it's being said love, but actually it's even muchhhhh more than love.",
  "Where we have so much clarity that overthinking is eradicated and even if one thinks something the other one is filling that moment with so much love and caress that it's even beautiful to be overthinking for a second.",
  "Where at the top of everything we have peace, we have individuality, where we have each other pushing to grow (and to relax and fall back on me because you don't need to do everything on your own baba)",
];

const FINAL_LINE = "And Priya I";

export default function LetterSection() {
  return (
    <section className="relative py-20 px-4">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(160,30,70,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p
            className="text-rose-300/60 text-sm uppercase tracking-[0.4em] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ✦ &nbsp; straight from the heart &nbsp; ✦
          </p>
          <h2
            className="shimmer-text mb-4"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(2.5rem, 7vw, 4rem)",
            }}
          >
            My Letter to You
          </h2>
          <div className="ornamental-divider mt-6">
            <span className="text-rose-400/50 text-xl">❧</span>
          </div>
        </motion.div>

        {/* Letter card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="letter-glow relative rounded-3xl p-8 sm:p-12 border border-rose-900/40 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(30,8,20,0.95) 0%, rgba(20,5,15,0.98) 50%, rgba(25,7,18,0.95) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Decorative corner ornaments */}
          {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map(
            (pos, i) => (
              <span
                key={i}
                className={`absolute ${pos} text-rose-700/30 text-2xl pointer-events-none select-none`}
              >
                ✦
              </span>
            )
          )}

          {/* Opening quote mark */}
          <div className="relative mb-8 text-center">
            <span
              className="quote-mark select-none"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: "7rem", color: "rgba(220,80,120,0.2)", lineHeight: 0.5 }}
            >
              "
            </span>
          </div>

          {/* Dear */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-rose-200/90 mb-8"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
              fontStyle: "italic",
            }}
          >
            Dear Priya,
          </motion.p>

          {/* Letter paragraphs */}
          <div className="space-y-6">
            {LETTER_PARAGRAPHS.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0)" }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.8, delay: i < 3 ? i * 0.15 : 0 }}
                className={`leading-relaxed text-rose-100/85 ${
                  para === "And now I know." ||
                  para === "And I love all these things."
                    ? "text-center italic text-rose-300 font-medium"
                    : ""
                }`}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.05rem, 2vw, 1.2rem)",
                  lineHeight: "1.9",
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Final unfinished line — dramatic effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mt-12 pt-8 border-t border-rose-900/30"
          >
            <p
              className="text-center shimmer-text"
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                lineHeight: 1.4,
              }}
            >
              {FINAL_LINE}
              <span
                className="ml-2 inline-block"
                style={{
                  borderBottom: "2px solid rgba(251,113,133,0.6)",
                  width: "120px",
                  verticalAlign: "middle",
                  display: "inline-block",
                  marginBottom: "6px",
                }}
              />
            </p>
            <p
              className="text-center text-rose-300/50 mt-4 text-sm italic"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              (some words are too big even for a letter...)
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mt-10 text-right"
          >
            <p
              className="text-rose-300/80 italic"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.6rem" }}
            >
              — Charming Singh
            </p>
            <p className="text-rose-400/40 text-xs mt-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              with all the certainty in the world 💝
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
