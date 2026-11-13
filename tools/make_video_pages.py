"""Generate the project-ideas page and one SEO landing page per twyk YouTube video.

Run from the repo root:  python tools/make_video_pages.py docs

The first six videos (tour, tutorials 1-4, Cut and Align) are written by hand in VIDEOS below. Every
later video is read from tools/videos.json, which tools/fetch_channel_videos.py fills in from the
channel, and its page is built from the YouTube description (intro, Sizes, Print settings, CHAPTERS).
This also rewrites the generated blocks in index.html, sitemap.xml and llms.txt (videos:start/end).

Source of truth for every video is https://www.youtube.com/@twykme (titles, chapters, lengths).
Facts about twyk come from the live help guide at https://twyk.me/help.
Thumbnails are local copies in docs/img/videos/<slug>.jpg, so no request goes to Google
until a visitor presses play.
"""
import html, json, os, re, sys
from datetime import datetime

OUT = sys.argv[1]
SITE = "https://twyk.me"
HELP = "https://twyk.me/help#/"
LOGIN = "https://twyk.me/login"
CHANNEL = "https://www.youtube.com/@twykme"

VIDEOS = [
    {
        "id": "pJS1EKMg1CU", "slug": "free-3d-modelling-for-3d-printing", "kind": "Full tour",
        "level": "beginner", "seconds": 308, "uploaded": "2026-10-26T11:13:39+00:00",
        "card": "Free 3D modelling for 3D printing: the full tour",
        "title": "Free 3D Modelling for 3D Printing in Your Browser: Full Tour",
        "h1": "Free 3D modelling for 3D printing, right in your browser",
        "desc": "Watch a 5-minute tour of twyk, a free browser 3D modeller for 3D printing: shapes, text, formulas, tiles, flex tests, AI and 3MF export. No install.",
        "lead": "twyk is a free 3D modelling tool that runs in your browser and is made for 3D printing. There is nothing to install: sign in with Google and start building. This five-minute tour builds real, printable parts and shows the whole toolbox, from dropping shapes and cutting holes to testing a flexible ring and exporting a 3MF with plates for your slicer.",
        "summary": "A five-minute tour of everything twyk can do, built from real printable parts.",
        "builds": ["A mounting plate with bolt holes", "A flexi ring, flex-tested in PLA", "A vent cover from honeycomb tiles", "A lighthouse built with code"],
        "uses": ["Shapes", "Text", "Formula", "Tiles", "Flex", "AI twyk"],
        "chapters": [
            (0, "Intro", None),
            (19, "Shapes, holes and Merge", "Drop shapes onto the plate, cut holes through them and Merge the result into one solid. The tour builds a mounting plate with bolt holes in under a minute."),
            (60, "Text and fonts", "Add text in 48 fonts, with Hebrew and English together the right way round, so a name tag or sign takes seconds."),
            (82, "Formula shapes", "Springs, knots, seashells and gyroid lattices come straight from maths, with settings you can change later."),
            (107, "Tiles", "Infill-pattern panels such as honeycomb, turned here into a vent cover."),
            (126, "Repeat and Flex test", "Repeat a shape in a ring to make a flexi ring, then run the flex test to see whether it bends or snaps in PLA before you spend filament."),
            (155, "Hollow, Lip, Cut and X-ray", "The tools that exist because a model has to print: hollow a shape out, roll a rim, cut a model in two and see inside it with X-ray."),
            (181, "Sculpt and Bend", "Melt shapes together like clay with Sculpt, or twist, bend and taper a shape with Bend."),
            (199, "AI twyk", "Describe what you want and AI twyk builds it with the same tools you use, so you can edit or undo every step. In the video its building is sped up 8x and 12x."),
            (239, "Build with code", "Detailed models, like a lighthouse, are written as one program and checked before they are handed over."),
            (267, "Plates and export", "Arrange parts on plates and export a 3MF ready for Bambu Studio, or an STL for any slicer."),
            (285, "Community", "Share a model, or make your own private copy of one someone else shared and change it."),
        ],
        "learn": ["What twyk is and who it is for", "Shapes, holes and Merge in under a minute", "48 fonts, formula shapes and honeycomb tiles", "How to test a flexible part before printing", "Hollow, Lip, Cut, X-ray, Sculpt and Bend", "Plates and 3MF export for Bambu Studio"],
        "help": [("Your first model", "t-first-model"), ("Shapes you can add", "adding-shapes"), ("Importing and exporting", "import-export"), ("The community", "community")],
        "faq": [
            ("Is twyk really free?", "Yes. twyk has no plans, payments or subscriptions. You sign in with a Google account and your models save to it as you go."),
            ("Do I need to install anything?", "No. twyk runs in your web browser, so there is nothing to download or install."),
            ("What can I export to my slicer?", "twyk exports 3MF, with separate, named, coloured parts and plates, or STL for any slicer. Sizes are always in millimetres."),
            ("Where should a complete beginner start?", "Start with the desk caddy tutorial, the first in the twyk video series. It builds a real model step by step and covers the editor properly."),
        ],
    },
    {
        "id": "TmjwEZV512k", "slug": "3d-print-desk-caddy", "kind": "Tutorial 1",
        "level": "beginner", "seconds": 392, "uploaded": "2026-10-26T13:18:58+00:00",
        "card": "Getting started: build a desk caddy from scratch",
        "title": "How to Design a 3D-Printable Desk Caddy: Beginner Tutorial",
        "h1": "Design a 3D-printable desk caddy from scratch",
        "desc": "Beginner 3D modelling tutorial: build a desk caddy with a hexagonal pen cup, phone stand and card slot in your browser, then export for 3D printing. Free.",
        "lead": "Your first real model in twyk: a desk caddy with a hexagonal pen cup, a phone stand with a cable hole and a slot for cards, ready to print. Along the way this tutorial teaches the editor properly, from moving the view to sizing things exactly and exporting for your slicer.",
        "summary": "Build a desk caddy with a hexagonal pen cup, phone stand and card slot, and learn the editor as you go.",
        "builds": ["A hexagonal pen cup", "A phone stand with a cable hole", "A slot for cards"],
        "uses": ["Shapes", "Holes", "Align", "Group & Merge"],
        "chapters": [
            (0, "What we will build", None),
            (24, "The editor", "Find your way round: the shape library on the left, the plate in the middle and the properties panel on the right, where every setting of the selected shape lives."),
            (64, "Moving the view", "Move around the model so you can check every side before you commit to a change."),
            (90, "Plate and snap grid", "The plate is your print bed and the snap grid keeps everything lined up. Snapping runs from 0.1 mm to 10 mm, so you can work coarse or fine."),
            (113, "The first shape", "Drop the first shape onto the plate. Every shape you add keeps settings you can change later."),
            (144, "Moving, resizing, turning", "Drag, nudge and use the Move, Rotate and Resize switches, or type exact sizes in the properties panel. Naming parts keeps a bigger model easy to follow."),
            (190, "Sides and bevel", "Change the number of sides on a round shape to get the hexagon for the pen cup, and add a bevel to soften the edges."),
            (214, "Duplicate and Align", "Copy a shape, then use Align to line copies up exactly, instead of nudging by eye."),
            (256, "Holes, Group and Merge", "Switch a shape to a hole to cut the cable gap and the card slot. Group keeps parts together; Merge fuses them into one solid."),
            (309, "The ruler", "Measure sizes, gaps and margins on the model itself, so the phone and the cards actually fit."),
            (327, "Ready to print", "Export a 3MF or STL for your slicer. Files are always in millimetres."),
            (367, "Recap", None),
        ],
        "learn": ["Finding your way round the editor", "The plate and snap grid", "Sizing exactly in the properties panel", "Move, Rotate and Resize", "Sides, bevels, duplicate and Align", "Holes, Group vs Merge, and the ruler", "Exporting 3MF or STL for your slicer"],
        "help": [("Your first model", "t-first-model"), ("A pen pot step by step", "t-pen-pot"), ("Holes", "holes"), ("Align", "align"), ("The ruler", "measuring"), ("Importing and exporting", "import-export")],
        "faq": [
            ("Do I need any 3D modelling experience?", "No. This is the first video in the series and starts from an empty plate. If you have used Tinkercad you will feel at home, because twyk also builds from solid shapes and holes."),
            ("How long does the desk caddy take to make?", "The video runs about six and a half minutes. Most people pause and follow along, so allow longer for a first build."),
            ("What is the difference between Group and Merge?", "Group keeps parts together so you can move them as one, while Merge fuses them into a single solid. The video shows when to use each."),
            ("Which file should I export for printing?", "Export a 3MF if you want separate, named, coloured parts, or an STL for any slicer. Both are in millimetres."),
        ],
    },
    {
        "id": "_YcMCvbmgD8", "slug": "3d-print-name-tag-and-honeycomb-coaster", "kind": "Tutorial 2",
        "level": "intermediate", "seconds": 375, "uploaded": "2026-10-26T13:20:03+00:00",
        "card": "3D text, formula shapes and honeycomb tiles",
        "title": "3D Print a Name Tag, Engraved Sign and Honeycomb Coaster",
        "h1": "Make a 3D-printed name tag, engraved sign and honeycomb coaster",
        "desc": "Tutorial: make a raised name tag key ring, an engraved sign, a stencil, springs from math formulas, a gyroid cube and a honeycomb coaster. Free in your browser.",
        "lead": "Three of the most fun parts of twyk, in depth, with real prints to make: 3D text for a raised name tag key ring, an engraved sign and a stencil cut right through; shapes drawn from math formulas, such as springs, a flower ring and a gyroid cube; and honeycomb tiles for a round coaster and a vent cover.",
        "summary": "Raised and engraved text, shapes from math formulas, and honeycomb tiles, with real prints to make.",
        "builds": ["A raised name tag key ring", "An engraved sign and a stencil", "Springs, a flower ring and a gyroid cube", "A round honeycomb coaster and a vent cover"],
        "uses": ["Text", "Formula", "Tiles", "Hole"],
        "chapters": [
            (0, "Intro", None),
            (20, "The Text shape", "Type your words and choose from 48 fonts, including Hebrew and Arabic. You can also bring your own .ttf or .otf font."),
            (67, "A raised name tag", "Put the text on top of a tag, add a ring for the key ring, and Merge it all into one printable piece."),
            (104, "Engraved and stencil text", "Switch the text to a hole to engrave it into a sign. For a stencil that cuts all the way through, use a stencil font so the middle of each letter stays attached."),
            (128, "Formula: curves", "Formula turns a bit of maths into a shape. Start with the curve presets, such as a spring, and change the settings to see it respond."),
            (185, "Your own formula", "Write your own formula for a curve, like the flower ring in the video, and tune it until it looks right."),
            (228, "Surfaces and solids", "Formula comes in three kinds: curves, surfaces and solids. Solids give you shapes like the gyroid cube."),
            (275, "Tiles", "Tiles fill a shape with a repeating pattern such as honeycomb. Set the cell size, wall, border and base, and cut a tile to any outline."),
            (324, "A round coaster", "Put it together: a round honeycomb coaster, and the same tiles reused as a vent cover."),
            (352, "Recap", None),
        ],
        "learn": ["The Text shape and its 48 fonts", "Raised vs engraved text, and when to use a stencil font", "The three kinds of Formula shape: curve, surface and solid", "Writing your own formula", "Every Tiles setting: cell size, wall, border and base", "Cutting a tile to any outline"],
        "help": [("Name tag step by step", "t-name-tag"), ("Spring step by step", "t-spring"), ("Text", "text"), ("Formula", "formula"), ("Holes", "holes")],
        "faq": [
            ("Can I use my own fonts for 3D text?", "Yes. twyk has 48 built-in fonts, including Hebrew and Arabic, and you can bring your own .ttf or .otf file."),
            ("How do I engrave text instead of raising it?", "Set the text to a hole and sink it into the shape. The video shows raised, engraved and stencil text side by side."),
            ("What is a Formula shape?", "A shape drawn from a maths formula. There are three kinds, curves, surfaces and solids, with 19 presets such as springs, knots, shells and gyroid lattices, and you can write your own."),
            ("Can tiles be any shape, not just a square?", "Yes. You can cut a tile to any outline, which is how the video makes a round coaster and a vent cover."),
        ],
    },
    {
        "id": "ubINBjW3e_4", "slug": "3d-print-hollow-planter-and-flexi-ring", "kind": "Tutorial 3",
        "level": "intermediate", "seconds": 358, "uploaded": "2026-10-26T13:22:32+00:00",
        "card": "Print-smart tools: hollow, lip, cut, gaps, flex, sculpt and bend",
        "title": "Hollow Planter, Flexi Ring and Print-Ready Models: 3D Print Tools",
        "h1": "Make models that actually print: hollow planter, flexi ring and twisted vase",
        "desc": "3D printing tutorial: hollow a planter with a drain hole, cut a tall part, check print-in-place gaps, flex-test a ring, then sculpt a figure and twist a vase.",
        "lead": "These are the tools in twyk that exist because a model has to print: a hollow planter with a drain hole, a rolled rim with Lip, the best face down with Lay flat, a part too tall for your printer cut in two, print-in-place gaps, a flexi ring tested before you print it, a sculpted figure and a twisted vase. Every tool shows a live preview before you apply it, and everything can be undone.",
        "summary": "Hollow a planter, cut a tall part, test a flexi ring and twist a vase, with live previews and undo.",
        "builds": ["A hollow planter with a drain hole", "A print-in-place part with checked gaps", "A flexi ring tested before printing", "A sculpted figure and a twisted vase"],
        "uses": ["Hollow", "Lip", "Cut", "Gaps", "Flex", "Sculpt", "Bend"],
        "chapters": [
            (0, "Intro", None),
            (27, "Hollow and drain holes", "Make a planter hollow with a drain hole. Hollow shows a live preview before you apply it."),
            (69, "Lip: a rim", "Roll a rim around the opening with Lip, for a planter that looks finished."),
            (99, "Lay flat", "Let Lay flat choose the best face to put down on the plate."),
            (118, "Cut, and X-ray", "Cut a part that is too tall for your printer into pieces, and use X-ray to see inside and edit hidden parts."),
            (165, "Gaps: print-in-place", "Check that moving parts have enough clearance. Gaps finds parts that touch or sit too close to print apart."),
            (197, "Repeat in a ring, and Flex", "Repeat a link around a ring, then run the flex test to see whether the ring springs back, stays bent or snaps in PLA, PETG or TPU."),
            (245, "Sculpt", "Melt and smooth shapes together like clay to make an organic figure."),
            (275, "Bend: twist, bend, taper", "Twist, bend or taper a shape, here turning a plain vase into a twisted one."),
            (309, "Before you print", "A checklist to run on every model before you send it to the printer."),
            (334, "Recap", None),
        ],
        "learn": ["Hollowing a model with a drain hole", "Rims with Lip, and choosing a face down with Lay flat", "Cutting a model that is too tall, and seeing inside with X-ray", "Checking print-in-place gaps", "Testing a flexi ring before you print it", "Sculpting and Bend", "A checklist to run before every print"],
        "help": [("Hollow", "hollow"), ("Lip", "lip"), ("Cut for printing", "t-cut-print"), ("Gaps", "gaps"), ("Flex", "flex"), ("A flexi ring step by step", "t-flexi-ring"), ("Bend", "bend")],
        "faq": [
            ("What does the flex test do?", "It checks whether a flexible part springs back, stays bent or snaps, in PLA, PETG or TPU, so you find out before you print."),
            ("What is a print-in-place design?", "A design with moving parts that prints already assembled. The parts need a small clearance to print apart, and the Gaps tool finds any that touch or sit too close."),
            ("Can twyk cut a model that is too big for my printer?", "Yes. Cut splits a model into pieces that fit, and X-ray lets you see inside to place the cut."),
            ("Can I undo a tool I applied?", "Yes. Every tool shows a live preview first, and everything can be undone. Undo goes back about 60 steps and survives a reload."),
        ],
    },
    {
        "id": "Eu7-3-bP1JM", "slug": "ai-3d-model-generator", "kind": "Tutorial 4",
        "level": "beginner", "seconds": 326, "uploaded": "2026-10-26T13:25:00+00:00",
        "card": "AI twyk: design 3D prints by asking, from a photo or with code",
        "title": "AI 3D Model Generator for 3D Printing: Design by Asking or From a Photo",
        "h1": "Design 3D prints with AI: ask, send a photo, or build with code",
        "desc": "See AI twyk build printable 3D models from one sentence, from a photo, or with code, using the same editable tools you do. Every step can be undone.",
        "lead": "AI twyk builds printable 3D models for you, using the same tools you do, so every step can be undone and every part edited. This tutorial shows real requests: a headphone hook from one sentence, changed by naming its parts, a desk cable clip built from a photo, and a detailed red telephone box made with Build with code, which looks up the real thing and checks every build. The waiting is sped up in the video.",
        "summary": "Ask for a model, send a photo or build with code, and keep full control of every step.",
        "builds": ["A headphone hook from one sentence", "A desk cable clip from a photo", "A detailed red telephone box with code"],
        "uses": ["AI twyk", "Build with code", "History"],
        "chapters": [
            (0, "Intro", None),
            (19, "A request that works", "Describe what you want in a sentence or two, like the headphone hook in the video. The more concrete the request, the better the result, and AI twyk checks its own work as it builds."),
            (72, "Changing parts by name", "Every part has a name, so you can ask for a change to just that part instead of starting again."),
            (113, "Suggested next steps", "After each build AI twyk suggests what to do next, so you can keep going with a click."),
            (132, "Building from a photo", "Send a photo and ask for a model of what is in it, like the desk cable clip. You choose which AI builds, and the video shows which is best with pictures."),
            (182, "History", "Chat History keeps your earlier requests, so you can come back to a design later."),
            (200, "Build with code", "For detailed models, Build with code writes the whole build as one program. It looks up the real thing, like the red telephone box, and checks every build."),
            (274, "Tips for the best results", "A closing set of tips for getting the best results from AI twyk."),
            (302, "Recap", None),
        ],
        "learn": ["How to write a request that works", "How AI twyk checks its own work", "Changing parts by name", "Suggested next steps", "Choosing which AI builds, and which is best with pictures", "Chat History", "Build with code, and tips for the best results"],
        "help": [("Your first model", "t-first-model"), ("Undo", "undo"), ("Importing and exporting", "import-export"), ("Holes", "holes")],
        "faq": [
            ("Can I still edit what the AI builds?", "Yes. AI twyk uses the same tools you do, so every part is editable and every step can be undone."),
            ("Can AI twyk build a model from a photo?", "Yes. The video builds a desk cable clip from a photo, and shows which AI is best when you send pictures."),
            ("What is Build with code?", "A mode for detailed models. AI twyk writes the whole build as one program, looks up the real thing it is modelling, and checks every build before handing it over."),
            ("Is the video real time?", "The requests are real, but the waiting is sped up. Everything else runs at normal speed."),
        ],
    },
    {
        "id": "BeAlGxIzWno", "slug": "cut-and-align-twyk-vs-tinkercad", "kind": "Comparison",
        "level": "beginner", "seconds": 221, "uploaded": "2026-11-02T01:35:26-08:00",
        "card": "Cut and Align: twyk vs Tinkercad, filmed for real",
        "title": "Cut and Align: twyk vs Tinkercad Compared (Free 3D Modelling)",
        "h1": "Cut and Align: twyk vs Tinkercad, filmed for real",
        "desc": "Cut and Align compared: the same two jobs in Tinkercad and in twyk, filmed for real. Cutting a part in two, centring, even margins and squaring to the grid.",
        "lead": "Two tools you reach for all the time when designing for 3D printing: cutting a part in two, and lining parts up. This video tries both in Tinkercad and in twyk, filmed for real, so you can see how each one gets the job done before you pick your tool.",
        "summary": "The same two jobs, cutting a part in two and lining parts up, done in Tinkercad and in twyk.",
        "builds_h": "What the video compares", "steps_h": "Chapter by chapter", "learn_h": "What you will see",
        "cta_h": "Want to try it yourself?", "cta_p": "twyk is free and runs in your browser. Sign in with Google, open the editor and try Cut and Align on your own model.",
        "builds": ["Cutting a part in two, in Tinkercad and in twyk", "Lining parts up with each tool's Align", "Centring one part on the plate", "Even margins, and Square to the grid"],
        "uses": ["Cut", "Align", "Even margins", "Tinkercad"],
        "chapters": [
            (0, "Intro", None),
            (16, "Cutting in two: Tinkercad", "In the video Tinkercad has no Cut tool, so the usual way round it is used: hole boxes placed and sized to slice the part in two."),
            (80, "Cutting in two: twyk", "The same job in twyk, using its Cut tool to split the part into two pieces."),
            (113, "Lining up: Tinkercad", "Tinkercad's Align tool is good, and the video shows it at work."),
            (134, "Lining up: twyk", "The same lining-up job in twyk, plus what twyk adds on top of Align, such as centring one part on the plate."),
            (152, "Even margins", "One of the extras twyk adds to Align: Even margins."),
            (176, "Square to the grid", "Another of twyk's extras: Square to the grid."),
            (195, "Which does it better", "The video closes by weighing up which tool does each job better."),
        ],
        "learn": ["How to cut a part in two in Tinkercad and in twyk", "How Align works in each tool", "Centring a part on the plate", "Even margins and Square to the grid"],
        "help": [("Cut for printing", "t-cut-print"), ("Align", "align"), ("twyk vs Tinkercad", "twyk-vs-tinkercad.html")],
        "note": "Tinkercad is a trademark of Autodesk, Inc. This video is not made with or endorsed by Autodesk. Tinkercad as it was when this was filmed.",
        "faq": [
            ("Does Tinkercad have a Cut tool?", "Not in this video: Tinkercad has no Cut tool, so the usual way round it is used, with hole boxes. This is Tinkercad as it was when the video was filmed."),
            ("What does twyk add on top of Align?", "As the video shows, twyk adds centring one part on the plate, Even margins, and Square to the grid."),
            ("Do I need to know Tinkercad to follow this?", "No. The video shows each job in both tools, one after the other."),
            ("Is this video made or endorsed by Autodesk?", "No. Tinkercad is a trademark of Autodesk, Inc. This video is not made with or endorsed by Autodesk."),
        ],
    },
]

