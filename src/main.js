import './style.css';
import { pageAccueil, pageBibliotheque, pageParticiper, pageAPropos } from './pages/pages.js';
import { pageCarte } from './pages/carte.js';
import { pageConte } from './pages/conte.js';
import { demarrerAmbiance, arreterAmbiance, ambianceActive } from './audio.js';
import { astuceMusique } from './astuce.js';

const ROUTES = {
  '': pageAccueil,
  carte: pageCarte,
  bibliotheque: pageBibliotheque,
  conte: pageConte,
  participer: pageParticiper,
  'a-propos': pageAPropos,
};

const app = document.getElementById('app');
let nettoyage = null;

async function router() {
  const [route = '', ...params] = location.hash.replace(/^#\/?/, '').split('/');
  const page = ROUTES[route] || pageAccueil;
  if (typeof nettoyage === 'function') nettoyage();
  nettoyage = null;
  document.body.dataset.page = route || 'accueil';
  document.querySelectorAll('.nav a').forEach((a) => a.classList.toggle('actif', a.dataset.route === route));
  document.querySelector('.nav').classList.remove('ouvert');
  window.scrollTo(0, 0);
  nettoyage = await page(app, params.map(decodeURIComponent));
  app.focus({ preventScroll: true });
}

window.addEventListener('hashchange', router);
router();

// Menu mobile
const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => {
  const ouvert = document.querySelector('.nav').classList.toggle('ouvert');
  toggle.setAttribute('aria-expanded', ouvert);
});

// Mode clair / sombre (sombre par défaut ; le choix est mémorisé dans ce navigateur)
const themeBouton = document.getElementById('themeToggle');
function appliquerTheme(clair) {
  if (clair) document.documentElement.dataset.theme = 'light';
  else delete document.documentElement.dataset.theme;
  const label = clair ? 'Passer en mode sombre' : 'Passer en mode clair';
  themeBouton.setAttribute('aria-label', label);
  themeBouton.title = label;
}
appliquerTheme(document.documentElement.dataset.theme === 'light');
themeBouton.addEventListener('click', () => {
  const clair = document.documentElement.dataset.theme !== 'light';
  appliquerTheme(clair);
  try {
    localStorage.setItem('theme', clair ? 'light' : 'dark');
  } catch {}
});

// Ambiance sonore (démarre seulement après une action de l'utilisateur, comme l'exigent les navigateurs)
const son = document.getElementById('soundToggle');
function majBoutonSon(actif) {
  son.setAttribute('aria-pressed', String(actif));
  const label = actif ? 'Couper la musique' : 'Activer la musique';
  son.setAttribute('aria-label', label);
  son.title = label;
}
majBoutonSon(false);
window.addEventListener('ambiance', (e) => majBoutonSon(e.detail));
son.addEventListener('click', () => (ambianceActive() ? arreterAmbiance() : demarrerAmbiance()));

astuceMusique();
