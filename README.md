# Contes et Légendes du Burkina Faso

Plateforme web multimédia et carte interactive 2D/3D pour préserver, numériser et transmettre le patrimoine oral burkinabè.
Projet du module Web Multimédia, Master SI, Groupe 13 (2026).

**Site en ligne :** https://fernandamed28.github.io/contes-burkina/

## Équipe — Groupe 13
<!-- Chaque membre ajoute sa ligne ci-dessous : NOM Prénom (filière) — rôle dans le projet -->
- TINDANO Fernand Amed (SI) — coordination, conception et développement, déploiement, rapport ; voix de « Diaba Lompo » en gulmancema et en français
- TEGA P.S Lareine (SIE) 

## Fonctionnalités
- Carte interactive 2D/3D (MapLibre GL) : régions, récits géolocalisés, filtres, relief.
- Lecteur narratif : scènes illustrées en SVG animées (GSAP), choix interactifs, quiz.
- Audio : récits enregistrés en langues nationales (Howler.js), voix de synthèse française (Web Speech API), ambiance de veillée générée (Web Audio API).
- Bibliothèque avec recherche et filtres, page de contribution.

## Lancer en local
```bash
npm install
npm run dev
```

## Ajouter un enregistrement audio
1. Placer le fichier dans `public/audio/<id-du-conte>/<langue>.mp3` (langues : `moore`, `dioula`, `fulfulde`, `gulmancema`, `fr`).
2. Le déclarer dans `public/audio/manifest.json`, par exemple :
   ```json
   { "yennenga": { "moore": { "fichier": "yennenga/moore.mp3", "voix": "NOM Prénom", "duree": "1 min 20" } } }
   ```
   `voix` et `duree` sont affichés sur le lecteur, la fiche de fin et l'accueil (récit à la une).
3. Publier avec `npm run deploy` (construit le site et le pousse sur la branche `gh-pages`). Les anciens fichiers `assets/` sont conservés (`--add`) : un visiteur dont le navigateur a gardé une ancienne page en cache ne tombe pas sur une page sans style.

## Ajouter un récit
Ajouter une entrée dans `src/data/contes.js` (texte découpé en scènes, décor, personnages, choix éventuels).
