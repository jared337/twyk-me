"""Generate one static, SEO-focused comparison page per competitor (docs/twyk-vs-*.html).

Run from the repo root:  python tools/make_vs_pages.py docs

Facts about competitors come from their own sites (each entry's "sources"); facts about twyk
come from the live help guide at https://twyk.me/help.
"""
import html, json, os, sys

OUT = sys.argv[1]
HELP = "https://twyk.me/help#/"

TWYK = {
    "best": "Getting from &ldquo;I need this&rdquo; to a part that prints: build it from shapes, size it to the millimetre, check it prints",
    "build": "Drag &amp; drop shapes and holes; then Sculpt, Formula and Bend",
    "curve": "Low",
    "cost": "Free: no plans, payments or subscriptions",
    "account": "Sign in with Google; models save to your account as you go",
    "checks": "Flex test (PLA, PETG, TPU), Gaps clearance check, Lay flat, Cut big models in two",
    "import": "STL, 3MF (with colours), SVG, up to 64 MB",
    "export": "STL, 3MF (named, coloured parts)",
}

COMPETITORS = [
    {
        "slug": "tinkercad", "name": "Tinkercad", "maker": "Autodesk",
        "title": "twyk vs Tinkercad: The Free Tinkercad Alternative for 3D Printing (2026)",
        "desc": "twyk vs Tinkercad compared: both are free browser 3D modellers built on shapes and holes. twyk adds Sculpt, Formula, Bend, a flex test, a clearance check and 3MF export with coloured parts. See which fits you.",
        "lead": "Tinkercad and twyk are both free, browser-based 3D modellers built on the same idea: drop solid shapes on a workplane and cut them with holes. If you know Tinkercad, you can use twyk on day one. The difference is what twyk adds on top: tools like Sculpt, Formula, Bend, a flex test and a clearance check take you well beyond boxes. Tinkercad is still the better pick for classrooms and for electronics.",
        "rows": [
            ("Best used for", TWYK["best"], "Complete beginners and classrooms"),
            ("How you build", TWYK["build"], "Drag &amp; drop solid shapes, combined with Boolean unions and holes"),
            ("Learning curve", TWYK["curve"], "Low"),
            ("Cost", TWYK["cost"], "Free"),
            ("Account", TWYK["account"], "An Autodesk account"),
            ("Shapes beyond the basics", "Sculpt (melt shapes like clay), Formula (springs, lattices), Bend/Twist/Taper, turned shapes, Lip", "Shape library and shape generators"),
            ("Print checks", TWYK["checks"], "Not built in"),
            ("Classroom tools", "Not yet", "Yes: Classes, student accounts and lessons"),
            ("Electronics and code", "No: 3D modelling only", "Yes: Circuits and Codeblocks"),
            ("Import", TWYK["import"], "STL, OBJ, SVG"),
            ("Export", TWYK["export"], "STL, OBJ, SVG and glTF"),
        ],
        "pick_twyk": [
            "You want organic shapes, springs or lattices that are hard to make from boxes and cylinders.",
            "You print parts that have to work, and want to test a flexible part or check moving parts before printing.",
            "You want 3MF export with separate, named, coloured parts for multi-colour printing.",
        ],
        "pick_them": [
            "You&rsquo;re teaching a class and need mature classroom management and lesson content.",
            "You want electronics simulation (Circuits) or block-based coding (Codeblocks) alongside 3D design.",
        ],
        "switch": "Export your Tinkercad design as an STL (or SVG for flat shapes) and import it into twyk. It arrives as one solid you can scale, cut and add to. Use Split to take it apart into shapes where possible, or add your own shapes to it.",
        "faq": [
            ("Is twyk a good Tinkercad alternative?", "Yes. twyk uses the same solid-and-hole approach, so Tinkercad users feel at home, and adds Sculpt, Formula, Bend, X-ray, a flex test and a clearance check. Both are free."),
            ("Can I move my Tinkercad designs to twyk?", "Yes. Export them from Tinkercad as STL or SVG and import them into twyk, up to 64 MB. Split can take an imported model apart into editable shapes."),
            ("Is twyk free like Tinkercad?", "Yes. twyk has no plans, payments or subscriptions. You sign in with a Google account."),
            ("Which is better for teaching?", "Tinkercad, today. Its Classes feature, student accounts and lesson content are built for classrooms, and twyk doesn't have classroom tools yet."),
        ],
        "sources": [("tinkercad.com", "https://www.tinkercad.com/")],
    },
    {
        "slug": "layerling", "name": "Layerling", "maker": "the Layerling project",
        "title": "twyk vs Layerling: Browser 3D Modelling for 3D Printing Compared (2026)",
        "desc": "twyk vs Layerling compared: two free browser CAD tools for 3D printing. Layerling has fillets, threads and STEP export; twyk has Sculpt, Formula, account storage and print tests.",
        "lead": "Layerling and twyk are both free, browser-based tools for designing 3D prints, and both aim at people who want more than Tinkercad. They grow in different directions. Layerling leans toward classic CAD: fillets on any edge, standard threads, sketches you extrude or revolve, and STEP export, with designs kept in your browser. twyk leans toward speed and shape: Sculpt and Formula make organic and mathematical shapes, and Flex and Gaps test whether a print will work.",
        "rows": [
            ("Best used for", TWYK["best"], "Hobbyists outgrowing Tinkercad who want more CAD-style precision"),
            ("How you build", TWYK["build"], "Shape manipulation with quick-click tools, plus sketches extruded, revolved or swept"),
            ("Learning curve", TWYK["curve"], "Low to medium"),
            ("Cost", TWYK["cost"], "Free and open source"),
            ("Account and storage", TWYK["account"], "No account: designs stay in your browser, or on your own server if you self-host"),
            ("Fillets and chamfers", "Bevels and chamfers on round shapes (cylinders, cones, tubes and more)", "On any edge, changeable later"),
            ("Threads", "No dedicated thread tool (springs and coils via Formula)", "Metric, UNC/UNF and Whitworth threads on screws, nuts, rods and tapped holes"),
            ("Organic and mathematical shapes", "Sculpt, Formula (19 presets), Bend/Twist/Taper", "Lofts, springs and gears in the shape library"),
            ("Print checks", TWYK["checks"], "Build-plate and overhang warnings, weight and filament estimate"),
            ("Import", TWYK["import"], "STL, OBJ, 3MF, STEP, SVG"),
            ("Export", TWYK["export"], "STL, 3MF, STEP, OBJ, SVG, plus workshop drawings"),
        ],
        "pick_twyk": [
            "You want organic shapes (Sculpt) or mathematical ones like lattices and knots (Formula).",
            "You want your models saved to an account and available on any computer.",
            "You want to test flexible prints and check print-in-place clearances before printing.",
        ],
        "pick_them": [
            "You need fillets on any edge or real, standard threads for screws and nuts.",
            "You need STEP export or workshop drawings for machining.",
            "You want open-source software you can self-host, with no account at all.",
        ],
        "switch": "Export from Layerling as STL or 3MF and import into twyk. A 3MF keeps its separate objects and colours. From there you can cut it, add to it and resize it.",
        "faq": [
            ("What's the difference between twyk and Layerling?", "Both are free browser tools for designing 3D prints. Layerling focuses on CAD-style precision such as fillets on any edge, standard threads, sketches and STEP export, with designs stored in your browser. twyk focuses on easy shape-based modelling, organic and formula-based shaping, and print tests like Flex and Gaps, with models saved to your account."),
            ("Can twyk make threads?", "twyk has no dedicated thread tool. You can make springs and coils with Formula, and if you need standard metric or imperial threads, Layerling is the stronger choice."),
            ("Is twyk open source?", "No. Layerling is open source and self-hostable; twyk is a free hosted app you sign into with Google."),
        ],
        "sources": [("layerling.com", "https://layerling.com/"), ("Layerling on GitHub", "https://github.com/henmedia/layerling")],
    },
    {
        "slug": "3d-slash", "name": "3D Slash", "maker": "3D Slash",
        "title": "twyk vs 3D Slash: Which Is Better for Beginners and 3D Printing? (2026)",
        "desc": "twyk vs 3D Slash compared: 3D Slash builds with blocks like Minecraft; twyk builds with smooth shapes sized in millimetres. Cost, exports, colours and print checks side by side.",
        "lead": "3D Slash and twyk are both easy ways into 3D design, but they build in very different ways. 3D Slash works like Minecraft: you add and carve away blocks, which feels natural to young makers. twyk works with smooth shapes and holes measured in millimetres. twyk is free with no paid tier; 3D Slash has a free tier with queued downloads and paid plans for more.",
        "rows": [
            ("Best used for", TWYK["best"], "Kids and creative builders"),
            ("How you build", TWYK["build"], "Adding and subtracting blocks, Minecraft-style"),
            ("Learning curve", TWYK["curve"], "Very low"),
            ("Cost", TWYK["cost"], "Free tier (downloads queued); Premium from $2/month billed yearly; Schools and Professional plans"),
            ("Precision", "Exact sizes in millimetres or inches, snapping down to 0.1 mm", "Set by cube size: 7 sizes free, smaller ones on Premium"),
            ("Colour", "A colour for every part, exported in 3MF", "8 colours free; unlimited colours and Decals on Premium"),
            ("Print checks", TWYK["checks"], "Not built in"),
            ("Offline use", "No: runs in the browser", "Offline app on Premium"),
            ("Export", TWYK["export"], "STL, OBJ"),
        ],
        "pick_twyk": [
            "You want smooth shapes and exact millimetre sizes for parts that fit.",
            "You want everything free, with no queues or paid tiers.",
            "You print functional parts and want to test them before printing.",
        ],
        "pick_them": [
            "You&rsquo;re introducing young makers to 3D, and block-by-block building feels natural to them.",
            "You want an offline app.",
        ],
        "switch": "Export from 3D Slash as STL and import it into twyk. Then smooth things out by adding shapes, cut it, or add holes and mounts.",
        "faq": [
            ("Is twyk easier than 3D Slash?", "3D Slash's block-building has the gentlest start, which is why it suits young children. twyk is also designed to be easy: drop shapes on a workplane and type the sizes you want."),
            ("Is twyk free?", "Yes, completely, with no plans, payments or download queues. 3D Slash has a free tier, with paid plans from $2 a month for immediate downloads, more colours and the offline app."),
            ("Can I bring a 3D Slash model into twyk?", "Yes. Export it as STL and import it into twyk, up to 64 MB."),
        ],
        "sources": [("3D Slash plans", "https://www.3dslash.net/user_plans.php")],
    },
    {
        "slug": "sketchup", "name": "SketchUp for Web", "maker": "Trimble",
        "title": "twyk vs SketchUp for Web: Better for 3D Printing? (2026 Comparison)",
        "desc": "twyk vs SketchUp for Web compared for 3D printing: SketchUp is built for architecture with push/pull modelling; twyk is built for printable parts, with free solid modelling, STL/3MF export and print checks.",
        "lead": "SketchUp for Web is a great tool for buildings, rooms and furniture layouts: you sketch faces and push or pull them into 3D. twyk is built for things you print. Its models are solid parts sized in millimetres, and Flex and Gaps check a print will work. SketchUp's free plan limits solid tools.",
        "rows": [
            ("Best used for", TWYK["best"], "Architectural, interior and structural projects"),
            ("How you build", TWYK["build"], "Sketch 2D faces and push or pull them into 3D"),
            ("Learning curve", TWYK["curve"], "Medium"),
            ("Cost", TWYK["cost"], "Free plan; paid subscriptions for more"),
            ("Solid modelling (unions, holes)", "Holes, Group and Merge on every shape, free", "Free plan: Outer Shell only; Union, Subtract, Intersect, Trim and Split on paid plans"),
            ("Print checks", TWYK["checks"], "Not built in"),
            ("Export", TWYK["export"], "Free plan: STL; more formats on paid plans"),
            ("Storage", TWYK["account"], "Trimble Connect: 10 GB on the free plan"),
        ],
        "pick_twyk": [
            "You&rsquo;re making parts to print, not buildings to render.",
            "You want full solid modelling (holes and merges) without a subscription.",
            "You want 3MF export with named, coloured parts, and print checks.",
        ],
        "pick_them": [
            "You&rsquo;re modelling buildings, rooms, interiors or furniture layouts.",
            "You need SketchUp&rsquo;s architecture ecosystem and its rendering features.",
        ],
        "switch": "Export from SketchUp for Web as STL and import it into twyk, up to 64 MB. Then cut it and add holes and mounts.",
        "faq": [
            ("Is SketchUp good for 3D printing?", "It can be, but it's built around faces for architecture, and its free plan limits solid tools to Outer Shell. twyk is built for printable solids, with holes and merges, STL and 3MF export, and Flex and Gaps print checks, all free."),
            ("Is twyk free?", "Yes. twyk has no plans, payments or subscriptions."),
            ("Can I import a SketchUp model into twyk?", "Yes. Export it from SketchUp as STL and import it into twyk."),
        ],
        "sources": [("SketchUp for Web features", "https://help.sketchup.com/en/sketchup-web/web-features")],
    },
    {
        "slug": "onshape", "name": "Onshape", "maker": "PTC",
        "title": "twyk vs Onshape: Easy 3D Modelling vs Parametric CAD (2026)",
        "desc": "twyk vs Onshape compared: Onshape is professional parametric CAD with a steep learning curve and public files on its free plan; twyk is easy, free and private, built for printable parts.",
        "lead": "Onshape is professional parametric CAD: you sketch with dimensions and constraints, build up a feature history, and design whole mechanical assemblies. It's powerful, with a learning curve to match, and on the free plan your documents are public and for non-commercial use. twyk is for getting printable parts made quickly: build it from editable shapes, size it to the millimetre, and check it prints. Your models stay private.",
        "rows": [
            ("Best used for", TWYK["best"], "Precise mechanical parts and assemblies"),
            ("How you build", TWYK["build"], "Parametric: sketches with measurements and constraints, plus a feature history"),
            ("Learning curve", TWYK["curve"], "High"),
            ("Cost", TWYK["cost"], "Free for hobbyists (non-commercial); paid plans for professional use"),
            ("Privacy on the free plan", "Your models are private until you share them", "Documents are public"),
            ("Parametric history and constraints", "Shapes keep editable settings, but there is no constraint-driven feature history", "Yes, full parametric history and constraints"),
            ("Assemblies", "Groups of named parts; no mates or motion", "Full assemblies with mates"),
            ("Print checks", TWYK["checks"], "General CAD analysis, not print-specific"),
            ("Export", TWYK["export"], "STEP, STL and many CAD formats"),
        ],
        "pick_twyk": [
            "You want printable parts without learning professional CAD.",
            "You want your models private, for free.",
            "You want quick checks that a flexible or print-in-place part will work.",
        ],
        "pick_them": [
            "You&rsquo;re designing mechanical assemblies that need constraints, mates and a full feature history.",
            "You need STEP output and professional CAD workflows.",
        ],
        "switch": "Export a part from Onshape as STL and import it into twyk, for example to personalise it or add a mount. Onshape remains the better home for the parametric source.",
        "faq": [
            ("Is twyk an Onshape alternative?", "For many 3D printing projects, yes: twyk is easier, free and private, with print checks built in. For mechanical assemblies that need constraints and full parametric history, Onshape is the better tool."),
            ("Are Onshape free files public?", "Yes. Documents created on Onshape's free plan are publicly accessible, and the plan is for non-commercial use. twyk models are private until you choose to share them."),
            ("Is twyk parametric?", "Partly. Every twyk shape keeps its own settings, such as size, radius or number of teeth, which you can change later. twyk doesn't have sketch constraints or a feature history."),
        ],
        "sources": [("Onshape: understand your CAD plan", "https://www.onshape.com/en/blog/understand-your-cad-plan")],
    },
]


