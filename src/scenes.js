// Moteur d'illustrations : chaque scène est composée en SVG (style « ombres chinoises »)
// à partir d'une description (ciel, sol, décor, acteurs), puis animée avec GSAP.
import { gsap } from 'gsap';

gsap.config({ nullTargetWarn: false });

const W = 800;
const H = 450;
const SOL = 360; // ligne d'horizon des personnages
const INK = '#1a110c';

const CIELS = {
  aube: ['#2b2d5c', '#e78a5a', '#f6c27a'],
  jour: ['#3f7cac', '#9fcbe3', '#f3e3b8'],
  crepuscule: ['#3a1f4f', '#c2562f', '#f4a259'],
  nuit: ['#060a1c', '#1b2552', '#5a5a8c'],
  secheresse: ['#b9742f', '#e3ab5c', '#f6dfa0'],
  orage: ['#232a35', '#46525f', '#7d8580'],
  pluie: ['#3c4860', '#6f7d8f', '#aab0a6'],
};

const SOLS = {
  savane: ['#8a6430', '#5b3d1c'],
  sable: ['#d4a35f', '#a8743a'],
  roche: ['#9a5a37', '#5e3320'],
  eau: ['#6d5530', '#3b2a16'],
};

// ---------- Décor ----------
const decor = {
  collines: () => `<path class="far" d="M0 300 Q120 250 240 290 T480 280 T800 270 V${SOL + 10} H0Z" fill="${INK}" opacity=".22"/>`,
  dunes: () => `<path class="far" d="M0 320 Q160 270 320 310 T640 300 T800 305 V${SOL + 10} H0Z" fill="#7a4e22" opacity=".35"/>`,
  falaise: () =>
    `<path d="M0 120 L90 140 L120 230 L150 ${SOL + 20} H0Z" fill="${INK}" opacity=".85"/>
     <path d="M800 100 L700 130 L680 240 L640 ${SOL + 20} H800Z" fill="${INK}" opacity=".85"/>`,
  baobab: (x) =>
    `<g transform="translate(${x} ${SOL})"><g class="sway">
      <path d="M-22 0 C-18 -40 -26 -80 -14 -110 L14 -110 C26 -80 18 -40 22 0Z" fill="${INK}"/>
      <path d="M-12 -105 L-55 -150 M-4 -110 L-20 -165 M6 -110 L25 -168 M12 -104 L60 -145" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
      <g fill="${INK}"><circle cx="-58" cy="-152" r="16"/><circle cx="-20" cy="-170" r="18"/><circle cx="26" cy="-172" r="17"/><circle cx="63" cy="-148" r="15"/></g>
    </g></g>`,
  arbre: (x) =>
    `<g transform="translate(${x} ${SOL})"><g class="sway">
      <path d="M-6 0 L-4 -60 L4 -60 L6 0Z" fill="${INK}"/>
      <ellipse cx="0" cy="-85" rx="48" ry="34" fill="${INK}"/><ellipse cx="-30" cy="-70" rx="26" ry="18" fill="${INK}"/><ellipse cx="32" cy="-72" rx="24" ry="18" fill="${INK}"/>
    </g></g>`,
  acacia: (x) =>
    `<g transform="translate(${x} ${SOL})"><g class="sway">
      <path d="M-3 0 L-2 -55 L-30 -80 M-2 -55 L28 -82" stroke="${INK}" stroke-width="6" fill="none"/>
      <ellipse cx="0" cy="-88" rx="70" ry="12" fill="${INK}"/>
    </g></g>`,
  'arbre-mort': (x) =>
    `<g transform="translate(${x} ${SOL})" stroke="${INK}" stroke-linecap="round" fill="none">
      <path d="M0 0 L2 -70 L-30 -110 M2 -70 L35 -115 M-14 -88 L-30 -90 M20 -92 L38 -86" stroke-width="7"/>
    </g>`,
  case: (x, s = 1) =>
    `<g transform="translate(${x} ${SOL}) scale(${s})">
      <path d="M-34 0 V-38 H34 V0Z" fill="${INK}"/>
      <path d="M-46 -36 L0 -82 L46 -36Z" fill="${INK}"/>
      <path d="M-8 0 V-22 Q0 -30 8 -22 V0Z" fill="#f4a259" opacity=".35"/>
    </g>`,
  cases: (x) => decor.case(x - 70, 0.8) + decor.case(x, 1) + decor.case(x + 75, 0.7),
  grenier: (x) =>
    `<g transform="translate(${x} ${SOL})">
      <path d="M-24 0 V-12 M24 0 V-12" stroke="${INK}" stroke-width="5"/>
      <rect x="-30" y="-70" width="60" height="58" rx="14" fill="${INK}"/>
      <path d="M-40 -64 L0 -112 L40 -64Z" fill="${INK}"/>
    </g>`,
  palais: (x) =>
    `<g transform="translate(${x} ${SOL})" fill="${INK}">
      <path d="M-110 0 V-90 H110 V0Z"/>
      ${[-110, -66, -22, 22, 66].map((p) => `<path d="M${p} -90 L${p + 10} -120 L${p + 20} -90Z"/>`).join('')}
      <path d="M-40 -90 V-140 H40 V-90Z"/><path d="M-40 -140 L-30 -165 L-20 -140Z M20 -140 L30 -165 L40 -140Z"/>
      <path d="M-14 0 V-40 Q0 -55 14 -40 V0Z" fill="#f4a259" opacity=".4"/>
    </g>`,
  murailles: (x) =>
    `<g transform="translate(${x} ${SOL})" fill="${INK}">
      <path d="M-230 0 V-95 L-200 -100 L-190 -80 L-120 -92 L-110 -60 H-80 V0Z"/>
      <path d="M-40 0 V-110 L20 -115 L30 -90 H90 L100 -70 L140 -78 V0Z"/>
      <path d="M180 0 V-70 L230 -75 L240 -50 V0Z"/>
      <g stroke="#f3e3b8" stroke-opacity=".15" stroke-width="2">
        <path d="M-230 -30 H-80 M-230 -62 H-110 M-40 -30 H140 M-40 -60 H140 M-40 -90 H20"/>
      </g>
    </g>`,
  pics: (x) => {
    const aiguille = ([dx, h, w]) =>
      `<path d="M${dx - w / 2} 0 L${dx - w / 2.4} ${-h * 0.55} Q${dx - w / 3} ${-h} ${dx - w / 8} ${-h} Q${dx + w / 4} ${-h * 1.02} ${dx + w / 3} ${-h * 0.7} L${dx + w / 2} 0Z"/>`;
    const arriere = [[-320, 110, 60], [-250, 150, 52], [-120, 130, 70], [0, 160, 56], [130, 120, 64], [260, 145, 58], [340, 100, 50]];
    const avant = [[-280, 70, 48], [-200, 120, 40], [-150, 85, 54], [-60, 140, 46], [30, 95, 60], [90, 130, 42], [180, 80, 56], [230, 115, 40], [300, 75, 52]];
    return `<g transform="translate(${x} ${SOL})" fill="${INK}">
      <g opacity=".45">${arriere.map(aiguille).join('')}</g>${avant.map(aiguille).join('')}
    </g>`;
  },
  cascade: (x) =>
    `<g transform="translate(${x} 150)">
      <rect x="-26" y="0" width="52" height="${SOL - 140}" fill="#d9eef5" opacity=".55"/>
      ${[0, 1, 2, 3].map((i) => `<rect class="flow" x="${-22 + i * 12}" y="0" width="5" height="40" fill="#fff" opacity=".7"/>`).join('')}
    </g>`,
  mare: (x) =>
    `<g transform="translate(${x} ${SOL + 28})">
      <ellipse rx="210" ry="26" fill="#2f6f86" opacity=".9"/>
      <ellipse class="shimmer" rx="150" ry="6" cy="-4" fill="#bfe6ef" opacity=".35"/>
    </g>`,
  riviere: () => `<path d="M0 ${SOL + 30} Q200 ${SOL + 10} 400 ${SOL + 34} T800 ${SOL + 22} V${SOL + 50} Q400 ${SOL + 60} 0 ${SOL + 52}Z" fill="#2f6f86" opacity=".8"/>`,
  champ: (x) =>
    `<g transform="translate(${x} ${SOL})" stroke="${INK}" stroke-width="3" fill="none">
      ${Array.from({ length: 12 }, (_, i) => `<path class="sway" d="M${-165 + i * 30} 0 q-4 -25 2 -45 m-2 20 l-12 -8 m12 -4 l10 -10"/>`).join('')}
    </g>`,
  rochers: (x) =>
    `<g transform="translate(${x} ${SOL})" fill="${INK}"><path d="M-70 0 Q-60 -50 -20 -46 Q0 -70 30 -40 Q60 -36 70 0Z"/></g>`,
  feu: (x) =>
    `<g transform="translate(${x} ${SOL})">
      <circle class="glow" cy="-20" r="70" fill="#f4a259" opacity=".25"/>
      <path class="flame" d="M-18 0 Q-22 -30 0 -55 Q22 -30 18 0Z" fill="#f08a24"/>
      <path class="flame" d="M-9 0 Q-10 -18 0 -34 Q10 -18 9 0Z" fill="#ffd166"/>
      <path d="M-26 2 L26 -6 M-26 -6 L26 2" stroke="${INK}" stroke-width="6"/>
    </g>`,
  lumiere: (x) =>
    `<g transform="translate(${x} 0)">
      <path class="beam" d="M-20 0 L20 0 L90 ${SOL} L-90 ${SOL}Z" fill="#ffe7a3" opacity=".35"/>
      <circle class="glow" cy="${SOL - 50}" r="60" fill="#ffe7a3" opacity=".4"/>
    </g>`,
};

