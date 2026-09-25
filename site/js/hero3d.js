/* twyk.me: animated hero, the editor's workplane with floating primitives */
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const SHAPE_MAT = (color) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.04 });

export function mountHeroScene(container) {
  const scene = new THREE.Scene();

  /* workplane grid, same light blue as the editor */
  const grid = new THREE.GridHelper(160, 80, 0xa8cfec, 0xd2e6f6);
  grid.material.transparent = true;
  grid.material.opacity = 0.85;
  scene.add(grid);

  const hemi = new THREE.HemisphereLight(0xffffff, 0xdbe6f0, 1.15);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 1.5);
  key.position.set(8, 14, 10);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xcfe0ff, 0.45);
  fill.position.set(-10, 6, -8);
  scene.add(fill);

  /* floating primitives in the editor's shape colours, clustered right of the copy */
  const defs = [
    { geo: new RoundedBoxGeometry(3.2, 3.2, 3.2, 4, 0.55), color: 0x4a7dea, pos: [7.5, 2.6, 0.5], spin: 0.28, r: 2.4 },
    { geo: new THREE.CylinderGeometry(1.35, 1.35, 2.8, 40),  color: 0x35c4a8, pos: [12.5, 1.9, -3.5], spin: 0.2, r: 1.5 },
    { geo: new THREE.ConeGeometry(1.6, 3.2, 40),             color: 0xf0a441, pos: [10.8, 2.1, 4.2], spin: 0.16, r: 1.7 },
    { geo: new THREE.TorusGeometry(1.25, 0.55, 20, 40),      color: 0xe85c8f, pos: [15.2, 2.7, 1.2], spin: 0.34, r: 1.6 },
    { geo: new THREE.ConeGeometry(1.5, 2.6, 4),              color: 0x8b5cf6, pos: [17.5, 1.8, -1.8], spin: 0.22, r: 1.5 },
    { geo: new THREE.CylinderGeometry(1.15, 1.15, 2.4, 3),   color: 0x58b368, pos: [13.8, 1.6, 5.6], spin: 0.18, r: 1.3 },
  ];

  const shadowGeo = new THREE.CircleGeometry(1, 40);
  shadowGeo.rotateX(-Math.PI / 2);

  const items = defs.map((d, i) => {
    const mesh = new THREE.Mesh(d.geo, SHAPE_MAT(d.color));
    mesh.position.set(...d.pos);
    mesh.rotation.set(0.15 * i, 0.7 * i, 0);
    scene.add(mesh);
    const shadow = new THREE.Mesh(
      shadowGeo,
      new THREE.MeshBasicMaterial({ color: 0x0a2540, transparent: true, opacity: 0.07 })
    );
    shadow.position.set(d.pos[0], 0.02, d.pos[2]);
    shadow.scale.setScalar(d.r);
    scene.add(shadow);
    return { mesh, shadow, baseY: d.pos[1], phase: i * 1.7, spin: d.spin, r: d.r };
  });

  const cam = new THREE.PerspectiveCamera(35, 1, 0.1, 300);
  const camBase = new THREE.Vector3(0, 7.5, 24);
  cam.position.copy(camBase);
  const lookAt = new THREE.Vector3(2, 2, 0);
  cam.lookAt(lookAt);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.append(renderer.domElement);

  function size() {
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  }
  size();
  new ResizeObserver(size).observe(container);

  /* gentle mouse parallax */
  let mx = 0, my = 0, tx = 0, ty = 0;
  window.addEventListener("pointermove", (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 2;
    ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  const clock = new THREE.Clock();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function frame() {
    const t = clock.getElapsedTime();
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;
    cam.position.set(camBase.x + mx * 1.6, camBase.y - my * 1.0, camBase.z);
    cam.lookAt(lookAt);
    items.forEach((it) => {
      const bob = Math.sin(t * 0.7 + it.phase);
      it.mesh.position.y = it.baseY + bob * 0.45;
      it.mesh.rotation.y += it.spin * 0.004;
      it.mesh.rotation.x += it.spin * 0.0015;
      const s = it.r * (1 - bob * 0.06);
      it.shadow.scale.setScalar(s);
      it.shadow.material.opacity = 0.07 - bob * 0.015;
    });
    renderer.render(scene, cam);
  }

  if (reduced) {
    frame();
  } else {
    renderer.setAnimationLoop(frame);
  }
}