U = html.unescape
esc = lambda s: html.escape(s, quote=False)

# ---------------------------------------------------------------- videos added with tools/fetch_channel_videos.py
# Project groups for the filter chips on project-ideas.html, in display order. A video missing from
# CAT lands in "More projects"; edit "cat" in tools/videos.json to move one.
CATS = ["Desk & setup", "Home & kitchen", "Gifts & decor", "Gear & hobby", "Fix it", "More projects"]
CAT = {
    "7klGffZnGko": "Desk & setup", "RpugL11YMYw": "Desk & setup", "fGzPK1A2LDM": "Desk & setup",
    "pDnHlQBQpDo": "Desk & setup", "ZJ15wPVsBO0": "Desk & setup", "nK_QLu7LyXQ": "Desk & setup",
    "F5ZK3YN2F1w": "Home & kitchen", "bD5Wycvenf8": "Home & kitchen", "B14-3Suo0HI": "Home & kitchen",
    "jglVI-kU2eA": "Home & kitchen", "wHYFwBHDzFc": "Home & kitchen",
    "lpMMoXnRBRQ": "Gifts & decor", "-CNmcjXfD3g": "Gifts & decor", "mD1ZNPv5aLk": "Gifts & decor",
    "qeCbHbQUtB4": "Gifts & decor", "d-5-7okP-p8": "Gifts & decor",
    "_JofL1FRwPA": "Gear & hobby", "6XVBGYiJ-yI": "Gear & hobby", "if81Lx2DJ6M": "Gear & hobby",
    "_9zuyvrZUq8": "Gear & hobby",
    "SsiyDSkqth4": "Fix it", "NwWRBqrSp0A": "Fix it",
}
HOME_PICKS = ["7klGffZnGko", "_9zuyvrZUq8", "fGzPK1A2LDM", "RpugL11YMYw"]  # the homepage video row


