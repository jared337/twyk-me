/* twyk.me: renders card thumbnails from the same procedural models the viewer uses */
import * as THREE from "three";
import { makeScene } from "./models3d.js";

const cache = {};
let renderer;

function getRenderer() {
  if (!renderer) {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(560, 420);
    renderer.setPixelRatio(1);
  }
  return renderer;
}

export function snapshot(kind) {
  if (cache[kind]) return cache[kind];
  const r = getRenderer();
  const { scene, center, radius } = makeScene(kind);
  scene.background = null; // let the card gradient show through
  const cam = new THREE.PerspectiveCamera(30, 560 / 420, 0.1, 200);
  const d = radius * 3.0;
  cam.position.set(center.x + d * 0.74, center.y + d * 0.45, center.z + d * 0.74);
  cam.lookAt(center);
  r.render(scene, cam);
  const url = r.domElement.toDataURL("image/png");
  cache[kind] = url;
  return url;
}

export function upgradeThumbs() {
  document.querySelectorAll(".model-thumb[data-kind], .mini-thumb[data-kind]").forEach(el => {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    try {
      const img = document.createElement("img");
      img.src = snapshot(el.dataset.kind);
      img.alt = "";
      el.append(img);
    } catch (e) { /* keep gradient fallback */ }
  });
}
