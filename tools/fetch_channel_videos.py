"""Find videos on the twyk YouTube channel that have no landing page yet and save their details.

Run from the repo root:  python tools/fetch_channel_videos.py docs

For every video on https://www.youtube.com/@twykme whose id is not already embedded in a page in
docs/, this adds an entry to tools/videos.json (title, length, upload date, description, slug) and
saves a thumbnail to docs/img/videos/<slug>.jpg. Then run tools/make_video_pages.py to build the pages.

Edit tools/videos.json by hand to fix a slug, or to set "cat" (the project-ideas filter group).
Uses only the standard library, plus Pillow for the thumbnail if it is installed.
"""
import glob, html, io, json, os, re, sys, urllib.request

OUT = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "videos.json")
CHANNEL = "https://www.youtube.com/@twykme/videos?hl=en&persist_hl=1&gl=US"
UA = {"User-Agent": "Mozilla/5.0", "Accept-Language": "en"}

# Slugs that read badly when made from the title.
SLUG_OVERRIDES = {
    "wWJx8Di5AGY": "sculpt-a-penguin-twyk-vs-tinkercad",
    "4wW4TqFRaSs": "twisted-vase-twyk-vs-tinkercad",
    "pDnHlQBQpDo": "3d-print-desk-organizer-pens-phone-sticky-notes",
    "fGzPK1A2LDM": "3d-print-desk-cable-clips",
    "_JofL1FRwPA": "3d-print-gopro-handlebar-mount",
    "F5ZK3YN2F1w": "3d-print-planter-with-drip-tray",
    "if81Lx2DJ6M": "3d-print-magic-cards-deck-box",
    "bD5Wycvenf8": "3d-print-two-tier-spice-rack",
    "d-5-7okP-p8": "3d-print-knitted-christmas-tree",
}


def get(url, data=None, headers=None):
    h = dict(UA)
    h.update(headers or {})
    return urllib.request.urlopen(urllib.request.Request(url, data=data, headers=h)).read()


def channel_videos():
    """Every video on the channel as {id: title}, following the page's continuation tokens."""
    page = get(CHANNEL).decode("utf8")
    key = re.search(r'"INNERTUBE_API_KEY":"([^"]+)"', page).group(1)
    ver = re.search(r'"INNERTUBE_CONTEXT_CLIENT_VERSION":"([^"]+)"', page).group(1)
    init = json.loads(re.search(r"var ytInitialData = (\{.*?\});</script>", page, re.S).group(1))
    found = {}

    def walk(o):
        token, stack = None, [o]
        while stack:
            x = stack.pop()
            if isinstance(x, dict):
                if "videoRenderer" in x:
                    v = x["videoRenderer"]
                    found.setdefault(v["videoId"], "".join(r["text"] for r in v["title"]["runs"]))
                if "lockupViewModel" in x:
                    lv = x["lockupViewModel"]
                    title = lv.get("metadata", {}).get("lockupMetadataViewModel", {}).get("title", {}).get("content")
                    if lv.get("contentId") and title:
                        found.setdefault(lv["contentId"], title)
                if "continuationCommand" in x:
                    token = x["continuationCommand"]["token"]
                stack.extend(x.values())
            elif isinstance(x, list):
                stack.extend(x)
        return token

    token, seen = walk(init), set()
    while token and token not in seen and len(seen) < 20:
        seen.add(token)
        body = json.dumps({"context": {"client": {"clientName": "WEB", "clientVersion": ver, "hl": "en", "gl": "US"}}, "continuation": token}).encode()
        token = walk(json.loads(get(f"https://www.youtube.com/youtubei/v1/browse?key={key}", body, {"Content-Type": "application/json"})))
    return found


def watch_details(vid):
    s = get(f"https://www.youtube.com/watch?v={vid}&hl=en").decode("utf8")
    field = lambda k: (re.search(r'"' + k + r'":"?([^",]*)', s) or [None, None])[1]
    m = re.search(r'"shortDescription":"(.*?)","isCrawlable"', s, re.S)
    return {
        "seconds": int(field("lengthSeconds") or 0),
        "published": field("publishDate"),
        "desc": json.loads('"' + m.group(1) + '"') if m else "",
    }


def make_slug(vid, title):
    if vid in SLUG_OVERRIDES:
        return SLUG_OVERRIDES[vid]
    t = title.split(" | ")[0]
    t = re.sub(r"\([^)]*\)", "", t).lower()
    words = [w for w in re.findall(r"[a-z0-9]+", t) if w not in ("a", "an", "the", "your")]
    return "-".join(words[:8])


def save_thumb(vid, slug):
    raw = get(f"https://i.ytimg.com/vi/{vid}/maxresdefault.jpg")
    path = os.path.join(OUT, "img", "videos", f"{slug}.jpg")
    try:
        from PIL import Image
        Image.open(io.BytesIO(raw)).convert("RGB").save(path, quality=80, optimize=True, progressive=True)
    except ImportError:
        open(path, "wb").write(raw)


known = set()
for page in glob.glob(os.path.join(OUT, "*.html")):
    known.update(re.findall(r"youtube-nocookie\.com/embed/([A-Za-z0-9_-]{11})", open(page, encoding="utf-8").read()))
store = json.load(open(DATA, encoding="utf-8")) if os.path.exists(DATA) else []
known.update(v["id"] for v in store)

new = {vid: t for vid, t in channel_videos().items() if vid not in known}
os.makedirs(os.path.join(OUT, "img", "videos"), exist_ok=True)
for vid, title in new.items():
    d = watch_details(vid)
    slug = make_slug(vid, title)
    entry = {"id": vid, "slug": slug, "title": html.unescape(title), **d}
    save_thumb(vid, slug)
    store.append(entry)
    print("added", vid, slug)

store.sort(key=lambda v: v["published"] or "")
with open(DATA, "w", encoding="utf-8", newline="\n") as f:
    json.dump(store, f, ensure_ascii=False, indent=1)
print(f"{len(new)} new video(s); {len(store)} in tools/videos.json")