def esc_json(s):
    """FAQ text is plain; strip the few HTML entities used for display."""
    return html.unescape(s)


def page(c):
    url = f"https://twyk.me/twyk-vs-{c['slug']}.html"
    others = [o for o in COMPETITORS if o["slug"] != c["slug"]]
    rows = "\n".join(
        f'            <tr>\n              <th scope="row">{r}</th>\n              <td class="col-twyk">{a}</td>\n              <td>{b}</td>\n            </tr>'
        for r, a, b in c["rows"]
    )
    li = lambda xs: "\n".join(f"            <li>{x}</li>" for x in xs)
    faq_html = "\n".join(f"        <details><summary>{q}</summary><p>{a}</p></details>" for q, a in c["faq"])
    faq_ld = json.dumps({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [{"@type": "Question", "name": esc_json(q), "acceptedAnswer": {"@type": "Answer", "text": esc_json(a)}} for q, a in c["faq"]],
    }, ensure_ascii=False)
    crumbs = json.dumps({
        "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://twyk.me/"},
            {"@type": "ListItem", "position": 2, "name": "Compare", "item": "https://twyk.me/compare.html"},
            {"@type": "ListItem", "position": 3, "name": f"twyk vs {c['name']}", "item": url},
        ]}, ensure_ascii=False)
    sources = "\n".join(f'          <li><a href="{u}" rel="noopener">{t}</a></li>' for t, u in c["sources"] + [("twyk help &amp; tutorials", "https://twyk.me/help")])
    more = " &middot; ".join(f'<a href="twyk-vs-{o["slug"]}.html">twyk vs {o["name"]}</a>' for o in others)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <title>{c['title']}</title>
  <meta name="description" content="{c['desc']}" />
  <link rel="canonical" href="{url}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="twyk.me" />
  <meta property="og:title" content="{c['title']}" />
  <meta property="og:description" content="{c['desc']}" />
  <meta property="og:url" content="{url}" />
  <meta name="twitter:card" content="summary" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
  <script type="application/ld+json">{crumbs}</script>
  <script type="application/ld+json">{faq_ld}</script>
