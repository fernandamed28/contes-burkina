// Lecteur narratif : scènes illustrées et animées, choix interactifs, audio multilingue, quiz final.
import { gsap } from 'gsap';
import { getConte, CONTES, CATEGORIES, LANGUES } from '../data/contes.js';
import { renderScene, animateScene, killScene } from '../scenes.js';
import {
  chargerManifest, enregistrement, languesEnregistrees, jouerEnregistrement, pauseEnregistrement,
  etatEnregistrement, allerA, changerVitesse, changerVolumeVoix, reglagesLecteur,
  arreterNarration, lireTexte, syntheseDisponible, demarrerAmbiance, ambianceActive, musiqueCoupeeParVisiteur,
  detailsEnregistrement, conteurs,
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
  let termine = false;

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
          const d = detailsEnregistrement(conte.id, l);
          const bulle = d?.voix ? ` title="Voix de ${d.voix}${d.duree ? ` · ${d.duree}` : ''}"` : '';
          return `<button role="radio" data-l="${l}" class="langue ${dispo ? '' : 'avenir'}" aria-checked="false"${bulle}>
            ${LANGUES[l]}${l === 'fr' && !enregistrement(conte.id, 'fr') ? ' <small>(synthèse)</small>' : dispo ? ' <small>♪ extrait</small>' : ' <small>à venir</small>'}</button>`;
        })
        .join('')}
    </div>
    <div class="lecteur-audio" id="lecteurAudio" hidden>
      <div class="lecteur-ligne">
        <button id="audioRecul" class="saut" aria-label="Reculer de 10 secondes" title="Reculer de 10 s">−10 s</button>
        <button id="audioPlay" class="rond" aria-label="Lecture">▶</button>
        <button id="audioAvance" class="saut" aria-label="Avancer de 10 secondes" title="Avancer de 10 s">+10 s</button>
        <input type="range" id="audioSeek" class="seek" min="0" max="1000" step="1" value="0" aria-label="Position dans l'enregistrement" />
        <span class="temps"><span id="audioTemps">0:00</span> / <span id="audioDuree">0:00</span></span>
      </div>
      <div class="lecteur-ligne secondaire">
        <span class="audio-infos"><span id="audioLabel"></span><small id="audioVoix"></small></span>
        <div class="vitesses" role="group" aria-label="Vitesse de lecture">
          ${[0.75, 1, 1.25, 1.5].map((v) => `<button data-v="${v}" class="${v === reglagesLecteur().vitesse ? 'actif' : ''}" aria-pressed="${v === reglagesLecteur().vitesse}">${String(v).replace('.', ',')}×</button>`).join('')}
        </div>
        <label class="volume-voix" title="Volume de la voix"><span aria-hidden="true">🔊</span><span class="sr">Volume de la voix</span>
          <input type="range" id="audioVolume" min="0" max="100" value="${Math.round(reglagesLecteur().volume * 100)}" />
        </label>
      </div>
    </div>
    <p class="note-langue muted" id="noteLangue" hidden></p>

    <div class="scene-cadre">
      <div class="scene" id="scene" aria-hidden="true"></div>
      <button class="invite-ecoute" id="inviteEcoute" hidden>
        <span class="invite-ico" aria-hidden="true">▶</span>
        <span><strong id="inviteTitre">Écouter le récit</strong><small>Touchez pour lancer la voix et la musique</small></span>
      </button>
      <div class="scene-texte" aria-live="polite">
        <p id="texte"></p>
        <div class="choix" id="choix"></div>
      </div>
    </div>

    <nav class="scene-nav" aria-label="Navigation dans le récit">
      <div class="progression">
        <div class="progression-tete">
          <strong id="etape" aria-live="polite"></strong>
          <span id="etapeInfo" class="etape-info"></span>
        </div>
        <div class="progression-barre" aria-hidden="true"><span id="progBarre"></span></div>
        <ol class="points" id="points" aria-label="Étapes du récit"></ol>
      </div>
      <div class="nav-boutons">
        <button id="prec" class="btn ghost">← Précédent</button>
        <div class="nav-droite">
          <button id="ecouter" class="btn ghost" title="Lire la scène à voix haute">🔊 Écouter</button>
          <button id="auto" class="btn ghost" aria-pressed="false" title="Lecture automatique">⏵ Auto</button>
          <button id="suiv" class="btn">Suivant →</button>
        </div>
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
      const d = detailsEnregistrement(conte.id, langue);
      $('#audioVoix').textContent = [d?.voix && `🎙️ Voix de ${d.voix}`, d?.duree].filter(Boolean).join(' · ');
      $('#audioPlay').textContent = '▶';
      $('#audioSeek').value = 0;
      $('#audioSeek').style.setProperty('--p', '0%');
      $('#audioTemps').textContent = '0:00';
      $('#audioDuree').textContent = detailsEnregistrement(conte.id, langue)?.duree?.replace(/(\d+) min (\d+)/, (m, a, b) => `${a}:${b.padStart(2, '0')}`) || '0:00';
    }
  }

  app.querySelectorAll('.langue').forEach((b) =>
    b.addEventListener('click', () => {
      arreterNarration();
      langue = b.dataset.l;
      majLangues();
      // changer de langue lance directement la voix correspondante
      if (enregistrement(conte.id, langue)) $('#audioPlay').click();
    }),
  );

  // ---------- Lecteur audio : barre déplaçable, sauts de 10 s, vitesse, volume ----------
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  let glisse = false;
  function majLecteur() {
    const e = etatEnregistrement();
    const seek = $('#audioSeek');
    if (!e) return;
    if (!glisse && e.duree) seek.value = Math.round((e.position / e.duree) * 1000);
    seek.style.setProperty('--p', `${(seek.value / 10).toFixed(1)}%`);
    if (!glisse) $('#audioTemps').textContent = fmt(e.position);
    if (e.duree) $('#audioDuree').textContent = fmt(e.duree);
    $('#audioPlay').textContent = e.joue ? '❚❚' : '▶';
    $('#audioPlay').setAttribute('aria-label', e.joue ? 'Pause' : 'Lecture');
  }
  function suivreLecture() {
    clearInterval(timerProgression);
    timerProgression = setInterval(majLecteur, 250);
  }
  // démarre l'enregistrement de la langue choisie s'il n'est pas encore chargé, puis exécute « ensuite »
  function assurerLecture(ensuite, essais = 25) {
    if ($('#audioPlay').dataset.charge === langue && etatEnregistrement()?.duree) return ensuite?.();
    if ($('#audioPlay').dataset.charge !== langue) $('#audioPlay').click();
    if (ensuite && essais > 0) setTimeout(() => assurerLecture(ensuite, essais - 1), 200); // 5 s au plus
  }
  $('#audioSeek').addEventListener('input', () => {
    glisse = true;
    const e = etatEnregistrement();
    $('#audioSeek').style.setProperty('--p', `${($('#audioSeek').value / 10).toFixed(1)}%`);
    if (e?.duree) $('#audioTemps').textContent = fmt(($('#audioSeek').value / 1000) * e.duree);
  });
  $('#audioSeek').addEventListener('change', () => {
    const cible = $('#audioSeek').value / 1000;
    glisse = false;
    assurerLecture(() => {
      allerA(cible * etatEnregistrement().duree);
      majLecteur();
    });
  });
  const sauter = (d) => assurerLecture(() => {
    allerA(etatEnregistrement().position + d);
    majLecteur();
  });
  // au clavier, les flèches sur la barre avancent ou reculent de 5 secondes
  $('#audioSeek').addEventListener('keydown', (e) => {
    const d = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }[e.key];
    if (!d) return;
    e.preventDefault();
    e.stopPropagation(); // sans changer de scène
    sauter(d);
  });
  $('#audioRecul').addEventListener('click', () => sauter(-10));
  $('#audioAvance').addEventListener('click', () => sauter(10));
  app.querySelectorAll('.vitesses button').forEach((b) =>
    b.addEventListener('click', () => {
      changerVitesse(Number(b.dataset.v));
      app.querySelectorAll('.vitesses button').forEach((x) => {
        x.classList.toggle('actif', x === b);
        x.setAttribute('aria-pressed', x === b);
      });
    }),
  );
  $('#audioVolume').addEventListener('input', () => changerVolumeVoix($('#audioVolume').value / 100));

  $('#audioPlay').addEventListener('click', () => {
    const src = enregistrement(conte.id, langue);
    if (!src) return;
    if ($('#audioPlay').dataset.charge === langue) {
      pauseEnregistrement();
      majLecteur();
      return;
    }
    $('#audioPlay').dataset.charge = langue;
    jouerEnregistrement(src, { onend: majLecteur, onload: majLecteur });
    $('#audioPlay').textContent = '❚❚';
    suivreLecture();
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

    termine = false;
    majProgression();
  }

  // Nombre d'étapes restantes après la scène i, en suivant le premier choix à chaque embranchement
  function restantes(i) {
    let n = 0;
    const vus = new Set();
    while (!scenes[i].fin && !vus.has(i)) {
      vus.add(i);
      const s = scenes[i];
      i = s.choix ? indexDe(s.choix[0].vers) : s.suite ? indexDe(s.suite) : i + 1;
      n++;
    }
    return n;
  }

  function majProgression() {
    const s = scenes[courant];
    const pos = parcours.length;
    const total = pos + restantes(courant);
    $('#etape').textContent = termine ? 'Récit terminé ✓' : `Étape ${pos} sur ${total}`;
    $('#etapeInfo').textContent = termine ? '' : s.choix ? '◆ À toi de choisir la suite' : s.fin ? 'Dernière étape' : '';
    $('#etapeInfo').className = 'etape-info' + (s.choix && !termine ? ' choix-attendu' : '');
    $('#progBarre').style.width = `${termine ? 100 : Math.round((pos / total) * 100)}%`;

    const points = parcours.map((p, k) => {
      const actuel = k === pos - 1;
      const etat = actuel && !termine ? 'actif' : 'fait';
      const marque = scenes[p].choix ? ' choix' : '';
      return `<li><button class="point ${etat}${marque}" data-k="${k}" ${actuel ? 'aria-current="step"' : ''} title="Revenir à l'étape ${k + 1}"><span>${k + 1}</span></button></li>`;
    });
    for (let k = pos; k < total; k++) points.push(`<li><span class="point avenir"><span>${k + 1}</span></span></li>`);
    $('#points').innerHTML = points.join('');
    $('#points').querySelectorAll('button.point').forEach((b) =>
      b.addEventListener('click', () => {
        const k = Number(b.dataset.k);
        if (k === parcours.length - 1 && !termine) return;
        arreterNarrationScene();
        parcours = parcours.slice(0, k + 1);
        afficher(parcours[k], -1);
      }),
    );

    $('#prec').disabled = pos <= 1;
    const suiv = $('#suiv');
    suiv.classList.remove('attente');
    if (termine) {
      suiv.disabled = false;
      suiv.textContent = 'Voir la fin ↓';
    } else if (s.choix) {
      suiv.disabled = true;
      suiv.classList.add('attente');
      suiv.textContent = 'Choisis la suite ↑';
    } else {
      suiv.disabled = false;
      suiv.textContent = s.fin ? 'Terminer ✓' : 'Suivant →';
    }
  }

  function suivante() {
    const s = scenes[courant];
    if (termine) return $('#fin').scrollIntoView({ behavior: 'smooth' });
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
    termine = true;
    majProgression();
    const fin = $('#fin');
    const autres = [
      ...CONTES.filter((c) => c.alaune && c.id !== conte.id),
      ...CONTES.filter((c) => !c.alaune && c.id !== conte.id).sort(() => Math.random() - 0.5),
    ].slice(0, 3);
    const rang = CONTES.findIndex((c) => c.id === conte.id);
    const prochain = CONTES[(rang + 1) % CONTES.length];
    const nbChoix = parcours.filter((p) => scenes[p].choix).length;
    const q = conte.quiz;
    const ordre = q.reponses.map((r, k) => ({ r, k })).sort(() => Math.random() - 0.5);
    fin.hidden = false;
    fin.innerHTML = `
      <div class="fin-bandeau">
        <div>
          <p class="fin-sur-titre">✓ Fin du récit</p>
          <h2>${conte.titre}</h2>
          <p class="muted">Tu as parcouru ${parcours.length} étapes${nbChoix ? ` et fait ${nbChoix} choix` : ''}.</p>
        </div>
        <div class="fin-actions">
          <button class="btn" id="recommencer">↺ Revivre autrement</button>
          <a class="btn ghost" href="#/conte/${prochain.id}">Récit suivant →</a>
          <a class="btn ghost" href="#/bibliotheque">← Bibliothèque</a>
          <a class="btn ghost" href="#/carte/${conte.id}">◎ Voir sur la carte</a>
        </div>
      </div>
      <div class="fin-grille">
        <section class="fin-carte">
          <h3>La sagesse du conte</h3>
          <blockquote>${conte.morale}</blockquote>
        </section>
        <section class="fin-carte">
          <h3>As-tu bien écouté ?</h3>
          <p>${q.question}</p>
          <div class="quiz">${ordre.map(({ r, k }) => `<button class="btn ghost" data-k="${k}">${r}</button>`).join('')}</div>
          <p class="quiz-res" aria-live="polite"></p>
        </section>
        <section class="fin-carte">
          <h3>Source</h3>
          <p class="muted">${conte.source}</p>
          <p class="muted">${conte.peuple} · ${conte.lieu} (${conte.region})</p>
          ${conteurs(conte.id).map((c) => `<p class="credit-voix">🎙️ Voix (${c.langues.map((l) => LANGUES[l]).join(', ')}) : <strong>${c.voix}</strong></p>`).join('')}
        </section>
      </div>
      <h3 class="section-titre">D'autres récits</h3>
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

  // Démarrage automatique : musique de fond et voix enregistrée dans la langue choisie.
  // Les navigateurs refusent le son tant que le visiteur n'a pas touché la page :
  // dans ce cas, une invitation s'affiche et le premier geste lance tout.
  function demarrerAudio() {
    $('#inviteEcoute').hidden = true;
    if (!ambianceActive() && !musiqueCoupeeParVisiteur()) demarrerAmbiance();
    if (enregistrement(conte.id, langue) && $('#audioPlay').dataset.charge !== langue) $('#audioPlay').click();
  }
  const premierGeste = (e) => {
    if (e.target.closest('.lecteur-audio, #soundToggle, .langue')) return; // ces commandes gèrent déjà le son
    retirerAttente();
    demarrerAudio();
  };
  const retirerAttente = () => ['pointerdown', 'keydown'].forEach((t) => document.removeEventListener(t, premierGeste, true));
  const sonAutorise = navigator.userActivation ? navigator.userActivation.hasBeenActive : false;
  if (sonAutorise) {
    demarrerAudio();
  } else {
    if (enregistrement(conte.id, langue)) {
      $('#inviteTitre').textContent = `Écouter le récit en ${LANGUES[langue]}`;
      $('#inviteEcoute').hidden = false;
    }
    ['pointerdown', 'keydown'].forEach((t) => document.addEventListener(t, premierGeste, true));
  }
  $('#inviteEcoute').addEventListener('click', () => {
    retirerAttente();
    demarrerAudio();
  });

  return () => {
    retirerAttente();
    document.removeEventListener('keydown', onKey);
    clearInterval(timerProgression);
    arreterNarration();
    killScene(elScene);
  };
}

export function carteConte(c, { grand = false } = {}) {
  const cat = CATEGORIES[c.categorie];
  const voix = languesEnregistrees(c.id);
  return `<a class="carte-conte${grand ? ' grand' : ''}${c.alaune ? ' une' : ''}" href="#/conte/${c.id}" style="--c:${cat.couleur}">
    <div class="vignette">${vignette(c)}</div>
    <div class="carte-corps">
      <div class="badges"><span class="badge" style="--c:${cat.couleur}">${cat.icone} ${cat.label}</span>${c.alaune ? '<span class="badge-une">★ À la une</span>' : ''}</div>
      <h3>${c.titre}</h3>
      <p class="meta">${c.lieu} · ${c.peuple}</p>
      ${voix.length ? `<p class="voix">🎧 Raconté en ${voix.map((l) => LANGUES[l]).join(' et ')}</p>` : ''}
      <p>${c.resume}</p>
    </div>
  </a>`;
}

// Vignette fixe d'un récit : sa première scène, ou la scène emblématique du récit à la une
function vignette(c) {
  const s = c.scenes[c.alaune ? 1 : 0];
  return renderScene({ ...s, acteurs: s.acteurs?.map((a) => ({ ...a, x: a.x >= 0 && a.x <= 800 ? a.x : a.vers, vers: undefined })) });
}
