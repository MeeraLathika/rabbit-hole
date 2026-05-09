// pages/index.js
import { useState, useEffect, useRef } from "react";
import Head from "next/head";

const SUGGESTIONS = [
  { emoji: "🍕", label: "pizza" },
  { emoji: "🌕", label: "the moon" },
  { emoji: "🦈", label: "sharks" },
  { emoji: "🥤", label: "Coca-Cola" },
  { emoji: "🧠", label: "your brain" },
  { emoji: "💰", label: "money" },
  { emoji: "💭", label: "dreams" },
  { emoji: "🏺", label: "ancient Egypt" },
  { emoji: "🌌", label: "black holes" },
  { emoji: "🍫", label: "chocolate" },
  { emoji: "🎵", label: "music" },
  { emoji: "😴", label: "sleep" },
  { emoji: "⚔️", label: "war" },
  { emoji: "🐙", label: "octopus" },
  { emoji: "💊", label: "medicine" },
  { emoji: "🎬", label: "Hollywood" },
];

const LOADING_MSGS = [
  "Connecting the most unexpected dots…",
  "Digging through forgotten history…",
  "Finding the wildest true facts…",
  "Following the weirdest thread…",
  "Uncovering what Wikipedia buried…",
];

const GRADIENTS = [
  "linear-gradient(90deg,#7B4FFF,#FF4F9B)",
  "linear-gradient(90deg,#FF4F9B,#FFD166)",
  "linear-gradient(90deg,#FFD166,#4FFFCB)",
  "linear-gradient(90deg,#4FFFCB,#7B4FFF)",
  "linear-gradient(90deg,#7B4FFF,#4FFFCB)",
];
const WOW_EMOJIS = ["🌀", "⚡", "🔥", "💥", "🤯"];

