// Carte interactive 2D/3D (MapLibre GL) : régions, marqueurs des récits, filtres.
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { CONTES, CATEGORIES, LANGUES } from '../data/contes.js';

const BASE = import.meta.env.BASE_URL;
const STYLE = 'https://tiles.openfreemap.org/styles/liberty';
const CENTRE = [-1.6, 12.25];
const LIMITES = [[-7.5, 8.8], [3.6, 15.8]];

const STYLE_SECOURS = {
  version: 8,
  sources: {},
  layers: [{ id: 'fond', type: 'background', paint: { 'background-color': '#e9dcc0' } }],
};

export function pageCarte(app, params) {
  app.innerHTML = `
  <section class="carte-page">
    <aside class="carte-panel" aria-label="Filtres et liste des récits">
      <h1>Explorer la carte</h1>
      <p class="muted">Chaque point est un récit, placé là où on le raconte. Clique sur une région ou un point.</p>
      <div class="filtres">
        <input type="search" id="fRecherche" placeholder="Rechercher un récit, un peuple, un lieu…" aria-label="Rechercher" />
        <fieldset class="chips">
          <legend class="sr">Catégories</legend>
          ${Object.entries(CATEGORIES)
            .map(([k, c]) => `<label class="chip" style="--c:${c.couleur}"><input type="checkbox" value="${k}" checked /> <span>${c.icone} ${c.label}</span></label>`)
            .join('')}
        </fieldset>
        <label class="select">Langue
          <select id="fLangue"><option value="">Toutes les langues</option>
          ${Object.entries(LANGUES).filter(([k]) => k !== 'fr').map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}
          </select>
        </label>
      </div>
      <ul class="carte-liste" id="liste"></ul>
    </aside>
    <div class="carte-zone">
      <div id="map" role="application" aria-label="Carte interactive du Burkina Faso"></div>
      <div class="carte-ctrl">
        <button class="seg actif" data-mode="2d" aria-pressed="true">2D</button>
        <button class="seg" data-mode="3d" aria-pressed="false">3D</button>
      </div>
      <div class="carte-legende">
        ${Object.values(CATEGORIES).map((c) => `<span><i style="background:${c.couleur}"></i>${c.label}</span>`).join('')}
      </div>
      <div class="carte-info" id="info" hidden></div>
    </div>
  </section>`;

  const map = new maplibregl.Map({
    container: 'map',
    style: STYLE,
    center: CENTRE,
    zoom: 5.6,
    minZoom: 4.5,
    maxBounds: [[-12, 5], [8, 19]],
    attributionControl: { compact: true },
  });
  map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');
  map.addControl(new maplibregl.FullscreenControl(), 'top-right');

  let secours = false;
  map.on('error', (e) => {
    // Fond de carte indisponible (hors ligne) : on bascule sur un fond uni.
    if (!secours && /openfreemap|style/i.test(String(e?.error?.message || e?.error?.url || ''))) {
      secours = true;
      map.setStyle(STYLE_SECOURS);
      map.once('styledata', ajouterCouches);
    }
  });

  const parRegion = {};
  CONTES.forEach((c) => (parRegion[c.region] = (parRegion[c.region] || 0) + 1));

  async function ajouterCouches() {
    if (map.getSource('regions')) return;
    const geo = await fetch(`${BASE}data/regions.geojson`).then((r) => r.json());
    geo.features.forEach((f) => (f.properties.nb = parRegion[f.properties.name] || 0));
    map.addSource('regions', { type: 'geojson', data: geo });
    map.addLayer({
      id: 'regions-fill',
      type: 'fill',
      source: 'regions',
      paint: {
        'fill-color': ['interpolate', ['linear'], ['get', 'nb'], 0, '#f3e3b8', 1, '#e0a526', 2, '#c2562f'],
        'fill-opacity': ['case', ['boolean', ['feature-state', 'survol'], false], 0.7, 0.45],
      },
    });
    map.addLayer({
      id: 'regions-3d',
      type: 'fill-extrusion',
      source: 'regions',
      layout: { visibility: 'none' },
      paint: {
        'fill-extrusion-color': ['interpolate', ['linear'], ['get', 'nb'], 0, '#f3e3b8', 1, '#e0a526', 2, '#c2562f'],
        'fill-extrusion-height': ['+', 800, ['*', ['get', 'nb'], 7000]],
        'fill-extrusion-opacity': 0.7,
      },
    });
    map.addLayer({ id: 'regions-line', type: 'line', source: 'regions', paint: { 'line-color': '#5b3d1c', 'line-width': 1.4 } });
    if (!secours) {
      map.addLayer({
        id: 'regions-label',
        type: 'symbol',
        source: 'regions',
        layout: { 'text-field': ['get', 'name'], 'text-size': 12, 'text-font': ['Noto Sans Regular'] },
        paint: { 'text-color': '#3b2a16', 'text-halo-color': '#fff8e8', 'text-halo-width': 1.5 },
      });
    }
    map.fitBounds(LIMITES, { padding: 30, duration: 0 });

    let survol = null;
    map.on('mousemove', 'regions-fill', (e) => {
      map.getCanvas().style.cursor = 'pointer';
      if (survol !== null) map.setFeatureState({ source: 'regions', id: survol }, { survol: false });
      survol = e.features[0].id;
      map.setFeatureState({ source: 'regions', id: survol }, { survol: true });
    });
    map.on('mouseleave', 'regions-fill', () => {
      map.getCanvas().style.cursor = '';
      if (survol !== null) map.setFeatureState({ source: 'regions', id: survol }, { survol: false });
      survol = null;
    });
    const clicRegion = (e) => {
      const nom = e.features[0].properties.name;
      const liste = CONTES.filter((c) => c.region === nom);
      afficherInfo(
        `<h2>${nom}</h2>${
          liste.length
            ? `<ul>${liste.map((c) => `<li><a href="#/conte/${c.id}">${CATEGORIES[c.categorie].icone} ${c.titre}</a></li>`).join('')}</ul>`
            : `<p class="muted">Aucun récit pour l'instant dans cette région. <a href="#/participer">Proposer un conte</a></p>`
        }`,
      );
    };
    map.on('click', 'regions-fill', clicRegion);
    map.on('click', 'regions-3d', clicRegion);
  }

  map.on('load', () => {
    ajouterCouches();
    // Relief pour la vue 3D (tuiles d'élévation libres AWS Terrain Tiles, format terrarium)
    map.addSource('relief', {
      type: 'raster-dem',
      tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
      encoding: 'terrarium',
      tileSize: 256,
      maxzoom: 12,
    });
  });

  // ---------- Marqueurs ----------
  const marqueurs = CONTES.map((c) => {
    const el = document.createElement('button');
    el.className = c.alaune ? 'marqueur une' : 'marqueur';
    el.style.setProperty('--c', CATEGORIES[c.categorie].couleur);
    el.setAttribute('aria-label', `${c.titre}, ${c.lieu}`);
    el.innerHTML = `<span>${c.alaune ? '★' : CATEGORIES[c.categorie].icone}</span>`;
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      ouvrir(c);
    });
    const m = new maplibregl.Marker({ element: el }).setLngLat(c.coords).addTo(map);
    return { c, m, el };
  });

  function ouvrir(c, { voler = true } = {}) {
    if (voler) map.flyTo({ center: c.coords, zoom: Math.max(map.getZoom(), 7.5), speed: 0.8 });
    afficherInfo(`
      <span class="badge" style="--c:${CATEGORIES[c.categorie].couleur}">${CATEGORIES[c.categorie].label}</span>
      ${c.alaune ? '<span class="badge-une">★ À la une</span>' : ''}
      <h2>${c.titre}</h2>
      <p class="meta">${c.lieu} · ${c.region} · ${c.peuple}</p>
      <p>${c.resume}</p>
      <p class="meta">Langues : ${c.langues.map((l) => LANGUES[l]).join(', ')}</p>
      <a class="btn" href="#/conte/${c.id}">Écouter le récit →</a>`);
  }

  function afficherInfo(html) {
    const info = app.querySelector('#info');
    info.innerHTML = `<button class="fermer" aria-label="Fermer">×</button>${html}`;
    info.hidden = false;
    info.querySelector('.fermer').onclick = () => (info.hidden = true);
  }

  // ---------- Filtres ----------
  const liste = app.querySelector('#liste');
  function filtrer() {
    const txt = app.querySelector('#fRecherche').value.trim().toLowerCase();
    const cats = [...app.querySelectorAll('.chips input:checked')].map((i) => i.value);
    const langue = app.querySelector('#fLangue').value;
    const visibles = [];
    marqueurs.forEach(({ c, el }) => {
      const ok =
        cats.includes(c.categorie) &&
        (!langue || c.langues.includes(langue)) &&
        (!txt || [c.titre, c.peuple, c.lieu, c.region, c.resume].join(' ').toLowerCase().includes(txt));
      el.style.display = ok ? '' : 'none';
      if (ok) visibles.push(c);
    });
    liste.innerHTML = visibles.length
      ? visibles
          .map(
            (c) => `<li><button data-id="${c.id}" class="${c.alaune ? 'une' : ''}"><i style="background:${CATEGORIES[c.categorie].couleur}"></i>
              <strong>${c.alaune ? '★ ' : ''}${c.titre}</strong><small>${c.alaune ? 'À la une · ' : ''}${c.lieu} · ${c.peuple}</small></button></li>`,
          )
          .join('')
      : '<li class="muted">Aucun récit ne correspond.</li>';
    liste.querySelectorAll('button').forEach((b) => (b.onclick = () => ouvrir(CONTES.find((c) => c.id === b.dataset.id))));
  }
  app.querySelector('#fRecherche').addEventListener('input', filtrer);
  app.querySelectorAll('.chips input, #fLangue').forEach((i) => i.addEventListener('change', filtrer));
  filtrer();

  // ---------- Bascule 2D / 3D ----------
  app.querySelectorAll('.seg').forEach((b) =>
    b.addEventListener('click', () => {
      const en3d = b.dataset.mode === '3d';
      app.querySelectorAll('.seg').forEach((x) => {
        x.classList.toggle('actif', x === b);
        x.setAttribute('aria-pressed', x === b);
      });
      if (!map.getLayer('regions-3d')) return;
      map.setLayoutProperty('regions-3d', 'visibility', en3d ? 'visible' : 'none');
      map.setLayoutProperty('regions-fill', 'visibility', en3d ? 'none' : 'visible');
      if (en3d && map.getSource('relief')) map.setTerrain({ source: 'relief', exaggeration: 2 });
      else map.setTerrain(null);
      map.easeTo({ center: CENTRE, zoom: en3d ? 6 : 5.6, pitch: en3d ? 55 : 0, bearing: en3d ? -18 : 0, duration: 1400 });
    }),
  );

  // sans récit demandé dans l'adresse, la carte s'ouvre sur le récit à la une
  const demande = CONTES.find((x) => x.id === params[0]);
  const une = CONTES.find((x) => x.alaune);
  if (demande) map.once('load', () => ouvrir(demande));
  else if (une) map.once('load', () => ouvrir(une, { voler: false }));

  return () => map.remove();
}