def shorten(text, limit):
    """Cut text at the end of a sentence (or a word) so it fits in limit characters."""
    text = " ".join(text.split())
    if len(text) <= limit:
        return text
    cut = text[:limit]
    end = max(cut.rfind(". "), cut.rfind("? "), cut.rfind("! "))
    if end > limit * 0.5:
        return cut[:end + 1]
    return cut[:cut.rfind(" ")].rstrip(",;:") + "…"


def first_sentence(text, limit=150):
    for i, ch in enumerate(text):
        if ch in ".!?" and (i + 1 == len(text) or text[i + 1] == " ") and i > 40:
            return text[:i + 1] if i < limit else shorten(text, limit)
    return shorten(text, limit)


def linkify(text):
    return re.sub(r"(https?://[^\s<]+)", r'<a href="\1" rel="noopener">\1</a>', esc(text)).replace("\n", "<br>\n")


def parse_video(raw):
    """Turn a channel video's description (intro, Sizes, Print settings, notes, CHAPTERS) into a page entry."""
    paras = [p.strip() for p in raw["desc"].replace("\r", "").split("\n\n") if p.strip()]
    intro, sizes, printset, note, extra, chapters = paras[0], None, None, None, [], []
    for p in paras[1:]:
        if p.startswith("Sizes:"):
            sizes = p[6:].strip()
        elif p.startswith("Print settings:"):
            printset = p[15:].strip()
        elif p.startswith("CHAPTERS"):
            for line in p.splitlines()[1:]:
                m = re.match(r"(?:(\d+):)?(\d+):(\d{2})\s+(.+)", line.strip())
                if m:
                    h, mi, s, name = m.groups()
                    chapters.append((int(h or 0) * 3600 + int(mi) * 60 + int(s), name.strip(), None))
        elif p.startswith(("Every step is done by hand", "▶", "#")):
            continue
        elif "is a trademark of" in p:
            note = p
        else:
            extra.append(p)
    base = raw["title"].split(" | ")[0].strip()
    comparison = "vs Tinkercad" in base
    card = re.sub(r"\s*\([^)]*\)\s*$", "", base)
    h1 = card if comparison else base
    cat = "Comparison" if comparison else raw.get("cat") or CAT.get(raw["id"], "More projects")
    return {
        "parsed": True, "id": raw["id"], "slug": raw["slug"], "kind": "Comparison" if comparison else "Project", "cat": cat,
        "seconds": raw["seconds"], "uploaded": raw["published"],
        "card": esc(card), "h1": esc(h1), "title": esc(base if comparison else f"{base} | twyk.me"),
        "desc": html.escape(shorten(intro, 155)), "lead": esc(intro), "summary": esc(first_sentence(intro)),
        "sizes": sizes, "print": printset, "extra": extra, "note": note, "chapters": chapters, "uses": [],
    }


