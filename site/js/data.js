/* twyk.me: mock data for the prototype */

export const USERS = {
  adin:   { id: "adin",   name: "Adin Aronson",  color: "#2563eb", bio: "Building twyk.me. Designs pragmatic desk gear and the occasional chess set.", followers: 1240, models: 4 },
  maya:   { id: "maya",   name: "Maya Chen",     color: "#00b8e0", bio: "Product designer who prints everything twice.", followers: 862, models: 3 },
  luis:   { id: "luis",   name: "Luis Ortega",   color: "#ff5996", bio: "Functional prints only. If it doesn't fix something, I don't print it.", followers: 2210, models: 3 },
  sofia:  { id: "sofia",  name: "Sofia Berg",    color: "#f5a623", bio: "Vases, planters and anything that spirals.", followers: 540, models: 2 },
  kenji:  { id: "kenji",  name: "Kenji Watanabe", color: "#58b368", bio: "Toys that move straight off the print bed. Print-in-place or bust.", followers: 1875, models: 2 },
  amara:  { id: "amara",  name: "Amara Okafor",  color: "#0891b2", bio: "Prints that quietly organise your life. Function first, always.", followers: 990, models: 3 },
};

export const MODELS = [
  {
    id: "knight",
    name: "Chess Knight: Club Edition",
    author: "adin",
    kind: "knight",
    likes: 482, downloads: 3120, remixes: 37, comments: 24,
    tags: ["chess", "games", "desk"],
    gradient: ["#8b5cf6", "#2563eb"],
    featured: true,
    category: "toys",
    posted: "2 weeks ago",
    description:
      "A weighted-base chess knight designed for club play. Prints support-free at 0.2mm. The base has a recess for a 20mm felt pad. Remix it to add your club's initials to the base. The text block is a separate group in the editor.",
    lineage: [
      { name: "Classic Staunton Knight", who: "maya", rel: "original" },
      { name: "Chess Knight: Club Edition", who: "adin", rel: "current" },
      { name: "Knight with Braille Base", who: "luis", rel: "remix" },
    ],
    commentsList: [
      { who: "luis", when: "3 days ago", text: "Printed a full set of 4 in PETG. The felt-pad recess is a great touch. Remixed it with braille markers for our blind chess club." },
      { who: "sofia", when: "1 week ago", text: "The mane detail comes out clean even at 0.28. Nice work." },
    ],
  },
  {
    id: "spiral-vase",
    name: "Twisted Spiral Vase",
    author: "sofia",
    kind: "vase",
    likes: 918, downloads: 5480, remixes: 61, comments: 41,
    tags: ["vase", "home", "spiral-mode"],
    gradient: ["#00d4ff", "#2563eb"],
    featured: true,
    category: "home",
    posted: "1 month ago",
    description:
      "Designed for vase mode: one continuous wall, zero infill, 40 minutes of print time. The twist angle is a single parameter in the editor, so remixing your own variation takes about ten seconds.",
    lineage: [
      { name: "Twisted Spiral Vase", who: "sofia", rel: "current" },
      { name: "Twisted Vase (Tall)", who: "maya", rel: "remix" },
      { name: "Spiral Pen Cup", who: "adin", rel: "remix" },
    ],
    commentsList: [
      { who: "maya", when: "2 days ago", text: "Made a taller remix for dried flowers, linked it above. Prints beautifully in silk PLA." },
    ],
  },
  {
    id: "gear",
    name: "Parametric Gear Set",
    author: "luis",
    kind: "gear",
    likes: 655, downloads: 7204, remixes: 112, comments: 58,
    tags: ["mechanical", "parametric", "engineering"],
    gradient: ["#ffcb57", "#ff5996"],
    featured: true,
    category: "engineering",
    posted: "3 months ago",
    description:
      "Involute gears with adjustable tooth count, module and bore. The most-remixed mechanical model on twyk. Open it in the editor, set your numbers, export. Meshes correctly with any other gear from the same set.",
    lineage: [
      { name: "Parametric Gear Set", who: "luis", rel: "current" },
      { name: "Gear Fidget Toy", who: "adin", rel: "remix" },
      { name: "Clock Escapement Kit", who: "maya", rel: "remix" },
    ],
    commentsList: [
      { who: "adin", when: "5 days ago", text: "Used these for a marble machine build. Zero backlash issues at 0.15mm." },
      { who: "sofia", when: "2 weeks ago", text: "The bore tolerance parameter saved me so much test-printing." },
    ],
  },
  {
    id: "phone-stand",
    name: "Fold-Flat Phone Stand",
    author: "maya",
    kind: "stand",
    likes: 1204, downloads: 9861, remixes: 44, comments: 73,
    tags: ["desk", "phone", "functional"],
    gradient: ["#2563eb", "#00d4ff"],
    featured: false,
    category: "desk",
    posted: "2 months ago",
    description:
      "Two-piece stand that slots together and packs flat in a laptop sleeve. Holds phones and small tablets at 60°. No supports, no hardware, prints in under an hour.",
    lineage: [
      { name: "Fold-Flat Phone Stand", who: "maya", rel: "current" },
      { name: "Fold-Flat Stand (Tablet XL)", who: "luis", rel: "remix" },
    ],
    commentsList: [
      { who: "luis", when: "1 day ago", text: "Scaled up 140% for an iPad. Works great, remix linked." },
    ],
  },
  {
    id: "hex-planter",
    name: "Hex Succulent Planter",
    author: "sofia",
    kind: "planter",
    likes: 733, downloads: 4102, remixes: 28, comments: 19,
    tags: ["home", "garden", "planter"],
    gradient: ["#2dd4bf", "#2563eb"],
    featured: false,
    category: "home",
    posted: "3 weeks ago",
    description:
      "Hexagonal planter with an integrated drainage tray. The wall pattern is a repeated group in the editor, so you can swap the texture without touching the shell.",
    lineage: [{ name: "Hex Succulent Planter", who: "sofia", rel: "current" }],
    commentsList: [
      { who: "adin", when: "4 days ago", text: "Printed three in matte white for my desk. The drainage tray fit is perfect." },
    ],
  },
  {
    id: "d20",
    name: "Sharp-Edge D20",
    author: "adin",
    kind: "d20",
    likes: 891, downloads: 6337, remixes: 53, comments: 47,
    tags: ["games", "dice", "tabletop"],
    gradient: ["#ff5996", "#8b5cf6"],
    featured: false,
    category: "toys",
    posted: "1 month ago",
    description:
      "A balanced sharp-edge d20 with inset numerals. The numeral font is editable in the editor. Remix it with runes, your group's initials, or braille pips.",
    lineage: [
      { name: "Sharp-Edge D20", who: "adin", rel: "current" },
      { name: "D20 (Elvish Numerals)", who: "sofia", rel: "remix" },
    ],
    commentsList: [
      { who: "maya", when: "6 days ago", text: "Rolled 500 test rolls, chi-squared says it's fair. Great model." },
    ],
  },
  {
    id: "cable-clip",
    name: "Snap Cable Clip (5-Pack)",
    author: "luis",
    kind: "clip",
    likes: 512, downloads: 8890, remixes: 21, comments: 33,
    tags: ["desk", "organization", "functional"],
    gradient: ["#00b8e0", "#2dd4bf"],
    featured: false,
    category: "desk",
    posted: "2 months ago",
    description:
      "Adhesive-backed cable clips in five sizes, from USB-C to a 13A power lead. Flexible snap fit tuned for PETG. The plate comes pre-arranged for a 180×180 bed.",
    lineage: [{ name: "Snap Cable Clip (5-Pack)", who: "luis", rel: "current" }],
    commentsList: [
      { who: "sofia", when: "1 week ago", text: "These hold my entire desk together at this point." },
    ],
  },
  {
    id: "keychain",
    name: "Name Tag Keychain",
    author: "maya",
    kind: "keychain",
    likes: 388, downloads: 5511, remixes: 203, comments: 61,
    tags: ["gifts", "custom", "beginner"],
    gradient: ["#f5a623", "#ff5996"],
    featured: false,
    category: "gifts",
    posted: "4 months ago",
    description:
      "The most-remixed model on twyk. Open it, type a name, print a gift. Two-color friendly: the text sits exactly one layer proud of the tag for a clean filament swap.",
    lineage: [
      { name: "Name Tag Keychain", who: "maya", rel: "current" },
      { name: "Pet Tag Variant", who: "adin", rel: "remix" },
      { name: "Luggage Tag XL", who: "luis", rel: "remix" },
    ],
    commentsList: [
      { who: "adin", when: "2 days ago", text: "Made 30 of these for a school workshop. Kids remixed their own in minutes. Exactly what twyk is for." },
    ],
  },
  {
    id: "torus-knot",
    name: "Torus Knot Sculpture",
    author: "adin",
    kind: "torusknot",
    likes: 267, downloads: 1420, remixes: 9, comments: 12,
    tags: ["art", "sculpture", "math"],
    gradient: ["#8b5cf6", "#00d4ff"],
    featured: false,
    category: "art",
    posted: "1 week ago",
    description:
      "A (2,3) torus knot desk sculpture. Prints with tree supports in about three hours. A study piece for twyk's new smooth-mesh primitives.",
    lineage: [{ name: "Torus Knot Sculpture", who: "adin", rel: "current" }],
    commentsList: [],
  },
  {
    id: "wall-hook",
    name: "Herringbone Wall Hook",
    author: "luis",
    kind: "hook",
    likes: 445, downloads: 3980, remixes: 17, comments: 22,
    tags: ["home", "organization", "functional"],
    gradient: ["#2563eb", "#2dd4bf"],
    featured: false,
    category: "home",
    posted: "6 weeks ago",
    description:
      "Rated to 5kg when printed in PETG with 5 walls. Mounts with two screws or high-bond tape. The hook curve is a single editable spline in the editor.",
    lineage: [{ name: "Herringbone Wall Hook", who: "luis", rel: "current" }],
    commentsList: [
      { who: "maya", when: "3 weeks ago", text: "Holding my winter coat since January. No sag." },
    ],
  },
  {
    id: "pen-pot",
    name: "Fluted Pen Pot",
    author: "maya",
    kind: "penpot",
    likes: 329, downloads: 2760, remixes: 14, comments: 9,
    tags: ["desk", "home", "organization"],
    gradient: ["#2dd4bf", "#ffcb57"],
    featured: false,
    category: "desk",
    posted: "5 days ago",
    description:
      "A fluted cylinder pot with a weighted-feel double wall. Pairs with the Hex Planter as a desk set. Vase-mode compatible if you drop the inner wall group.",
    lineage: [{ name: "Fluted Pen Pot", who: "maya", rel: "current" }],
    commentsList: [],
  },
  {
    id: "desk-tray",
    name: "Stacking Desk Tray",
    author: "adin",
    kind: "tray",
    likes: 198, downloads: 1105, remixes: 6, comments: 5,
    tags: ["desk", "organization"],
    gradient: ["#ff5996", "#ffcb57"],
    featured: false,
    category: "desk",
    posted: "2 days ago",
    description:
      "Modular trays that stack on corner posts. Each tier is a copy of one group in the editor: duplicate the group, get another tier. Designed to demo twyk's new group-instancing feature.",
    lineage: [{ name: "Stacking Desk Tray", who: "adin", rel: "current" }],
    commentsList: [],
  },
  {
    id: "flexi-gecko",
    name: "Flexi Gecko Keychain",
    author: "kenji",
    kind: "flexi",
    likes: 1420, downloads: 11250, remixes: 87, comments: 64,
    tags: ["toys", "flexi", "print-in-place", "keychain"],
    gradient: ["#58b368", "#35c4a8"],
    featured: true,
    category: "toys",
    posted: "1 week ago",
    description:
      "An articulated gecko that wiggles straight off the print bed. Every joint is print-in-place with tested clearances, and the tail ring makes it a keychain. The segment count and joint gap are editable in the editor, so remix it longer, chunkier, or into a different creature entirely.",
    lineage: [
      { name: "Flexi Gecko Keychain", who: "kenji", rel: "current" },
      { name: "Flexi Gecko XL (desk pet)", who: "adin", rel: "remix" },
    ],
    commentsList: [
      { who: "maya", when: "2 days ago", text: "Printed five in a school workshop. The joints freed up first try on every single one." },
      { who: "adin", when: "4 days ago", text: "Scaled it up 200% as a desk toy, remix linked. The joint gap parameter made that painless." },
    ],
  },
  {
    id: "wobbly-penguin",
    name: "Wobbly Penguin",
    author: "kenji",
    kind: "penguin",
    likes: 960, downloads: 7830, remixes: 41, comments: 38,
    tags: ["toys", "kids", "no-supports"],
    gradient: ["#2563eb", "#00d4ff"],
    featured: false,
    category: "toys",
    posted: "3 weeks ago",
    description:
      "A roly-poly penguin that wobbles, tips, and always comes back upright. The trick is a weighted hemisphere base: print the body hollow, drop a coin in the base pocket before the layers close it, and physics does the rest. Single colour friendly.",
    lineage: [
      { name: "Wobbly Penguin", who: "kenji", rel: "current" },
      { name: "Wobbly Owl", who: "sofia", rel: "remix" },
    ],
    commentsList: [
      { who: "sofia", when: "1 week ago", text: "Remixed it into an owl for my niece. The base geometry is doing all the work, so it stayed perfectly wobbly." },
    ],
  },
  {
    id: "pill-organizer",
    name: "7-Day Pill Organizer",
    author: "amara",
    kind: "pillbox",
    likes: 705, downloads: 9140, remixes: 19, comments: 42,
    tags: ["home", "organization", "functional", "accessibility"],
    gradient: ["#35c4a8", "#2563eb"],
    featured: false,
    category: "home",
    posted: "1 month ago",
    description:
      "Seven snap-lid compartments, one for each day, with a colour per day for at-a-glance checking. Lids are print-in-place hinges with a positive click. Remix ideas: larger AM/PM version, braille day markers, or travel-size with five compartments.",
    lineage: [
      { name: "7-Day Pill Organizer", who: "amara", rel: "current" },
      { name: "Pill Organizer AM/PM", who: "luis", rel: "remix" },
    ],
    commentsList: [
      { who: "luis", when: "5 days ago", text: "Made the AM/PM double-decker remix for my dad. The hinge design survives daily use, months in now." },
    ],
  },
  {
    id: "slim-wallet",
    name: "Slim Card Wallet",
    author: "maya",
    kind: "wallet",
    likes: 830, downloads: 6420, remixes: 33, comments: 27,
    tags: ["gifts", "everyday-carry", "functional"],
    gradient: ["#2563eb", "#8b5cf6"],
    featured: false,
    category: "gifts",
    posted: "2 weeks ago",
    description:
      "Holds up to six cards with a thumb slot for fanning them out. The shell prints in one piece with no supports; a spring-fit insert keeps cards snug whether you carry two or six. Emboss initials on the front face with the Text tool for a five-minute personalised gift.",
    lineage: [
      { name: "Slim Card Wallet", who: "maya", rel: "current" },
    ],
    commentsList: [
      { who: "adin", when: "3 days ago", text: "PETG with 30% infill feels indestructible. Added initials for three gift versions, exactly as advertised." },
    ],
  },
  {
    id: "page-holder",
    name: "Thumb Page Holder",
    author: "amara",
    kind: "pageholder",
    likes: 512, downloads: 8360, remixes: 15, comments: 21,
    tags: ["home", "reading", "gifts"],
    gradient: ["#e85c8f", "#f5a623"],
    featured: false,
    category: "home",
    posted: "6 weeks ago",
    description:
      "A thumb ring with two wings that hold a paperback open one-handed. Three ring sizes are included as print files; the ring diameter is a single parameter in the editor if you need a fourth. Prints flat, no supports, about twenty minutes.",
    lineage: [
      { name: "Thumb Page Holder", who: "amara", rel: "current" },
    ],
    commentsList: [
      { who: "sofia", when: "2 weeks ago", text: "Twenty-minute print, instant gift for every reader I know. Printed six." },
    ],
  },
  {
    id: "hat-rack",
    name: "Wall Hat Rack Rail",
    author: "amara",
    kind: "hatrack",
    likes: 448, downloads: 5210, remixes: 12, comments: 16,
    tags: ["home", "organization", "wall-mount"],
    gradient: ["#5a7fe8", "#35c4a8"],
    featured: false,
    category: "home",
    posted: "1 month ago",
    description:
      "A vertical rail with three low-profile hooks sized for caps, beanies and headphones. Mounts with two screws or adhesive strips. The rail is one editor group: duplicate it to extend the rack, or change the hook spacing for bulkier hats.",
    lineage: [
      { name: "Wall Hat Rack Rail", who: "amara", rel: "current" },
      { name: "Hat Rack, 5-Hook Tall", who: "luis", rel: "remix" },
    ],
    commentsList: [
      { who: "maya", when: "1 week ago", text: "Two rails side by side handle my whole cap collection. Clean look, holds weight fine in PETG." },
    ],
  },
];

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "desk", label: "Desk" },
  { id: "home", label: "Home" },
  { id: "toys", label: "Toys & Games" },
  { id: "engineering", label: "Engineering" },
  { id: "gifts", label: "Gifts" },
  { id: "art", label: "Art" },
];

