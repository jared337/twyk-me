/* twyk.me: procedural 3D models (stand-ins for real user uploads) */
import * as THREE from "three";

function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.55,
    metalness: opts.metalness ?? 0.05,
    flatShading: opts.flat ?? false,
  });
}

/* ---- individual generators ------------------------------------ */

function knight() {
  const g = new THREE.Group();
  // base
  const base = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.5, 1.1, 48), mat(0xd96a4b));
  base.position.y = 0.55;
  g.add(base);
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3.0, 0.7, 48), mat(0xd96a4b));
  collar.position.y = 1.4;
  g.add(collar);
  // horse-head silhouette, extruded
  const pts = [
    [-1.5, 0], [1.7, 0], [1.45, 1.2], [0.85, 2.0], [1.05, 3.3], [1.8, 4.5],
    [2.2, 5.5], [1.9, 6.1], [1.1, 5.9], [0.5, 6.6], [0.15, 7.4], [-0.35, 7.5],
    [-0.55, 7.0], [-1.5, 6.4], [-2.6, 5.7], [-2.95, 5.0], [-2.3, 4.85],
    [-1.5, 4.4], [-1.85, 3.2], [-1.6, 1.5], [-1.85, 0.8],
  ];
  const shape = new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 1.35, bevelEnabled: true, bevelThickness: 0.22, bevelSize: 0.22, bevelSegments: 3,
  });
  geo.center();
  const head = new THREE.Mesh(geo, mat(0x5a7fe8));
  head.position.y = 5.4;
  head.rotation.y = Math.PI / 2;
  g.add(head);
  return g;
}

function vase() {
  const profile = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const r = 1.6 + 1.5 * Math.sin(t * Math.PI * 0.9) + 0.5 * Math.sin(t * 9);
    profile.push(new THREE.Vector2(Math.max(r, 0.7), t * 8));
  }
  const geo = new THREE.LatheGeometry(profile, 96);
  // twist
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const a = y * 0.22;
    pos.setXYZ(i, x * Math.cos(a) - z * Math.sin(a), y, x * Math.sin(a) + z * Math.cos(a));
  }
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, mat(0x27b3c9, { roughness: 0.35 }));
  m.material.side = THREE.DoubleSide;
  const g = new THREE.Group();
  g.add(m);
  return g;
}

function gearMesh(teeth, rOut, rIn, thick, color) {
  const shape = new THREE.Shape();
  const rTip = rOut, rRoot = rOut * 0.82;
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const angs = [a, a + step * 0.22, a + step * 0.32, a + step * 0.62, a + step * 0.72];
    const rads = [rRoot, rRoot, rTip, rTip, rRoot];
    for (let j = 0; j < angs.length; j++) {
      const x = Math.cos(angs[j]) * rads[j], y = Math.sin(angs[j]) * rads[j];
      if (i === 0 && j === 0) shape.moveTo(x, y); else shape.lineTo(x, y);
    }
  }
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, rIn, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: thick, bevelEnabled: false });
  geo.rotateX(-Math.PI / 2);
  return new THREE.Mesh(geo, mat(color));
}

function gear() {
  const g = new THREE.Group();
  const g1 = gearMesh(14, 3.4, 0.7, 1.2, 0xf0a441);
  g1.position.set(-2.1, 1.2, 0);
  const g2 = gearMesh(9, 2.25, 0.55, 1.2, 0xe85c8f);
  g2.position.set(3.15, 1.2, 0);
  g2.rotation.y = 0.22;
  g.add(g1, g2);
  return g;
}

function stand() {
  const g = new THREE.Group();
  const m = mat(0x5a7fe8);
  const back = new THREE.Mesh(new THREE.BoxGeometry(6, 7.5, 0.5), m);
  back.rotation.x = -Math.PI / 7;
  back.position.y = 3.6;
  const lip = new THREE.Mesh(new THREE.BoxGeometry(6, 0.9, 1.6), m);
  lip.position.set(0, 0.7, 2.35);
  lip.rotation.x = -Math.PI / 7;
  const foot = new THREE.Mesh(new THREE.BoxGeometry(6, 0.5, 4.6), mat(0x3d5bb8));
  foot.position.y = 0.25;
  g.add(back, lip, foot);
  return g;
}

function planter() {
  const g = new THREE.Group();
  const outer = new THREE.Mesh(new THREE.CylinderGeometry(3, 2.5, 4.4, 6, 1), mat(0x35c4a8, { flat: true }));
  outer.position.y = 2.7;
  const inner = new THREE.Mesh(new THREE.CylinderGeometry(2.55, 2.2, 4.4, 6, 1), mat(0x1f7a68, { flat: true }));
  inner.position.y = 2.85;
  const tray = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.7, 0.5, 6, 1), mat(0x2aa78e, { flat: true }));
  tray.position.y = 0.25;
  g.add(outer, inner, tray);
  return g;
}

