/* Tweaks panel — exposes design controls when toolbar tweaks-mode is active.
   Plain JS, no framework. Calls into BKC for theme/type/density.
*/
(function () {
  let panelEl = null;
  let visible = false;

  function ensurePanel() {
    if (panelEl) return panelEl;
    panelEl = document.createElement('div');
    panelEl.className = 'bkc-tweaks';
    panelEl.style.cssText = `
      position: fixed; right: 24px; bottom: 24px; z-index: 9999;
      width: 320px; max-height: calc(100vh - 48px); overflow: auto;
      background: var(--bg-elev); color: var(--ink);
      border: 1px solid var(--line);
      border-radius: 14px;
      box-shadow: 0 24px 60px -20px rgba(0,0,0,0.35), 0 4px 10px rgba(0,0,0,0.08);
      font-family: var(--font-body);
      font-size: 13px;
      display: none;
    `;
    panelEl.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:14px 16px; border-bottom:1px solid var(--line);">
        <strong style="font-family:var(--font-display); font-size:18px; font-weight:500;">Tweaks</strong>
        <button id="bkc-tweaks-close" aria-label="Close" style="background:none;border:none;color:var(--ink-mute);font-size:18px;cursor:pointer;">×</button>
      </div>
      <div style="padding:16px; display:flex; flex-direction:column; gap:18px;">
        ${section('Color theme', `
          ${radio('theme', 'bridgeland', 'Bridgeland')}
          ${radio('theme', 'keyclub',   'Key Club')}
          ${radio('theme', 'dark',      'Dark')}
        `)}
        ${section('Typography', `
          ${radio('type', 'editorial', 'Editorial — Instrument Serif + Inter')}
          ${radio('type', 'grotesk',   'Modern — Space Grotesk + Plex Sans')}
          ${radio('type', 'classic',   'Classic — Playfair + Source Sans')}
        `)}
        ${section('Density', `
          ${radio('density', 'compact',     'Compact')}
          ${radio('density', 'comfortable', 'Comfortable')}
          ${radio('density', 'spacious',    'Spacious')}
        `)}
        ${section('Hero layout (home)', `
          ${radio('hero', 'editorial', 'Editorial split')}
          ${radio('hero', 'poster',    'Poster')}
          ${radio('hero', 'tape',      'Marquee tape')}
        `)}
        ${section('Officer card style', `
          ${radio('officers', 'portrait', 'Portrait grid')}
          ${radio('officers', 'roster',   'Roster list')}
          ${radio('officers', 'cards',    'Index cards')}
        `)}
        ${section('Hours dashboard layout', `
          ${radio('hours', 'split',  'Split (leaderboard + table)')}
          ${radio('hours', 'table',  'Table-only')}
          ${radio('hours', 'cards',  'Member cards')}
        `)}
        <div style="font-family:var(--font-mono); font-size:10px; color:var(--ink-mute); letter-spacing:0.08em; text-transform:uppercase; padding-top:6px; border-top:1px dashed var(--line);">
          Tweaks save to your browser only.
        </div>
      </div>
    `;
    document.body.appendChild(panelEl);

    panelEl.querySelector('#bkc-tweaks-close').addEventListener('click', () => {
      hide();
      window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
    });
    panelEl.addEventListener('change', (e) => {
      const t = e.target;
      if (!t.name) return;
      const v = t.value;
      if (t.name === 'theme') BKC.setTheme(v);
      else if (t.name === 'type') BKC.setType(v);
      else if (t.name === 'density') BKC.setDensity(v);
      else {
        localStorage.setItem('bkc-' + t.name, v);
        document.documentElement.setAttribute('data-' + t.name, v);
        // Notify pages that listen for changes
        document.dispatchEvent(new CustomEvent('bkc:tweak', { detail: { key: t.name, value: v } }));
      }
    });
    return panelEl;
  }

  function section(title, body) {
    return `
      <div>
        <div style="font-family:var(--font-mono); font-size:10px; letter-spacing:0.14em; text-transform:uppercase; color:var(--ink-mute); margin-bottom:10px;">${title}</div>
        <div style="display:flex; flex-direction:column; gap:6px;">${body}</div>
      </div>
    `;
  }
  function radio(name, value, label) {
    return `
      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;padding:6px 8px;border-radius:6px;">
        <input type="radio" name="${name}" value="${value}" style="accent-color: var(--secondary);"/>
        <span>${label}</span>
      </label>
    `;
  }

  function syncFromState() {
    const root = document.documentElement;
    const map = {
      theme: root.getAttribute('data-theme') || 'bridgeland',
      type: root.getAttribute('data-type') || 'editorial',
      density: root.getAttribute('data-density') || 'comfortable',
      hero: localStorage.getItem('bkc-hero') || 'editorial',
      officers: localStorage.getItem('bkc-officers') || 'portrait',
      hours: localStorage.getItem('bkc-hours') || 'split',
    };
    Object.entries(map).forEach(([k, v]) => {
      const el = panelEl.querySelector(`input[name="${k}"][value="${v}"]`);
      if (el) el.checked = true;
    });
  }

  function show() { ensurePanel(); panelEl.style.display = 'block'; visible = true; syncFromState(); }
  function hide() { if (panelEl) panelEl.style.display = 'none'; visible = false; }

  // Apply persisted layout choices on init
  ['hero','officers','hours'].forEach((k) => {
    const v = localStorage.getItem('bkc-' + k);
    if (v) document.documentElement.setAttribute('data-' + k, v);
  });

  window.addEventListener('message', (e) => {
    const t = e.data && e.data.type;
    if (t === '__activate_edit_mode') show();
    else if (t === '__deactivate_edit_mode') hide();
  });
  window.parent.postMessage({ type: '__edit_mode_available' }, '*');
})();
