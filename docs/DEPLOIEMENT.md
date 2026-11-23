# Déploiement — Vercel + Cloudflare

Dépôt : <https://github.com/Junior620/ziiiilo> (branche `main` = production).

## 1. Créer le projet Vercel

1. Sur vercel.com : **Add New… → Project**, importer le dépôt GitHub `Junior620/ziiiilo`.
2. Vercel détecte Next.js. Les réglages viennent de `vercel.json` :
   - installation `pnpm install --frozen-lockfile` (pnpm 10, version fixée par `packageManager`) ;
   - build `pnpm build` ;
   - fonctions (dont `/api/contact`) dans la région **cdg1 (Paris)**, la plus proche de Douala.
3. **Node.js** : 20.x ou plus récent (Settings → General → Node.js Version).
4. Renseigner les variables d'environnement (§2), puis **Deploy**.

Chaque push sur `main` déploie la production ; chaque autre branche ou pull request donne un aperçu (`*.vercel.app`, non indexé par Google).

## 2. Variables d'environnement

| Variable | Production | Aperçus | Rôle |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://ziiiilo.tech` | (vide) | URL canonique, sitemap, Open Graph |
| `RESEND_API_KEY` | à fournir | facultatif | Envoi des demandes de contact |
| `CONTACT_FROM_EMAIL` | à fournir (ex. adresse sur un domaine vérifié chez Resend) | facultatif | Expéditeur des e-mails |
| `CONTACT_TO_EMAIL` | `christian.momo@ziiiilo.tech` | idem | Réception des demandes |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | recommandé | facultatif | Limite de débit partagée entre les instances |
| `ZIIIILO_DEV_PAGES` | **ne pas définir** | — | Pages internes (tests seulement) |
| `CONTACT_SIMULATE` | **ne pas définir** | — | Simulation d'envoi (tests seulement) |

Sans `RESEND_API_KEY` et `CONTACT_FROM_EMAIL`, le formulaire répond « service non configuré » en production : aucune demande n'est perdue en silence, mais aucune n'est envoyée. Le plus simple pour Upstash est l'intégration Vercel Marketplace, qui crée les deux variables.

## 3. Domaine `ziiiilo.tech` via Cloudflare

1. Vercel → Settings → **Domains** : ajouter `ziiiilo.tech` et `www.ziiiilo.tech` (rediriger `www` vers l'apex).
2. Cloudflare → DNS, créer les enregistrements indiqués par Vercel (en général) :
   - `A` `@` → `76.76.21.21` ;
   - `CNAME` `www` → `cname.vercel-dns.com`.
3. **Proxy Cloudflare** : laisser les deux enregistrements en **DNS only (nuage gris)** au départ, le temps que Vercel émette le certificat. Si vous activez ensuite le proxy (nuage orange) pour la protection Cloudflare :
   - SSL/TLS → mode **Full (strict)** (jamais « Flexible », qui crée une boucle de redirection) ;
   - désactiver Rocket Loader et la minification automatique (ils cassent l'hydratation React) ;
   - ne pas mettre en cache le HTML côté Cloudflare (Vercel gère son propre cache).
4. Resend : ajouter dans Cloudflare les enregistrements SPF / DKIM fournis par Resend pour le domaine expéditeur (DNS only).

## 4. Ce que le code prévoit déjà

- En-têtes de sécurité sur toutes les réponses (`next.config.ts`) : HSTS, `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`. Pas encore de CSP (scripts en ligne : à ajouter avec un nonce).
- `robots.txt` et `sitemap.xml` générés à partir de `NEXT_PUBLIC_SITE_URL` ; `/en` reste en 404 tant que `features.showEnglish` vaut `false`.
- Aucun cookie de mesure : aucun outil d'audience n'est branché.
- Fichiers `.env*` ignorés par git (sauf `.env.example`).

## 5. Aperçus de partage (Open Graph, X, LinkedIn, WhatsApp)

- Chaque page a sa propre image 1200 × 630 en JPEG, générée au build par `next/og` : `/og/fr/<page>.jpg`. Exemples : `/og/fr/accueil.jpg`, `/og/fr/etude-golden-beans.jpg`. Le gabarit est dans `src/lib/og/render.tsx` et le contenu de chaque image dans `src/lib/og/pages.ts`.
- Les balises `og:*` et `twitter:*` utilisent des URL absolues construites à partir de `NEXT_PUBLIC_SITE_URL` : la variable doit valoir `https://ziiiilo.tech` en production.
- Après la mise en ligne, vérifier et rafraîchir le cache de chaque réseau :
  - Facebook / WhatsApp : <https://developers.facebook.com/tools/debug/> (« Scrape Again ») ;
  - LinkedIn : <https://www.linkedin.com/post-inspector/> ;
  - X : publier un brouillon avec le lien ; l’aperçu utilise `twitter:card = summary_large_image`.
- WhatsApp garde un aperçu en cache longtemps : tester avec une URL jamais partagée, par exemple en ajoutant `?v=1`.
- Cloudflare : ne pas bloquer les robots des réseaux sociaux (`facebookexternalhit`, `LinkedInBot`, `Twitterbot`, `WhatsApp`). Avec « Bot Fight Mode » actif, vérifier que les aperçus passent toujours.

## 6. Vérifications après la mise en ligne

- `https://ziiiilo.tech` s'ouvre, `www` redirige, certificat valide.
- `/robots.txt` et `/sitemap.xml` utilisent bien `https://ziiiilo.tech`.
- Une adresse inconnue (`/realisations/inconnue`) répond 404.
- Formulaire de contact : une vraie demande arrive dans la boîte de réception.
- Lighthouse mobile ≥ 90 sur l'accueil, Services, Réalisations et Contact.

## 7. Avant d’annoncer le site

Toujours à fournir par ZIIIILO : clés Resend, listes budget et délai, numéro RCCM complet, fonction du directeur de la publication, durées de conservation, droit applicable, date de mise à jour des pages juridiques, adresses des réseaux sociaux, relecture juridique. La page CocoaTrack reste soumise à l'accord de STE-SCPB (`publication.cocoatrack` dans `src/config/site.ts`).