// ---------- Acteurs (silhouettes tournées vers la droite) ----------
const personne = (extra = '', robe = false) =>
  `<circle cx="0" cy="-78" r="9"/>
   ${robe ? '<path d="M-16 0 L-10 -64 H10 L16 0Z"/>' : '<path d="M-8 -66 H8 L6 -32 H-6Z"/><path d="M-5 -33 L-9 0 M5 -33 L9 0" stroke="currentColor" stroke-width="5"/>'}
   <path d="M-8 -62 L-14 -36 M8 -62 L14 -38" stroke="currentColor" stroke-width="4"/>
   ${extra}`;

const cheval = () =>
  `<path d="M-48 -52 Q-40 -72 0 -70 Q30 -70 40 -62 L58 -96 Q66 -102 74 -94 L70 -86 L52 -58 Q48 -44 34 -42 L-36 -40 Q-52 -42 -48 -52Z"/>
   <path class="leg" d="M-38 -44 L-44 0 M-24 -44 L-20 0 M24 -44 L18 0 M36 -44 L42 0" stroke="currentColor" stroke-width="5"/>
   <path d="M-48 -54 Q-70 -50 -66 -20" stroke="currentColor" stroke-width="5" fill="none"/>`;

const acteurs = {
  cheval,
  cavalier: () => cheval() + `<g transform="translate(-4 -60)"><circle cx="0" cy="-40" r="8"/><path d="M-7 -32 H7 L5 0 H-5Z"/></g>`,
  cavaliere: () =>
    cheval() +
    `<g transform="translate(-4 -60)"><circle cx="0" cy="-40" r="8"/><path d="M-8 -32 H8 L10 0 H-10Z"/><path d="M14 -60 L-6 10" stroke="currentColor" stroke-width="3"/></g>`,
  roi: () => personne('<path d="M-10 -86 Q0 -104 10 -86Z"/><path d="M18 -90 V0" stroke="currentColor" stroke-width="3"/>', true),
  guerriere: () => personne('<path d="M20 -110 L14 0" stroke="currentColor" stroke-width="3"/><path d="M17 -118 L23 -104 L15 -104Z"/>', true),
  chasseur: () => personne('<path d="M16 -90 Q34 -60 16 -30" stroke="currentColor" stroke-width="3" fill="none"/><path d="M16 -90 V-30" stroke="currentColor" stroke-width="1"/>'),
  femme: () => personne('<ellipse cx="0" cy="-92" rx="14" ry="6"/>', true),
  griot: () => personne('<ellipse cx="18" cy="-40" rx="10" ry="12"/><path d="M18 -50 V-110" stroke="currentColor" stroke-width="3"/>', true),
  berger: () => personne('<path d="M-14 -84 L0 -102 L14 -84Z"/><path d="M18 -80 L22 0" stroke="currentColor" stroke-width="3"/>'),
  foule: () =>
    [-34, 0, 34].map((dx, i) => `<g transform="translate(${dx} 0) scale(${[0.8, 0.9, 0.75][i]})">${personne('', i === 1)}</g>`).join(''),
  lievre: () =>
    `<path d="M-30 0 Q-34 -30 -6 -32 Q14 -32 18 -20 L30 -22 Q36 -18 30 -12 L18 -10 Q14 0 4 0Z"/>
     <path d="M20 -24 L18 -62 Q22 -66 26 -60 L26 -24Z M26 -24 L32 -58 Q36 -60 38 -54 L32 -22Z"/>`,
  hyene: () =>
    `<path d="M-50 -24 Q-48 -56 -10 -58 Q20 -58 34 -48 L56 -50 Q66 -46 60 -36 L42 -32 Q30 -24 20 -24Z"/>
     <path d="M30 -56 L34 -68 L40 -54Z"/>
     <path class="leg" d="M-44 -26 L-46 0 M-32 -26 L-30 0 M14 -30 L10 0 M26 -30 L30 0" stroke="currentColor" stroke-width="5"/>
     <path d="M-50 -26 Q-64 -20 -60 -8" stroke="currentColor" stroke-width="4" fill="none"/>`,
  crocodile: () =>
    `<path d="M-90 -4 Q-60 -12 -40 -14 Q-10 -22 20 -18 L60 -16 Q80 -14 86 -8 L60 -6 Q30 -2 -40 -2Z"/>
     ${[-30, -10, 10, 30].map((d) => `<path d="M${d} -18 l5 -6 l5 6Z"/>`).join('')}
     <path class="leg" d="M-20 -4 L-28 4 M30 -4 L22 4" stroke="currentColor" stroke-width="4"/>`,
  silure: () =>
    `<g transform="translate(0 30)"><path d="M-60 0 Q-20 -18 30 -10 Q50 -6 56 0 Q50 6 30 10 Q-20 18 -60 0 L-78 -12 L-74 0 L-78 12Z" fill="#0d2a33"/>
     <path d="M54 0 Q70 6 80 2 M54 2 Q66 14 76 16" stroke="#0d2a33" stroke-width="2" fill="none"/></g>`,
  zebu: () =>
    `<path d="M-50 -36 Q-46 -62 -10 -62 Q0 -76 12 -62 L36 -60 Q50 -66 60 -56 Q62 -46 52 -40 L36 -32 Q-30 -26 -50 -36Z"/>
     <path d="M50 -62 Q46 -78 56 -84 M58 -62 Q62 -78 72 -80" stroke="currentColor" stroke-width="3" fill="none"/>
     <path class="leg" d="M-40 -34 L-42 0 M-26 -32 L-24 0 M22 -32 L20 0 M34 -34 L38 0" stroke="currentColor" stroke-width="5"/>`,
  antilope: () =>
    `<path d="M-40 -46 Q-38 -64 -8 -64 Q14 -64 26 -58 L38 -78 Q44 -84 52 -80 L56 -72 L44 -52 Q38 -44 26 -44 L-30 -42 Q-42 -40 -40 -46Z"/>
     <path d="M44 -82 Q36 -104 22 -116 M50 -82 Q46 -104 34 -118" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
     <circle cx="47" cy="-74" r="2.4" fill="#f3e3b8"/>
     <path class="leg" d="M-32 -44 L-36 0 M-20 -44 L-18 0 M18 -46 L14 0 M28 -46 L32 0" stroke="currentColor" stroke-width="3.5"/>
     <path d="M-40 -50 Q-50 -48 -48 -36" stroke="currentColor" stroke-width="3" fill="none"/>`,
  oiseau: () => `<g transform="translate(0 -230)"><path class="wing" d="M-18 0 Q-9 -10 0 0 Q9 -10 18 0" stroke="currentColor" stroke-width="3" fill="none"/></g>`,
  masque: () =>
    `<g fill="#3d5a2a">
      <path d="M-26 0 Q-30 -60 -14 -110 Q0 -128 14 -110 Q30 -60 26 0Z"/>
      ${Array.from({ length: 9 }, (_, i) => `<path class="leaf" d="M${-24 + i * 6} ${-10 - (i % 3) * 30} q-8 6 -14 18 q10 -2 14 -18Z" fill="#5e8a3a"/>`).join('')}
      <circle cx="0" cy="-104" r="4" fill="#f3e3b8"/>
    </g>`,
};