function Stars() {
  const [stars] = useState(() =>
    Array.from({ length: 65 }, (_, i) => ({
      id: i, l: Math.random() * 100, t: Math.random() * 100,
      sz: Math.random() > 0.85 ? 3 : 2,
      dur: 2 + Math.random() * 4,
      delay: Math.random() * 4,
      op: 0.1 + Math.random() * 0.4,
    }))
  );
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.l}%`, top: `${s.t}%`,
          width: s.sz, height: s.sz, borderRadius: "50%", background: "white",
          opacity: s.op, animation: `tw ${s.dur}s ${s.delay}s ease-in-out infinite`
        }} />
      ))}
    </div>
  );
}

const G = g => ({ background: g, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" });

function formatBody(text) {
  return (text || "").replace(/\*\*(.*?)\*\*/g, '<strong style="color:#FFD166;font-weight:500">$1</strong>');
}

export default function Home() {
  const [screen, setScreen] = useState("home");
  const [inputVal, setInputVal] = useState("");
  const [result, setResult] = useState(null);
  const [msgIdx, setMsgIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [err, setErr] = useState("");
  const [shown, setShown] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (screen === "journey") setTimeout(() => setShown(true), 80);
    else setShown(false);
  }, [screen]);

  useEffect(() => {
    if (screen !== "loading") return;
    const iv = setInterval(() => setMsgIdx(i => (i + 1) % LOADING_MSGS.length), 1800);
    return () => clearInterval(iv);
  }, [screen]);

  async function fall(suggested) {
    const topic = (suggested || inputVal).trim();
    if (!topic) return;
    setErr("");
    setScreen("loading");
    setMsgIdx(0);

    try {
      const res = await fetch("/api/rabbit-hole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setResult(data);
      setCount(c => c + 1);
      setScreen("journey");
      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (e) {
      setErr(e.message || "Something went wrong. Please try again.");
      setScreen("home");
    }
  }

  function reset() {
    setScreen("home");
    setInputVal("");
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 300);
  }

  return (
    <>
      <Head>
        <title>The Rabbit Hole — Fall Into Something Fascinating</title>
        <meta name="description" content="Type any topic. Fall through 5 mind-blowing connected facts. The curiosity engine that beats scrolling." />
        <meta property="og:title" content="The Rabbit Hole 🕳️" />
        <meta property="og:description" content="Stop scrolling. Start falling. Type anything — get 5 mind-blowing connected facts instantly." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=Lora:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5075202378305514"
     crossorigin="anonymous"></script>
      </Head>

      <div style={{ background: "#050508", minHeight: "100vh", color: "#E8E8F0", fontFamily: "'Lora', Georgia, serif", overflowX: "hidden", position: "relative" }}>
        <style>{`
          @keyframes tw { 0%,100%{opacity:.3} 50%{opacity:.04} }
          @keyframes spin { to{transform:rotate(360deg)} }
          @keyframes fu { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes fire { 0%,100%{transform:scale(1) rotate(-3deg)} 50%{transform:scale(1.15) rotate(3deg)} }
          @keyframes hp { 0%,100%{box-shadow:0 0 20px rgba(123,79,255,.5)} 50%{box-shadow:0 0 50px rgba(123,79,255,.9)} }
          @keyframes cp { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
          .fu { animation: fu .6s ease forwards; }
          .fire { animation: fire 1s ease-in-out infinite; }
          .sug:hover { background:rgba(123,79,255,.15)!important; color:#E8E8F0!important; border-color:rgba(123,79,255,.4)!important; }
          .card:hover { transform:translateY(-3px)!important; border-color:rgba(123,79,255,.4)!important; box-shadow:0 12px 40px rgba(123,79,255,.18)!important; }
          .sbtn:hover { border-color:rgba(123,79,255,.5)!important; color:#E8E8F0!important; }
          input::placeholder { color:rgba(232,232,240,.3); font-style:italic; }
          input:focus { outline:none; }
          ::-webkit-scrollbar { width:4px; }
          ::-webkit-scrollbar-track { background:#050508; }
          ::-webkit-scrollbar-thumb { background:rgba(123,79,255,.4); border-radius:4px; }
        `}</style>

        {/* Orbs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(123,79,255,.1)", filter: "blur(80px)", top: -100, left: -100 }} />
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "rgba(255,79,155,.07)", filter: "blur(80px)", bottom: -50, right: -50 }} />
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(79,255,203,.05)", filter: "blur(80px)", top: "40%", right: "10%" }} />
        </div>

        <Stars />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "0 20px" }}>

          {/* ===== HOME ===== */}
          {screen === "home" && (
            <div className="fu" style={{ paddingTop: 64, paddingBottom: 64 }}>

              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 52 }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%,#7B4FFF,#050508)", animation: "hp 3s ease-in-out infinite", position: "relative", flexShrink: 0 }}>
                  <div style={{ position: "absolute", inset: 10, borderRadius: "50%", background: "#050508" }} />
                </div>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, letterSpacing: 3, ...G("linear-gradient(135deg,#7B4FFF,#FF4F9B)") }}>THE RABBIT HOLE</span>
              </div>

              {/* Hero */}
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#4FFFCB", marginBottom: 14, fontWeight: 700 }}>∞ Infinite Curiosity Engine</p>
                <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(30px,6vw,54px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, marginBottom: 18 }}>
                  <span style={{ display: "block", color: "#E8E8F0" }}>Stop scrolling.</span>
                  <span style={{ display: "block", ...G("linear-gradient(135deg,#7B4FFF,#FF4F9B,#FFD166)") }}>Start falling.</span>
                </h1>
                <p style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(232,232,240,.5)", maxWidth: 500, margin: "0 auto 32px", fontStyle: "italic", fontWeight: 300 }}>
                  Type <em>anything</em> you're curious about. Fall through 5 mind-blowing connected facts. Guaranteed to make you say "wait — WHAT?!"
                </p>
              </div>

              {/* Input */}
              <div style={{ background: "#13131F", border: "1.5px solid rgba(255,255,255,.09)", borderRadius: 20, padding: "5px 5px 5px 20px", display: "flex", alignItems: "center", marginBottom: 16, boxShadow: "0 4px 24px rgba(0,0,0,.3)" }}>
                <span style={{ fontSize: 22, marginRight: 10, flexShrink: 0 }}>🕳️</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && fall()}
                  placeholder="Type ANY topic — pizza, your job, your city, anything…"
                  maxLength={100}
                  style={{ flex: 1, background: "transparent", border: "none", fontFamily: "'Lora',serif", fontSize: 17, color: "#E8E8F0", padding: "14px 0", minWidth: 0 }}
                />
                <button onClick={() => fall()} disabled={!inputVal.trim()}
                  style={{ padding: "14px 24px", background: inputVal.trim() ? "linear-gradient(135deg,#7B4FFF,#FF4F9B)" : "rgba(100,80,160,.25)", border: "none", borderRadius: 14, fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: "white", cursor: inputVal.trim() ? "pointer" : "not-allowed", letterSpacing: .5, whiteSpace: "nowrap", flexShrink: 0, transition: "all .2s" }}
                >FALL IN →</button>
              </div>

              {err && (
                <div style={{ marginBottom: 16, padding: "12px 18px", background: "rgba(255,79,155,.1)", border: "1px solid rgba(255,79,155,.25)", borderRadius: 12, color: "#FF9FBB", fontSize: 14, lineHeight: 1.6 }}>
                  ⚠️ {err}
                </div>
              )}

              {/* Suggestions */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 44 }}>
                {SUGGESTIONS.map(s => (
                  <button key={s.label} className="sug" onClick={() => fall(s.label)}
                    style={{ padding: "8px 16px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 50, fontFamily: "'Lora',serif", fontSize: 14, color: "rgba(232,232,240,.5)", cursor: "pointer", fontStyle: "italic", transition: "all .2s" }}
                  >{s.emoji} {s.label}</button>
                ))}
              </div>

              {/* === AD SLOT 1 — Replace with Google AdSense code === */}
              <div style={{ width: "100%", minHeight: 90, background: "rgba(255,255,255,.02)", border: "1px dashed rgba(255,255,255,.07)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(232,232,240,.15)", fontSize: 11, fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase", marginBottom: 40 }}>
                Advertisement
              </div>

              {/* Stats */}
              <div style={{ display: "flex", justifyContent: "center", gap: 44, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.06)", flexWrap: "wrap" }}>
                {[["∞", "topics — type anything"], ["5", "stops per rabbit hole"], ["0", "boring facts ever"]].map(([n, l]) => (
                  <div key={l} style={{ textAlign: "center" }}>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, fontWeight: 900, display: "block", ...G("linear-gradient(135deg,#4FFFCB,#7B4FFF)") }}>{n}</span>
                    <span style={{ fontSize: 12, color: "rgba(232,232,240,.28)", display: "block", marginTop: 4 }}>{l}</span>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===== LOADING ===== */}
          {screen === "loading" && (
            <div className="fu" style={{ textAlign: "center", padding: "110px 0" }}>
              <div style={{ position: "relative", width: 96, height: 96, margin: "0 auto 28px" }}>
                {[{ i: 0, c: "#7B4FFF", d: "1.5s", r: "" }, { i: 12, c: "#FF4F9B", d: "2s", r: "reverse" }, { i: 24, c: "#4FFFCB", d: "2.5s", r: "" }].map((x, k) => (
                  <div key={k} style={{ position: "absolute", inset: x.i, borderRadius: "50%", border: "2px solid transparent", borderTopColor: x.c, animation: `spin ${x.d} linear infinite ${x.r}` }} />
                ))}
                <div style={{ position: "absolute", inset: 36, borderRadius: "50%", background: "radial-gradient(circle,#7B4FFF 0%,#050508 70%)", animation: "cp 1.5s ease-in-out infinite" }} />
              </div>
              <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>You're falling in…</p>
              <p style={{ fontSize: 16, color: "rgba(232,232,240,.5)", fontStyle: "italic" }}>{LOADING_MSGS[msgIdx]}</p>
            </div>
          )}

          {/* ===== JOURNEY ===== */}
          {screen === "journey" && result && (
            <div style={{ paddingTop: 44, paddingBottom: 64 }}>

              {/* Header */}
              <div className="fu" style={{ textAlign: "center", marginBottom: 40 }}>
                <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: "#4FFFCB", marginBottom: 10, fontWeight: 700 }}>Your rabbit hole</p>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(18px,4vw,32px)", fontWeight: 900, letterSpacing: -1, marginBottom: 8 }}>
                  Starting with: <span style={G("linear-gradient(135deg,#7B4FFF,#FF4F9B)")}>{result.topic}</span>
                </h2>
                <p style={{ fontSize: 15, color: "rgba(232,232,240,.38)", fontStyle: "italic" }}>{result.subtitle}</p>
              </div>

              {/* === AD SLOT 2 — Before rabbit hole — Replace with AdSense === */}
              <div style={{ width: "100%", minHeight: 90, background: "rgba(255,255,255,.02)", border: "1px dashed rgba(255,255,255,.07)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(232,232,240,.15)", fontSize: 11, fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase", marginBottom: 20 }}>
                Advertisement
              </div>

              {/* Stops */}
              {result.stops.map((stop, i) => (
                <div key={i}>
                  <div style={{
                    position: "relative", background: "#13131F", border: "1px solid rgba(255,255,255,.07)",
                    borderRadius: 24, padding: "28px 30px", marginBottom: 8, overflow: "hidden",
                    opacity: shown ? 1 : 0,
                    transform: shown ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity .5s ease ${i * .11}s, transform .5s ease ${i * .11}s`,
                    boxShadow: "0 2px 16px rgba(0,0,0,.25)"
                  }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: GRADIENTS[i] }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(123,79,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#9B7FFF", fontFamily: "sans-serif", flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: "rgba(232,232,240,.25)" }}>Stop {i + 1} of {result.stops.length}</span>
                    </div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(14px,2.5vw,18px)", fontWeight: 700, letterSpacing: -.4, color: "#E8E8F0", marginBottom: 12, lineHeight: 1.3 }}>{stop.headline}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.9, color: "rgba(232,232,240,.7)", fontWeight: 300, marginBottom: stop.wow ? 14 : 0 }}
                      dangerouslySetInnerHTML={{ __html: formatBody(stop.body) }} />
                    {stop.wow && (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "rgba(255,209,102,.07)", border: "1px solid rgba(255,209,102,.18)", borderRadius: 50, fontSize: 13, color: "#FFD166", fontStyle: "italic" }}>
                        {WOW_EMOJIS[i]} {stop.wow}
                      </div>
                    )}
                  </div>

                  {/* Connector */}
                  {i < result.stops.length - 1 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "2px 0", opacity: shown ? 1 : 0, transition: `opacity .35s ease ${i * .11 + .05}s` }}>
                      <div style={{ width: 2, height: 14, background: "linear-gradient(to bottom,rgba(123,79,255,.45),rgba(255,79,155,.45))" }} />
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#7B4FFF", boxShadow: "0 0 7px rgba(123,79,255,.7)", margin: "3px 0" }} />
                      <div style={{ width: 2, height: 14, background: "linear-gradient(to bottom,rgba(255,79,155,.45),rgba(123,79,255,.45))" }} />
                    </div>
                  )}

                  {/* === AD SLOT 3 — After stop 2 — highest engagement point === */}
                  {i === 1 && shown && (
                    <div style={{ width: "100%", minHeight: 90, background: "rgba(255,255,255,.02)", border: "1px dashed rgba(255,255,255,.07)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(232,232,240,.15)", fontSize: 11, fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase", margin: "12px 0" }}>
                      Advertisement
                    </div>
                  )}
                </div>
              ))}

              {/* Footer */}
              <div style={{ marginTop: 28, opacity: shown ? 1 : 0, transition: "opacity .6s ease .65s" }}>

                {/* === AD SLOT 4 — After rabbit hole ends === */}
                <div style={{ width: "100%", minHeight: 90, background: "rgba(255,255,255,.02)", border: "1px dashed rgba(255,255,255,.07)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(232,232,240,.15)", fontSize: 11, fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
                  Advertisement
                </div>

                {/* Share buttons */}
                <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                  {[
                    { icon: copied ? "✅" : "🔗", label: copied ? "COPIED!" : "COPY LINK", fn: () => { navigator.clipboard.writeText(`🕳️ I went down a rabbit hole about "${result.topic}" and my mind is broken. Try yours! rabbithole.fun`); setCopied(true); setTimeout(() => setCopied(false), 2000); } },
                    { icon: "𝕏", label: "SHARE", fn: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`🕳️ Went down a rabbit hole about "${result.topic}" — completely mind-blown. Try yours: rabbithole.fun`)}`) },
                    { icon: "💬", label: "WHATSAPP", fn: () => window.open(`https://wa.me/?text=${encodeURIComponent(`🕳️ This rabbit hole about "${result.topic}" is insane. Try your own at rabbithole.fun!`)}`) }
                  ].map(b => (
                    <button key={b.label} className="sbtn" onClick={b.fn}
                      style={{ flex: 1, minWidth: 100, padding: "13px 12px", borderRadius: 14, border: "1.5px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", fontFamily: "'Syne',sans-serif", fontSize: 11, fontWeight: 700, color: "rgba(232,232,240,.45)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, letterSpacing: .5, transition: "all .2s" }}
                    ><span>{b.icon}</span>{b.label}</button>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <button onClick={reset}
                    style={{ flex: 1, padding: 16, background: "linear-gradient(135deg,#7B4FFF,#FF4F9B)", border: "none", borderRadius: 16, fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: .5, transition: "all .2s" }}
                    onMouseOver={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(123,79,255,.5)"; }}
                    onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >🕳️ Fall Again</button>
                </div>

                {/* Streak */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "12px 20px", background: "rgba(255,209,102,.06)", border: "1px solid rgba(255,209,102,.14)", borderRadius: 14 }}>
                  <span className="fire" style={{ fontSize: 20 }}>🔥</span>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: "#FFD166" }}>Rabbit hole #{count}</span>
                  <span style={{ fontSize: 13, color: "rgba(232,232,240,.28)", fontStyle: "italic" }}>
                    — {count >= 5 ? "officially obsessed 🕳️" : count >= 3 ? "can't stop, can you?" : count >= 2 ? "still falling…" : "keep going"}
                  </span>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
