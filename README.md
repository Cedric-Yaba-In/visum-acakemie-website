# Visum Akademie — Site Vitrine

Site vitrine complet avec dashboard admin pour la gestion des annonces et formations.

## Stack technique

- **Next.js 14** (App Router) — Framework React
- **TypeScript** — Typage statique
- **Tailwind CSS** — Styles
- **Prisma** — ORM
- **PostgreSQL** — Base de données
- **Jose** — JWT pour l'authentification admin
- **bcryptjs** — Hashage des mots de passe
- **Zod** — Validation des données
- **React Hook Form** — Gestion des formulaires

---

## Installation et démarrage

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer la base de données

Copie `.env.example` en `.env` et remplis les variables :

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/visum_akademie?schema=public"
JWT_SECRET="une-cle-secrete-aleatoire-de-32-caracteres-minimum"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Créer les tables en base

```bash
npm run db:migrate
# ou pour un push rapide sans migration :
npm run db:push
```

### 4. Peupler la base avec les données initiales

```bash
npm run db:seed
```

Cela crée :
- **Admin** : `admin@visum-akademie.com` / `Admin@2024!`
- 3 formations de démo
- 2 annonces de démo

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000)

---

## Pages du site

| URL | Description |
|-----|-------------|
| `/` | Accueil |
| `/formations` | Catalogue des formations |
| `/formations/[slug]` | Détail d'une formation |
| `/annonces` | Liste des annonces |
| `/annonces/[slug]` | Détail d'une annonce |
| `/niveaux` | Guide des niveaux |
| `/inscription` | Formulaire d'inscription |
| `/contact` | Formulaire de contact |

## Dashboard Admin

| URL | Description |
|-----|-------------|
| `/admin/login` | Connexion admin |
| `/admin` | Dashboard (stats) |
| `/admin/annonces` | Gestion des annonces |
| `/admin/annonces/new` | Créer une annonce |
| `/admin/annonces/[id]` | Modifier une annonce |
| `/admin/formations` | Gestion des formations |
| `/admin/formations/new` | Créer une formation |
| `/admin/formations/[id]` | Modifier une formation |
| `/admin/messages` | Messages de contact |

---

## Déploiement sur Vercel

1. Pousse le code sur GitHub
2. Importe le projet sur [vercel.com](https://vercel.com)
3. Ajoute les variables d'environnement dans les settings Vercel :
   - `DATABASE_URL` (utilise [Neon](https://neon.tech) ou [Supabase](https://supabase.com) pour PostgreSQL gratuit)
   - `JWT_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
4. Déploie — Vercel exécute automatiquement `prisma generate && next build`

### Base de données PostgreSQL gratuite recommandée

- **Neon** : [neon.tech](https://neon.tech) — PostgreSQL serverless, tier gratuit généreux
- **Supabase** : [supabase.com](https://supabase.com) — PostgreSQL + extras

---

## Commandes utiles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run db:migrate   # Créer une migration
npm run db:push      # Push du schéma sans migration
npm run db:seed      # Peupler la base
npm run db:studio    # Interface visuelle Prisma Studio
```

---

## Changer le mot de passe admin

Après le seed, connecte-toi sur `/admin/login` avec les identifiants par défaut et change le mot de passe via Prisma Studio :

```bash
npm run db:studio
```
