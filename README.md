# twyk.me

A design prototype for **twyk.me** — a community website for the twyk 3D editor, combining a Tinkercad-style browser-based design tool with a MakerWorld/Printables-style sharing community: publish a model in one click, and anyone can download it, rate it, or open it back up in the editor to remix it, with credit tracked automatically through a visible remix lineage.

This repo is the marketing/community **website prototype** (not the editor itself). It's a static, no-build-step site: plain HTML, CSS, and JavaScript ES modules, with [three.js](https://threejs.org/) (loaded from a CDN) rendering all of the 3D model previews procedurally, so there are no binary model assets checked in.

**Live demo:** <https://jared337.github.io/twyk-me/> (via GitHub Pages, served from `docs/`)

## Running it locally

The site uses ES module imports, which browsers block on `file://` URLs, so it needs to be served over HTTP:

```bash
npx serve -l 4173 docs
```

Then open <http://localhost:4173>.

## Project structure

The site lives in `docs/` (not `site/`) specifically so GitHub Pages can serve it directly from this repo with no build step.

```
docs/
  index.html, explore.html, model.html, profile.html,
  creators.html, how-it-works.html, challenges.html,
  project-ideas.html, blog.html, post.html, help.html,
  about.html, contact.html, compare.html
  css/style.css        design system (Stripe-inspired, product-blue accent)
  js/
    data.js            mock model/creator catalog
    posts.js           full blog article content
    app.js             shared header/footer/card rendering
    models3d.js         procedural 3D model generators (three.js)
    hero3d.js           animated homepage hero scene
    thumbs.js            renders card thumbnails from the 3D models
    seo.js               canonical/OG/JSON-LD helpers for dynamic pages
  img/editor/           real product screenshots used in the "How it works" guide
  robots.txt, sitemap.xml, llms.txt
```

## Notes

- All models, creators, ratings, and blog content are illustrative placeholders for this prototype, not real data.
- Canonical URLs and structured data assume a production domain of `https://twyk.me` — update this across `docs/*.html`, `sitemap.xml`, `robots.txt`, and `llms.txt` if the real domain differs (the GitHub Pages URL above is just for previewing the prototype).
- `docs/js/seo.js` injects SEO tags client-side for the dynamic pages (`model.html`, `profile.html`, `post.html`). That works for Google, but not for crawlers that don't execute JavaScript (e.g. Twitter/Slack link previews) — production should server-render or pre-render those pages per id.