_store = os.path.join(os.path.dirname(os.path.abspath(__file__)), "videos.json")
if os.path.exists(_store):
    VIDEOS.extend(parse_video(r) for r in json.load(open(_store, encoding="utf-8")))

SERIES = [VIDEOS[1], VIDEOS[2], VIDEOS[3], VIDEOS[4]]
TOUR = VIDEOS[0]
_when = lambda v: datetime.fromisoformat(v["uploaded"])
PROJECTS = sorted((v for v in VIDEOS if v["kind"] == "Project"), key=_when, reverse=True)
COMPARE = sorted((v for v in VIDEOS if v["kind"] == "Comparison"), key=_when)


def mmss(s):
    return f"{s // 60}:{s % 60:02d}"


def iso_dur(s):
    return f"PT{s // 60}M{s % 60}S"


def page_url(v):
    return f"{SITE}/{v['slug']}.html"


def thumb_url(v):
    return f"{SITE}/img/videos/{v['slug']}.jpg"


def head(title, desc, url, image, extra_meta="", jsonld=()):
    ld = "\n".join(f'  <script type="application/ld+json">{json.dumps(o, ensure_ascii=False)}</script>' for o in jsonld)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <title>{title}</title>
  <meta name="description" content="{desc}" />
  <link rel="canonical" href="{url}" />
{extra_meta}  <meta property="og:site_name" content="twyk.me" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{desc}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:image" content="{image}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{desc}" />
  <meta name="twitter:image" content="{image}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" />
{ld}
</head>
<body>
  <!-- Generated by tools/make_video_pages.py; edit that file and re-run it, not this page. -->
