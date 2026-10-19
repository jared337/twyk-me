/* twyk.me: shared chrome (header, footer, model cards) */
import { MODELS, USERS, fmt, ratingOf, ratingCountOf } from "./data.js";

// Scripts are running: let the CSS hide .reveal sections until they scroll into view.
document.documentElement.classList.add("js-ready");

export function starsHTML(rating, fs = 15) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return `<span class="stars" style="font-size:${fs}px" role="img" aria-label="${rating.toFixed(1)} out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;<span class="fill" style="width:${pct}%">&#9733;&#9733;&#9733;&#9733;&#9733;</span></span>`;
}

const LOGO_SVG = `
<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13 1.5 24 7.5v11L13 24.5 2 18.5v-11L13 1.5Z" fill="#2563eb"/>
  <path d="M13 1.5 24 7.5 13 13.5 2 7.5 13 1.5Z" fill="#5b8cf5"/>
  <path d="M13 13.5v11L2 18.5v-11l11 6Z" fill="#1b46a8"/>
</svg>`;

const ICON_HEART = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.9-10-9.5C.5 8 2.5 4.5 6 4.5c2.1 0 3.6 1.2 4.5 2.6l1.5 2.3 1.5-2.3c.9-1.4 2.4-2.6 4.5-2.6 3.5 0 5.5 3.5 4 7-2.5 4.6-10 9.5-10 9.5Z"/></svg>`;
const ICON_DL = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16"/></svg>`;
const ICON_FORK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="6" cy="5" r="2.4"/><circle cx="18" cy="5" r="2.4"/><circle cx="12" cy="19" r="2.4"/><path d="M6 7.5v2c0 2 1.5 3 3.5 3h5c2 0 3.5-1 3.5-3v-2M12 12.5v4"/></svg>`;

export const ICONS = { heart: ICON_HEART, dl: ICON_DL, fork: ICON_FORK };

export function renderHeader(active = "") {
  const el = document.createElement("header");
  el.className = "site-header";
  el.innerHTML = `
    <div class="container">
      <a class="logo" href="index.html">${LOGO_SVG} twyk.me</a>
      <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
        <span class="bar"></span><span class="bar"></span><span class="bar"></span>
      </button>
      <nav class="nav-links">
        <a href="features.html" ${active === "features" ? 'class="active"' : ""}>Features</a>
        <a href="how-it-works.html" ${active === "how" ? 'class="active"' : ""}>How it works</a>
        <a href="compare.html" ${active === "compare" ? 'class="active"' : ""}>Compare</a>
        <div class="nav-drop">
          <a href="https://twyk.me/help">Resources <svg class="caret" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m2 3.5 3 3 3-3"/></svg></a>
          <div class="drop-menu">
            <div class="drop-card">
              <a class="drop-item" href="https://twyk.me/help">
                <span class="di fi-green"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.2A2.6 2.6 0 0 1 12 7.5c1.4 0 2.6 1 2.6 2.3 0 1.6-1.6 1.9-2.6 3v.7"/><circle cx="12" cy="16.8" r="0.4" fill="currentColor"/></svg></span>
                <span><b>Help &amp; tutorials</b><span>Every feature explained, with step-by-step projects.</span></span>
              </a>
              <a class="drop-item" href="edit-stl-files.html">
                <span class="di fi-blue"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-4-4m4 4 4-4"/><path d="M4 17v3h16v-3"/></svg></span>
                <span><b>Bring your models</b><span>Tweak files from Thingiverse, Printables, MakerWorld and more.</span></span>
              </a>
              <a class="drop-item" href="project-ideas.html">
                <span class="di fi-pink"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5c1.5 2.5 1 4.5-.5 6C9.5 11.5 9 13.5 10 16m4.5-9c2 2.5 2.5 5 1 7.5"/><path d="M6 14a6 6 0 0 0 12 3.5c1.5-3-.5-5.5-2-6.5"/></svg></span>
                <span><b>Project ideas</b><span>Things to make this weekend.</span></span>
              </a>
              <a class="drop-item" href="https://twyk.me/community">
                <span class="di fi-teal"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="8" r="3.4"/><path d="M3.5 20c.7-3.4 2.8-5 5.5-5s4.8 1.6 5.5 5"/><circle cx="17" cy="9" r="2.6"/><path d="M16 15.2c2.4.2 4 1.7 4.5 4.3"/></svg></span>
                <span><b>Community</b><span>Models people have shared, ready to copy and change.</span></span>
              </a>
              <a class="drop-item" href="challenges.html">
                <span class="di fi-amber"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4.5c0 2.8 1 4.5 2.9 5M17 5h2.5c0 2.9-1 4.6-2.9 5.1M12 13v4m-4 4h8m-8 0c0-2 1.5-3 4-3s4 1 4 3"/></svg></span>
                <span><b>Challenges</b><span>Community design prompts, coming soon.</span></span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div class="header-actions">
        <a class="btn btn-ghost" href="https://twyk.me/login">Sign in</a>
        <a class="btn btn-primary" href="https://twyk.me/login" data-track="cta_login" data-track-source="header">Start making <span class="arrow">&rarr;</span></a>
      </div>
    </div>`;
  document.body.prepend(el);
  window.addEventListener("scroll", () => {
    el.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  /* mobile nav: hamburger toggle + tap-to-expand submenus */
  const toggle = el.querySelector(".nav-toggle");
  const navLinks = el.querySelector(".nav-links");
  const isMobile = () => window.matchMedia("(max-width: 920px)").matches;

  function closeMenu() {
    el.classList.remove("menu-open");
    navLinks.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    navLinks.querySelectorAll(".nav-drop.mobile-open").forEach(d => d.classList.remove("mobile-open"));
  }

  toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    el.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.querySelectorAll(".nav-drop > a").forEach(a => {
    a.addEventListener("click", e => {
      if (!isMobile()) return;
      e.preventDefault();
      a.parentElement.classList.toggle("mobile-open");
    });
  });

  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", () => { if (!isMobile()) closeMenu(); });
}

export function renderFooter({ prototypeNote = false } = {}) {
  const el = document.createElement("footer");
  el.className = "site-footer";
  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="logo" href="index.html">${LOGO_SVG} twyk.me</a>
          <p class="footer-tagline">Design it. Print it. Make it yours.</p>
        </div>
        <div>
          <h4>Product</h4>
          <ul>
            <li><a href="features.html">Features</a></li>
            <li><a href="how-it-works.html">How it works</a></li>
            <li><a href="compare.html">Compare</a></li>
            <li><a href="twyk-vs-tinkercad.html">twyk vs Tinkercad</a></li>
          </ul>
        </div>
        <div>
          <h4>Community</h4>
          <ul>
            <li><a href="https://twyk.me/community">Shared models</a></li>
            <li><a href="challenges.html">Challenges</a></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="https://twyk.me/help">Help &amp; tutorials</a></li>
            <li><a href="edit-stl-files.html">Edit STL &amp; 3MF files</a></li>
            <li><a href="project-ideas.html">Project ideas</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="privacy.html">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">&copy; 2026 twyk.me.${prototypeNote ? " This is a prototype: all models shown are illustrative placeholders." : ""}</div>
    </div>`;
  document.body.append(el);
}

