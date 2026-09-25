/* twyk.me: SEO helpers for dynamic (query-param driven) pages.

   IMPORTANT CAVEAT: this site has no build step or server, so per-model and
   per-post pages inject their title, meta tags and structured data with
   JavaScript after the page loads. Google generally renders JS before
   indexing, but crawlers that DON'T execute JS (most social-share unfurlers:
   Twitter/X, Slack, iMessage, some LinkedIn/Facebook paths) will only ever
   see the static fallback tags baked into the HTML. For correct social
   previews on every model/post/profile, these pages need to be
   server-rendered or statically pre-rendered per id in production. */

export function truncate(str, max = 155) {
  if (!str || str.length <= max) return str || "";
  const cut = str.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

function headTag(html) {
  document.head.insertAdjacentHTML("beforeend", html);
}

/**
 * Sets document.title and injects description/canonical/OG/Twitter tags.
 * opts: { title, description, canonical, type, publishedTime }
 */
export function injectMeta(opts) {
  document.title = opts.title;
  headTag(`<meta name="description" content="${opts.description}">`);
  headTag(`<link rel="canonical" href="${opts.canonical}">`);
  headTag(`<meta property="og:type" content="${opts.type || "website"}">`);
  headTag(`<meta property="og:site_name" content="twyk.me">`);
  headTag(`<meta property="og:title" content="${opts.title}">`);
  headTag(`<meta property="og:description" content="${opts.description}">`);
  headTag(`<meta property="og:url" content="${opts.canonical}">`);
  if (opts.publishedTime) {
    headTag(`<meta property="article:published_time" content="${opts.publishedTime}">`);
  }
  headTag(`<meta name="twitter:card" content="summary">`);
  headTag(`<meta name="twitter:title" content="${opts.title}">`);
  headTag(`<meta name="twitter:description" content="${opts.description}">`);
}

/** Appends one JSON-LD <script> block for the given structured-data object. */
export function injectJSONLD(obj) {
  const el = document.createElement("script");
  el.type = "application/ld+json";
  el.textContent = JSON.stringify(obj);
  document.head.append(el);
}

/** items: [{ name, url }] in order from the site root. The last item is the
 *  current page and its url is still required by the schema. */
export function breadcrumbLD(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Scans a rendered container for h3 (question) + following <p> (answer)
 *  pairs and returns FAQPage JSON-LD, or null if none are found. Used for
 *  the "Frequently asked questions" sections embedded in blog post bodies. */
export function faqLDFromContainer(container) {
  const qs = [...container.querySelectorAll("h3")];
  if (!qs.length) return null;
  const items = qs
    .map(h => {
      const p = h.nextElementSibling;
      if (!p || p.tagName !== "P") return null;
      return {
        "@type": "Question",
        name: h.textContent.trim(),
        acceptedAnswer: { "@type": "Answer", text: p.textContent.trim() },
      };
    })
    .filter(Boolean);
  if (!items.length) return null;
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items };
}
