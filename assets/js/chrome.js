/* Renders shared header & footer; pages call BKC.mountChrome() at end of <body>. */
(function () {
  const HEADER = `
<header class="site-header">
  <div class="site-header__inner">
    <a class="brand" href="index.html" aria-label="Bridgeland Key Club home">
      <span class="brand-mark" aria-hidden="true">K</span>
      <span class="brand-text">
        <small>Bridgeland HS · T-O Region 11 · Division 24</small>
        <strong>Key Club</strong>
      </span>
    </a>
    <nav class="nav" aria-label="Primary">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <a href="officers.html">Officers</a>
      <a href="district.html">District</a>
      <a href="events.html">Events</a>
      <a href="hours.html">Hours</a>
      <a href="impact.html">Impact</a>
      <a href="resources.html">Resources</a>
      <a href="gallery.html">Gallery</a>
      <a href="news.html">News</a>
      <a href="join.html">Join</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="header-actions">
      <a class="btn btn--ghost btn--sm" href="hours.html">My Hours</a>
      <a class="btn btn--accent btn--sm" href="join.html">Join the Club</a>
    </div>
  </div>
</header>`;

  const FOOTER = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h4>Bridgeland HS Key Club</h4>
        <p>The largest student-led service organization at Bridgeland High School. Chartered under Kiwanis International, Texas-Oklahoma District, Division 24.</p>
        <p style="font-family:var(--font-mono); font-size:11px; opacity:0.6; letter-spacing:0.08em; text-transform:uppercase; margin-top:18px;">Site built &amp; maintained by Srikar Karri</p>
      </div>
      <div class="footer-col">
        <h5>The Club</h5>
        <ul>
          <li><a href="about.html">About Key Club</a></li>
          <li><a href="officers.html">Officers</a></li>
          <li><a href="join.html">Join / Member Resources</a></li>
          <li><a href="news.html">News &amp; Updates</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Members</h5>
        <ul>
          <li><a href="hours.html">Hours Dashboard</a></li>
          <li><a href="events.html">Events Calendar</a></li>
          <li><a href="impact.html">Club Impact</a></li>
          <li><a href="gallery.html">Photo Gallery</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Beyond Bridgeland</h5>
        <ul>
          <li><a href="https://www.keyclub.org" target="_blank" rel="noopener">Key Club International ↗</a></li>
          <li><a href="https://www.tokeyclub.com" target="_blank" rel="noopener">Texas-Oklahoma District ↗</a></li>
          <li><a href="https://www.kiwanis.org" target="_blank" rel="noopener">Kiwanis International ↗</a></li>
          <li><a href="contact.html">Contact us</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© <span id="yr"></span> Bridgeland HS Key Club · Division 24, Texas-Oklahoma District</span>
    <span>Last updated <span id="last-upd"></span></span>
  </div>
</footer>`;

  function mountChrome() {
    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');
    if (h) h.outerHTML = HEADER;
    if (f) f.outerHTML = FOOTER;
    const yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
    const lu = document.getElementById('last-upd');
    if (lu) lu.textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    // Re-run nav highlight after injection
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach((a) => {
      if (a.getAttribute('href') === path) a.setAttribute('aria-current', 'page');
    });
  }
  window.BKC = window.BKC || {};
  window.BKC.mountChrome = mountChrome;
})();
