/* twyk.me: analytics (GA4, consent-gated) and the editor handoff.

   GA4 only loads after the visitor accepts the cookie banner. Until then events
   queue in window.dataLayer; if they decline, nothing is ever sent to Google.

   Usage:
     track("prompt_submit", { source: "hero" })
     <a data-track="cta_editor" data-track-source="hero">  (auto-tracked on click)
*/

// Paste the GA4 Measurement ID (Admin > Data streams > twyk.me). Empty = analytics off, no banner.
export const GA_MEASUREMENT_ID = "";

// The live generator. The editor reads ?prompt= and starts generating.
export const EDITOR_URL = "https://editor.twyk.me/";

const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"];
const CONSENT_KEY = "twyk_analytics_consent";

/* ---- editor handoff: keeps campaign params so editor-side analytics can attribute too ---- */
export function editorUrl(prompt = "") {
  const url = new URL(EDITOR_URL);
  if (prompt) url.searchParams.set("prompt", prompt);
  const here = new URLSearchParams(location.search);
  CAMPAIGN_KEYS.forEach(k => { if (here.get(k)) url.searchParams.set(k, here.get(k)); });
  return url.toString();
}

/* ---- storage that never throws (private mode, blocked site data) ---- */
function readConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}
function saveConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch { /* choice lasts for this page view only */ }
}

/* ---- gtag bootstrap ---- */
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
window.gtag = window.gtag || gtag;

let gaLoaded = false;
function loadGA() {
  if (gaLoaded || !GA_MEASUREMENT_ID) return;
  gaLoaded = true;
  gtag("consent", "update", { analytics_storage: "granted" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.append(s);
}

if (GA_MEASUREMENT_ID) {
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}

export function track(name, props = {}) {
  if (!GA_MEASUREMENT_ID) {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") console.debug("[track]", name, props);
    return;
  }
  gtag("event", name, props);
}

/* ---- let visitors change their mind (privacy page): forget the choice, drop GA cookies, ask again ---- */
export function resetConsent() {
  try { localStorage.removeItem(CONSENT_KEY); } catch { /* nothing stored */ }
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie.split(";").map(c => c.trim().split("=")[0]).filter(n => n.startsWith("_ga")).forEach(name => {
    domains.forEach(d => { document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`; });
  });
  location.reload();
}

/* ---- consent banner ---- */
function showBanner() {
  const bar = document.createElement("div");
  bar.className = "consent";
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Cookie choice");
  bar.innerHTML = `
    <p>We use analytics cookies to see which ideas people make, so we can improve twyk. No ads, no selling data. <a href="privacy.html">Privacy</a></p>
    <div class="consent-actions">
      <button type="button" class="btn btn-ghost" data-consent="denied">Decline</button>
      <button type="button" class="btn btn-primary" data-consent="granted">Accept</button>
    </div>`;
  bar.addEventListener("click", e => {
    const choice = e.target.closest("[data-consent]")?.dataset.consent;
    if (!choice) return;
    saveConsent(choice);
    if (choice === "granted") loadGA();
    bar.remove();
  });
  document.body.append(bar);
}

if (GA_MEASUREMENT_ID) {
  const consent = readConsent();
  if (consent === "granted") loadGA();
  else if (consent !== "denied") showBanner();
}

/* ---- delegated click tracking for any element with data-track ---- */
document.addEventListener("click", e => {
  const el = e.target.closest("[data-track]");
  if (!el) return;
  const props = {};
  Object.entries(el.dataset).forEach(([k, v]) => {
    if (k.startsWith("track") && k !== "track") props[k.slice(5).toLowerCase()] = v;
  });
  track(el.dataset.track, props);
});