"""


def tail():
    return f"""
  <script type="module">
    import {{ renderHeader, renderFooter }} from "./js/app.js";
    import "./js/track.js";
    import "./js/video.js";
    renderHeader();
    renderFooter();
  </script>
</body>
</html>
"""


def thumb_card(v, big=False):
    """Click-to-play thumbnail: the YouTube iframe only loads on press."""
    return f"""<div class="vid-frame" data-title="{html.escape(v['card'])}">
            <button class="vid-thumb" type="button" data-id="{v['id']}" data-title="{html.escape(v['card'])}" aria-label="Play video: {html.escape(v['card'])}">
              <img src="img/videos/{v['slug']}.jpg" alt="{html.escape(v['card'])}: video thumbnail" width="1280" height="720" loading="{'eager' if big else 'lazy'}" />
              <span class="vid-play" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5L8 5.5Z"/></svg></span>
              <span class="vid-len">{mmss(v['seconds'])}</span>
            </button>
          </div>"""


# ---------------------------------------------------------------- project ideas
def ideas_page():
    url = f"{SITE}/project-ideas.html"
    title = "3D Printing Project Ideas with Video Tutorials | twyk.me"
    desc = f"{len(PROJECTS)} real 3D printing projects with video walkthroughs and exact sizes: a headset stand, wall hook, planter, cookie cutter and more. Design them free in your browser."
    crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
        {"@type": "ListItem", "position": 2, "name": "Project ideas", "item": url}]}
    itemlist = {"@context": "https://schema.org", "@type": "ItemList", "name": "twyk video projects",
                "itemListElement": [{"@type": "ListItem", "position": i + 1, "url": page_url(v), "name": U(v["card"])} for i, v in enumerate(VIDEOS)]}
    def card(v):
        return f"""        <article class="vid-card">
          {thumb_card(v)}
          <div class="vid-card-body">
            <div class="idea-meta"><span class="vid-kind">{v['kind']}</span>{f'<span class="diff diff-{v["level"]}">{v["level"]}</span>' if v.get('level') else ''}<span class="time">&#9201; {mmss(v['seconds'])}</span></div>
            <h3><a href="{v['slug']}.html">{v['card']}</a></h3>
            <p>{v['summary']}</p>
            {f'<div class="uses">{"".join(f"<span>{u}</span>" for u in v["uses"])}</div>' if v['uses'] else ''}
            <div class="vid-card-cta">
              <a class="btn btn-primary" href="{LOGIN}" data-track="cta_login" data-track-source="project_ideas_{v['slug']}">Start building <span class="arrow">&rarr;</span></a>
              <a class="btn btn-ghost" href="{v['slug']}.html">Read the walkthrough</a>
            </div>
          </div>
        </article>"""

    cards = "\n".join(card(v) for v in SERIES)
    compare_cards = "\n".join(card(v) for v in COMPARE)
    used = [c for c in CATS if any(p["cat"] == c for p in PROJECTS)]
    chips = f'<button class="chip active" type="button" data-cat="all">All ({len(PROJECTS)})</button>' + "".join(
        f'<button class="chip" type="button" data-cat="{esc(c)}">{esc(c)} ({sum(p["cat"] == c for p in PROJECTS)})</button>' for c in used)
    proj_cards = "\n".join(f"""        <article class="proj-card" data-cat="{esc(p['cat'])}">
          <a class="proj-thumb" href="{p['slug']}.html" aria-label="Watch: {html.escape(U(p['card']))}">
            <img src="img/videos/{p['slug']}.jpg" alt="{html.escape(U(p['card']))}: video thumbnail" width="640" height="360" loading="lazy" />
            <span class="vid-play vid-play-sm" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5L8 5.5Z"/></svg></span>
            <span class="vid-len">{mmss(p['seconds'])}</span>
          </a>
          <div class="proj-body">
            <div class="idea-meta"><span class="vid-kind">{esc(p['cat'])}</span></div>
            <h3><a href="{p['slug']}.html">{p['card']}</a></h3>
            <p>{p['summary']}</p>
            <div class="vid-card-cta">
              <a class="btn btn-primary" href="{LOGIN}" data-track="cta_login" data-track-source="project_ideas_{p['slug']}">Start building <span class="arrow">&rarr;</span></a>
              <a class="btn btn-ghost" href="{p['slug']}.html">Watch and build</a>
            </div>
          </div>
        </article>""" for p in PROJECTS)
    return head(title, desc, url, thumb_url(TOUR), '  <meta property="og:type" content="website" />\n', [crumbs, itemlist]) + f"""
  <section class="explore-head">
    <div class="container">
      <h1>Project ideas</h1>
      <p>Real things to build in twyk, each with a video walkthrough and exact sizes. Watch it, then open the editor and make your own.</p>
    </div>
  </section>

  <section class="vid-featured">
    <div class="container">
      <div class="vid-feature-grid">
        {thumb_card(TOUR, big=True)}
        <div class="vid-feature-text">
          <span class="vid-kind">Start here &middot; {TOUR['kind']}</span>
          <h2><a href="{TOUR['slug']}.html">{TOUR['card']}</a></h2>
          <p>{TOUR['summary']} Shapes, text, formulas, tiles, flex tests, AI and export, in five minutes.</p>
          <div class="vid-card-cta">
            <a class="btn btn-primary btn-lg" href="{LOGIN}" data-track="cta_login" data-track-source="project_ideas_tour">Start building <span class="arrow">&rarr;</span></a>
            <a class="btn btn-ghost btn-lg" href="{TOUR['slug']}.html">Read the walkthrough</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="vid-series" id="projects" style="padding-top: 0; padding-bottom: 64px;">
    <div class="container">
      <h2 class="vid-h2">{len(PROJECTS)} projects to print</h2>
      <p class="vid-sub">Each one is built by hand in the video, with the sizes and print settings in the write-up. Pick a group, or browse them all.</p>
      <div class="chips proj-chips" role="group" aria-label="Filter projects">{chips}</div>
      <div class="proj-grid">
{proj_cards}
      </div>
    </div>
  </section>

  <section class="vid-series" style="padding-top: 0; padding-bottom: 64px;">
    <div class="container">
      <h2 class="vid-h2">The tutorial series: learn the tools</h2>
      <p class="vid-sub">Four videos that teach the editor by building something real. Take them in order, or jump to the one you want.</p>
      <div class="vid-grid">
{cards}
      </div>
    </div>
  </section>

  <section class="vid-series" style="padding-top: 0; padding-bottom: 80px;">
    <div class="container">
      <h2 class="vid-h2">twyk vs Tinkercad, filmed for real</h2>
      <p class="vid-sub">The same job done in both tools, side by side. See also the <a href="compare.html">full comparison</a>.</p>
      <div class="vid-grid">
{compare_cards}
      </div>
      <p class="vid-more">All videos live on the <a href="{CHANNEL}" rel="noopener">twyk YouTube channel</a>.</p>
    </div>
  </section>

  <section class="cta-band">
    <div class="container">
      <h2>Pick one and open the editor</h2>
      <p>Free, in your browser. Sign in with Google and start from a shape.</p>
      <a class="btn btn-primary btn-lg" href="{LOGIN}" data-track="cta_login" data-track-source="project_ideas">Start building <span class="arrow">&rarr;</span></a>
    </div>
  </section>
