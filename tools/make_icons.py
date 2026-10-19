"""Draw the twyk app icon (the same artwork as https://twyk.me/favicon.svg) as PNG/ICO fallbacks.

Run from the repo root:  python tools/make_icons.py docs

Writes favicon.ico (16/32/48) for browsers that ask for /favicon.ico, and apple-touch-icon.png
(180 x 180, square: iOS rounds the corners) for phone home screens. Needs Pillow.
"""
import os, sys
from PIL import Image, ImageDraw

OUT = sys.argv[1]
BLUE = (0x4A, 0x82, 0xE4)
# the cube from favicon.svg, in its 24-unit box (drawn at translate(4 4) inside a 32-unit tile)
FACES = [
    ([(20.4, 8.45), (20.4, 18.15), (12, 23), (12, 13.3)], 0.58),
    ([(3.6, 8.45), (12, 13.3), (12, 23), (3.6, 18.15)], 0.80),
    ([(12, 1.2), (20.4, 6.05), (12, 10.9), (3.6, 6.05)], 1.00),
]


def draw(size, rounded):
    big = size * 8  # supersample, then shrink for smooth edges
    k = big / 32
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if rounded:
        d.rounded_rectangle([0, 0, big - 1, big - 1], radius=7 * k, fill=BLUE)
    else:
        d.rectangle([0, 0, big, big], fill=BLUE)
    for pts, opacity in FACES:
        # white at this opacity over the blue tile
        c = tuple(round(b + (255 - b) * opacity) for b in BLUE)
        d.polygon([((x + 4) * k, (y + 4) * k) for x, y in pts], fill=c)
    return img.resize((size, size), Image.LANCZOS)


draw(180, rounded=False).convert("RGB").save(os.path.join(OUT, "apple-touch-icon.png"), optimize=True)
draw(48, rounded=True).save(os.path.join(OUT, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("wrote favicon.ico and apple-touch-icon.png in", OUT)
