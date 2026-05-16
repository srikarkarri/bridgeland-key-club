/* global React */
const { useState, useEffect, useRef } = React;

/* ============================================================
   TopNav — used on every page
   ============================================================ */
function TopNav({ active = "home" }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["home", "Home", "home.html"],
    ["about", "About", "about.html"],
    ["officers", "Officers", "officers.html"],
    ["calendar", "Calendar", "calendar.html"],
    ["hours", "Hours", "hours.html"],
    ["gallery", "Gallery", "gallery.html"],
    ["news", "News", "news.html"],
    ["resources", "Resources", "resources.html"],
    ["slides", "Slides", "slides.html"],
    ["faq", "FAQ", "faq.html"],
    ["contact", "Contact", "contact.html"]
  ];
  return (
    <nav className="topnav">
      <div className="topnav-inner">
        <a href="home.html" className="topnav-brand">
          <img src="assets/bridgeland-keyclub-logo.jpg" alt="Bridgeland Key Club" />
          <span>Bridgeland Key Club</span>
        </a>
        <div className="topnav-links" style={{ display: open ? "flex" : undefined }}>
          {links.map(([id, label, href]) => (
            <a key={id} href={href} className={"topnav-link " + (active === id ? "active" : "")}>{label}</a>
          ))}
        </div>
        <button className="menu-btn" onClick={() => setOpen(!open)}>Menu</button>
      </div>
    </nav>
  );
}

/* ============================================================
   SiteFooter — required rubric content lives here
   ============================================================ */
function SiteFooter() {
  const c = window.BKC.club;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h4>Bridgeland Key Club</h4>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, opacity: 0.85 }}>
              {c.school} · {c.division} · {c.region}<br/>
              Chartered {c.chartered}<br/>
              {c.location}<br/>
              {c.address}
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16, alignItems: "center" }}>
              <img src="assets/bridgeland-keyclub-logo.jpg" alt="Bridgeland Key Club" style={{ width: 44, height: 44, borderRadius: "50%" }} />
              <img src="assets/keyclub-international-seal.jpg" alt="Key Club International" style={{ width: 44, height: 44, borderRadius: "50%" }} />
              <img src="assets/kiwanis-logo.webp" alt="Kiwanis International" style={{ width: 44, height: 44, borderRadius: "50%" }} />
              <img src="assets/txok-keyclub-logo.webp" alt="TX-OK District" style={{ width: 44, height: 44, borderRadius: "50%" }} />
            </div>
          </div>
          <div>
            <h4>Key Club</h4>
            <ul>
              <li><a href="about.html">About Key Club</a></li>
              <li><a href="officers.html">Officers</a></li>
              <li><a href="calendar.html">Calendar</a></li>
              <li><a href="hours.html">Hours tracker</a></li>
              <li><a href="resources.html">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4>The Family</h4>
            <ul>
              <li><a href="https://keyclub.org" target="_blank" rel="noopener">Key Club International ↗</a></li>
              <li><a href="https://tokeyclub.com" target="_blank" rel="noopener">TX-OK District ↗</a></li>
              <li><a href="https://kiwanis.org" target="_blank" rel="noopener">Kiwanis International ↗</a></li>
              <li><a href="https://kiwanis.org/clubs/cypress" target="_blank" rel="noopener">Cypress Kiwanis ↗</a></li>
            </ul>
          </div>
          <div>
            <h4>Stay in touch</h4>
            <ul>
              <li><a href={"mailto:" + c.email}>{c.email}</a></li>
              <li><a href={c.instagramUrl} target="_blank" rel="noopener">Instagram {c.instagram} ↗</a></li>
              <li>{c.remind}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Bridgeland Key Club · A Kiwanis-family organization</span>
          <span className="footer-credit">site built &amp; maintained by Srikar Karri 🔑</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   Cursor mascot — golden key follows cursor with delay
   ============================================================ */
function CursorMascot() {
  const ref = useRef(null);
  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let x = mx, y = my;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);
    let raf;
    const tick = () => {
      x += (mx - x) * 0.12;
      y += (my - y) * 0.12;
      const angle = Math.atan2(my - y, mx - x) * 180 / Math.PI;
      if (ref.current) {
        ref.current.style.transform = `translate(${x - 28}px, ${y - 28}px) rotate(${angle - 25}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);
  return (
    <div ref={ref} style={{
      position: "fixed", top: 0, left: 0, width: 56, height: 56,
      pointerEvents: "none", zIndex: 60,
      filter: "drop-shadow(0 4px 8px rgba(10,31,61,0.25))",
      transition: "opacity 0.3s"
    }}>
      <svg viewBox="0 0 56 56" width="56" height="56">
        <g>
          {/* key bow */}
          <circle cx="18" cy="18" r="11" fill="#f5c451" stroke="#0a1f3d" strokeWidth="2"/>
          <circle cx="18" cy="18" r="5" fill="#0a1f3d"/>
          {/* shaft */}
          <rect x="26" y="15" width="22" height="6" fill="#f5c451" stroke="#0a1f3d" strokeWidth="2"/>
          {/* teeth */}
          <rect x="38" y="21" width="3" height="6" fill="#f5c451" stroke="#0a1f3d" strokeWidth="2"/>
          <rect x="44" y="21" width="3" height="8" fill="#f5c451" stroke="#0a1f3d" strokeWidth="2"/>
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
   Reveal — wraps children in a scroll-reveal observer
   ============================================================ */
function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <Tag ref={ref} data-reveal="" {...rest}>{children}</Tag>;
}

/* ============================================================
   AnimatedNumber — counts up when in view
   ============================================================ */
function AnimatedNumber({ value, duration = 1400, prefix = "", suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.floor(value * eased));
            if (t < 1) requestAnimationFrame(tick);
            else setN(value);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);
  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
}

/* ============================================================
   Theme handling — persisted in localStorage; toggle button
   ============================================================ */
function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  try { localStorage.setItem("bkc-theme", theme); } catch (e) {}
}
function initTheme() {
  let t = "light";
  try { t = localStorage.getItem("bkc-theme") || "light"; } catch (e) {}
  document.body.setAttribute("data-theme", t);
  return t;
}

Object.assign(window, {
  TopNav, SiteFooter, CursorMascot, Reveal, AnimatedNumber, applyTheme, initTheme
});
