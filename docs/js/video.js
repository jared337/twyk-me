/* twyk.me: video pages. Click-to-play thumbnails and chapter jump links.
   The YouTube iframe only loads when a visitor presses play or picks a chapter. */

const EMBED = "https://www.youtube-nocookie.com/embed/";
const ALLOW = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

function frame(id, title, start = 0) {
  const f = document.createElement("iframe");
  f.src = `${EMBED}${id}?rel=0&autoplay=1${start ? `&start=${start}` : ""}`;
  f.title = title;
  f.allow = ALLOW;
  f.allowFullscreen = true;
  f.referrerPolicy = "strict-origin-when-cross-origin";
  return f;
}

document.querySelectorAll(".vid-thumb").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.replaceChildren(frame(btn.dataset.id, btn.dataset.title));
  });
});

const player = document.getElementById("player");
document.querySelectorAll("[data-seek]").forEach(link => {
  link.addEventListener("click", e => {
    if (!player) return;
    e.preventDefault();
    player.replaceChildren(frame(player.dataset.id, player.dataset.title, Number(link.dataset.seek)));
    player.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