function d20() {
  const g = new THREE.Group();
  const die = new THREE.Mesh(new THREE.IcosahedronGeometry(3.4, 0), mat(0xb15ce8, { flat: true, roughness: 0.35 }));
  die.position.y = 3.4;
  die.rotation.set(0.4, 0.3, 0.1);
  g.add(die);
  return g;
}

function clip() {
  const g = new THREE.Group();
  const m = mat(0x27b3c9);
  for (let i = 0; i < 3; i++) {
    const c = new THREE.Group();
    const r = 1.0 + i * 0.45;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.38, 20, 48, Math.PI * 1.55), m);
    ring.rotation.z = Math.PI * 0.72;
    ring.position.y = r + 0.4;
    const base = new THREE.Mesh(new THREE.BoxGeometry(r * 2.3, 0.4, 1.4), mat(0x1b8ba0));
    base.position.y = 0.2;
    c.add(ring, base);
    c.position.x = (i - 1) * 4.4;
    g.add(c);
  }
  return g;
}

function roundedTag(w, h, d, r) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.absarc(w / 2 - r, -h / 2 + r, r, -Math.PI / 2, 0);
  s.lineTo(w / 2, h / 2 - r);
  s.absarc(w / 2 - r, h / 2 - r, r, 0, Math.PI / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.absarc(-w / 2 + r, h / 2 - r, r, Math.PI / 2, Math.PI);
  s.lineTo(-w / 2, -h / 2 + r);
  s.absarc(-w / 2 + r, -h / 2 + r, r, Math.PI, Math.PI * 1.5);
  return new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: false });
}

function keychain() {
  const g = new THREE.Group();
  const tagGeo = roundedTag(7.5, 3.2, 0.7, 1.0);
  tagGeo.rotateX(-Math.PI / 2);
  const tag = new THREE.Mesh(tagGeo, mat(0xf0a441));
  tag.position.y = 0.35;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.32, 16, 40), mat(0xe85c8f));
  ring.rotation.x = Math.PI / 2;
  ring.position.set(-4.4, 0.35, 0);
  g.add(tag, ring);
  // raised "text" blocks
  const tm = mat(0x0a2540);
  [[-1.9, 0.9], [-0.6, 1.1], [0.7, 0.8], [2.0, 1.0]].forEach(([x, w]) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(w, 0.35, 1.5), tm);
    b.position.set(x, 0.85, 0);
    g.add(b);
  });
  return g;
}

function torusknot() {
  const g = new THREE.Group();
  const k = new THREE.Mesh(
    new THREE.TorusKnotGeometry(2.6, 0.72, 200, 28, 2, 3),
    mat(0xb15ce8, { roughness: 0.3, metalness: 0.15 })
  );
  k.position.y = 3.6;
  g.add(k);
  return g;
}

function hook() {
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new THREE.BoxGeometry(2.6, 7, 0.6), mat(0x3d5bb8));
  plate.position.y = 3.5;
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 5.8, 0.3),
    new THREE.Vector3(0, 5.6, 2.2),
    new THREE.Vector3(0, 4.1, 3.1),
    new THREE.Vector3(0, 2.6, 2.4),
    new THREE.Vector3(0, 2.3, 1.4),
  ]);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.55, 16), mat(0x5a7fe8));
  g.add(plate, tube);
  return g;
}

function penpot() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.4, 5.2, 48), mat(0x35c4a8));
  body.position.y = 2.6;
  const cavity = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.0, 5.2, 48), mat(0x14655a));
  cavity.position.y = 2.8;
  g.add(body, cavity);
  const fm = mat(0x2aa78e);
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const f = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.3, 5.2, 10), fm);
    f.position.set(Math.cos(a) * 2.55, 2.6, Math.sin(a) * 2.55);
    g.add(f);
  }
  return g;
}

function tray() {
  const g = new THREE.Group();
  const colors = [0xe85c8f, 0xf0a441, 0x5a7fe8];
  for (let t = 0; t < 3; t++) {
    const tier = new THREE.Group();
    const bottom = new THREE.Mesh(new THREE.BoxGeometry(7, 0.4, 5), mat(colors[t]));
    tier.add(bottom);
    const wallM = mat(colors[t]);
    const w1 = new THREE.Mesh(new THREE.BoxGeometry(7, 1.2, 0.35), wallM);
    w1.position.set(0, 0.6, 2.35);
    const w2 = w1.clone(); w2.position.z = -2.35;
    const w3 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.2, 5), wallM);
    w3.position.set(3.35, 0.6, 0);
    const w4 = w3.clone(); w4.position.x = -3.35;
    tier.add(w1, w2, w3, w4);
    tier.position.y = 0.2 + t * 2.1;
    g.add(tier);
    if (t < 2) {
      [[3.1, 2.1], [-3.1, 2.1], [3.1, -2.1], [-3.1, -2.1]].forEach(([x, z]) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.7, 12), mat(0x0a2540));
        post.position.set(x, 1.3 + t * 2.1, z);
        g.add(post);
      });
    }
  }
  return g;
}