""" + tail()


# ---------------------------------------------------------------- landing pages
def group(v):
    return v.get("cat") or ("Tutorial" if v["kind"].startswith("Tutorial") else v["kind"])


def related(v, n=4):
    """The n videos most like v (same group first, then newest), for the row at the foot of a landing page."""
    return sorted((o for o in VIDEOS if o is not v), key=lambda o: (group(o) == group(v), _when(o)), reverse=True)[:n]


def parsed_faq(v):
    """FAQ for an imported video, made only of facts from its description."""
    faq = []
    if v["sizes"]:
        faq.append(("What sizes does this project use?", v["sizes"]))
    if v["print"]:
        faq.append(("What print settings should I use?", v["print"]))
    if v["note"]:
        faq.append(("Is this video made or endorsed by Autodesk?", "No. " + v["note"]))
    faq.append(("Is twyk free to use?", "Yes. twyk has no plans, payments or subscriptions. You sign in with a Google account and your models save to it as you go."))
    if v["kind"] == "Project":
        tail_ = " The last chapter of the video, Make your own, shows how." if any(c[1] == "Make your own" for c in v["chapters"]) else ""
        faq.append(("Can I change the design to fit what I own?", "Yes. Every shape in twyk keeps settings you can change later, and you type sizes in millimetres or inches, so you can adjust this design to suit your own needs." + tail_))
    return faq


def parsed_body(v, watch):
    out = []
    if v["sizes"] or v["print"]:
        rows = ""
        if v["sizes"]:
            rows += f"<div><dt>Sizes</dt><dd>{esc(v['sizes'])}</dd></div>"
        if v["print"]:
            rows += f"<div><dt>Print settings</dt><dd>{esc(v['print'])}</dd></div>"
        out.append(f'          <h2>At a glance</h2>\n          <dl class="vid-spec">{rows}</dl>')
    if v["extra"]:
        paras = "\n".join(f"          <p>{linkify(p)}</p>" for p in v["extra"])
        out.append(f"          <h2>Build details</h2>\n{paras}")
    steps = "\n".join(
        f'            <li><a href="{watch}&amp;t={c[0]}s" data-seek="{c[0]}"><time>{mmss(c[0])}</time><span>{esc(c[1])}</span></a></li>'
        for c in v["chapters"])
    out.append(f'          <h2>{"Chapter by chapter" if v["kind"] == "Comparison" else "Step by step"}</h2>\n          <ol class="vid-steps-plain">\n{steps}\n          </ol>')
    if v["note"]:
        out.append(f'          <p class="form-note vid-note">{esc(v["note"])}</p>')
    return "\n\n".join(out)


def hand_body(v):
    steps = "\n".join(f'          <li><h3>{c[1]}</h3><p>{c[2]}</p></li>' for c in v["chapters"] if c[2])
    learn = "\n".join(f"            <li>{x}</li>" for x in v["learn"])
    builds = "\n".join(f"            <li>{x}</li>" for x in v["builds"])
    help_links = " &middot; ".join(f'<a href="{s if s.endswith(".html") else HELP + s}">{t}</a>' for t, s in v["help"])
    note = f'\n          <p class="form-note vid-note">{v["note"]}</p>\n' if v.get("note") else ""
    return f"""          <h2>{v.get('builds_h', 'What you will make')}</h2>
          <ul class="vs-list">
{builds}
          </ul>

          <h2>{v.get('steps_h', 'Step by step')}</h2>
          <ol class="vid-steps">
{steps}
          </ol>

          <h2>{v.get('learn_h', 'What you will learn')}</h2>
          <ul class="vs-list">
{learn}
          </ul>
{note}
          <p class="vid-help"><b>Want the written version?</b> The help guide covers each tool in detail: {help_links}.</p>"""


def landing(v):
    url = page_url(v)
    title, desc = v["title"], v["desc"]
    chapters = v["chapters"]
    ends = [c[0] for c in chapters[1:]] + [v["seconds"]]
    watch = f"https://www.youtube.com/watch?v={v['id']}"

    video_ld = {
        "@context": "https://schema.org", "@type": "VideoObject",
        "name": U(title), "description": U(v["lead"]),
        "thumbnailUrl": [thumb_url(v)], "uploadDate": v["uploaded"], "duration": iso_dur(v["seconds"]),
        "embedUrl": f"https://www.youtube.com/embed/{v['id']}", "url": url,
        "inLanguage": "en", "isFamilyFriendly": True,
        "publisher": {"@type": "Organization", "name": "twyk.me", "url": SITE + "/"},
        "hasPart": [{"@type": "Clip", "name": U(c[1]), "startOffset": c[0], "endOffset": e, "url": f"{watch}&t={c[0]}s"}
                    for c, e in zip(chapters, ends) if c[2] or v.get("parsed")],
    }
    crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
        {"@type": "ListItem", "position": 2, "name": "Project ideas", "item": SITE + "/project-ideas.html"},
        {"@type": "ListItem", "position": 3, "name": U(v["card"]), "item": url}]}
    faq_items = parsed_faq(v) if v.get("parsed") else v["faq"]
    faq_ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq_items]}

    extra = f'  <meta property="og:type" content="video.other" />\n  <meta property="og:video" content="https://www.youtube.com/embed/{v["id"]}" />\n  <meta property="og:video:type" content="text/html" />\n'

    chap = "\n".join(
        f'            <li><a href="{watch}&amp;t={c[0]}s" data-seek="{c[0]}"><time>{mmss(c[0])}</time><span>{c[1]}</span></a></li>' for c in chapters)
    body = parsed_body(v, watch) if v.get("parsed") else hand_body(v)
    answer = esc if v.get("parsed") else (lambda a: a)
    faq = "\n".join(f"        <details><summary>{q}</summary><p>{answer(a)}</p></details>" for q, a in faq_items)
    more = "\n".join(f"""        <a class="vid-mini" href="{o['slug']}.html">
          <img src="img/videos/{o['slug']}.jpg" alt="" width="320" height="180" loading="lazy" />
          <span class="vid-mini-body"><small>{o.get('cat') or o['kind']} &middot; {mmss(o['seconds'])}</small><b>{o['card']}</b></span>
        </a>""" for o in related(v))
    pills = (f'<span class="diff diff-{v["level"]}">{v["level"]}</span>' if v.get("level") else "") + \
            (f'<span class="vid-cat">{esc(v["cat"])}</span>' if v.get("cat") and v["kind"] == "Project" else "")
    src = f"project_{v['slug']}"

    return head(title, desc, url, thumb_url(v), extra, [video_ld, crumbs, faq_ld]) + f"""
  <section class="guide-hero vid-hero">
    <div class="container">
      <p class="vs-crumb"><a href="project-ideas.html">Project ideas</a> &rsaquo; {v['kind']}</p>
      <h1>{v['h1']}</h1>
      <p class="answer-lead">{v['lead']}</p>
    </div>
  </section>

  <section class="vid-stage">
    <div class="container">
      <div class="vid-frame vid-frame-lg" id="player" data-id="{v['id']}" data-title="{html.escape(v['card'])}">
        <iframe src="https://www.youtube-nocookie.com/embed/{v['id']}?rel=0" title="{html.escape(v['card'])}" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
      <div class="vid-under">
        <div class="vid-facts">
          <span class="vid-kind">{v['kind']}</span>
          {pills}
          <span class="time">&#9201; {mmss(v['seconds'])}</span>
        </div>
        <div class="vid-card-cta">
          <a class="btn btn-primary btn-lg" href="{LOGIN}" data-track="cta_login" data-track-source="{src}_video">Start building <span class="arrow">&rarr;</span></a>
          <a class="btn btn-ghost btn-lg" href="{watch}" rel="noopener">Watch on YouTube</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section vid-body">
    <div class="container">
      <div class="vid-layout">
        <article class="vid-article">
{body}

          <div class="vid-inline-cta">
            <div>
              <h2>{v.get('cta_h', 'Ready to build it?')}</h2>
              <p>{v.get('cta_p', 'twyk is free and runs in your browser. Sign in with Google, open the editor and follow along.')}</p>
            </div>
            <a class="btn btn-primary btn-lg" href="{LOGIN}" data-track="cta_login" data-track-source="{src}_inline">Start building <span class="arrow">&rarr;</span></a>
          </div>

          <div class="faq" style="margin: 48px 0 0; max-width: none;">
            <h2 style="margin-bottom: 20px;">Frequently asked questions</h2>
{faq}
          </div>
        </article>

        <aside class="vid-aside">
          <div class="vid-aside-card">
            <h2>In this video</h2>
            <ol class="vid-chapters">
{chap}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <section class="section vid-more-section">
    <div class="container">
      <h2 class="vid-h2">More from the twyk video series</h2>
      <div class="vid-minis">
{more}
      </div>
      <p class="vid-more"><a href="project-ideas.html">All project ideas</a> &middot; <a href="{CHANNEL}" rel="noopener">twyk on YouTube</a></p>
    </div>
  </section>

  <section class="cta-band">
    <div class="container">
      <h2>Start building in your browser</h2>
      <p>Free, with nothing to install. Sign in with Google and start from a shape.</p>
      <a class="btn btn-primary btn-lg" href="{LOGIN}" data-track="cta_login" data-track-source="{src}_band">Start building <span class="arrow">&rarr;</span></a>
    </div>
  </section>
