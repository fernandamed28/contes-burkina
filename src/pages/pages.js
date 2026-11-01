// Pages simples : accueil, bibliothèque, participer, à propos.
import { gsap } from 'gsap';
import { CONTES, CATEGORIES, LANGUES, CONTE_UNE } from '../data/contes.js';
import { renderScene, animateScene } from '../scenes.js';
import { carteConte } from './conte.js';
import { demarrerAmbiance, ambianceActive, chargerManifest, languesEnregistrees } from '../audio.js';

function blocUne() {
  const c = CONTE_UNE;
  const voix = languesEnregistrees(c.id);
  const attendues = c.langues.filter((l) => !voix.includes(l));
  return `
  <section class="une-section" aria-labelledby="titreUne">
    <div class="une-scene" id="uneScene" aria-hidden="true"></div>
    <div class="une-contenu">
      <p class="sur-titre">★ Récit à la une</p>
      <h2 id="titreUne">${c.titre}</h2>
      <p class="meta">${CATEGORIES[c.categorie].label} · ${c.peuple} · ${c.lieu} (${c.region})</p>
      <p>${c.resume}</p>
      <div class="une-voix">
        ${voix.map((l) => `<span class="voix-ok">🎧 ${LANGUES[l]}</span>`).join('')}
        ${attendues.map((l) => `<span class="voix-attente">${LANGUES[l]} bientôt</span>`).join('')}
      </div>
      <div class="actions">
        <a class="btn grand" href="#/conte/${c.id}">▶ Écouter le récit</a>
        <a class="btn ghost" href="#/carte/${c.id}">◎ Sur la carte</a>
      </div>
    </div>
  </section>`;
}

