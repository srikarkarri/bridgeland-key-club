/* global React, ReactDOM, TopNav, SiteFooter, CursorMascot, Reveal, AnimatedNumber, initTheme */
const { useState, useEffect, useMemo } = React;

/* ============================================================
   PageHeader — used across all subpages
   ============================================================ */
function PageHeader({ eyebrow, title, lede, accent = "var(--red-600)" }) {
  return (
    <header style={{ padding: "72px 0 56px", borderBottom: "1.5px solid var(--navy-900)", position: "relative" }}>
      <div className="wrap">
        <div className="eyebrow" style={{ color: accent }}>{eyebrow}</div>
        <h1 className="h-display" style={{ marginTop: 16, fontSize: "clamp(40px, 6vw, 80px)" }}>{title}</h1>
        {lede && <p className="body-lg" style={{ marginTop: 24, maxWidth: 680 }}>{lede}</p>}
      </div>
      {/* corner doodle — three little dots */}
      <div style={{ position: "absolute", right: 40, bottom: 30, display: "flex", gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--butter)" }}></span>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--red-600)" }}></span>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--navy-900)" }}></span>
      </div>
    </header>
  );
}

function MiniTweaks({ active }) {
  // Just theme toggle on subpages, lighter footprint
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("bkc-theme") || "light"; } catch (e) { return "light"; }
  });
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    try { localStorage.setItem("bkc-theme", theme); } catch (e) {}
  }, [theme]);
  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle dark mode"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 80,
        width: 52, height: 52, borderRadius: "50%",
        background: "var(--navy-900)", color: "var(--butter)",
        border: "2px solid var(--butter)", cursor: "pointer",
        fontSize: 22, display: "grid", placeItems: "center",
        boxShadow: "0 8px 20px -6px rgba(0,0,0,0.35)"
      }}>{theme === "light" ? "🌙" : "☀"}</button>
  );
}

Object.assign(window, { PageHeader, MiniTweaks });