""" + tail()


def home_block():
    """The 'watch and build' section on the homepage (docs/index.html, between the videos markers)."""
    minis = "\n".join(f"""        <a class="vid-mini" href="{v['slug']}.html" data-track="video_click" data-track-video="{v['slug']}">
          <span class="vid-mini-img">
            <img src="img/videos/{v['slug']}.jpg" alt="{html.escape(v['card'])}: video thumbnail" width="640" height="360" loading="lazy" />
            <span class="vid-play vid-play-sm" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5L8 5.5Z"/></svg></span>
            <span class="vid-len">{mmss(v['seconds'])}</span>
          </span>
          <span class="vid-mini-body"><small>{v.get('cat') or v['kind']} &middot; {mmss(v['seconds'])}</small><b>{v['card']}</b></span>
        </a>""" for v in (next(p for p in VIDEOS if p["id"] == i) for i in HOME_PICKS))
    return f"""<!-- videos:start (generated by tools/make_video_pages.py) -->
  <section class="section" id="examples">
    <div class="container">
      <div class="section-head">
        <div>
          <div class="eyebrow">Watch, then build</div>
          <h2>Real projects, built on video.</h2>
          <p>Watch a project get made in a couple of minutes, then open the editor and make your own.</p>
        </div>
        <a class="feat-more" href="project-ideas.html">All {len(PROJECTS)} projects &rsaquo;</a>
      </div>
      <div class="vid-feature-grid">
        {thumb_card(TOUR, big=False)}
        <div class="vid-feature-text">
          <span class="vid-kind">Start here &middot; {TOUR['kind']}</span>
          <h3><a href="{TOUR['slug']}.html">{TOUR['card']}</a></h3>
          <p>{TOUR['summary']}</p>
          <div class="vid-card-cta">
            <a class="btn btn-primary btn-lg" href="{LOGIN}" data-track="cta_login" data-track-source="home_videos">Start building <span class="arrow">&rarr;</span></a>
            <a class="btn btn-ghost btn-lg" href="{TOUR['slug']}.html">Read the walkthrough</a>
          </div>
        </div>
      </div>
      <div class="vid-minis vid-minis-home">
{minis}
      </div>
    </div>
  </section>
  <!-- videos:end -->"""


def inject(name, start, end, block):
    path = os.path.join(OUT, name)
    with open(path, encoding="utf-8", newline="") as f:
        text = f.read()
    a, b = text.index(start), text.index(end) + len(end)
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(text[:a] + block + text[b:])
    print("updated", path)


def write(name, text):
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    print("wrote", path)


def sitemap_block():
    lines = [f'  <url><loc>{page_url(v)}</loc><lastmod>{v["uploaded"][:10]}</lastmod><changefreq>monthly</changefreq><priority>{0.8 if v is TOUR else 0.7}</priority></url>'
             for v in VIDEOS]
    return "<!-- videos:start -->\n" + "\n".join(lines) + "\n  <!-- videos:end -->"


def llms_block():
    lines = [f"  - [{U(v['card'])}]({page_url(v)})" for v in VIDEOS]
    return "<!-- videos:start -->\n- Video walkthroughs, one page per video with the sizes and print settings:\n" + "\n".join(lines) + "\n<!-- videos:end -->"


write("project-ideas.html", ideas_page())
for v in VIDEOS:
    write(f"{v['slug']}.html", landing(v))
inject("index.html", "<!-- videos:start", "<!-- videos:end -->", home_block())
inject("sitemap.xml", "<!-- videos:start", "<!-- videos:end -->", sitemap_block())
inject("llms.txt", "<!-- videos:start", "<!-- videos:end -->", llms_block())