function flexi() {
  const g = new THREE.Group();
  // articulated gecko: head + shrinking body segments along an S-curve
  const bodyM = mat(0x58b368);
  const altM = mat(0x2e7d3f);
  const pts = [];
  for (let i = 0; i <= 9; i++) {
    const t = i / 9;
    pts.push(new THREE.Vector3(t * 10 - 5, 0, Math.sin(t * Math.PI * 1.6) * 2.2));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    const p = curve.getPoint(t);
    const r = 1.35 * (1 - t * 0.75) + 0.15;
    const seg = new THREE.Mesh(new THREE.SphereGeometry(r, 24, 18), i % 2 ? altM : bodyM);
    seg.scale.y = 0.75;
    seg.position.set(p.x, r * 0.75, p.z);
    g.add(seg);
  }
  const head = new THREE.Mesh(new THREE.SphereGeometry(1.6, 28, 20), bodyM);
  head.scale.set(1.25, 0.8, 1);
  const hp = curve.getPoint(0);
  head.position.set(hp.x - 1.6, 1.15, hp.z);
  g.add(head);
  const eyeM = mat(0x0a2540);
  [[-0.5, 1], [-0.5, -1]].forEach(([dx, dz]) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.3, 12, 10), eyeM);
    eye.position.set(hp.x - 2.2 + dx, 1.9, hp.z + dz * 0.9);
    g.add(eye);
  });
  // legs: four small flattened spheres
  const legM = mat(0x2e7d3f);
  [[0.12, 1], [0.12, -1], [0.55, 1], [0.55, -1]].forEach(([t, side]) => {
    const p = curve.getPoint(t);
    const leg = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 10), legM);
    leg.scale.set(1.5, 0.5, 0.8);
    leg.position.set(p.x, 0.3, p.z + side * 1.7);
    g.add(leg);
  });
  // keychain ring at the tail
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.22, 14, 32), mat(0xf0a441));
  const tp = curve.getPoint(1);
  ring.rotation.x = Math.PI / 2;
  ring.position.set(tp.x + 1.1, 0.35, tp.z);
  g.add(ring);
  return g;
}

function penguin() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(3, 40, 30), mat(0x2b5ea8));
  body.scale.set(1, 1.15, 1);
  body.position.y = 3.1;
  const belly = new THREE.Mesh(new THREE.SphereGeometry(2.55, 36, 26), mat(0xf3f6fa));
  belly.scale.set(1, 1.1, 1);
  belly.position.set(0.75, 2.9, 0);
  const head = new THREE.Mesh(new THREE.SphereGeometry(1.9, 32, 24), mat(0x2b5ea8));
  head.position.set(0.3, 6.7, 0);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.3, 20), mat(0xf0a441));
  beak.rotation.z = -Math.PI / 2;
  beak.position.set(2.3, 6.6, 0);
  const eyeM = mat(0x0a2540);
  [[1.6, 7.3, 0.8], [1.6, 7.3, -0.8]].forEach(p => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 10), eyeM);
    eye.position.set(...p);
    g.add(eye);
  });
  const wingM = mat(0x1f4a8a);
  [1, -1].forEach(s => {
    const wing = new THREE.Mesh(new THREE.SphereGeometry(1.5, 20, 14), wingM);
    wing.scale.set(0.45, 1.15, 0.8);
    wing.position.set(-0.4, 3.6, s * 2.8);
    wing.rotation.x = s * 0.25;
    g.add(wing);
  });
  g.add(body, belly, head, beak);
  return g;
}

function pillbox() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(14.5, 0.5, 4.2), mat(0x27b3c9));
  base.position.y = 0.25;
  g.add(base);
  const colors = [0xe85c8f, 0xf0a441, 0xf5d442, 0x58b368, 0x35c4a8, 0x5a7fe8, 0xb15ce8];
  for (let i = 0; i < 7; i++) {
    const x = -6 + i * 2;
    const cup = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.7, 3.6), mat(colors[i]));
    cup.position.set(x, 1.3, 0);
    const cavity = new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.7, 3.2), mat(0x0a2540, { roughness: 0.8 }));
    cavity.position.set(x, 1.5, 0);
    // lid: open on the first cup, closed on the rest
    const lid = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.25, 3.6), mat(colors[i]));
    if (i === 0) {
      lid.position.set(x - 0.85, 2.9, 0);
      lid.rotation.z = Math.PI / 3;
    } else {
      lid.position.set(x, 2.25, 0);
    }
    g.add(cup, cavity, lid);
  }
  return g;
}