export async function pageAccueil(app) {
  await chargerManifest();
  const regions = new Set(CONTES.map((c) => c.region)).size;
  const langues = Object.keys(LANGUES).length - 1;
  app.innerHTML = `
  <section class="hero">
    <div class="hero-scene" id="heroScene" aria-hidden="true"></div>
    <div class="hero-contenu">
      <p class="sur-titre">Patrimoine oral du Burkina Faso</p>
      <h1 class="h1-citation">« Chaque vieillard qui meurt emporte dans la tombe un morceau du visage antique de ce continent. »</h1>
      <p class="citation">— Joseph Ki-Zerbo, historien burkinabè, <cite>Histoire de l'Afrique noire</cite> (1972)</p>
      <p class="intro">Approche-toi du feu. Parcours le pays sur la carte, écoute les contes, les légendes et les récits historiques racontés dans les langues nationales, et choisis toi-même la suite de certaines histoires.</p>
      <div class="actions">
        <button class="btn grand" id="entrer">Entrer dans la veillée ♪</button>
        <a class="btn ghost grand" href="#/carte">Ouvrir la carte</a>
      </div>
      <a class="hero-une" href="#/conte/${CONTE_UNE.id}"><span>★ À la une</span> ${CONTE_UNE.titre}, raconté en ${languesEnregistrees(CONTE_UNE.id).map((l) => LANGUES[l]).join(' et ') || 'français'} →</a>
    </div>
  </section>

  <section class="chiffres">
    <div><strong>${CONTES.length}</strong><span>récits</span></div>
    <div><strong>${regions}</strong><span>régions représentées</span></div>
    <div><strong>${langues}</strong><span>langues nationales</span></div>
    <div><strong>${CONTES.filter((c) => c.scenes.some((s) => s.choix)).length}</strong><span>récits interactifs</span></div>
  </section>

  ${blocUne()}

  <section class="page">
    <div class="trois">
      <a class="pilier" href="#/carte"><span class="pilier-ico">◎</span><h2>Une carte vivante</h2><p>Explore le Burkina Faso en 2D ou en 3D. Chaque point est un récit, placé là où on le raconte.</p></a>
      <a class="pilier" href="#/bibliotheque"><span class="pilier-ico">♪</span><h2>Des voix et des langues</h2><p>Mooré, Dioula, Fulfulde, Gulmancema… Des récits enregistrés par des conteurs, avec le texte en français.</p></a>
      <a class="pilier" href="#/conte/soamba-katr"><span class="pilier-ico">✦</span><h2>Une histoire dont tu choisis la suite</h2><p>Des illustrations animées et des choix à faire : à toi d'aider Soamba le lièvre à tromper Katr la hyène.</p></a>
    </div>
    <h2 class="section-titre">À découvrir ce soir</h2>
    <div class="cartes">${CONTES.filter((c) => !c.alaune).slice(0, 3).map((c) => carteConte(c)).join('')}</div>
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
  const uneScene = app.querySelector('#uneScene');
  uneScene.innerHTML = renderScene(CONTE_UNE.scenes[1]);
  animateScene(uneScene);
  gsap.from('.hero-contenu > *', { opacity: 0, y: 24, stagger: 0.12, duration: 0.9, ease: 'power3.out' });
  gsap.from('.chiffres > div', { opacity: 0, y: 20, stagger: 0.1, delay: 0.6 });

  app.querySelector('#entrer').addEventListener('click', () => {
    if (!ambianceActive()) demarrerAmbiance();
    location.hash = '#/carte';
  });
}

export async function pageBibliotheque(app) {
  await chargerManifest();
  app.innerHTML = `
  <section class="page">
    <h1>Bibliothèque des récits</h1>
    <p class="muted">${CONTES.length} récits issus de la tradition orale burkinabè. Filtre par type, ou recherche un peuple, un lieu, un personnage.</p>
    <div class="biblio-filtres">
      <input type="search" id="q" placeholder="Rechercher…" aria-label="Rechercher" />
      <div class="segments" role="group" aria-label="Catégorie">
        <button class="seg actif" data-cat="">Tous</button>
        ${Object.entries(CATEGORIES).map(([k, c]) => `<button class="seg" data-cat="${k}">${c.icone} ${c.pluriel}</button>`).join('')}
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
    grille.innerHTML = res.length
      ? res.map((c) => carteConte(c, { grand: c.alaune && !q && !cat })).join('')
      : '<p class="muted">Aucun récit ne correspond à ta recherche.</p>';
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

export async function pageParticiper(app) {
  await chargerManifest();
  const une = CONTE_UNE;
  const voix = languesEnregistrees(une.id);
  app.innerHTML = `
  <section class="page etroite">
    <h1>Participer : prête ta voix aux contes</h1>
    <div class="priorite">
      <p class="sur-titre">★ Priorité du moment</p>
      <h2>${une.titre}</h2>
      <p>C'est notre récit principal : nous voulons l'entendre dans le plus de langues possible. Raconte-le dans la tienne !</p>
      <ul class="etat-langues">
        ${une.langues.map((l) => `<li class="${voix.includes(l) ? 'ok' : ''}">${voix.includes(l) ? '✓' : '○'} ${LANGUES[l]}</li>`).join('')}
      </ul>
      <p class="muted">Identifiant à utiliser pour le fichier : <code>${une.id}-langue</code> (ex. <code>${une.id}-moore.mp3</code>).</p>
      <a class="btn" href="#/conte/${une.id}">Lire le récit</a>
    </div>
    <p>La plateforme ne vit que grâce aux conteurs. Chaque récit peut être enregistré dans les langues nationales : <strong>Mooré, Dioula, Fulfulde, Gulmancema</strong> et d'autres encore.</p>
    <div class="etapes">
      <div><span>1</span><h3>Choisis un récit</h3><p>Lis-le dans la <a href="#/bibliotheque">bibliothèque</a> pour bien connaître l'histoire.</p></div>
      <div><span>2</span><h3>Raconte le début dans ta langue</h3><p>Raconte le début du récit à ta manière, comme lors d'une veillée, en 1 à 2 minutes. Inutile de traduire mot à mot.</p></div>
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
    <p>La musique d'ambiance est « Nan Sira Madi » du joueur de kora malien Ballaké Sissoko (A COLORS SHOW, <a href="https://youtu.be/O_J4VUFahKs" target="_blank" rel="noopener">voir la vidéo</a>). Elle est utilisée ici à des fins pédagogiques ; tous les droits appartiennent à l'artiste et à ses ayants droit.</p>
    <p>Le fond de carte provient d'OpenStreetMap (via OpenFreeMap), le relief des AWS Terrain Tiles et les limites des régions de geoBoundaries (CC BY 4.0). Ces limites correspondent au découpage en <strong>13 régions</strong> : la réorganisation territoriale de 2025 (17 régions, 47 provinces) n'est pas encore disponible en données ouvertes. Elle pourra être intégrée dès sa publication.</p>
    <h2>Technologies</h2>
    <p class="tags">${['HTML5', 'CSS3', 'JavaScript (ES modules)', 'Vite', 'MapLibre GL JS', 'GSAP', 'Howler.js', 'Web Audio API', 'Web Speech API', 'SVG', 'GitHub Pages'].map((t) => `<span>${t}</span>`).join('')}</p>
    <h2>Pour aller plus loin</h2>
    <p>D'autres contes du Burkina Faso, en langue originale avec leur traduction française (mooré, jula, bwamu, lyele, peul…), sont rassemblés sur <a href="https://www.abcburkina.net/ancien/contes1.htm" target="_blank" rel="noopener">abcburkina.net</a>.</p>
    <h2>L'équipe — Groupe 13</h2>
    <ul class="equipe">
      <li><strong>TEGA</strong> Paamda Sawratou Lareine <span>SIE</span></li>
      <li><strong>TINDANO</strong> Fernand Amed <span>SI</span></li>
      <li><strong>OUEDRAOGO</strong> Adama <span>SIE</span></li>
      <li><strong>KABORE</strong> Nongdo Valery Ariel <span>SIE</span></li>
    </ul>
    <p class="muted">Master SI · Module Web Multimédia · 2026</p>
  </section>`;
}
