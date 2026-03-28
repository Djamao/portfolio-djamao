# Portfolio Djamao Pierre

Portfolio de Djamao Pierre, designer digital français.

## Tech Stack
- Next.js 16 (App Router, JavaScript, pas TypeScript)
- Tailwind CSS
- Framer Motion

## Commands
- `npm run dev` - Serveur dev sur http://localhost:3000

## Règles absolues

**NEVER** ajouter du scroll sur HOME, ABOUT, PROJETS INDEX, CONTACT.
Ces pages doivent tenir en `height: calc(100vh - 49px)` avec `overflow: hidden`.

**NEVER** utiliser TypeScript, shadcn, MUI ou toute bibliothèque UI externe.

**ALWAYS** encoder les noms de fichiers avec espaces : `staeky%20mockup.png`

**ALWAYS** ajouter `'use client'` sur tout composant qui utilise Framer Motion, useState ou useEffect.

## Design system

- Font titres : `var(--font-clash)` (Clash Grotesk Bold/Semibold)
- Font body : `var(--font-cabinet)` (Cabinet Grotesk Regular/Medium)
- Couleur base : #0a0a0a (noir) et #ffffff (blanc)
- Navbar height : 49px exactement

## Couleurs d'accent par projet
- STAEKY → #4A6FE3
- BAKERY BLISS CAFÉ → #C94B1F
- SAM QUILES → #0a0a0a
- DJAMAO PIERRE → #2D5016

## Structure des pages

**Navbar** (sticky, z-index 100) : 3 colonnes égales séparées par border 1px #0a0a0a
- Gauche : "djamao" → /
- Centre : "projets" → /projets
- Droite : "contact" → /contact

**HOME** (/) : pas de scroll, bonsai z-index INFÉRIEUR au titre
**ABOUT** (/about) : pas de scroll, vagabond.png à gauche, texte à droite
**PROJETS INDEX** (/projets) : pas de scroll, navigation par scroll molette entre les 4 projets
**PROJETS DETAIL** (/projets/staeky etc.) : pas de scroll, galerie de cartes en bas cliquables
**CONTACT** (/contact) : pas de scroll, fond #0a0a0a, formulaire underline uniquement (pas de rectangle)

## Titre vertical (VerticalWords)

Pour les noms avec espaces : les lettres de chaque mot côte à côte, les mots empilés.
Ex "SAM QUILES" → S Q / A U / M I / I L / L E / E S
Pour un seul mot (STAEKY) → une lettre par ligne, colonne unique.
