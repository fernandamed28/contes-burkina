// Lecteur narratif : scènes illustrées et animées, choix interactifs, audio multilingue, quiz final.
import { gsap } from 'gsap';
import { getConte, CONTES, CATEGORIES, LANGUES } from '../data/contes.js';
import { renderScene, animateScene, killScene } from '../scenes.js';
import {
  chargerManifest, enregistrement, jouerEnregistrement, pauseEnregistrement, progressionEnregistrement,
  arreterNarration, lireTexte, syntheseDisponible,
} from '../audio.js';

export async function pageConte(app, [id]) {
  const conte = getConte(id);
  if (!conte) {
    app.innerHTML = `<section class="page"><h1>Récit introuvable</h1><p><a href="#/bibliotheque">Retour à la bibliothèque</a></p></section>`;
    return;
  }
  await chargerManifest();
  const cat = CATEGORIES[conte.categorie];
  const scenes = conte.scenes;
  const indexDe = (sid) => scenes.findIndex((s) => s.id === sid);

  let langue = conte.langues.find((l) => enregistrement(conte.id, l) && l !== 'fr') || 'fr';
  let courant = 0;
  let parcours = [0];
  let auto = false;
  let timerProgression = null;

  app.innerHTML = `
  <article class="conte" style="--c:${cat.couleur}">
    <header class="conte-tete">
      <a href="#/bibliotheque" class="retour">← Bibliothèque</a>
      <div>
        <span class="badge" style="--c:${cat.couleur}">${cat.icone} ${cat.label}</span>
        <h1>${conte.titre}</h1>
        <p class="meta">${conte.peuple} · ${conte.lieu} (${conte.region}) · ${conte.duree} min · <a href="#/carte/${conte.id}">voir sur la carte</a></p>
      </div>
    </header>

    <div class="langues" role="radiogroup" aria-label="Langue de narration">
      ${conte.langues
        .map((l) => {
          const dispo = l === 'fr' ? true : !!enregistrement(conte.id, l);
          return `<button role="radio" data-l="${l}" class="langue ${dispo ? '' : 'avenir'}" aria-checked="false">
            ${LANGUES[l]}${l === 'fr' && !enregistrement(conte.id, 'fr') ? ' <small>(synthèse)</small>' : dispo ? ' <small>♪ extrait</small>' : ' <small>à venir</small>'}</button>`;
        })
        .join('')}
    </div>
    <div class="lecteur-audio" id="lecteurAudio" hidden>
      <button id="audioPlay" class="rond" aria-label="Lecture / pause">▶</button>
      <div class="barre"><span id="audioBarre"></span></div>
      <span class="muted" id="audioLabel"></span>
    </div>
    <p class="note-langue muted" id="noteLangue" hidden></p>

    <div class="scene-cadre">
      <div class="scene" id="scene" aria-hidden="true"></div>
      <div class="scene-texte" aria-live="polite">
        <p id="texte"></p>
        <div class="choix" id="choix"></div>
      </div>
    </div>

    <nav class="scene-nav" aria-label="Navigation dans le récit">
      <button id="prec" class="btn ghost">← Précédent</button>
      <div class="points" id="points" aria-hidden="true"></div>
      <div class="nav-droite">
        <button id="ecouter" class="btn ghost" title="Lire la scène à voix haute">🔊 Écouter</button>
        <button id="auto" class="btn ghost" aria-pressed="false" title="Lecture automatique">⏵ Auto</button>
        <button id="suiv" class="btn">Suivant →</button>
      </div>
    </nav>

    <section class="conte-fin" id="fin" hidden></section>
  </article>`;

  const $ = (s) => app.querySelector(s);
  const elScene = $('#scene');

  function majLangues() {
    app.querySelectorAll('.langue').forEach((b) => {
      b.classList.toggle('actif', b.dataset.l === langue);
      b.setAttribute('aria-checked', b.dataset.l === langue);
    });
    const src = enregistrement(conte.id, langue);
    $('#lecteurAudio').hidden = !src;
    $('#ecouter').hidden = !!src || !syntheseDisponible();
    const note = $('#noteLangue');
    if (!src && langue !== 'fr') {
      note.hidden = false;
      note.innerHTML = `L'extrait audio en <strong>${LANGUES[langue]}</strong> n'est pas encore disponible. Tu peux <a href="#/participer">raconter ce conte dans ta langue</a> ! En attendant, le texte reste en français.`;
    } else note.hidden = true;
    if (src) {
      $('#audioLabel').textContent = `Début du récit raconté en ${LANGUES[langue]}`;
      $('#audioPlay').textContent = '▶';
    }
  }

  app.querySelectorAll('.langue').forEach((b) =>
    b.addEventListener('click', () => {
      arreterNarration();
      langue = b.dataset.l;
      majLangues();
    }),
  );

  $('#audioPlay').addEventListener('click', () => {
    const src = enregistrement(conte.id, langue);
    if (!src) return;
    if ($('#audioPlay').dataset.charge === langue) {
      $('#audioPlay').textContent = pauseEnregistrement() ? '❚❚' : '▶';
      return;
    }
    $('#audioPlay').dataset.charge = langue;
    jouerEnregistrement(src, { onend: () => ($('#audioPlay').textContent = '▶') });
    $('#audioPlay').textContent = '❚❚';
    clearInterval(timerProgression);
    timerProgression = setInterval(() => ($('#audioBarre').style.width = `${progressionEnregistrement() * 100}%`), 300);
  });

  function afficher(i, sens = 1) {
    courant = i;
    const s = scenes[i];
    const ancien = elScene.firstElementChild;
    const nouveau = document.createElement('div');
    nouveau.className = 'scene-calque';
    nouveau.innerHTML = renderScene(s);
    elScene.appendChild(nouveau);
    gsap.fromTo(nouveau, { opacity: 0, x: 30 * sens }, { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' });
    if (ancien) {
      gsap.to(ancien, { opacity: 0, duration: 0.6, onComplete: () => { killScene(ancien); ancien.remove(); } });
    }
    animateScene(nouveau);

    const texte = $('#texte');
    texte.textContent = s.texte;
    gsap.fromTo(texte, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });

    const choix = $('#choix');
    choix.innerHTML = (s.choix || []).map((c, k) => `<button class="btn choix-btn" data-k="${k}">${c.label}</button>`).join('');
    choix.querySelectorAll('button').forEach((b) =>
      b.addEventListener('click', () => {
        const cible = indexDe(s.choix[b.dataset.k].vers);
        parcours.push(cible);
        afficher(cible);
        if (auto) narrerPuisAvancer();
      }),
    );
    if (s.choix) gsap.from(choix.children, { opacity: 0, y: 12, stagger: 0.12, delay: 0.5 });

    $('#prec').disabled = parcours.length <= 1;
    $('#suiv').disabled = !!s.choix;
    $('#suiv').textContent = s.fin ? 'Terminer ✓' : 'Suivant →';
    $('#points').innerHTML = parcours.map((p, k) => `<i class="${k === parcours.length - 1 ? 'actif' : ''}"></i>`).join('');
  }

  function suivante() {
    const s = scenes[courant];
    if (s.choix) return;
    if (s.fin) return terminer();
    const cible = s.suite ? indexDe(s.suite) : courant + 1;
    parcours.push(cible);
    afficher(cible);
  }

  function precedente() {
    if (parcours.length <= 1) return;
    parcours.pop();
    afficher(parcours[parcours.length - 1], -1);
  }

  function narrerPuisAvancer() {
    if (!auto) return;
    const s = scenes[courant];
    const continuer = () => {
      if (!auto || s !== scenes[courant]) return;
      if (s.choix) return; // le lecteur doit choisir
      if (s.fin) { auto = false; majAuto(); return terminer(); }
      suivante();
      narrerPuisAvancer();
    };
    if (!enregistrement(conte.id, langue) && syntheseDisponible()) lireTexte(s.texte, { onend: () => setTimeout(continuer, 600) });
    else setTimeout(continuer, Math.max(5000, s.texte.length * 55));
  }

  function majAuto() {
    $('#auto').setAttribute('aria-pressed', auto);
    $('#auto').classList.toggle('actif', auto);
  }

  $('#suiv').addEventListener('click', () => { arreterNarrationScene(); suivante(); if (auto) narrerPuisAvancer(); });
  $('#prec').addEventListener('click', () => { arreterNarrationScene(); precedente(); });
  $('#ecouter').addEventListener('click', () => lireTexte(scenes[courant].texte));
  $('#auto').addEventListener('click', () => {
    auto = !auto;
    majAuto();
    if (auto) narrerPuisAvancer();
    else arreterNarrationScene();
  });

  function arreterNarrationScene() {
    if (!enregistrement(conte.id, langue)) arreterNarration();
  }

  function onKey(e) {
    if (e.target.closest('input, select, textarea')) return;
    if (e.key === 'ArrowRight') $('#suiv').click();
    if (e.key === 'ArrowLeft') $('#prec').click();
  }
  document.addEventListener('keydown', onKey);

  function terminer() {
    const fin = $('#fin');
    const autres = CONTES.filter((c) => c.id !== conte.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const q = conte.quiz;
    const ordre = q.reponses.map((r, k) => ({ r, k })).sort(() => Math.random() - 0.5);
    fin.hidden = false;
    fin.innerHTML = `
      <div class="fin-grille">
        <div>
          <h2>La sagesse du conte</h2>
          <blockquote>${conte.morale}</blockquote>
          <h3>As-tu bien écouté ?</h3>
          <p>${q.question}</p>
          <div class="quiz">${ordre.map(({ r, k }) => `<button class="btn ghost" data-k="${k}">${r}</button>`).join('')}</div>
          <p class="quiz-res" aria-live="polite"></p>
        </div>
        <aside>
          <h3>Source</h3>
          <p class="muted">${conte.source}</p>
          <p><button class="btn ghost" id="recommencer">↺ Revivre le récit autrement</button></p>
        </aside>
      </div>
      <h3>D'autres récits</h3>
      <div class="cartes">${autres.map(carteConte).join('')}</div>`;
    fin.querySelectorAll('.quiz button').forEach((b) =>
      b.addEventListener('click', () => {
        const bon = Number(b.dataset.k) === q.bonne;
        fin.querySelectorAll('.quiz button').forEach((x) => {
          x.disabled = true;
          if (Number(x.dataset.k) === q.bonne) x.classList.add('bon');
        });
        if (!bon) b.classList.add('faux');
        fin.querySelector('.quiz-res').textContent = bon ? 'Bravo, tu as bien écouté !' : `La bonne réponse était : « ${q.reponses[q.bonne]} ».`;
      }),
    );
    fin.querySelector('#recommencer').onclick = () => {
      fin.hidden = true;
      parcours = [0];
      afficher(0);
      app.querySelector('.scene-cadre').scrollIntoView({ behavior: 'smooth' });
    };
    fin.scrollIntoView({ behavior: 'smooth' });
  }

  majLangues();
  afficher(0);

  return () => {
    document.removeEventListener('keydown', onKey);
    clearInterval(timerProgression);
    arreterNarration();
    killScene(elScene);
  };
}

export function carteConte(c) {
  const cat = CATEGORIES[c.categorie];
  return `<a class="carte-conte" href="#/conte/${c.id}" style="--c:${cat.couleur}">
    <div class="vignette">${renderScene({ ...c.scenes[0], acteurs: c.scenes[0].acteurs?.map((a) => ({ ...a, x: a.x >= 0 && a.x <= 800 ? a.x : a.vers, vers: undefined })) })}</div>
    <div class="carte-corps">
      <span class="badge" style="--c:${cat.couleur}">${cat.icone} ${cat.label}</span>
      <h3>${c.titre}</h3>
      <p class="meta">${c.lieu} · ${c.peuple}</p>
      <p>${c.resume}</p>
    </div>
  </a>`;
}
