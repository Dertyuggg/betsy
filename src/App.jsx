import { useEffect, useMemo, useRef, useState } from "react";


const NAME = "BETSYYY";
const FROM = "BB";
const LETTER = [
  "Happy birthday! umm you are kinda far away so yea something i could make ig",
  "Thank you for sharing your personal stuff yayyy",
  "Today is your day and i want you to live it to your fullest",
  "ummm idk what else to say 😭",
];
const memories = [
  { image: "src/20261111_232252_314.png", caption: "teaaaa" },
  { image: "src/20261111_233206_385.png", caption: "like howwwww" },
];
/* ------------------------------ */

function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`}>{children}</div>;
}

function Panda({ size = 300, onClick, cheer = false, label = "Red panda" }) {
  return (
    <svg className={`panda ${cheer ? "cheer" : ""}`} width={size} height={size} viewBox="0 0 200 200" role="img" aria-label={label} onClick={onClick}>
      <g className="tail">
        <path d="M150 170 Q205 150 185 100 Q175 80 160 95" fill="none" stroke="#C96A35" strokeWidth="26" strokeLinecap="round" />
        {[0, 1, 2].map((i) => <path key={i} d={`M${172 + i * 6} ${150 - i * 24} l18 -4`} stroke="#5B1D24" strokeWidth="6" strokeLinecap="round" />)}
      </g>
      <ellipse cx="100" cy="165" rx="48" ry="32" fill="#3a1a14" />
      <circle cx="52" cy="54" r="19" fill="#C96A35" /><circle cx="52" cy="56" r="9" fill="#FFF1DF" />
      <circle cx="148" cy="54" r="19" fill="#C96A35" /><circle cx="148" cy="56" r="9" fill="#FFF1DF" />
      <ellipse cx="100" cy="97" rx="64" ry="52" fill="#C96A35" />
      <ellipse cx="68" cy="108" rx="22" ry="17" fill="#FFF1DF" /><ellipse cx="132" cy="108" rx="22" ry="17" fill="#FFF1DF" />
      <ellipse cx="100" cy="120" rx="19" ry="14" fill="#FFF1DF" />
      <path d="M74 98 q-4 14 -2 24 M126 98 q4 14 2 24" stroke="#8a3a1f" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="78" cy="97" r="6.5" fill="#2B1712" /><circle cx="122" cy="97" r="6.5" fill="#2B1712" />
      <circle cx="80" cy="95" r="2" fill="#fff" /><circle cx="124" cy="95" r="2" fill="#fff" />
      <ellipse cx="100" cy="113" rx="7" ry="5" fill="#2B1712" />
      <path d="M100 118 v5 M92 126 q8 6 16 0" stroke="#2B1712" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="58" cy="118" r="7" fill="#E8A1A8" opacity=".6" /><circle cx="142" cy="118" r="7" fill="#E8A1A8" opacity=".6" />
    </svg>
  );
}

function Burst({ trigger, emoji = "❤️", count = 28 }) {
  const bits = useMemo(
    () => Array.from({ length: count }, () => ({
      dx: (Math.random() - 0.5) * 520, dy: -Math.random() * 380 - 60,
      d: Math.random() * 0.25, s: 0.8 + Math.random() * 1.1,
      e: Math.random() > 0.7 ? "✨" : emoji,
    })),
    [trigger] // eslint-disable-line
  );
  if (!trigger) return null;
  return (
    <div className="burst" aria-hidden="true" key={trigger}>
      {bits.map((b, i) => <span key={i} style={{ "--dx": `${b.dx}px`, "--dy": `${b.dy}px`, "--s": b.s, animationDelay: `${b.d}s` }}>{b.e}</span>)}
    </div>
  );
}

function Floaters() {
  const items = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({
      e: ["🍃", "✨", "❤️", "⭐", "🍂"][i % 5], left: Math.random() * 100,
      dur: 12 + Math.random() * 14, delay: -Math.random() * 20, size: 0.8 + Math.random() * 1,
    })),
    []
  );
  return (
    <div className="floaters" aria-hidden="true">
      {items.map((p, i) => <span key={i} style={{ left: `${p.left}%`, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, fontSize: `${p.size}rem` }}>{p.e}</span>)}
    </div>
  );
}

function Hero({ onSecret }) {
  const [clicks, setClicks] = useState(0);
  const [pop, setPop] = useState(false);
  const tap = () => {
    setPop(true); setTimeout(() => setPop(false), 300);
    const n = clicks + 1;
    setClicks(n);
    if (n >= 5) { setClicks(0); onSecret(); }
  };
  return (
    <header className="hero">
      <Floaters />
      <div className="hero-text">
        <h1>Happy Birthday,<br />{NAME} ❤️</h1>
        <p className="sub">tf do red pandas sound like? rarr 🦊</p>
        <button className="btn" onClick={() => document.getElementById("letter").scrollIntoView({ behavior: "smooth" })}>Touch Me 😩</button>
      </div>
      <div className={`hero-panda ${pop ? "pop" : ""}`}>
        <div className="glow" />
        <Panda size={340} onClick={tap} label="Red panda. Psst, touch me" />
        <span className="hint">psst… touch me 🐾</span>
      </div>
    </header>
  );
}

function Letter() {
  return (
    <section id="letter" className="section">
      <Reveal className="letter">
        <span className="sticker s1">🐾</span><span className="sticker s2">🍃</span>
        <h2>Dear {NAME},</h2>
        {LETTER.map((p, i) => <p key={i}>{p}</p>)}
        <p className="sign"> {FROM} ❤️</p>
      </Reveal>
    </section>
  );
}

function Gallery() {
  return (
    <section className="section">
      <h2 className="title">DA GOAT</h2>
      <div className="gallery">
        {memories.map((m, i) => (
          <figure key={i} className="polaroid" style={{ "--rot": `${(i % 2 ? 1 : -1) * (2 + ((i * 37) % 5))}deg` }}>
            <span className="tape" />
            <div className="photo">
              <img src={m.image} alt={m.caption} loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} />
              <span className="ph">🐾</span>
            </div>
            <figcaption>{m.caption}</figcaption>
            <span className="doodle">{["❤️", "🐾", "✨", "🍃"][i % 4]}</span>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Gift() {
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState(0);
  const go = () => { if (!open) { setOpen(true); setBurst((b) => b + 1); } };
  return (
    <section className="section center">
      <h2 className="title">One more thing</h2>
      <div className="gift-wrap">
        <Burst trigger={burst} />
        {!open ? (
          <button className="gift" onClick={go} aria-label="Open the gift">
            <span className="lid" /><span className="box" /><span className="rib" />
          </button>
        ) : (
          <div className="gift-open">
            <Panda size={170} cheer label="Celebrating red panda" />
            <p className="msg">Now go eat something delicious. 🎁</p>
          </div>
        )}
      </div>
      {!open && <p className="hint-line">Tap the gift</p>}
    </section>
  );
}

function Cake() {
  const [out, setOut] = useState(false);
  return (
    <section className="section center">
      <h2 className="title">Make a wish</h2>
      <div className="cake">
        <div className="candles">
          {[0, 1, 2].map((i) => (
            <div key={i} className="candle"><i className={`flame ${out ? "out" : ""}`} style={{ animationDelay: `${i * 0.2}s` }} /><b /></div>
          ))}
        </div>
        <div className="tier t1" /><div className="tier t2" /><div className="plate" />
      </div>
      {!out ? (
        <button className="btn" onClick={() => setOut(true)}>Make a Wish ✨</button>
      ) : (
        <p className="msg fade">Wish made. Keep it secret, and I'll do my best to help it come true. 🕯️</p>
      )}
    </section>
  );
}

function Secret({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="secret" onClick={onClose}>
      <Burst trigger={1} emoji="💖" count={40} />
      <div className="secret-card" onClick={(e) => e.stopPropagation()}>
        <h3>You found the secret 🐾</h3>
        <p>I'll do one thing you say.</p>
        <button className="btn" onClick={onClose}>Don't abuse me</button>
      </div>
    </div>
  );
}

function Final() {
  return (
    <footer className="section center final">
      <Reveal>
        <Panda size={150} label="Red panda waving" cheer />
        <p className="closing">I hope you have a good day ahed and good luck with everthing.</p>
        <p className="sign">Happy Birthday, {NAME}.</p>
      </Reveal>
    </footer>
  );
}

export default function App() {
  const [secret, setSecret] = useState(false);
  return (
    <>
      <Hero onSecret={() => setSecret(true)} />
      <Letter />
      <Gallery />
      <Gift />
      <Cake />
      <Final />
      <Secret show={secret} onClose={() => setSecret(false)} />
    </>
  );
}