</head>
<body>
  <!-- Generated by tools/make_vs_pages.py; edit that file and re-run it, not this page. -->

  <section class="guide-hero">
    <div class="container">
      <p class="vs-crumb"><a href="compare.html">Compare</a> &rsaquo; twyk vs {c['name']}</p>
      <h1>twyk vs {c['name']}</h1>
      <p class="answer-lead">{c['lead']}</p>
    </div>
  </section>

  <section class="section" style="padding-top: 8px;">
    <div class="container" style="max-width: 960px;">

      <h2 class="vs-h2" style="margin-top: 8px;">At a glance</h2>
      <div class="compare-wrap">
        <table class="compare-table vs-pair">
          <thead>
            <tr>
              <th scope="col">&nbsp;</th>
              <th scope="col" class="col-twyk">twyk</th>
              <th scope="col">{c['name']}</th>
            </tr>
          </thead>
          <tbody>
{rows}
          </tbody>
        </table>
      </div>
      <p class="form-note vs-note">Compiled in October 2026 from {c['name']}&rsquo;s own website and help pages, and twyk&rsquo;s help guide (sources below). &ldquo;Not built in&rdquo; means we couldn&rsquo;t find it as a standard feature. {c['name']} is made by {c['maker']}; twyk is not affiliated with it. Spot something out of date? <a href="contact.html">Tell us</a>.</p>

      <div class="vs-cards" style="margin-top: 40px;">
        <div class="fair-card twyk">
          <h2 class="vs-card-h">&#10003; Choose twyk if&hellip;</h2>
          <ul>
{li(c['pick_twyk'])}
          </ul>
        </div>
        <div class="fair-card">
          <h2 class="vs-card-h">Choose {c['name']} if&hellip;</h2>
          <ul>
{li(c['pick_them'])}
          </ul>
        </div>
      </div>

      <h2 class="vs-h2">Moving from {c['name']} to twyk</h2>
      <p class="vs-p">{c['switch']} See <a href="{HELP}import-export">importing and exporting</a>, or <a href="edit-stl-files.html">how to bring in models from any site</a>.</p>

      <h2 class="vs-h2">What twyk adds</h2>
      <ul class="vs-list">
        <li><b>80+ shapes and 48 fonts</b>, each with settings you can change later. <a href="features.html#shaping">See the shapes</a></li>
        <li><b>Exact sizes</b> in millimetres or inches, a ruler for gaps, and X-ray for hidden parts. <a href="features.html#precision">See the precision tools</a></li>
        <li><b>Sculpt, Formula and Bend</b> make organic, mathematical and curved shapes. <a href="features.html#shaping">See the shaping tools</a></li>
        <li><b>Flex and Gaps</b> test flexible parts and print-in-place clearances before you print. <a href="features.html#printing">See the print checks</a></li>
      </ul>

      <div class="faq" style="margin-top: 48px;">
        <h2 style="margin-bottom: 20px;">Frequently asked questions</h2>
{faq_html}
      </div>

      <div class="vs-sources">
        <h2 class="vs-h2">Sources</h2>
        <ul>
{sources}
        </ul>
      </div>

      <p class="vs-more">More comparisons: {more} &middot; <a href="compare.html">all six side by side</a></p>
    </div>
  </section>

  <section class="cta-band">
    <div class="container">
      <h2>Try twyk on something you actually need</h2>
      <p>Free, in your browser. Sign in with Google and start from a shape.</p>
      <div class="hero-cta" style="justify-content:center;">
        <a class="btn btn-primary btn-lg" href="https://twyk.me/login" data-track="cta_login" data-track-source="vs_{c['slug']}">Start making <span class="arrow">&rarr;</span></a>
        <a class="btn btn-ghost btn-lg" href="features.html" style="background:transparent;border-color:rgba(255,255,255,0.35);color:#fff;">See every feature</a>
      </div>
    </div>
  </section>

  <script type="module">
    import {{ renderHeader, renderFooter }} from "./js/app.js";
    import "./js/track.js";
    renderHeader("compare");
    renderFooter();
  </script>
</body>
</html>
"""


for c in COMPETITORS:
    path = os.path.join(OUT, f"twyk-vs-{c['slug']}.html")
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(page(c))
    print("wrote", path)
