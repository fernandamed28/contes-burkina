// Astuce de première visite : une bulle animée pointe le bouton musique,
// invite à l'activer, puis disparaît seule. Elle ne revient plus ensuite.
import { ambianceActive, demarrerAmbiance } from './audio.js';

const CLE = 'astuce-musique-vue';
const DUREE = 9000;

function dejaVue() {
  try {
    return localStorage.getItem(CLE) === '1';
  } catch {
    return false;
  }
}

function marquerVue() {
  try {
    localStorage.setItem(CLE, '1');
  } catch {}
}

export function astuceMusique() {
  if (dejaVue()) return;
  const bouton = document.getElementById('soundToggle');
  if (!bouton) return;

  setTimeout(() => {
    if (ambianceActive()) return marquerVue();

    const bulle = document.createElement('div');
    bulle.className = 'astuce';
    bulle.setAttribute('role', 'dialog');
    bulle.setAttribute('aria-live', 'polite');
    bulle.setAttribute('aria-label', 'Astuce : activer la musique');
    bulle.innerHTML = `
      <span class="astuce-fleche" aria-hidden="true"></span>
      <div class="astuce-corps">
        <span class="astuce-ico" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <div>
          <p class="astuce-titre">Pour plus d'immersion…</p>
          <p class="astuce-texte">Active la musique de kora avec ce bouton, et laisse-toi porter par la veillée.</p>
        </div>
      </div>
      <div class="astuce-actions">
        <button class="btn astuce-oui">♪ Activer la musique</button>
        <button class="astuce-non">Plus tard</button>
      </div>
      <span class="astuce-temps" aria-hidden="true"><span style="animation-duration:${DUREE}ms"></span></span>`;
    document.body.appendChild(bulle);
    bouton.classList.add('repere');

    const placer = () => {
      const r = bouton.getBoundingClientRect();
      const largeur = bulle.offsetWidth;
      const gauche = Math.max(12, Math.min(window.innerWidth - largeur - 12, r.right - largeur + 8));
      bulle.style.top = `${r.bottom + 14}px`;
      bulle.style.left = `${gauche}px`;
      // la flèche reste centrée sous le bouton, même si la bulle est décalée
      bulle.style.setProperty('--fleche', `${r.left + r.width / 2 - gauche}px`);
    };
    placer();
    window.addEventListener('resize', placer);
    requestAnimationFrame(() => bulle.classList.add('visible'));

    let minuteur = setTimeout(() => fermer(), DUREE);
    const fermer = () => {
      clearTimeout(minuteur);
      marquerVue();
      bouton.classList.remove('repere');
      window.removeEventListener('resize', placer);
      bouton.removeEventListener('click', fermer);
      bulle.classList.remove('visible');
      bulle.classList.add('sortie');
      setTimeout(() => bulle.remove(), 400);
    };

    // le survol suspend la disparition automatique, pour laisser le temps de lire
    bulle.addEventListener('mouseenter', () => {
      clearTimeout(minuteur);
      bulle.classList.add('pause');
    });
    bulle.addEventListener('mouseleave', () => {
      bulle.classList.remove('pause');
      minuteur = setTimeout(fermer, 2500);
    });
    bulle.querySelector('.astuce-oui').addEventListener('click', () => {
      demarrerAmbiance();
      fermer();
    });
    bulle.querySelector('.astuce-non').addEventListener('click', fermer);
    bouton.addEventListener('click', fermer);
  }, 1400);
}
