// Son : ambiance de veillée générée en Web Audio (grillons, vent, notes de balafon)
// et narration (enregistrements en langues nationales via Howler, sinon voix de synthèse française).
import { Howl } from 'howler';

const BASE = import.meta.env.BASE_URL;

// ---------- Ambiance ----------
let ctx = null;
let master = null;
let timers = [];

function bruit(ctx, secondes = 2) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * secondes, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function vent() {
  const src = ctx.createBufferSource();
  src.buffer = bruit(ctx, 4);
  src.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = 400;
  const g = ctx.createGain();
  g.gain.value = 0.05;
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.08;
  const lfoG = ctx.createGain();
  lfoG.gain.value = 250;
  lfo.connect(lfoG).connect(f.frequency);
  src.connect(f).connect(g).connect(master);
  src.start();
  lfo.start();
}

function grillon() {
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  o.frequency.value = 4200 + Math.random() * 600;
  const g = ctx.createGain();
  g.gain.value = 0;
  o.connect(g).connect(master);
  for (let i = 0; i < 4; i++) {
    g.gain.setValueAtTime(0, t + i * 0.06);
    g.gain.linearRampToValueAtTime(0.012, t + i * 0.06 + 0.01);
    g.gain.linearRampToValueAtTime(0, t + i * 0.06 + 0.04);
  }
  o.start(t);
  o.stop(t + 0.3);
}

// Gamme pentatonique, timbre « boisé » proche du balafon
const NOTES = [392, 440, 523.25, 587.33, 659.25, 784];
function balafon() {
  const t = ctx.currentTime;
  const f = NOTES[Math.floor(Math.random() * NOTES.length)];
  [1, 3.9].forEach((ratio, i) => {
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f * ratio;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(i ? 0.015 : 0.06, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (i ? 0.25 : 0.9));
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 1);
  });
}

export function ambianceActive() {
  return !!ctx && ctx.state === 'running' && timers.length > 0;
}

export function demarrerAmbiance() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.8;
    master.connect(ctx.destination);
    vent();
  }
  ctx.resume();
  if (timers.length) return;
  timers.push(setInterval(() => Math.random() < 0.7 && grillon(), 450));
  timers.push(
    setInterval(() => {
      if (Math.random() < 0.6) {
        balafon();
        if (Math.random() < 0.5) setTimeout(balafon, 220);
      }
    }, 1600),
  );
}

export function arreterAmbiance() {
  timers.forEach(clearInterval);
  timers = [];
  ctx?.suspend();
}

export function volumeAmbiance(v) {
  if (master) master.gain.value = v;
}

// ---------- Narration ----------
let manifest = null;
export async function chargerManifest() {
  if (manifest) return manifest;
  try {
    const r = await fetch(`${BASE}audio/manifest.json`, { cache: 'no-cache' });
    manifest = r.ok ? await r.json() : {};
  } catch {
    manifest = {};
  }
  return manifest;
}

/** Fichier audio enregistré pour un conte et une langue, s'il existe. */
export function enregistrement(conteId, langue) {
  return manifest?.[conteId]?.[langue] ? `${BASE}audio/${manifest[conteId][langue]}` : null;
}

let howl = null;
let synthese = null;

export function arreterNarration() {
  howl?.stop();
  howl?.unload();
  howl = null;
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  synthese = null;
}

/** Joue l'enregistrement complet d'un conte dans une langue. */
export function jouerEnregistrement(src, { onend, onplay } = {}) {
  arreterNarration();
  howl = new Howl({ src: [src], html5: true, onend, onplay });
  howl.play();
  return howl;
}

export function pauseEnregistrement() {
  if (!howl) return false;
  if (howl.playing()) howl.pause();
  else howl.play();
  return howl.playing();
}

export function progressionEnregistrement() {
  if (!howl) return 0;
  const d = howl.duration();
  return d ? howl.seek() / d : 0;
}

export function syntheseDisponible() {
  return 'speechSynthesis' in window;
}

/** Lit un texte en français avec la voix de synthèse du navigateur. */
export function lireTexte(texte, { onend } = {}) {
  arreterNarration();
  if (!syntheseDisponible()) return;
  const u = new SpeechSynthesisUtterance(texte);
  u.lang = 'fr-FR';
  u.rate = 0.95;
  const voix = speechSynthesis.getVoices().find((v) => v.lang?.startsWith('fr'));
  if (voix) u.voice = voix;
  u.onend = () => onend?.();
  synthese = u;
  speechSynthesis.speak(u);
}

export function lectureEnCours() {
  return (howl && howl.playing()) || (synthese && speechSynthesis.speaking);
}