export function fmt(n) {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
}

/* deterministic mock ratings + print-file variants (until the real backend exists) */
export function ratingOf(m) {
  return Math.min(5, 4.2 + (m.likes % 8) / 10);
}
export function ratingCountOf(m) {
  return m.comments * 9 + m.remixes * 2 + 14;
}
export function printFilesOf(m) {
  const base = m.name.split(/[:(]/)[0].trim();
  const t = 14 + (m.likes % 27); // base minutes
  const r = ratingOf(m), c = ratingCountOf(m);
  const files = [
    { name: `${base} x1`, time: `${t} min`, plates: 1, rating: r, count: c },
    { name: `${base} x4 (full plate)`, time: `${Math.floor((t * 3.6) / 60)} h ${Math.round(t * 3.6) % 60} min`, plates: 1, rating: Math.max(4, r - 0.2), count: Math.max(6, Math.round(c / 3)) },
    { name: `${base} (light, faster print)`, time: `${Math.max(8, t - 6)} min`, plates: 1, rating: Math.max(4, r - 0.4), count: Math.max(4, Math.round(c / 6)) },
  ];
  if (m.remixes > 40) {
    files.push({ name: `${base} (multi-colour, 2 plates)`, time: `${Math.floor((t * 2.4) / 60)} h ${Math.round(t * 2.4) % 60} min`, plates: 2, rating: Math.max(4, r - 0.1), count: Math.max(5, Math.round(c / 4)) });
  }
  return files;
}