function wallet() {
  const g = new THREE.Group();
  const shellGeo = roundedTag(6.4, 9.4, 1.5, 0.9);
  shellGeo.rotateX(-Math.PI / 2);
  const shell = new THREE.Mesh(shellGeo, mat(0x3d5bb8));
  shell.position.y = 0.75;
  g.add(shell);
  // slot lip
  const lip = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.5, 0.5), mat(0x2b4390));
  lip.position.set(0, 1.55, -3.4);
  g.add(lip);
  // cards peeking out
  const cardColors = [0xf3f6fa, 0xf0a441, 0x35c4a8];
  cardColors.forEach((c, i) => {
    const card = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.14, 8.6), mat(c, { roughness: 0.4 }));
    card.position.set(0, 1.05 + i * 0.17, -1.3 - i * 0.7);
    g.add(card);
  });
  return g;
}

function pageholder() {
  const g = new THREE.Group();
  // thumb ring
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.5, 18, 40), mat(0xe85c8f));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.5;
  g.add(ring);
  // two wings that hold the pages open
  [1, -1].forEach(s => {
    const wingShape = new THREE.Shape();
    wingShape.moveTo(0, 0);
    wingShape.quadraticCurveTo(s * 3.2, 0.7, s * 5.2, 3.2);
    wingShape.quadraticCurveTo(s * 3.4, 1.9, s * 1.2, 1.7);
    wingShape.lineTo(0, 0);
    const geo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.5, bevelEnabled: false });
    geo.rotateX(-Math.PI / 2);
    const wing = new THREE.Mesh(geo, mat(0xc72e6b));
    wing.position.set(s * 1.1, 0.5, 0.25);
    g.add(wing);
  });
  return g;
}

function hatrack() {
  const g = new THREE.Group();
  const railGeo = roundedTag(2.4, 13, 0.8, 1.0);
  const rail = new THREE.Mesh(railGeo, mat(0x3d5bb8));
  rail.rotation.x = 0; // faces the viewer like a wall rail
  rail.position.set(0, 7, -0.4);
  g.add(rail);
  const hookM = mat(0x5a7fe8);
  [2.5, 7, 11.5].forEach(y => {
    const hook = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.4, 14, 32, Math.PI * 1.25), hookM);
    hook.rotation.y = Math.PI / 2;
    hook.rotation.z = Math.PI * 0.6;
    hook.position.set(0, y, 1.1);
    g.add(hook);
    const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.3, 12), mat(0x8898aa, { metalness: 0.5, roughness: 0.3 }));
    screw.rotation.x = Math.PI / 2;
    screw.position.set(0.85, y + 1.2, -0.2);
    g.add(screw);
  });
  return g;
}

const GENERATORS = { knight, vase, gear, stand, planter, d20, clip, keychain, torusknot, hook, penpot, tray, flexi, penguin, pillbox, wallet, pageholder, hatrack };

export function buildModel(kind) {
  const fn = GENERATORS[kind] || d20;
  const group = fn();
  // normalize: center on x/z, keep sitting on y=0
  const box = new THREE.Box3().setFromObject(group);
  const c = box.getCenter(new THREE.Vector3());
  group.position.x -= c.x;
  group.position.z -= c.z;
  group.position.y -= box.min.y;
  return group;
}

function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 6, 64, 64, 62);
  g.addColorStop(0, "rgba(10, 37, 64, 0.30)");
  g.addColorStop(0.55, "rgba(10, 37, 64, 0.12)");
  g.addColorStop(1, "rgba(10, 37, 64, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export function makeScene(kind, bg = 0xf6f9fc) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(bg);

  const model = buildModel(kind);
  scene.add(model);

  // soft contact shadow so renders read like product shots
  const mBox = new THREE.Box3().setFromObject(model);
  const mSize = mBox.getSize(new THREE.Vector3());
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.01;
  shadow.scale.set(Math.max(mSize.x, mSize.z) * 1.7, Math.max(mSize.x, mSize.z) * 1.7, 1);
  scene.add(shadow);

  const hemi = new THREE.HemisphereLight(0xffffff, 0xd8e2ec, 1.1);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(6, 10, 7);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xc4d4ff, 0.5);
  fill.position.set(-7, 4, -6);
  scene.add(fill);

  // fit info for the camera
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const radius = Math.max(size.x, size.y, size.z) * 0.62;

  return { scene, model, center, radius };
}
