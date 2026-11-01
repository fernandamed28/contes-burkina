import './style.css';
import { pageAccueil, pageBibliotheque, pageParticiper, pageAPropos } from './pages/pages.js';
import { pageCarte } from './pages/carte.js';
import { pageConte } from './pages/conte.js';
import { demarrerAmbiance, arreterAmbiance, ambianceActive } from './audio.js';

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

// Ambiance sonore (démarre seulement après une action de l'utilisateur, comme l'exigent les navigateurs)
const son = document.getElementById('soundToggle');
son.addEventListener('click', () => {
  if (ambianceActive()) arreterAmbiance();
  else demarrerAmbiance();
  son.setAttribute('aria-pressed', ambianceActive());
});
