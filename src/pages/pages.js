// Pages simples : accueil, bibliothèque, participer, à propos.
import { gsap } from 'gsap';
import { CONTES, CATEGORIES, LANGUES } from '../data/contes.js';
import { renderScene, animateScene } from '../scenes.js';
import { carteConte } from './conte.js';
import { demarrerAmbiance, ambianceActive } from '../audio.js';

export function pageAccueil(app) {
  const regions = new Set(CONTES.map((c) => c.region)).size;
  const langues = Object.keys(LANGUES).length - 1;
  app.innerHTML = `
  <section class="hero">
    <div class="hero-scene" id="heroScene" aria-hidden="true"></div>
    <div class="hero-contenu">
      <p class="sur-titre">Patrimoine oral du Burkina Faso</p>
      <h1>« Quand un vieillard meurt,<br/>c'est une bibliothèque qui brûle. »</h1>
      <p class="citation">— Amadou Hampâté Bâ</p>
      <p class="intro">Approche-toi du feu. Parcours le pays sur la carte, écoute les contes, les légendes et les récits historiques racontés dans les langues nationales, et choisis toi-même la suite de certaines histoires.</p>
      <div class="actions">
        <button class="btn grand" id="entrer">Entrer dans la veillée ♪</button>
        <a class="btn ghost grand" href="#/carte">Ouvrir la carte</a>
      </div>
    </div>
  </section>

  <section class="chiffres">
    <div><strong>${CONTES.length}</strong><span>récits</span></div>
    <div><strong>${regions}</strong><span>régions représentées</span></div>
    <div><strong>${langues}</strong><span>langues nationales</span></div>
    <div><strong>${CONTES.filter((c) => c.scenes.some((s) => s.choix)).length}</strong><span>récits interactifs</span></div>
  </section>

  <section class="page">
    <div class="trois">
      <a class="pilier" href="#/carte"><span class="pilier-ico">◎</span><h2>Une carte vivante</h2><p>Explore le Burkina Faso en 2D ou en 3D. Chaque point est un récit, placé là où on le raconte.</p></a>
      <a class="pilier" href="#/bibliotheque"><span class="pilier-ico">♪</span><h2>Des voix et des langues</h2><p>Mooré, Dioula, Fulfulde, Gulmancema… Des récits enregistrés par des conteurs, avec le texte en français.</p></a>
      <a class="pilier" href="#/conte/soamba-katr"><span class="pilier-ico">✦</span><h2>Une histoire dont tu choisis la suite</h2><p>Des illustrations animées et des choix à faire : à toi d'aider Soamba le lièvre à tromper Katr la hyène.</p></a>
    </div>
    <h2 class="section-titre">À découvrir ce soir</h2>
    <div class="cartes">${CONTES.slice(0, 3).map(carteConte).join('')}</div>
    <p class="centre"><a class="btn ghost" href="#/bibliotheque">Voir tous les récits →</a></p>
  </section>`;

  const hero = app.querySelector('#heroScene');
  hero.innerHTML = renderScene({
    ciel: 'nuit',
    sol: 'savane',
    decor: [['collines'], ['cases', 300], ['baobab', 720], ['feu', 560]],
    acteurs: [{ t: 'griot', x: 500 }, { t: 'foule', x: 640 }],
  });
  animateScene(hero);
  gsap.from('.hero-contenu > *', { opacity: 0, y: 24, stagger: 0.12, duration: 0.9, ease: 'power3.out' });
  gsap.from('.chiffres > div', { opacity: 0, y: 20, stagger: 0.1, delay: 0.6 });

  app.querySelector('#entrer').addEventListener('click', () => {
    if (!ambianceActive()) {
      demarrerAmbiance();
      document.querySelector('#soundToggle')?.setAttribute('aria-pressed', 'true');
    }
    location.hash = '#/carte';
  });
}

export function pageBibliotheque(app) {
  app.innerHTML = `
  <section class="page">
    <h1>Bibliothèque des récits</h1>
    <p class="muted">${CONTES.length} récits issus de la tradition orale burkinabè. Filtre par type, ou recherche un peuple, un lieu, un personnage.</p>
    <div class="biblio-filtres">
      <input type="search" id="q" placeholder="Rechercher…" aria-label="Rechercher" />
      <div class="segments" role="group" aria-label="Catégorie">
        <button class="seg actif" data-cat="">Tous</button>
        ${Object.entries(CATEGORIES).map(([k, c]) => `<button class="seg" data-cat="${k}">${c.icone} ${c.label}s</button>`).join('')}
      </div>
    </div>
    <div class="cartes" id="grille"></div>
  </section>`;
  let cat = '';
  const grille = app.querySelector('#grille');
  const maj = () => {
    const q = app.querySelector('#q').value.trim().toLowerCase();
    const res = CONTES.filter(
      (c) => (!cat || c.categorie === cat) && (!q || [c.titre, c.peuple, c.lieu, c.region, c.resume].join(' ').toLowerCase().includes(q)),
    );
    grille.innerHTML = res.length ? res.map(carteConte).join('') : '<p class="muted">Aucun récit ne correspond à ta recherche.</p>';
    gsap.from(grille.children, { opacity: 0, y: 16, stagger: 0.05, duration: 0.4 });
  };
  app.querySelector('#q').addEventListener('input', maj);
  app.querySelectorAll('.seg').forEach((b) =>
    b.addEventListener('click', () => {
      cat = b.dataset.cat;
      app.querySelectorAll('.seg').forEach((x) => x.classList.toggle('actif', x === b));
      maj();
    }),
  );
  maj();
}