function ciel(type) {
  const [a, b, c] = CIELS[type] || CIELS.jour;
  let astre = '';
  if (type === 'nuit') {
    const etoiles = Array.from({ length: 60 }, () => {
      const x = Math.random() * W;
      const y = Math.random() * 220;
      return `<circle class="star" cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(Math.random() * 1.4 + 0.4).toFixed(1)}" fill="#fff"/>`;
    }).join('');
    astre = etoiles + `<circle class="astre" cx="640" cy="80" r="26" fill="#f4ecd0"/><circle cx="652" cy="72" r="24" fill="${a}" opacity=".9"/>`;
  } else if (type === 'aube') astre = `<circle class="astre sun" cx="560" cy="300" r="40" fill="#ffd27a"/>`;
  else if (type === 'crepuscule') astre = `<circle class="astre sun" cx="240" cy="300" r="56" fill="#ff8c42" opacity=".9"/>`;
  else if (type === 'jour') astre = `<circle class="astre" cx="660" cy="80" r="30" fill="#fff4cf"/>`;
  else if (type === 'secheresse') astre = `<circle class="astre heat" cx="400" cy="90" r="48" fill="#fff8e1"/><circle class="glow" cx="400" cy="90" r="90" fill="#fff8e1" opacity=".25"/>`;
  else if (type === 'orage') astre = `<rect class="eclair" width="${W}" height="${H}" fill="#fff" opacity="0"/>`;

  let nuages = '';
  if (['jour', 'orage', 'pluie', 'aube'].includes(type)) {
    const col = type === 'jour' || type === 'aube' ? '#ffffff' : '#1f2630';
    const op = type === 'jour' ? 0.6 : 0.5;
    nuages = [80, 360, 600]
      .map((x, i) => `<g class="nuage" opacity="${op}" fill="${col}"><ellipse cx="${x}" cy="${60 + i * 25}" rx="70" ry="16"/><ellipse cx="${x + 30}" cy="${50 + i * 25}" rx="40" ry="16"/></g>`)
      .join('');
  }
  let pluie = '';
  if (type === 'pluie' || type === 'orage') {
    pluie = `<g class="pluie" stroke="#cfe3ef" stroke-width="1.2" opacity=".5">${Array.from({ length: 70 }, () => {
      const x = Math.random() * (W + 100) - 50;
      const y = Math.random() * H - H;
      return `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - 8).toFixed(0)}" y2="${(y + 22).toFixed(0)}"/>`;
    }).join('')}${Array.from({ length: 70 }, () => {
      const x = Math.random() * (W + 100) - 50;
      const y = Math.random() * H;
      return `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - 8).toFixed(0)}" y2="${(y + 22).toFixed(0)}"/>`;
    }).join('')}</g>`;
  }
  return {
    defs: `<linearGradient id="gCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`,
    fond: `<rect width="${W}" height="${H}" fill="url(#gCiel)"/>${astre}${nuages}`,
    avant: pluie,
  };
}

