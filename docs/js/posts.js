/* twyk.me: blog posts (prototype copy, full-length articles with SEO fields) */

export const POSTS = [
  {
    id: "introducing-twyk-me",
    featured: true,
    e: "&#128640;", cat: "product", label: "Product",
    t: "Introducing twyk.me: publish what you build",
    metaTitle: "Introducing twyk.me: Publish, Share & Remix 3D Models",
    metaDesc: "twyk.me gives every 3D design a live model page, print files, ratings and a remix button that opens it back up in the free browser 3D editor.",
    p: "The editor has always been the easy part. Today every design gets a home: a live 3D page, print files, ratings, and a remix button that opens your model right back up in the editor.",
    date: "Sep 2026", iso: "2026-09-10", read: "7 min read",
    g: ["#2563eb", "#8b5cf6"],
    body: `
      <p>When we built the twyk editor, we had one goal: get you from a blank workplane to a printable part without installing anything, reading a manual, or fighting your tools. That part works. People design phone stands, planters, chess pieces and gear sets in it every day, and if you have never tried it, <a href="how-it-works.html">the step-by-step guide</a> shows the whole workflow in four steps.</p>
      <p>But until now, finishing a design was also the end of its story. You exported an STL, maybe emailed it to a friend, and that was that. The model sat in a folder, frozen. That always felt wrong to us, because the best thing about 3D printing has never been the printing. It's what happens when other people get their hands on your idea.</p>
      <p>So today we're launching twyk.me: a home for everything the editor makes.</p>

      <h2>What publishing gives your model</h2>
      <p>Hit publish in the editor and your design gets a page of its own, with everything a maker needs to decide, download and print:</p>
      <ul>
        <li><b>A live 3D viewer.</b> Anyone can rotate, zoom and inspect the model in the browser before committing a gram of filament. Have a look at the <a href="model.html?id=knight">Chess Knight: Club Edition</a> page to see one in action.</li>
        <li><b>Print files with real expectations.</b> Variants list print time and plate count up front, so "quick keychain" and "weekend project" are distinguishable at a glance.</li>
        <li><b>Ratings and comments.</b> Feedback from people who actually printed the thing, which is the only feedback that improves a design.</li>
        <li><b>A creator profile.</b> Your models, your followers, your stats, all in one place. Browse the <a href="creators.html">creators directory</a> to see how profiles look.</li>
        <li><b>A remix button.</b> The one we care about most, and the reason twyk.me is different.</li>
      </ul>

      <h2>Nothing here is a dead file</h2>
      <p>On most model-sharing sites, downloading a design is where the relationship ends. You get a mesh. If the tolerances are wrong for your printer, or you want your initials on it, or the hook needs to be 5 mm longer, you are on your own with a file that was never meant to be edited.</p>
      <p>On twyk.me, every published model opens back up in the editor, as editable as the day it was made. Groups are still groups, text is still text, dimensions are still <a href="how-it-works.html">typed in millimetres</a>. Resize it, recolour it, cut it in half and bolt your own idea onto the side.</p>
      <p>And when you publish your version, the remix links back to the original automatically. We call this the remix lineage, and you can see a real chain on the <a href="model.html?id=knight">knight's model page</a>: an original Staunton design, a club edition with a weighted base, and a braille edition for blind players, each crediting the one before it. We wrote about why that structure matters in <a href="post.html?id=remix-chains-credit">What remix chains taught us about credit</a>.</p>

      <h2>How it works, start to finish</h2>
      <p>The loop is deliberately short:</p>
      <ul>
        <li><b>Design</b> in the browser editor, from a <a href="how-it-works.html">library of shapes</a> you combine, cut and size exactly.</li>
        <li><b>Publish</b> in one click. No re-uploading files, no separate listing form fighting you for screenshots.</li>
        <li><b>Share</b> the page. Downloads work for everyone; the remix button works for anyone with a browser.</li>
        <li><b>Watch it evolve.</b> Remixes, makes, comments and ratings all flow back to you.</li>
      </ul>
      <p>If you'd rather start from something real than a blank workplane, the <a href="explore.html">explore page</a> already has models across <a href="explore.html?cat=desk">desk gear</a>, <a href="explore.html?cat=home">home</a>, <a href="explore.html?cat=toys">toys and games</a> and <a href="explore.html?cat=engineering">engineering</a>. Every one of them opens in the editor.</p>

      <h2>What's next</h2>
      <p>This launch is the foundation, not the finish line. <a href="challenges.html">Design challenges</a> are coming, with themed prompts and featured winners. Collections, better discovery and richer creator tools are all on the roadmap, and the <a href="blog.html">blog</a> is where we'll announce each one.</p>
      <p>For now: <a href="project-ideas.html">pick a project</a>, design something, hit publish, and see what the community does with it. That second part is the whole point.</p>

      <h2>Key takeaways</h2>
      <ul>
        <li>Every published model gets a live 3D page, print files, ratings and a creator profile, with no separate upload step.</li>
        <li>Models stay fully editable: the remix button opens the original design in the editor, not a frozen mesh.</li>
        <li>Remix lineage credits every contributor in the chain automatically.</li>
      </ul>
      <h2>Frequently asked questions</h2>
      <h3>Is publishing on twyk.me free?</h3>
      <p>Yes. Designing in the editor and publishing models are both free. Your work always exports as standard STL or 3MF files, so nothing is locked in.</p>
      <h3>Do people need an account to see my model?</h3>
      <p>No. Model pages, the 3D viewer and downloads are open to everyone. An account is needed to publish, comment, rate and remix, because those actions carry a name.</p>
      <h3>Can I remove my model after publishing?</h3>
      <p>Yes, you stay in control of your published models. Existing remixes keep their own pages, since they contain their creators' work too, and the lineage keeps crediting you.</p>`,
  },
  {
    id: "3mf-export-colours",
    e: "&#127752;", cat: "product", label: "Product",
    t: "3MF export keeps your colours",
    metaTitle: "3MF vs STL Export: Which 3D Print File Format to Use",
    metaDesc: "3MF keeps separate objects and colours for multi-material printing, while STL is one universal mesh. When to export each format from the twyk editor.",
    p: "Export 3MF and every object keeps its identity and colour, ready for multi-material printing. STL stays one click away.",
    date: "Sep 2026", iso: "2026-09-02", read: "6 min read",
    g: ["#00d4ff", "#2563eb"],
    body: `
      <p>You spent twenty minutes getting the colours right. The tag is amber, the text is navy, the ring is pink. Then you export an STL, open your slicer, and everything you chose is gone: one grey blob, no parts, no names, no colours.</p>
      <p>That's not your slicer's fault, and it isn't a bug. It's a file format doing exactly what it was designed to do in 1987. Understanding the difference between STL and 3MF is one of those ten-minute lessons that pays off on every print for the rest of your life, so let's actually take the ten minutes.</p>

      <h2>STL: one mesh, nothing else</h2>
      <p>STL describes a single surface as a list of triangles. That's the whole format. No objects, no colours, no units, no arrangement, no metadata. For decades that simplicity was its superpower: every slicer, every CAD package and every 3D printing service on earth reads STL, and that is still true today.</p>
      <p>The cost of that simplicity is that everything structural about your design is flattened away. A <a href="model.html?id=keychain">two-part keychain</a> with raised text becomes one welded lump. Which is fine, if you're printing in one colour and never editing the file again.</p>

      <h2>3MF: the design survives the trip</h2>
      <p>3MF is the modern replacement, and when you export it from the twyk editor, the file keeps your design's structure:</p>
      <ul>
        <li><b>Separate objects stay separate.</b> Your slicer sees the tag, the text and the ring as individual parts, not one fused mesh.</li>
        <li><b>Colours come along.</b> Multi-colour and multi-material workflows can map each part straight to a filament, no manual painting.</li>
        <li><b>Arrangement is preserved.</b> Parts arrive positioned the way you positioned them on the workplane.</li>
      </ul>
      <p>If you've ever set up a two-colour print, you know how much manual work this replaces. A model like the <a href="model.html?id=pill-organizer">7-Day Pill Organizer</a>, where each compartment has its own colour, goes from tedious to trivial.</p>

      <h2>Which should you export?</h2>
      <p>A simple rule covers nearly every case:</p>
      <ul>
        <li><b>Choose STL</b> when you're printing in a single colour, uploading to a print service, or sending the model to someone whose software you don't know. Universal beats rich when compatibility is the goal.</li>
        <li><b>Choose 3MF</b> when colour matters, when parts should stay distinct in the slicer, or when you'll keep iterating in a modern toolchain. Rich beats universal when the design is the goal.</li>
      </ul>
      <p>Both live under the same Export button in the editor, and the <a href="how-it-works.html">how it works guide</a> shows exactly where. Pick per project, not per ideology.</p>

      <h2>One more thing worth knowing</h2>
      <p>Neither export locks you in. Models published on twyk.me stay editable here regardless of what you export, because the remix button opens the original design, not the exported mesh. That distinction is the heart of how the platform works, and <a href="post.html?id=introducing-twyk-me">our launch post</a> explains it in full.</p>
      <p>Still deciding what to print first? The <a href="explore.html">explore page</a> lists print files with times and plate counts for every model, and the <a href="help.html">help center</a> covers export questions in more depth.</p>

      <h2>Key takeaways</h2>
      <ul>
        <li>STL is one anonymous mesh: universally compatible, but colours and objects are flattened away.</li>
        <li>3MF keeps separate objects, colours and arrangement, which makes multi-colour printing dramatically simpler.</li>
        <li>Rule of thumb: STL for compatibility and single-colour prints, 3MF for colour and continued editing.</li>
      </ul>
      <h2>Frequently asked questions</h2>
      <h3>Does exporting 3MF change how my model prints?</h3>
      <p>No. Geometry is identical in both formats. 3MF simply carries extra information, like object identity and colour, that STL has no way to store.</p>
      <h3>My slicer is old. Should I worry about 3MF support?</h3>
      <p>Current versions of the major slicers all read 3MF. If yours doesn't, export STL instead; it is one click away in the same Export menu and always will be.</p>
      <h3>Can I re-import an exported file back into the editor?</h3>
      <p>The editor imports STL meshes, which then behave like any other shape. For full editability, though, the published model on twyk.me is the better source: remixing it reopens the original design with groups and text intact.</p>`,
  },
  {
    id: "chess-club-story",
    e: "&#9822;", cat: "story", label: "Maker story",
    t: "The chess club that prints its own set",
    metaTitle: "Maker Story: A Chess Club That 3D Prints Its Own Set",
    metaDesc: "One weighted 3D printed knight became a braille edition and a garden set. A maker story about remix chains and designing models others can build on.",
    p: "How one weighted knight became a braille edition, an oversize garden set, and a lesson in why remix chains matter.",
    date: "Aug 2026", iso: "2026-08-18", read: "7 min read",
    g: ["#8b5cf6", "#e85c8f"],
    body: `
      <p>Adin Aronson didn't set out to make a statement about open design. He set out to stop his chess club's knights from tipping over.</p>
      <p>The club's plastic set was old, mismatched, and light enough that a bumped table meant resetting the board and re-arguing the position. Replacement sets in the club's price range felt worse than the originals. So Adin did what makers do: he opened <a href="how-it-works.html">the editor</a> on a Tuesday night and started stacking shapes.</p>

      <h2>Designing a piece that plays well</h2>
      <p>A chess piece that looks good on a shelf and a chess piece that plays well are different objects. Adin's list of requirements came from years of club nights, not from aesthetics:</p>
      <ul>
        <li><b>A weighted base.</b> The base prints with a recess sized for a 20 mm felt pad, and enough wall thickness to take a steel washer before the pad goes on. Pieces that feel planted change how the game feels.</li>
        <li><b>Support-free printing.</b> The mane and muzzle are angled so the whole piece prints at 0.2 mm with no supports. A club needs sixteen knights, not sixteen cleanup jobs.</li>
        <li><b>Editable structure.</b> The base text block is a separate group, so any club can stamp its initials without touching the sculpt.</li>
      </ul>
      <p>He published the result as <a href="model.html?id=knight">Chess Knight: Club Edition</a>, itself a remix of a classic Staunton profile, and thought that was the end of the story.</p>

      <h2>Then the remixes started</h2>
      <p>Luis Ortega printed a set in PETG for his own club, which includes two blind players. On most platforms, adapting someone's finished model means reverse-engineering a mesh. Here, the model opened straight back up in the editor with every group intact, so Luis added braille markers to the base, published <a href="model.html?id=knight">Knight with Braille Base</a> as a remix, and the lineage panel did the crediting for him.</p>
      <p>He didn't stop there. His <a href="model.html?id=pill-organizer">AM/PM remix of Amara's pill organizer</a> came out of the same instinct: take a working design, adapt it for someone specific, publish the adaptation for the next person.</p>
      <p>After the braille edition came the others. A garden club scaled the pieces up for an outdoor set. Another maker swapped the felt recess for a magnet pocket so the pieces snap to a steel travel board. Each variation links back to Adin's original, and each one taught the next remixer something about the design.</p>

      <h2>What this story is actually about</h2>
      <p>None of those remixers asked permission, and none of them had to. That's the deal on twyk.me: publish an editable model and you're inviting people to build on it, with your name attached at every step of the chain. We designed the platform around that idea, and <a href="post.html?id=remix-chains-credit">wrote up what we've learned from it</a> since launch.</p>
      <p>It's also a story about designing for remixing. Adin's knight travelled because it was built from named groups with sensible parameters, not a single fused blob. If you want your models to have this kind of second life, structure is the gift you give your remixers. The <a href="post.html?id=snap-grid-habits">snap-grid habits post</a> covers the precision side of that same discipline.</p>
      <p>Adin's take, when we asked him about the braille edition: "That's a better model than the one I made. That's the whole point, isn't it?"</p>
      <p><em>Want to start your own chain? <a href="explore.html?cat=toys">Browse toys and games</a>, remix something, or tell us a story worth writing up: <a href="mailto:support@twyk.me">support@twyk.me</a>.</em></p>

      <h2>Key takeaways</h2>
      <ul>
        <li>Functional requirements from real use, like weighted bases and support-free angles, make designs people actually adopt.</li>
        <li>Publishing editable structure, not fused meshes, is what made the braille edition possible in an evening.</li>
        <li>Remix lineage means adaptations credit the original automatically, so sharing structure costs the creator nothing.</li>
      </ul>
      <h2>Frequently asked questions</h2>
      <h3>Do remixers need permission to adapt a published model?</h3>
      <p>No. Publishing on twyk.me invites remixing by design, and the lineage panel keeps every contributor's name attached. That trade is the platform's core deal.</p>
      <h3>How do I make my own models this easy to remix?</h3>
      <p>Keep logical parts as named groups, put likely-to-change dimensions where a remixer can find them, and say in the description what you'd love to see changed. Our <a href="post.html?id=snap-grid-habits">precision habits post</a> covers the dimensional side.</p>
      <h3>Where can I see a remix chain in action?</h3>
      <p>The <a href="model.html?id=knight">Chess Knight's model page</a> shows the full lineage from Staunton original to braille edition, live.</p>`,
  },
  {
    id: "snap-grid-habits",
    e: "&#128207;", cat: "tips", label: "Tips",
    t: "Five snap-grid habits for parts that fit",
    metaTitle: "5 Snap Grid Habits for 3D Printed Parts That Fit",
    metaDesc: "Tolerance gaps, typed dimensions and snap grid discipline: five habits in the twyk 3D editor that make printed parts fit together the first time.",
    p: "Tolerance gaps, even wall counts, and why 0.2 mm is the number you will learn to love. Precision is a habit, not a talent.",
    date: "Aug 2026", iso: "2026-08-05", read: "8 min read",
    g: ["#35c4a8", "#2563eb"],
    body: `
      <p>The difference between a part that snaps together and a part that needs a hammer is usually decided before you draw anything. It isn't talent, and it isn't an expensive printer. It's habits: a handful of small disciplines that precise builders apply without thinking.</p>
      <p>Here are the five that pay off on every functional print, using tools you already have in <a href="how-it-works.html">the editor</a>.</p>

      <h2>1. Set the snap grid before you start</h2>
      <p>The snap grid setting in the editor's bottom bar is the quiet hero of every clean design. Every drag and drop lands on a grid increment, which means every dimension in your model is secretly a multiple of that number.</p>
      <p>Set it deliberately, before the first shape lands: coarse (1 mm) for something forgiving like a <a href="model.html?id=hex-planter">planter</a>, 0.5 mm or finer for anything that mates with another part. Changing the grid halfway through a design is how features end up misaligned by amounts too small to see and too big to ignore.</p>

      <h2>2. Leave a gap where parts meet</h2>
      <p>Two 20.0 mm parts do not slide into each other, because printers are optimists: extruded plastic swells, corners bulge slightly, and a hole always prints a touch smaller than drawn. Interfaces need designed-in clearance.</p>
      <p>Good starting points: about 0.2 mm of total clearance for a snug fit, 0.4 mm for parts that should slide freely. The <a href="model.html?id=phone-stand">Fold-Flat Phone Stand</a> slots together on exactly this principle, and the <a href="model.html?id=gear">Parametric Gear Set</a> exposes bore tolerance as a parameter because every printer's sweet spot is slightly different. Print a small test coupon before committing to the full part; five minutes of test print saves an evening of sanding.</p>

      <h2>3. Type the number, don't drag to it</h2>
      <p>Handles are for exploring. The properties panel is for deciding. When a dimension matters, click the size field and type the number exactly: 44, not the 43.87 a drag happened to land on.</p>
      <p>This matters most at the interfaces, where your part meets another part, a screw, or a shelf. Typed dimensions are also self-documenting: future you, printing revision three, can read the design's intent straight out of the panel.</p>

      <h2>4. Position from zero</h2>
      <p>Put your first shape at a clean position and build everything relative to it. When each feature sits at a number you can reason about, aligning a hole to a post is arithmetic. When features sit wherever dragging left them, it's archaeology.</p>
      <p>The editor's align tools handle the common cases in one click, but they work best on shapes that were placed deliberately to begin with.</p>

      <h2>5. Duplicate instead of redrawing</h2>
      <p>Need the same slot four times? Make one perfect slot, then Duplicate. Every hand-redrawn copy is a fresh chance to be 0.3 mm wrong, and Duplicate never is. The same logic scales up: the <a href="model.html?id=desk-tray">Stacking Desk Tray</a> is one tier group duplicated upward, which is why every tier fits every other tier.</p>

      <h2>The habit behind the habits</h2>
      <p>All five of these reduce to one principle: decide numbers once, on purpose, and let the tools repeat them. That's also what makes a model worth remixing, as the <a href="post.html?id=chess-club-story">chess club story</a> shows: precise, structured designs are the ones other people can build on.</p>
      <p>Ready to practice? The <a href="project-ideas.html">project ideas page</a> marks each build with the tools it teaches, and anything with a "mm sizing" tag is a fit-and-tolerance workout. Questions along the way belong in the <a href="help.html">help center</a>.</p>

      <h2>Key takeaways</h2>
      <ul>
        <li>Set the snap grid deliberately before the first shape lands, and match it to the precision the part needs.</li>
        <li>Design roughly 0.2 mm of clearance into snug interfaces and 0.4 mm into sliding ones, then verify with a small test print.</li>
        <li>Type critical dimensions, position from zero, and duplicate features instead of redrawing them.</li>
      </ul>
      <h2>Frequently asked questions</h2>
      <h3>Why does my hole print smaller than I drew it?</h3>
      <p>Extruded plastic swells slightly as it's laid down, and curves are approximated by segments, both of which shrink openings. That's why designed-in clearance beats printing at nominal size.</p>
      <h3>What snap grid setting should a beginner use?</h3>
      <p>Start at 1 mm for decorative models and 0.5 mm for functional parts. Go finer only when an interface genuinely needs it; a coarser grid keeps dimensions round and intent readable.</p>
      <h3>Do these habits matter for decorative prints?</h3>
      <p>Less, which is exactly why <a href="project-ideas.html">beginner projects</a> start decorative. The habits start paying rent the first time two printed parts have to meet each other.</p>`,
  },
  {
    id: "remix-chains-credit",
    e: "&#128257;", cat: "community", label: "Community",
    t: "What remix chains taught us about credit",
    metaTitle: "Remix Chains & Automatic Credit for 3D Model Creators",
    metaDesc: "When attribution is automatic and visible, 3D model creators share more. How twyk.me's remix lineage changes what gets published and improved.",
    p: "When attribution is automatic, people share more. A look at how lineage changes what creators publish.",
    date: "Jul 2026", iso: "2026-07-22", read: "8 min read",
    g: ["#f5a623", "#e85c8f"],
    body: `
      <p>There's a conversation every model-sharing community has eventually, and it's about credit. Who made this? Who changed it? Did they ask? Should they have? It usually plays out as licence arguments in comment sections, and it helps nobody print anything.</p>
      <p>We made a bet when we designed twyk.me: most of that conflict isn't really about ownership. It's about visibility. Creators, by and large, don't mind their work being built on. They mind it disappearing into someone else's name with no thread back to them.</p>

      <h2>Credit as structure, not courtesy</h2>
      <p>On most platforms, attribution is a social norm: the remixer is supposed to remember to say thanks, link the original, tag the creator. Norms work until they don't, and every failure creates a grievance.</p>
      <p>On twyk.me, credit is structural. Open someone's model in <a href="how-it-works.html">the editor</a>, publish your version, and the lineage panel on your model's page shows the whole chain automatically: the original, your remix, and whatever comes after. Nobody has to remember, so nobody can forget. The <a href="model.html?id=knight">Chess Knight's lineage</a> is a live example: original, club edition, braille edition, each name attached to its own contribution.</p>

      <h2>What changed when credit became guaranteed</h2>
      <p>The pattern we keep seeing is generosity. When being improved on is a visible achievement rather than a quiet loss, creators publish things they used to keep private:</p>
      <ul>
        <li><b>Half-finished ideas</b> published explicitly so someone else can take them further.</li>
        <li><b>Parameter-friendly designs</b> like the <a href="model.html?id=gear">Parametric Gear Set</a>, structured so remixing takes seconds and the remix count climbs into the hundreds.</li>
        <li><b>Deliberate remix bait</b> like the <a href="model.html?id=keychain">Name Tag Keychain</a>, the most remixed model on the platform, which exists almost entirely to be personalised.</li>
      </ul>
      <p>The remixes themselves get bolder, too. A <a href="model.html?id=wobbly-penguin">wobbly penguin</a> becomes a wobbly owl. A keychain becomes a luggage tag becomes a pet tag. Chains where the fifth version is unrecognisable from the first, and every step is still on the record.</p>

      <h2>Designing for the chain</h2>
      <p>Guaranteed credit also changes how the best creators build. If your model might be the start of a chain, structure becomes a feature:</p>
      <ul>
        <li>Keep logical parts as named groups instead of merging everything into one solid.</li>
        <li>Put the likely-to-change dimension (a name, a diameter, a twist angle) somewhere a remixer can find it in one click.</li>
        <li>Say in the description what you'd love to see remixed, the way the <a href="model.html?id=flexi-gecko">Flexi Gecko</a> invites new creatures from the same joint system.</li>
      </ul>
      <p>The <a href="post.html?id=snap-grid-habits">precision habits post</a> covers the dimensional side of remix-friendly design, and the <a href="post.html?id=chess-club-story">chess club story</a> shows what happens when it all works.</p>

      <h2>The lesson</h2>
      <p>If you want a generous community, don't write rules asking people to be generous. Build the system so generosity is safe. Credit that can't be lost turned out to be most of what anyone wanted.</p>
      <p>See it for yourself: any model on the <a href="explore.html">explore page</a> with a remix count has a lineage worth reading, and the <a href="creators.html">creators directory</a> shows whose work travels furthest.</p>

      <h2>Key takeaways</h2>
      <ul>
        <li>Most attribution conflict is about visibility, not ownership, and structural credit removes the conflict.</li>
        <li>Guaranteed lineage makes creators publish more: unfinished ideas, parametric designs and deliberate remix bait all flourish.</li>
        <li>Designing for the chain, with named groups and findable parameters, is how models travel furthest.</li>
      </ul>
      <h2>Frequently asked questions</h2>
      <h3>Can a remixer remove my name from the lineage?</h3>
      <p>No. Lineage is generated by the platform from the actual remix history, not typed by hand, which is precisely what makes it trustworthy.</p>
      <h3>Does a remix of a remix still credit the original?</h3>
      <p>Yes. The chain shows every step, so the original creator stays visible no matter how long the lineage grows.</p>
      <h3>What's the most remixed model on twyk.me?</h3>
      <p>The <a href="model.html?id=keychain">Name Tag Keychain</a>, which was built to be personalised. Its lineage is a nice illustration of how simple starting points travel far.</p>`,
  },
  {
    id: "push-face",
    e: "&#128400;", cat: "product", label: "Product",
    t: "Push face: small tool, big deal",
    metaTitle: "Push Face Tool: Edit One Face of a 3D Model Instantly",
    metaDesc: "Push face moves a single face of a shape in or out without rebuilding it. How the twyk editor tool works and three workflows where it shines.",
    p: "Pull one face of a shape in or out without rebuilding it. The tool that turns a box into a bracket in three drags.",
    date: "Jul 2026", iso: "2026-07-08", read: "6 min read",
    g: ["#2563eb", "#35c4a8"],
    body: `
      <p>Here's a situation every builder knows. The bracket is done, it's beautiful, and the lip needs to be 4 mm taller. In most beginner-friendly editors that means deleting the lip, drawing a new one, re-aligning it, and hoping nothing else moved while you weren't looking.</p>
      <p>Push face exists so you never do that again. It's one button in <a href="how-it-works.html">the editor toolbar</a>, and it quietly changes how you build.</p>

      <h2>What it does</h2>
      <p>Select a shape, choose Push face, and click any flat face. Drag it, or type a distance, and that one face moves in or out while the rest of the shape stays exactly where it was. The box gets taller from the top only. The slot gets deeper from one wall only. Nothing else shifts.</p>
      <p>That's the entire tool. The reason it matters is the difference between it and Resize.</p>

      <h2>Push face vs Resize</h2>
      <p>Resize scales a shape around its centre: both ends move, and anything aligned to either end is now misaligned. Push face grows the shape in one direction, from one face, which is almost always what you actually meant.</p>
      <p>"Make the wall plate 5 mm taller, upward, without moving the screw holes" is a Push face sentence. The <a href="model.html?id=wall-hook">Herringbone Wall Hook</a> was tuned exactly this way: the plate grew toward the ceiling while the mounting holes stayed put at their measured spacing.</p>

      <h2>Three places it shines</h2>
      <ul>
        <li><b>Fit adjustments after a test print.</b> The pocket is shallow by half a millimetre: push the floor down 0.5, reprint, done. Combined with the <a href="post.html?id=snap-grid-habits">tolerance habits</a>, this is the fastest revision loop in the workflow.</li>
        <li><b>Asymmetric tweaks.</b> Phone stands, brackets, cradles: anything where one side answers to the object it holds and the other side answers to the desk. The <a href="model.html?id=phone-stand">Fold-Flat Phone Stand</a> pattern relies on it.</li>
        <li><b>Sketching in 3D.</b> Rough out a blocky form fast, then push faces around until the proportions feel right. It's closer to sculpting than drafting, and it's the most fun way to use the editor.</li>
      </ul>

      <h2>A workflow to steal</h2>
      <p>Block the design out with library shapes, sized loosely. Get the layout right with Align and Duplicate. Then switch to Push face and walk around the model, pulling each face to its final typed dimension. You end up with exact numbers everywhere without ever having drawn carefully, which is the best of both temperaments.</p>
      <p>Want a guided reason to try it? Two builds on the <a href="project-ideas.html">project ideas page</a> are tagged with Push face, and the wall hook is the classic. When you publish the result, the <a href="post.html?id=introducing-twyk-me">whole community can take it from there</a>.</p>

      <h2>Key takeaways</h2>
      <ul>
        <li>Push face moves one face of a shape by a dragged or typed distance while everything else stays put.</li>
        <li>Unlike Resize, it grows a shape in a single direction, which preserves alignments on the other side.</li>
        <li>Block out fast with rough shapes, then walk the model with Push face to land every face on an exact number.</li>
      </ul>
      <h2>Frequently asked questions</h2>
      <h3>Does Push face work on any shape?</h3>
      <p>It works on flat faces, which covers boxes, wedges, extruded profiles and the flat ends of cylinders. Fully curved surfaces are shaped with Resize and the shape's own parameters instead.</p>
      <h3>Can I type an exact distance instead of dragging?</h3>
      <p>Yes, and for functional parts you should: drag to explore, type to decide, the same discipline as the <a href="post.html?id=snap-grid-habits">snap-grid habits</a>.</p>
      <h3>Where should I try it first?</h3>
      <p>The wall hook build on the <a href="project-ideas.html">project ideas page</a> is the classic Push face workout: grow the plate, tune the curve, keep the screw holes fixed.</p>`,
  },
  {
    id: "vase-mode-water",
    e: "&#127799;", cat: "tips", label: "Tips",
    t: "Vase mode designs that hold water",
    metaTitle: "Vase Mode 3D Printing: Design Vases That Hold Water",
    metaDesc: "What makes a 3D model spiral-printable and watertight: profile design, overhang rules, wall thickness and filament choice for vase mode prints.",
    p: "One continuous wall, zero infill, forty minutes. What makes a profile spiral-printable, and what makes it leak.",
    date: "Jun 2026", iso: "2026-06-15", read: "7 min read",
    g: ["#e85c8f", "#f5a623"],
    body: `
      <p>Vase mode is the best magic trick in 3D printing. The slicer prints your model as one continuous spiralling wall: no seams, no infill, no retractions, and a print time that makes everything else feel slow. A full-size vase in well under an hour, with a surface finish straight off the bed that layer-by-layer printing can't match.</p>
      <p>The catch is that not every model survives the trick, and a vase that weeps water onto a windowsill is a sad object. Both problems are solved at design time, in <a href="how-it-works.html">the editor</a>, before the slicer ever sees the file.</p>

      <h2>Design for one wall</h2>
      <p>Vase mode can only print what a single travelling wall can describe. In practice that means one closed outline all the way up: no handles, no holes through the side, no internal structure, no overhanging ledges. If you could throw the shape on a pottery wheel, it will probably spiral-print.</p>
      <p>In the editor, that maps to lathe-like thinking: design the silhouette, let the roundness come free. <a href="model.html?id=spiral-vase">Sofia's Twisted Spiral Vase</a> is the canonical example, and her <a href="model.html?id=pen-pot">Fluted Pen Pot</a> shows the same discipline applied to desk gear: drop the inner wall group and it's vase-mode ready.</p>

      <h2>Respect the overhang</h2>
      <p>Every layer of the spiral sits on the layer below it. Gentle flares and bulges are fine while the wall angle stays polite, roughly 45 degrees or shallower. A shelf that juts out sharply gives the wall nothing to stand on, and the print fails in a way that is at least entertaining to watch.</p>
      <p>The fix is always the same: soften horizontal jumps into curves. If your silhouette has a hard step, round it. The twist in a spiral design helps here too, spreading each layer's change across the whole circumference.</p>

      <h2>Now, the water part</h2>
      <p>A vase that looks right and a vase that holds water are separated by three decisions:</p>
      <ul>
        <li><b>Wall thickness.</b> A single extrusion wall is thin. Print with a wider line width for a thicker, stronger wall, and consider a larger nozzle for vases that will actually work for a living.</li>
        <li><b>The base.</b> Most leaks are floor leaks. Give the design a genuinely flat, solid bottom and set several bottom layers in the slicer, so the floor is watertight before the spiral begins.</li>
        <li><b>Filament.</b> PETG's layer bonding makes it a much better water-holder than PLA. For precious flowers and zero risk, a glass or plastic insert inside the printed vase ends the debate permanently.</li>
      </ul>

      <h2>Design once, remix forever</h2>
      <p>The best part of profile-driven design is how remixable it is. Sofia's vase exposes the twist angle as a single parameter, so <a href="post.html?id=remix-chains-credit">the remix chain</a> around it is full of variations that took their creators about ten seconds each: taller, tighter, straighter, a pen cup, a lamp shade.</p>
      <p>Start from hers on the <a href="model.html?id=spiral-vase">model page</a>, or design your own from scratch with the <a href="project-ideas.html">planter project</a> as a warm-up. Either way, publish it: somewhere out there is a windowsill waiting.</p>

      <h2>Key takeaways</h2>
      <ul>
        <li>Vase mode prints one continuous wall, so the design must be a single closed outline with no side holes or ledges.</li>
        <li>Keep silhouette changes gradual; soften any hard horizontal step into a curve.</li>
        <li>Watertightness comes from a wider printed wall, a solid multi-layer base, and PETG or an insert for real duty.</li>
      </ul>
      <h2>Frequently asked questions</h2>
      <h3>Why is vase mode so much faster than normal printing?</h3>
      <p>The nozzle never stops or retracts: it travels one continuous spiral from bed to rim. No infill, no seams, no travel moves, so nearly all print time is productive extrusion.</p>
      <h3>Can any model be printed in vase mode?</h3>
      <p>No. The slicer will accept anything, but only single-outline shapes print correctly. Handles, side holes and internal walls all break the single-wall assumption at design time.</p>
      <h3>Is PLA fine for a vase with dried flowers?</h3>
      <p>Yes. Dried arrangements need no water, so material barely matters. For live flowers, print PETG with a wider wall or drop a glass insert inside and stop thinking about it.</p>`,
  },
];

export function postById(id) {
  return POSTS.find(p => p.id === id) || POSTS[0];
}