export function pageParticiper(app) {
  app.innerHTML = `
  <section class="page etroite">
    <h1>Participer : prête ta voix aux contes</h1>
    <p>La plateforme ne vit que grâce aux conteurs. Chaque récit peut être enregistré dans les langues nationales : <strong>Mooré, Dioula, Fulfulde, Gulmancema</strong> et d'autres encore.</p>
    <div class="etapes">
      <div><span>1</span><h3>Choisis un récit</h3><p>Lis-le dans la <a href="#/bibliotheque">bibliothèque</a> pour bien connaître l'histoire.</p></div>
      <div><span>2</span><h3>Raconte-le dans ta langue</h3><p>Raconte-le à ta manière, comme lors d'une veillée, en 2 à 4 minutes. Inutile de traduire mot à mot.</p></div>
      <div><span>3</span><h3>Enregistre-toi</h3><p>Avec un téléphone, dans un endroit calme, à environ 20 cm de la bouche. Format MP3 ou M4A.</p></div>
      <div><span>4</span><h3>Envoie le fichier</h3><p>Nomme-le <code>identifiant-langue.mp3</code> (ex. <code>yennenga-moore.mp3</code>) et transmets-le à l'équipe du projet.</p></div>
    </div>
    <h2>Identifiants des récits</h2>
    <table class="tableau">
      <thead><tr><th>Récit</th><th>Identifiant</th><th>Langues attendues</th></tr></thead>
      <tbody>${CONTES.map((c) => `<tr><td>${c.titre}</td><td><code>${c.id}</code></td><td>${c.langues.filter((l) => l !== 'fr').map((l) => LANGUES[l]).join(', ')}</td></tr>`).join('')}</tbody>
    </table>
    <p class="muted">Tu connais un conte de ton village qui n'est pas encore ici ? Raconte-le aussi : chaque récit recueilli est un morceau de mémoire sauvé.</p>
  </section>`;
}

export function pageAPropos(app) {
  app.innerHTML = `
  <section class="page etroite">
    <h1>À propos du projet</h1>
    <p>Cette plateforme a été réalisée dans le cadre du module <strong>Web Multimédia</strong> du Master SI (Groupe 13). Elle a pour but de <strong>préserver, numériser et transmettre</strong> le patrimoine oral burkinabè : contes, légendes et récits historiques.</p>
    <h2>Ce que propose la plateforme</h2>
    <ul class="liste">
      <li><strong>Une carte interactive 2D/3D</strong> du Burkina Faso (MapLibre GL) : régions, récits géolocalisés, relief et vue en perspective.</li>
      <li><strong>Des illustrations animées</strong> générées en SVG et animées avec GSAP, dans un style d'ombres chinoises inspiré des veillées.</li>
      <li><strong>Des bandes sonores</strong> : récits enregistrés en langues nationales, voix de synthèse en français et ambiance de veillée générée en temps réel (Web Audio API).</li>
      <li><strong>Une expérience narrative interactive</strong> : le lecteur fait des choix dans le récit, avance à son rythme ou en lecture automatique, puis répond à un quiz.</li>
    </ul>
    <h2>Démarche et sources</h2>
    <p>Les récits sont des adaptations en français de traditions orales. Les versions varient d'un village, d'une famille ou d'un griot à l'autre : nous présentons ici une version, en indiquant toujours son origine. Les sources sont citées à la fin de chaque récit.</p>
    <p>Le fond de carte provient d'OpenStreetMap (via OpenFreeMap), le relief des AWS Terrain Tiles et les limites des régions de geoBoundaries (CC BY 4.0). Ces limites correspondent au découpage en <strong>13 régions</strong> : la réorganisation territoriale de 2025 (17 régions, 47 provinces) n'est pas encore disponible en données ouvertes. Elle pourra être intégrée dès sa publication.</p>
    <h2>Technologies</h2>
    <p class="tags">${['HTML5', 'CSS3', 'JavaScript (ES modules)', 'Vite', 'MapLibre GL JS', 'GSAP', 'Howler.js', 'Web Audio API', 'Web Speech API', 'SVG', 'GitHub Pages'].map((t) => `<span>${t}</span>`).join('')}</p>
    <h2>L'équipe — Groupe 13</h2>
    <p class="muted">Master SI · Module Web Multimédia · 2026</p>
  </section>`;
}
