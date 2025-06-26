# 🌌 R3F Solar System


Une visualisation interactive 3D du système solaire développée avec React Three Fiber (R3F) et Next.js. Explorez les planètes, découvrez leurs caractéristiques et visionnez des vidéos éducatives sur chaque corps céleste. Inspiré par [Eyes On The Solar System](https://eyes.nasa.gov/apps/solar-system/).

---

## ✨ Fonctionnalités

- 🌍 Modèles 3D réalistes des planètes avec textures précises
- 🛸 Mouvement orbital et rotation animés
- 🎵 Musique d’ambiance avec contrôle
- 🎥 Vidéos éducatives par planète
- 🔍 Fiches d'information interactives
- 🎮 Contrôles de navigation fluides
- 🌀 Vitesse orbitale dynamique (accélération des planètes possible)
- 🎵 Musique d’ambiance intégrée à l’interface (bouton mobile & interface planètes)
-  🎥 Lecteur vidéos éducatives pour chaque planète (Crash Course, YouTube)
-  📖 Fiches d'information interactives par corps céleste
-  🌌 Skybox réaliste avec texture HD de la Voie Lactée
-  🗺️ Nouvelle page "Galaxie" avec :
Système stellaire interactif
Chargement dynamique de planètes via fichier galaxies.json
Points lumineux interactifs dans la galaxie (GalaxyPoint)

---

## 🚀 Stack Technique

- [Next.js](https://nextjs.org/) – Framework React
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) – Rendu Three.js en React
- [Three.js](https://threejs.org/) – Librairie 3D
- [TypeScript](https://www.typescriptlang.org/) – Typage statique
- [Tailwind CSS](https://tailwindcss.com/) – Style
- [shadcn/ui](https://ui.shadcn.com/) – Composants UI

---
🔌 Intégrations API
NASA Mars Rover : Photos des rovers martiens

NASA DONKI : Suivi d’éruptions solaires

Exoplanet Archive (TRAPPIST-1) : À venir


## Ajout 

🌕 Ajout des lunes pour Jupiter, Saturne…

🛰️ Intégration de satellites artificiels

🌠 Ajout d’un mode “exploration libre” de la galaxie

🎨 Système de surbrillance lors de la sélection

📉 Optimisation GPU + Level Of Detail (LOD

## 📦 Installation

Assurez-vous d'avoir [Node.js](https://nodejs.org/) et [pnpm](https://pnpm.io/) installés.

1. Cloner le repo :
   ```bash
   git clone https://github.com/Pauldatcom/React-Nextjs.git
   cd React-Nextjs
   cd my-app
   ```

2. Installer les dépendances :
   ```bash
   pnpm install
   ```

3. Lancer le serveur local :
   ```bash
   pnpm dev
   ```

4. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🎮 Contrôles

- **Drag souris** : Orbit autour du système solaire
- **Scroll** : Zoom
- **Click** : Sélectionner une planète
- **Espace** : Activer/désactiver la musique
- **Ctrl + ↑/↓** : Volume

---

## 📝 Licence

Projet sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour les détails.

---

## 🙏 Crédits

- Textures planétaires : [Solar System Scope](https://www.solarsystemscope.com/textures/)
- Données scientifiques : [NASA](https://science.nasa.gov/solar-system/planets/)
- Musique : [Clavier Clavier](https://pixabay.com/users/clavier-music-16027823/) via [Pixabay](https://pixabay.com/)
- Vidéos pédagogiques : [Crash Course](https://thecrashcourse.com/)
- Inspiration loading screen : [css-loader](https://github.com/vineethtrv/css-loader)
- Design & base : @jjteoh-thewebdev 

## License 

- CCO pour les textures 

---

## 🛣️ Prochaines étapes

- Zoom sur chaque planète
- Intégration de lunes et satellites
- Ajout d’astéroïdes, météores, incidents spatiaux
- Optimisation : niveau de détail (LOD)

---

**🧠 Ce projet est initialement basé sur une version développée par [@jjteoh-thewebdev](https://github.com/jjteoh-thewebdev).**