export function cardHTML(m) {
  const u = USERS[m.author];
  const [c1, c2] = m.gradient;
  return `
    <a class="model-card reveal" href="model.html?id=${m.id}">
      <div class="model-thumb" ${m.images?.length ? "" : `data-kind="${m.kind}"`} style="background: linear-gradient(135deg, ${c1}22, ${c2}33), linear-gradient(180deg, #f6f9fc, #eef3f9);">
        ${m.images?.length ? `<img src="${m.images[0]}" alt="" loading="lazy" />` : ""}
        ${m.featured ? '<span class="badge">Featured</span>' : ""}
      </div>
      <div class="model-info">
        <h3>${m.name}</h3>
        <div class="author">by <b>${u.name}</b> &middot; ${m.posted}</div>
        <div class="model-meta">
          <span class="card-rating">&#9733; ${ratingOf(m).toFixed(1)}</span>
          <span>${ICON_HEART} ${fmt(m.likes)}</span>
          <span>${ICON_DL} ${fmt(m.downloads)}</span>
          <span>${ICON_FORK} ${fmt(m.remixes)}</span>
        </div>
      </div>
    </a>`;
}

export function renderCards(container, models) {
  container.innerHTML = models.map(cardHTML).join("");
  observeReveals();
  // upgrade thumbnails to real 3D renders (graceful if CDN unavailable)
  import("./thumbs.js").then(t => t.upgradeThumbs()).catch(() => {});
}

export function observeReveals() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => io.observe(el));
}

export function avatarHTML(userId, size = 38) {
  const u = USERS[userId];
  return `<span class="avatar" style="width:${size}px;height:${size}px;background:${u.color};font-size:${size * 0.4}px">${u.name[0]}</span>`;
}

export { MODELS, USERS, fmt, ratingOf, ratingCountOf };