function sol(type, cielType) {
  const [a, b] = SOLS[type] || SOLS.savane;
  const assombri = cielType === 'nuit' ? 0.4 : cielType === 'orage' || cielType === 'pluie' ? 0.3 : 0;
  return {
    defs: `<linearGradient id="gSol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`,
    svg: `<path d="M0 ${SOL - 6} Q200 ${SOL - 16} 400 ${SOL - 4} T800 ${SOL - 8} V${H} H0Z" fill="url(#gSol)"/>
          ${type === 'savane' ? Array.from({ length: 40 }, (_, i) => `<path class="herbe" d="M${i * 20 + 6} ${SOL + 4} q2 -12 6 -16" stroke="${INK}" stroke-width="2" fill="none" opacity=".5"/>`).join('') : ''}
          ${assombri ? `<rect y="${SOL - 20}" width="${W}" height="${H}" fill="#000" opacity="${assombri}"/>` : ''}`,
  };
}

/** Construit le SVG complet d'une scène. */
let compteur = 0;
export function renderScene(scene) {
  const uid = `s${++compteur}`;
  const c = ciel(scene.ciel);
  const s = sol(scene.sol, scene.ciel);
  const decors = (scene.decor || [])
    .map(([type, x]) => (decor[type] ? `<g class="d">${decor[type](x ?? 400)}</g>` : ''))
    .join('');
  const acts = (scene.acteurs || [])
    .map((a, i) => {
      const fn = acteurs[a.t];
      if (!fn) return '';
      const y = a.t === 'silure' ? SOL + 4 : SOL;
      return `<g class="acteur" data-i="${i}" data-x="${a.x}" data-vers="${a.vers ?? ''}" transform="translate(${a.x} ${y})" fill="${a.t === 'masque' ? '#3d5a2a' : INK}" color="${INK}">
        <g class="corps">${fn()}</g></g>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
    <defs>${c.defs}${s.defs}</defs>
    ${c.fond}${s.svg}<g class="decor">${decors}</g><g class="acteurs">${acts}</g>${c.avant}
  </svg>`.replace(/gCiel|gSol/g, (m) => m + uid);
}

/** Anime une scène déjà insérée dans le DOM. Renvoie la timeline (à tuer au changement). */
export function animateScene(root) {
  const svg = root.querySelector('svg');
  if (!svg) return null;
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tl = gsap.timeline();
  const q = (sel) => svg.querySelectorAll(sel);

  tl.from(q('.decor > .d'), { opacity: 0, y: 20, duration: 0.8, stagger: 0.08, ease: 'power2.out' }, 0);
  tl.from(q('.acteur'), { opacity: 0, duration: 0.6, stagger: 0.12 }, 0.3);
  if (reduit) return tl;

  q('.acteur').forEach((el) => {
    const x = Number(el.dataset.x);
    const vers = el.dataset.vers;
    const y = el.transform.baseVal.consolidate()?.matrix.f ?? SOL;
    if (vers !== '') {
      const to = Number(vers);
      if (to < x) gsap.set(el.querySelector('.corps'), { scaleX: -1, transformOrigin: '0 0' });
      tl.fromTo(el, { attr: { transform: `translate(${x} ${y})` } }, { attr: { transform: `translate(${to} ${y})` }, duration: 5, ease: 'sine.inOut' }, 0.4);
      gsap.to(el.querySelectorAll('.leg'), { rotation: 8, transformOrigin: '50% 0', yoyo: true, repeat: 12, duration: 0.2 });
    }
    gsap.to(el.querySelector('.corps'), { y: -2, yoyo: true, repeat: -1, duration: 1.2 + Math.random(), ease: 'sine.inOut' });
  });

  gsap.to(q('.sway'), { rotation: 1.5, transformOrigin: '50% 100%', yoyo: true, repeat: -1, duration: 3, ease: 'sine.inOut', stagger: 0.3 });
  gsap.to(q('.herbe'), { rotation: 8, transformOrigin: '0% 100%', yoyo: true, repeat: -1, duration: 1.8, ease: 'sine.inOut', stagger: 0.05 });
  gsap.to(q('.star'), { opacity: 0.2, yoyo: true, repeat: -1, duration: () => 1 + Math.random() * 2, stagger: 0.05 });
  gsap.to(q('.flame'), { scaleY: 1.15, scaleX: 0.9, transformOrigin: '50% 100%', yoyo: true, repeat: -1, duration: 0.25, ease: 'none' });
  gsap.to(q('.glow'), { opacity: 0.4, yoyo: true, repeat: -1, duration: 0.9 });
  gsap.to(q('.nuage'), { x: 60, yoyo: true, repeat: -1, duration: 18, ease: 'sine.inOut' });
  gsap.to(q('.sun'), { y: -30, duration: 12, ease: 'sine.out' });
  gsap.to(q('.shimmer'), { scaleX: 0.7, opacity: 0.15, yoyo: true, repeat: -1, duration: 2, transformOrigin: '50% 50%' });
  gsap.to(q('.flow'), { y: 180, repeat: -1, duration: 1.2, ease: 'none', stagger: 0.3 });
  gsap.to(q('.pluie'), { y: H, x: -80, repeat: -1, duration: 1, ease: 'none' });
  gsap.to(q('.wing'), { scaleY: -1, transformOrigin: '50% 100%', yoyo: true, repeat: -1, duration: 0.3 });
  gsap.to(q('.leaf'), { rotation: 12, transformOrigin: '100% 0', yoyo: true, repeat: -1, duration: 0.4, stagger: 0.05 });
  gsap.to(q('.beam'), { opacity: 0.15, yoyo: true, repeat: -1, duration: 2 });
  q('.eclair').forEach((e) => {
    gsap.timeline({ repeat: -1, repeatDelay: 3 }).to(e, { opacity: 0.6, duration: 0.05 }).to(e, { opacity: 0, duration: 0.2 }).to(e, { opacity: 0.4, duration: 0.05 }).to(e, { opacity: 0, duration: 0.4 });
  });
  return tl;
}

export function killScene(root) {
  if (!root) return;
  gsap.killTweensOf(root.querySelectorAll('*'));
}
