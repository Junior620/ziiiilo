# ZIIIILO — Guide d’utilisation du design (pour Claude Code)

Nov 19, 2026 · @Monsieur TCHEUMENI DENIS

## 1. Objet et mode d’emploi

Ce guide traduit les maquettes Figma du site ZIIIILO en règles de code : c’est la référence que Claude Code lit avant d’écrire une ligne. Claude le met à jour à chaque modification du design ; la version en vigueur figure dans le journal (section 13).

1. Exporter ce guide en Markdown et le placer à la racine du dépôt sous `docs/DESIGN.md`, puis le citer dans le `CLAUDE.md` du projet.
2. Connecter le serveur MCP Figma à Claude Code : il lit chaque écran via son node-id (section 2).
3. Coder dans l’ordre : tokens → composants → pages → animations → interactions.
4. Après chaque évolution du design, remplacer `docs/DESIGN.md` par la nouvelle version et relire le journal.

Prompt de démarrage à donner à Claude Code :

```text
Lis docs/DESIGN.md en entier. Le design est dans Figma : fichier G9fhCfbvi9MiIgojXaZ54w.
1. Initialise le projet avec la stack de la section 3 et les tokens de la section 4.
2. Code les composants de la section 6 un par un et compare chacun à son nœud Figma (get_design_context).
3. Assemble les pages de la section 7, desktop puis mobile, selon les breakpoints de la section 5.
4. Ajoute les animations de la section 8 et les comportements de la section 9.
Aucun contenu inventé : tous les textes viennent de Figma ; les champs « à configurer » restent des variables.
```

Règles non négociables :

- Le logo ne se redessine pas : utiliser les SVG fournis (section 11).
- Aucune donnée inventée : clients, chiffres, témoignages, coordonnées.
- Aucune couleur, taille ou espacement codé en dur : uniquement les tokens de la section 4.

## 1 bis. Audit avant développement (23/11/2026)

Vérification automatique de toutes les pages Desktop (35 écrans), Mobile (35) et Tablette (2) :

- Prototype : aucun lien cassé ; 14 parcours desktop, 13 mobile et 1 tablette, tous valides.
- Polices : aucune police manquante (Sora, Inter).
- Textes : aucun débordement hors cadre ni texte tronqué (les recadrages des maquettes sont volontaires).
- Les maquettes conceptuelles contiennent volontairement des libellés fictifs (« À compléter », « 2 champs à compléter ») : ce ne sont pas des oublis.

### À compléter avant la mise en ligne (bloquant)

- **Coordonnées** : ✅ renseignées en v2.7 dans le pied de page, la page Contact (desktop, mobile, tablette, tous les états) et les pages légales : téléphone +237 695 607 089 (lien tel:+237695607089), e-mail christian.momo@ziiiilo.tech (lien mailto:), adresse Bonamoussadi – Rond-point Maetur, BP 8283 Douala, site https://ziiiilo.tech. Le bloc WhatsApp est devenu « Téléphone » (bouton « Appeler »). Reste à confirmer : un numéro WhatsApp, s’il diffère.
- **Mentions légales et politique de confidentialité** : siège, e-mail et téléphone renseignés en v2.7 ; capital social (900 000 FCFA) et NIU (M012318000983X) renseignés en v3.0 ; directeur de la publication (DJOUNDA NGAPGHO MOMO Christian, fonction à préciser) et hébergeurs (Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis ; Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis) renseignés en v3.0 ; restent à compléter : numéro RCCM complet (préfixe RC/DLA/2023/B/ connu), service d’envoi d’e-mails, durées de conservation, outil de mesure d’audience, droit applicable. Texte à faire valider par un professionnel du droit.
- **Réseaux sociaux** : LinkedIn, Facebook et Instagram n’ont aucune URL dans le pied de page.
- **Services 09 (Data Science & IA) et 10 (Tableaux de bord & BI)** : pas de page de détail ; sur desktop, le bouton « Voir le détail du service » ne mène nulle part. Créer les deux pages ou retirer le bouton.
- **Statuts à confirmer** : SCPB Commercial ; modules de CocoaTrack ; publication de CocoaTrack soumise à la validation de STE-SCPB.

### À corriger ou compléter (non bloquant)

- ✅ Corrigé (v2.7) — Réalisations : 4 blocs à la une (FleetRent, CocoaTrack, STE-SCPB, Ninety One Foot Academy), libellé « Autres réalisations », puis les 7 autres en grille, sans doublon. Même ordre sur mobile. Anciens blocs et cartes rangés dans le cadre « Archive — Réalisations desktop … » (à ne pas coder). Les 5 cartes sans visuel ont reçu la couverture de leur ancien bloc.
- ✅ Corrigé — état vide de la grille masqué et annoté : à n’afficher que si un filtre ne renvoie aucun résultat.
- ✅ Corrigé — Contact mobile : « 07d — saisie en cours et champs valides » et « 07e — envoi en cours » ; dans le prototype, 07d → 07e → confirmation (07c) après 1,2 s.
- ✅ Corrigé — parcours « 03 · Découverte FleetRent — Mobile » ajouté.
- ⏳ STE-SCPB : 3 captures mobiles à fournir (accueil, catalogue, demande de devis). Le site interdit l’affichage en cadre et sa version mobile ne s’affiche correctement qu’avec JavaScript dans une fenêtre de 390 px : captures à prendre sur téléphone, puis à insérer dans les composants « Placeholder/STE-SCPB — Capture mobile à insérer » (231:134, 231:140, 231:146).
- ✅ Corrigé — SCPB Commercial : prospect fictif renommé « Distributeur fictif A ».
- ✅ Complété — Tablette (834 px) : Accueil et Contact, plus Services, Solutions, À propos, Réalisations, FAQ, Mentions légales, Politique de confidentialité et 404, déclinés depuis le mobile (une colonne élargie, marges de 40 px). Pages produit, détails de service et études de réalisation : appliquer les règles responsives du §5.
- Version anglaise : prévue (routes `/en/…`), aucun écran traduit.

### À ne pas coder

- Cadres « Archive — … » (anciennes sections Réalisations de l’accueil, à gauche des pages), « Mobile / 02 — Services (ancienne version longue — archive) » et « Design review — … ».
- Page « 07 - Visuels réseaux sociaux » : flyers Facebook et stories (V2 retenue, V1 non retenue), hors site.
- Annotations Dev Mode « Statut à confirmer » et « Note interne » : notes de travail, jamais affichées.

### Ordre de développement conseillé

1. Fondations : couleurs (§4), typographie et grilles (§5), composants (§6).
2. Gabarits partagés : header, menu mobile, footer, en-têtes de section, CTA, cartes.
3. Pages principales : Accueil, Services et détails, Solutions, À propos, Réalisations avec filtres, Contact (tous les états), FAQ, 404, cookies, pages légales.
4. Pages produit (FleetRent, DocCloud) et études de réalisation (06b à 06j).
5. Données (`data/realisations.ts`, §3) et envoi du formulaire de contact.

## 2. Fichier Figma et index des écrans

Tout le design est dans [ZIIIILO — Site officiel](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w) (clé `G9fhCfbvi9MiIgojXaZ54w`). Pour lire un écran, passer son node-id à `get_design_context` ; dans une URL, le `:` devient `-` (`11:2` → `node-id=11-2`).

| Page Figma | node-id | Contenu |
| --- | --- | --- |
| 00 — Direction artistique | 0:1 | Logo, palette, typographie, contrastes, principes |
| 01 — Design System | 2:2 | Composants maîtres et variantes |
| 02 — Site Desktop | 2:3 | 12 écrans 1440 px |
| 03 — Site Mobile | 2:4 | 12 écrans 390 px |
| 04 — Prototype | 2:5 | Carte des parcours et animations |
| 05 — Assets | 2:6 | Logo, icônes, mockups, visuels |
| 06 — Handoff | 2:7 | Notes développeurs |

| Écran | Desktop (1440) | Mobile (390) |
| --- | --- | --- |
| Accueil | [11:2](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=11-2) | [22:2](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=22-2) |
| Menu mobile ouvert | — | [22:866](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=22-866) |
| Services | [13:861](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=13-861) | [23:760](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=23-760) |
| Détail service (gabarit) | [13:2161](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=13-2161) | [23:1975](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=23-1975) |
| Solutions | [14:2193](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=14-2193) | [24:1931](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=24-1931) |
| FleetRent (détail produit) | [15:2676](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=15-2676) | [24:2440](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=24-2440) |
| À propos | [17:3467](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=17-3467) | [25:3157](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=25-3157) |
| Réalisations | [17:3849](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=17-3849) | [24:3083](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=24-3083) |
| Contact — formulaire | [19:4130](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=19-4130) | [25:3462](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=25-3462) |
| Contact — erreurs | [21:4498](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=21-4498) | [25:3692](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=25-3692) |
| Contact — saisie valide | [21:4759](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=21-4759) | — |
| Contact — confirmation | [21:5009](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=21-5009) | [25:3884](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=25-3884) |
| FAQ | [19:4431](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=19-4431) | [25:3959](https://www.figma.com/design/G9fhCfbvi9MiIgojXaZ54w?node-id=25-3959) |

Les sections de chaque écran sont des frames nommés « Section — … » : un composant React par section.

Animations : le hero de l’accueil est animé sur `11:2` (desktop) et `22:2` (mobile), avec des timelines de 10 s. La planche de démonstration se trouve dans la section « Animations de texte — Motion » (`52:87`) de la page 04 · Prototype. Détail au §8.

### Écrans ajoutés en v1.3

| Écran | Desktop | Mobile | Tablette |
| --- | --- | --- | --- |
| Détail service — Sites web | `68:6024` | `68:11748` | — |
| Détail service — Applications mobiles (gabarit d’origine) | `13:2161` | `23:1975` | — |
| Détail service — Logiciels sur mesure | `68:6541` | `68:12292` | — |
| Détail service — Transformation digitale | `69:7091` | `69:13736` | — |
| Détail service — UI/UX Design | `69:7641` | `69:14313` | — |
| Détail service — Automatisation | `69:8170` | `69:14869` | — |
| Détail service — Conseil & architecture | `70:8236` | `70:15211` | — |
| Détail service — Maintenance & évolution | `70:8772` | `70:15774` | — |
| Services en accordéons | — | `23:760` (refait) ; ancienne version longue archivée : `67:5173` | — |
| Mentions légales | `71:8677` | `71:15945` | — |
| Politique de confidentialité | `71:8970` | `71:16198` | — |
| Page introuvable (404) | `75:9346` | `75:16308` | — |
| Accueil — bandeau cookies (première visite) | `76:9204` | `76:16839` | — |
| Superposition — Préférences cookies | `76:9161` | `76:16796` | — |
| Contact — envoi en cours | `76:17467` | — | — |
| Accueil | `11:2` | `22:2` | `77:7513` |
| Contact | `19:4130` | `25:3462` | `77:9388` |

Nouvelle page Figma : « 03b — Tablette (834) » (`77:87`). Nouvelles planches sur la page 01 : « DS — Accordéon service (mobile) » (`66:729`) et « DS — États techniques » (`73:687`).

### Écrans DocCloud (v1.4)

| Écran | Desktop | Mobile | Tablette |
| --- | --- | --- | --- |
| DocCloud — détail produit (nouveau) | `90:11552` | `92:9403` | — |
| Accueil — section « Nos produits » (FleetRent + DocCloud) | `11:2` (section `12:305`) | `22:2` (section `22:283`) | `77:7513` (section `77:7588`) |
| Solutions — bloc « DocCloud à la une » + carte catalogue | `14:2193` (bloc `89:10392`, carte `14:2621`) | `24:1931` (bloc `89:18686`, carte `24:2298`) | — |
| Réalisations — projet à la une + carte DocCloud | `17:3849` (bloc `89:22777`, carte `89:23894`) | `24:3083` (bloc `89:23204`) | — |

Nouvelles planches sur la page 01 : « DS — DocCloud (produit) » (`83:739`) et « DS — Cartes produit vedettes » (`87:17136`). Les pages FleetRent n’ont pas été modifiées.

### Écrans SCPB Commercial (v1.5)

| Écran | Desktop | Mobile |
| --- | --- | --- |
| Étude de réalisation SCPB Commercial | `103:11672` (page 02) | `111:11199` (page 03) |
| Accueil — section « Nos réalisations » | `12:305` | `22:283` (tablette `77:7588`) |
| Réalisations — projet à la une SCPB | `116:15339` | `116:29180` |
| Réalisations — carte SCPB de la grille | `116:15803` | — |
| Solutions — section « Solutions métiers » | `117:14016` | `117:25027` |

SCPB Commercial est une **solution métier** réalisée pour l’entreprise SCPB, pas un produit ZIIIILO : ne jamais lui donner le badge « Produit ZIIIILO ». Tablette (834) : la page SCPB n’est pas dessinée. Reprendre la version mobile, avec des grilles en 2 colonnes (piliers, maquettes, technologies, bénéfices) et la timeline en 3 + 3.

### Écrans StafTrack (v1.7)

| Écran | Desktop | Mobile |
| --- | --- | --- |
| Étude de réalisation StafTrack | `126:14817` (page 02) | `131:14099` (page 03) |
| Accueil — « Nos réalisations », 4 cartes en 2 groupes | `12:305` | `22:283` (tablette `77:7588`, grille 2 × 2) |
| Réalisations — projet à la une StafTrack | `135:19293` | `135:32382` |
| Réalisations — carte StafTrack | `135:19883` | — |
| Solutions — bloc StafTrack (section Solutions métiers) | `135:19909` | `135:32754` |

StafTrack (nom retenu le 20/11/2026, site `staf-track.com`) est une **solution métier** réalisée par ZIIIILO pour l’entreprise SCPB, également cliente de SCPB Commercial. Statut : **Disponible**. Le document source l’appelait « Pointage RH » : ce nom sert de description, plus de nom de produit.

### Écrans Prévisions Cacao & Robusta (v1.9)

| Écran | Desktop | Mobile |
| --- | --- | --- |
| Étude de réalisation Prévisions Cacao & Robusta | `149:20336` (page 02) | `157:17634` (page 03) |
| Accueil — « Nos réalisations », 5 cartes + tuile « Et votre projet ? » | `12:305` (carte `164:21942`, tuile `164:22181`) | `22:283` (carte `164:35855`) ; tablette `77:7588` (carte `164:37305`, tuile `164:37442`) |
| Réalisations — projet à la une | `165:20161` | `165:35575` |
| Réalisations — carte | `165:20652` | — |
| Réalisations — filtres « Data Science » et « SaaS et plateformes » | `17:3900` | `24:3109` |
| Solutions — bloc Prévisions Cacao & Robusta | `167:20378` | `167:35917` |
| Services — Service 09 Data Science & IA, Service 10 Tableaux de bord & BI | `167:40651`, `167:40737` | accordéons après Service 08 (`23:760`) |

La Plateforme de prévision Cacao & Robusta (nom court provisoire « Cacao & Robusta Forecast », application « SCPB Market Forecast », site `forecast.ste-scpb.com`) est une **solution métier** réalisée par ZIIIILO pour l’entreprise SCPB. Statut : **En ligne**, aucun horizon de prévision validé au 20/11/2026. Ce n’est pas un produit ZIIIILO commercialisé ; les droits de propriété intellectuelle ne sont pas revendiqués. L’application de production n’est jamais modifiée depuis le site ZIIIILO.

### Écrans SCPB Survey (v2.0)

| Écran | Desktop | Mobile |
| --- | --- | --- |
| Étude de réalisation SCPB Survey | `200:23564` (page 02) | `204:16328` (page 03) |
| Accueil — « Nos réalisations », 6 cartes (Solutions métiers en grille 2 × 2) | `12:305` (carte `207:38880`) | `22:283` (carte `207:40199`) ; tablette `77:7588` (carte `207:42861`) |
| Réalisations — projet à la une | `207:39545` | `207:40864` |
| Réalisations — carte | `207:40176` | — |
| Solutions — bloc SCPB Survey | `207:50200` | `207:50851` |

SCPB Survey est une **application mobile Android de collecte terrain** réalisée par ZIIIILO pour l’entreprise SCPB (coopérative de cacao) : registre des planteurs et parcelles, consentement, enquêtes ménage, scolarisation et exploitation, hors ligne puis synchronisées. Statut affiché : **Pilote en préparation** (le cœur est prêt pour un pilote) ; chaque module garde son propre statut. Pas de site public : aucun lien externe. Droits de propriété intellectuelle non revendiqués.

### Écrans STE-SCPB (v2.1)

| Écran | Desktop | Mobile |
| --- | --- | --- |
| Étude de réalisation STE-SCPB (15 sections) | `233:23711` (page 02) | `240:19126` (page 03) |
| Accueil — « Réalisation à la une » | `245:24420` (carte `245:24423`) | `245:32974` (carte, sous le surtitre `245:32973`) ; tablette `245:33017` (carte `245:33020`) |
| Réalisations — projet à la une | `246:87` | `246:1833` |
| Réalisations — carte | `246:627` | — |
| Services — exemple de réalisation (service 01) | `248:1113` (dans `13:941`) | `248:1143` (dans `67:5234`) |

STE-SCPB est un **site web corporate international** réalisé par ZIIIILO SARL pour STE-SCPB, exportateur de produits agricoles camerounais : catalogue de onze familles de produits, démarche de traçabilité, page EUDR, demande de devis export, versions française, anglaise et russe, thème sombre et thème clair. Statut affiché : **En production** ; lien externe « Visiter le site » → https://ste-scpb.com. Le site n’est pas présenté comme certifié EUDR ni comme garantissant juridiquement la conformité des marchandises ; aucun chiffre de trafic, de ventes ou de conversion n’est affiché.

### Écrans Golden Beans SA (v2.2)

| Écran | Desktop | Mobile |
| --- | --- | --- |
| Étude de réalisation Golden Beans SA (15 sections) | `262:24524` (page 02) | `266:19740` (page 03) |
| Accueil — « Nouvelle réalisation client » (carte + texte éditorial) | `268:87` | carte `268:290` ; tablette `268:3214` |
| Réalisations — carte de grille / projet mobile | `268:5357` | `268:5509` |
| Services — exemple dans le service 06 (Automatisation & intégration) | `268:5561` | `268:5609` |

Golden Beans SA est une **plateforme web B2B bilingue** (français, anglais) réalisée par ZIIIILO SARL pour un exportateur camerounais de cacao, de dérivés du cacao et de café : catalogue de six produits, traçabilité de la parcelle au port, préparation documentaire EUDR, devis et échantillons, cours de marché, carte Mapbox, Sanity Studio et veille de marché automatisée (n8n, OpenAI, Sanity, Resend). Statut : **En production** ; lien externe https://goldenbeans.cm. Réalisation client distincte de STE-SCPB : fiches et chartes séparées. Le portfolio compte désormais huit réalisations (StafTrack et SCPB Survey conservés).

### Écrans Ninety One Foot Academy (v2.3)

| Écran | Desktop | Mobile |
| --- | --- | --- |
| Étude de réalisation Ninety One Foot Academy (16 sections) | `278:25463` (page 02) | `281:20482` (page 03) |
| Accueil — « Réalisation client · SportsTech » (carte + texte) | `283:453` | carte `283:778` ; tablette `283:3881` |
| Réalisations — carte de grille / projet mobile | `285:392` | `285:565` |
| Services — exemple dans le service 02 (Applications mobiles) | `285:617` | `285:649` |

Ninety One Foot Academy (Douala) : écosystème réalisé par ZIIIILO SARL — site institutionnel bilingue en production, espace privé (comptes et candidatures opérationnels ; vues parent, joueur, coach en maquette avec données d’exemple) et **N91 MatchLab** (web livré, mobile V1 React Native/Expo). Aucun moteur d’IA externe activé. Le portfolio compte neuf réalisations (deux produits ZIIIILO, sept réalisations clients).

### Écrans Agora Film Invest (v2.4)

| Écran | Desktop | Mobile |
| --- | --- | --- |
| Étude de réalisation Agora Film Invest (16 sections) | `297:27498` (page 02) | `300:22316` (page 03) |
| Accueil — « Réalisation client · CreativeTech » | `302:455` | carte `302:1197` ; tablette `302:4214` |
| Réalisations — carte de grille / projet mobile | `302:10216` | `302:10404` |
| Services — exemple dans le service 05 (UI/UX Design) | `302:10456` | `302:10488` |

Agora Film Invest (Guadeloupe) : site one-page de production cinématographique **en production**. Intervention de ZIIIILO **confirmée par le client : refonte du site réalisée par ZIIIILO (novembre 2026). Le pied de page public mentionne encore « Site réalisé par Fastgraphiste » ; les captures ne sont pas retouchées**. Portfolio en v2.4 : deux produits ZIIIILO et huit réalisations clients ; l’accueil gardait alors sa structure (remplacée en v2.6 par 4 réalisations mises en avant et un aperçu compact).

### Écrans CocoaTrack (v2.6)

CocoaTrack (client STE-SCPB) : plateforme métier **interne** de traçabilité du cacao, de la parcelle au produit fini. Une seule étude détaillée, marquée « présentation privée » : desktop `319:1014`, mobile `325:1796` (15 sections + réalisations associées). Visuels : **maquettes conceptuelles à données fictives**, aucune capture réelle. Statut des modules : « à confirmer », porté par des annotations internes (Dev Mode) invisibles dans le rendu. Accueil restructuré : 4 réalisations mises en avant (FleetRent, CocoaTrack, STE-SCPB, Ninety One Foot Academy) puis un aperçu compact des 7 autres ; les anciens blocs sont archivés à gauche de chaque page. Portfolio : 2 produits ZIIIILO et 9 réalisations clients (11 au total).

## 3. Stack recommandée et architecture

Recommandation à confirmer par ZIIIILO : Next.js (App Router) + TypeScript + Tailwind CSS alimenté par les variables CSS de la section 4. Ce choix couvre le rendu serveur (référencement), le bilingue et les animations sans bibliothèque lourde.

| Besoin | Outil recommandé |
| --- | --- |
| Framework | Next.js 15+ (App Router), TypeScript strict |
| Styles | Tailwind CSS, thème branché sur les variables `--color-*`, `--space-*`, `--radius-*` |
| Polices | `next/font` : Sora (titres), Inter (textes), JetBrains Mono (effets de code) |
| Animations | motion (ex-Framer Motion, import depuis motion/react) (révélations, transitions) + petits hooks maison pour les effets texte (section 8) |
| Icônes | `lucide-react` (correspondances en section 11) |
| Langues | `next-intl`, routes `/fr` et `/en` |
| Formulaire | `react-hook-form` + `zod`, envoi via une route API (service d’e-mail à choisir) |

Arborescence proposée :

```text
src/
  app/[locale]/
    page.tsx                 # Accueil
    services/page.tsx        # Services
    services/[slug]/page.tsx # Détail service (gabarit)
    solutions/page.tsx       # Catalogue produits
    solutions/fleetrent/page.tsx
    a-propos/page.tsx        # /en/about
    realisations/page.tsx    # /en/work
    contact/page.tsx
    faq/page.tsx
    mentions-legales/page.tsx, confidentialite/page.tsx
  components/ui/        # Button, Badge, Field, Select, Checkbox, Accordion, Modal…
  components/layout/    # Header, MobileMenu, Footer, Section, SectionHeader
  components/cards/     # ServiceCard, FeatureItem, StepItem, ProductCard, ProjectCard, MemberCard
  components/motion/    # DecodeText, TypeLine, ScanText, RevealLines, CircuitUnderline
  components/brand/     # Logo, RingMotif, ServiceVisual, mockups
  content/fr.json, content/en.json
  styles/tokens.css
```

Cette arborescence de fichiers est incomplète depuis les ajouts suivants : la liste à jour de toutes les routes, des menus et des liens est au §9 bis « Plan de navigation ».

Route ajoutée en v1.4 : `solutions/doccloud/page.tsx` (`/en/solutions/doccloud`), même gabarit que `solutions/fleetrent`.

Route ajoutée en v1.5 : `realisations/scpb-commercial/page.tsx` (`/en/realisations/scpb-commercial`). FleetRent et DocCloud vivent sous `solutions/`, mais SCPB Commercial vit sous `realisations/`, car ce n’est pas un produit ZIIIILO. Filtres de `/realisations` : `tous`, `produits-ziiiilo`, `solutions-metiers`, `intelligence-artificielle`, `applications-web`, `applications-mobiles`.

```ts
// data/realisations.ts — entrée SCPB (FleetRent et DocCloud gardent leurs étiquettes actuelles)
{
  slug: 'scpb-commercial',
  type: 'solution-metier',        // jamais 'produit'
  client: 'SCPB',
  roleZiiiilo: 'à confirmer',     // conception et développement
  categories: ['solutions-metiers', 'intelligence-artificielle', 'applications-web'],
  statut: 'a-confirmer',          // configurable, affiché « Statut à confirmer »
  href: '/realisations/scpb-commercial',
}
```

Route ajoutée en v1.7 : `realisations/staftrack/page.tsx` (`/en/realisations/staftrack`), même gabarit que SCPB Commercial.

```ts
// data/realisations.ts — entrée StafTrack
{
  slug: 'staftrack',
  type: 'solution-metier',
  client: 'SCPB',
  roleZiiiilo: 'conception et développement',
  categories: ['solutions-metiers', 'applications-web'],
  statut: 'disponible',
  site: 'https://staf-track.com',
  href: '/realisations/staftrack',
}
```

Accueil : les cartes sont groupées en « Produits ZIIIILO » (FleetRent, DocCloud) puis « Solutions métiers » (SCPB Commercial, StafTrack, Prévisions Cacao & Robusta, SCPB Survey), deux cartes par ligne en desktop (grille 2 × 2). La tuile « Et votre projet ? » de la v1.9 est retirée en v2.0 : la carte SCPB Survey prend sa place.

Ajout v2.1 : un bloc « Réalisation à la une » (STE-SCPB) précède les groupes « Produits ZIIIILO » et « Solutions métiers » en desktop (`245:24420`), mobile (`245:32974`) et tablette (`245:33017`). La carte porte deux boutons : « Voir le projet » → page d’étude, « Visiter le site » → https://ste-scpb.com (nouvel onglet). En tablette, seul « Visiter le site » est relié (pas de page d’étude tablette). Le chapeau de la section devient : « Deux produits développés par ZIIIILO et cinq réalisations pour des entreprises, dont une plateforme web en production : sept réponses numériques à des besoins concrets. »

Route ajoutée en v1.9 : `realisations/previsions-cacao-robusta/page.tsx`, même gabarit que les autres études de réalisation (slug anglais à définir avec la traduction).

```ts
// data/realisations.ts — entrée Prévisions Cacao & Robusta
{
  slug: 'previsions-cacao-robusta',
  type: 'solution-metier',
  client: 'SCPB',
  roleZiiiilo: 'conception et développement',
  categories: ['solutions-metiers', 'intelligence-artificielle', 'data-science'],
  statut: 'en-ligne',
  site: 'https://forecast.ste-scpb.com', // lien externe, nouvel onglet
  href: '/realisations/previsions-cacao-robusta',
}
```

```ts
// data/forecast-validation.ts — résultats réels au 20/11/2026
// Cacao, MAPE en %, 85 dates de test (janv. 2025 – sept. 2026). Plus bas = meilleur.
export const mapeCacao = [
  { horizon: 'J+1',  dernierCours: 2.4,  modele: 2.6 },
  { horizon: 'J+7',  dernierCours: 7.1,  modele: 7.9 },
  { horizon: 'J+14', dernierCours: 10.3, modele: 12.8 },
  { horizon: 'J+30', dernierCours: 16.0, modele: 24.4 },
];
export const horizonsValides: string[] = []; // aucun : jamais de badge « Validé »
```

Filtres de la page Réalisations : « Tous les projets », « Produits ZIIIILO », « Solutions métiers » (les « Applications métier » du brief), « Intelligence artificielle », « Applications web », « Applications mobiles », puis « Data Science » et « SaaS et plateformes » (v1.9). Les Prévisions apparaissent dans Solutions métiers, Intelligence artificielle et Data Science, jamais dans Produits ZIIIILO.

Route ajoutée en v2.0 : `realisations/scpb-survey/page.tsx`.

```ts
// data/realisations.ts — entrée SCPB Survey
{
  slug: 'scpb-survey',
  type: 'solution-metier',
  client: 'SCPB',
  roleZiiiilo: 'conception et développement',
  categories: ['solutions-metiers', 'applications-mobiles'],
  statut: 'pilote-en-preparation',
  plateforme: 'Android (APK interne)', // pas de site public
  href: '/realisations/scpb-survey',
}

// Statut par module : ne jamais tout afficher « Disponible »
export const modulesSurvey = {
  disponible: ['planteurs', 'consentement', 'enquete-menage', 'scolarisation', 'enquete-annuelle',
               'campagnes', 'partage-par-site', 'formations-missions', 'synchronisation', 'administration'],
  finalisation: { parcelles: 'en test', clmrs: 'moteur prêt, branchement à faire',
                  questionnaires: 'diffusion aux téléphones à faire' },
  maquette: ['tracabilite-lots', 'espace-auditeur'],
};
```

Filtres : SCPB Survey apparaît dans « Solutions métiers » et « Applications mobiles », jamais dans « Produits ZIIIILO » ni « Intelligence artificielle » (le moteur CLMRS est un moteur de règles explicable).

```ts
// data/realisations.ts — entrée STE-SCPB
{
  slug: 'ste-scpb',
  type: 'solution-metier',
  client: 'STE-SCPB',
  realisePar: 'ZIIIILO SARL',
  categories: ['solutions-metiers', 'applications-web'], // jamais 'produits-ziiiilo'
  statut: 'en-production',
  siteUrl: 'https://ste-scpb.com', // lien externe, nouvel onglet
  href: '/realisations/ste-scpb',
  aLaUne: true, // bloc « Réalisation à la une » de l’accueil et de Réalisations
}
```

Filtres : STE-SCPB apparaît dans « Solutions métiers » et « Applications web » (plateformes web), jamais dans « Produits ZIIIILO ». CocoaTrack, présenté sur le site STE-SCPB, n’a pas de fiche de réalisation : simple lien externe vers https://www.ste-scpb.com/fr/cocoatrack, sans intégration technique directe revendiquée.

```ts
// data/realisations.ts — entrée Golden Beans SA
{
  slug: 'golden-beans',
  type: 'solution-metier',
  client: 'Golden Beans SA',
  realisePar: 'ZIIIILO SARL',
  categories: ['solutions-metiers', 'applications-web', 'intelligence-artificielle'], // jamais 'produits-ziiiilo'
  statut: 'en-production',
  langues: ['fr', 'en'],
  siteUrl: 'https://goldenbeans.cm',
  href: '/realisations/golden-beans',
}
```

Filtres : Golden Beans SA apparaît dans « Solutions métiers », « Applications web » et « Intelligence artificielle » (automatisations), jamais dans « Produits ZIIIILO ». Les filtres existants du portfolio sont conservés.

```ts
// data/realisations.ts — entrée Ninety One Foot Academy
{
  slug: 'ninety-one-foot-academy',
  type: 'solution-metier',
  client: 'Ninety One Foot Academy',
  realisePar: 'ZIIIILO SARL',
  categories: ['solutions-metiers', 'applications-web', 'applications-mobiles'], // ni 'produits-ziiiilo' ni 'intelligence-artificielle'
  statut: 'livree-modules-en-evolution',
  volets: { siteOfficiel: 'en-production', espacePrive: 'partiel', matchlabWeb: 'livre', matchlabMobile: 'v1', laboratoireIA: 'non-connecte' },
  siteUrl: 'https://www.ninetyonefootacademy.com/fr/accueil',
  href: '/realisations/ninety-one-foot-academy',
}
```

Filtres : Ninety One Foot Academy apparaît dans « Solutions métiers », « Applications web » et « Applications mobiles », jamais dans « Produits ZIIIILO » ni « Intelligence artificielle ». Un filtre « SportsTech » n’a pas été ajouté (filtres actuels conservés).

```ts
// data/realisations.ts — entrée Agora Film Invest
{
  slug: 'agora-film-invest',
  type: 'realisation-client',
  client: 'Agora Film Invest',
  intervention: 'refonte', // refonte ZIIIILO ; le pied de page public mentionne encore Fastgraphiste
  categories: ['sites-web', 'creativetech'],
  statut: 'en-production',
  siteUrl: 'https://www.agorafilminvest.com/',
  href: '/realisations/agora-film-invest',
}
```

```ts
// data/realisations.ts — entrée CocoaTrack
{
  slug: 'cocoatrack',
  type: 'realisation-client',
  client: 'STE-SCPB',
  statut: 'solution-metier-interne',
  categories: ['solutions-metiers', 'data-science'], // filtres
  tags: ['AgriTech', 'GeoTech', 'Traçabilité', 'Intelligence satellite'],
  publication: 'soumise-a-validation', // ne pas publier sans accord de STE-SCPB
  siteUrl: null, // application interne : aucun lien externe
  href: '/realisations/cocoatrack',
}
```

Règle filtres et tags (v2.6) : les 9 filtres restent inchangés et servent à naviguer entre les grandes catégories ; les tags, affichés sur les cartes et les pages de détail, précisent les domaines et technologies. La même logique s’applique aux autres réalisations (la ligne « Catégorie » des cartes sert de tags). Sur mobile, les filtres restent une rangée défilante horizontale.

Nouveaux filtres (v2.4, validés) : Tous les projets · Produits ZIIIILO · Sites web · Applications mobiles · Solutions métiers · Intelligence artificielle · Data Science · CreativeTech · SaaS. La catégorie `applications-web` devient `sites-web`, `saas-et-plateformes` devient `saas`.

| Projet | Catégories (classement proposé, à valider) |
| --- | --- |
| FleetRent | Produits ZIIIILO, SaaS, Applications mobiles |
| DocCloud | Produits ZIIIILO, SaaS |
| SCPB Commercial | Solutions métiers, Intelligence artificielle |
| StafTrack | Solutions métiers |
| Prévisions Cacao & Robusta | Solutions métiers, Data Science, Intelligence artificielle |
| SCPB Survey | Solutions métiers, Applications mobiles |
| STE-SCPB | Sites web, Solutions métiers |
| Golden Beans SA | Sites web, Solutions métiers, Intelligence artificielle |
| Ninety One Foot Academy | Sites web, Applications mobiles, Solutions métiers |
| Agora Film Invest | Sites web, CreativeTech |

## 4. Design tokens

Les noms ci-dessous sont identiques aux variables Figma (collections Primitives, Couleurs, Espacements, Rayons) et à leur syntaxe CSS. Les composants n’utilisent que les tokens sémantiques ; les primitives ne servent qu’à les définir.

```css
:root {
  /* Primitives (tirées du logo) */
  --primitive-navy-950:#020A24; --primitive-navy-900:#06123F; --primitive-navy-800:#0A1D66; --primitive-navy-700:#011D8B;
  --primitive-blue-700:#0A5E91; --primitive-blue-600:#0E74B0; --primitive-blue-500:#1996CE; --primitive-blue-100:#E3F3FB; --primitive-blue-50:#F0F8FD;
  --primitive-cyan-400:#2EBCE4; --primitive-cyan-300:#6FD3EE; --primitive-cyan-100:#DDF4FB;
  --primitive-violet-700:#4E1550; --primitive-violet-600:#641B62; --primitive-violet-100:#F4E8F3;
  --primitive-orange-500:#F7AD28; --primitive-orange-100:#FEF2DC; --primitive-gold-400:#FEDA3E;
  --primitive-gray-0:#FFFFFF; --primitive-gray-25:#F8FAFD; --primitive-gray-50:#F2F5FA; --primitive-gray-100:#E7ECF3; --primitive-gray-200:#D5DDE8;
  --primitive-gray-300:#B6C1D2; --primitive-gray-400:#8C99B0; --primitive-gray-500:#5F6C86; --primitive-gray-600:#4A5670; --primitive-gray-700:#313C55;
  --primitive-gray-800:#1C2640; --primitive-gray-900:#0B1630;
  --primitive-green-600:#0E7A50; --primitive-green-100:#DFF5EC; --primitive-amber-700:#8F5400; --primitive-amber-100:#FFF3D6;
  --primitive-red-600:#C8323F; --primitive-red-100:#FCE6E8;

  /* Sémantiques */
  --color-primary-default:var(--primitive-blue-600); --color-primary-hover:var(--primitive-blue-700); --color-primary-brand:var(--primitive-blue-500);
  --color-primary-subtle:var(--primitive-blue-50); --color-primary-soft:var(--primitive-blue-100);
  --color-secondary-default:var(--primitive-navy-700); --color-secondary-dark:var(--primitive-navy-900);
  --color-accent-cyan:var(--primitive-cyan-400); --color-accent-cyan-soft:var(--primitive-cyan-100);
  --color-accent-violet:var(--primitive-violet-600); --color-accent-violet-soft:var(--primitive-violet-100);
  --color-accent-orange:var(--primitive-orange-500); --color-accent-orange-soft:var(--primitive-orange-100); --color-accent-gold:var(--primitive-gold-400);
  --color-background-default:var(--primitive-gray-0); --color-background-subtle:var(--primitive-gray-25); --color-background-muted:var(--primitive-gray-50);
  --color-background-inverse:var(--primitive-navy-950); --color-background-inverse-raised:var(--primitive-navy-900);
  --color-surface-default:var(--primitive-gray-0); --color-surface-sunken:var(--primitive-gray-50);
  --color-surface-inverse:var(--primitive-navy-900); --color-surface-inverse-raised:var(--primitive-navy-800);
  --color-text-primary:var(--primitive-gray-900); --color-text-secondary:var(--primitive-gray-600); --color-text-muted:var(--primitive-gray-500);
  --color-text-inverse:var(--primitive-gray-0); --color-text-inverse-muted:var(--primitive-gray-300);
  --color-text-link:var(--primitive-blue-600); --color-text-accent-on-dark:var(--primitive-cyan-400);
  --color-border-default:var(--primitive-gray-100); --color-border-strong:var(--primitive-gray-200); --color-border-input:var(--primitive-gray-300);
  --color-border-focus:var(--primitive-blue-500); --color-border-inverse:var(--primitive-navy-800);
  --color-success-default:var(--primitive-green-600); --color-success-subtle:var(--primitive-green-100);
  --color-warning-default:var(--primitive-amber-700); --color-warning-subtle:var(--primitive-amber-100);
  --color-error-default:var(--primitive-red-600); --color-error-subtle:var(--primitive-red-100);

  /* Espacements et rayons */
  --space-4:4px; --space-8:8px; --space-12:12px; --space-16:16px; --space-20:20px; --space-24:24px; --space-32:32px; --space-40:40px;
  --space-48:48px; --space-56:56px; --space-64:64px; --space-80:80px; --space-96:96px; --space-120:120px; --space-160:160px;
  --radius-xs:6px; --radius-sm:8px; --radius-md:12px; --radius-lg:16px; --radius-xl:24px; --radius-2xl:32px; --radius-full:999px;

  /* Effets */
  --shadow-xs:0 1px 2px rgb(11 22 48/.06);
  --shadow-sm:0 1px 2px rgb(11 22 48/.04),0 4px 12px -2px rgb(11 22 48/.06);
  --shadow-md:0 2px 4px rgb(11 22 48/.04),0 16px 40px -12px rgb(11 22 48/.16);
  --shadow-lg:0 4px 8px rgb(6 18 63/.04),0 32px 72px -20px rgb(6 18 63/.28);
  --halo-cyan:0 0 56px rgb(46 188 228/.35);
  --focus-ring:0 0 0 4px rgb(25 150 206/.28);
  --glass-nav:blur(20px); /* + box-shadow 0 10px 30px -10px rgb(6 18 63/.10), fond blanc 86 % */

  /* Dégradés */
  --gradient-hero:linear-gradient(135deg,#020A24 0%,#06123F 55%,#0A1D66 100%);
  --gradient-cta:linear-gradient(135deg,#06123F 0%,#0A1D66 55%,#3A1450 100%);
  --gradient-page-header:linear-gradient(135deg,#F0F8FD 0%,#F8FAFD 60%,#F7F1F8 100%);
}
```

Ajout v1.4 — univers DocCloud (variables Figma `teal/*` et `accent/teal*`) :

```css
:root {
  --primitive-teal-500:#14B8A6; --primitive-teal-700:#0F766E; --primitive-teal-100:#D5F5F0;
  --color-accent-teal:var(--primitive-teal-500);
  --color-accent-teal-strong:var(--primitive-teal-700);
  --color-accent-teal-soft:var(--primitive-teal-100);
  --gradient-doccloud:linear-gradient(135deg,#0A1D66 0%,#0F766E 100%);
}
```

Le turquoise est réservé à l’univers DocCloud (fonds, pictogrammes, statuts). Pour du texte sur fond clair, utiliser uniquement `--color-accent-teal-strong`.

Ajout v1.5 : SCPB Commercial n’introduit aucune variable. Il utilise la palette ZIIIILO : navy `background/inverse`, `primary/brand`, `accent/cyan`, et des touches `accent/violet` pour les décisions humaines. Le dégradé des couvertures SCPB reprend celui du hero de sa page (`103:11673`). Logo (v1.6) : **logo officiel SCPB** fourni par le client, vectorisé à l’identique avec ses 4 couleurs d’origine (`#6F7531` olive, `#94A538` vert, `#F7AD21` orange, `#060708` lettres). Ces couleurs appartiennent au logo seul : ne pas en faire des tokens de l’interface. Sur fond sombre, le logo est toujours posé sur une plaque blanche.

Ajout v1.7 : StafTrack n’introduit aucune variable (palette ZIIIILO). Logotype : représentation typographique **provisoire** (pictogramme épingle + « Staf » « Track » en Sora SemiBold), à remplacer dès qu’un logo existe. Aucun logo WhatsApp ni Meta n’est reproduit : la conversation est une illustration générique.

Ajout v1.9 : les Prévisions Cacao & Robusta n’introduisent aucune variable. Identité **provisoire** (`Identité/Cacao & Robusta Forecast (provisoire)`, pictogramme + texte). Dans les comparaisons, la référence (dernier cours connu) est en `background/inverse` plein et le modèle testé en `accent/orange` contour pointillé : la différence ne repose jamais sur la seule couleur, et le couple vert/rouge n’est pas utilisé.

Ajout v2.0 : SCPB Survey n’introduit aucune variable du site. Les écrans Android reprennent les couleurs SCPB en valeurs fixes, réservées aux maquettes : olive `#5E6429`, vert `#94A538`, or `#F7AD21`, encre `#1F2316`, ivoire `#FAF8F0`. Statuts d’enquête (« Soumise », « En cours », « À faire ») toujours avec icône + libellé (coche, horloge, tiret ; contour pointillé pour « À faire »). Identité **provisoire** : pictogramme document + « SCPB Survey » ; le logo officiel SCPB n’est pas modifié.

Ajout v2.1 : STE-SCPB n’introduit aucune variable du site ZIIIILO. La charte STE-SCPB n’apparaît que dans la page d’étude, comme élément du projet, avec la mention qu’elle ne remplace pas la charte ZIIIILO : seul l’or `#D4A853` est relevé sur le site ; les autres teintes de la palette sont marquées « indicative ». Le reste de la page (fonds, accents, typographies, composants) garde la charte ZIIIILO.

Sur fond sombre, les surfaces « verre » utilisent du blanc à 4–12 % d’opacité avec une bordure blanche à 10–18 %.

## 5. Typographie, grilles et responsive

### Polices

| Rôle | Police | Graisses | Chargement |
| --- | --- | --- | --- |
| Titres, chiffres | Sora | 600 (SemiBold) | `next/font/google`, variable `--font-display` |
| Texte, libellés, champs | Inter | 400, 500, 600, 700 | `next/font/google`, variable `--font-body` |
| Effets « code » des animations, mockups | JetBrains Mono | 400, 500 | `next/font/google`, variable `--font-mono` (la graisse 600 n’existe pas dans Figma, utiliser 500) |

### Échelle typographique (taille / interlignage en px)

| Style Figma | Desktop | Mobile | Classe suggérée |
| --- | --- | --- | --- |
| Display XL (hero accueil) | 60/68, Sora 600, -2 % | 36/42 (Mobile/Display) | `.text-display-xl` |
| Display L (hero pages) | 48/56, Sora 600, -1,5 % | 36/42 | `.text-display-l` |
| H1 | 44/52 | 32/40 | `.text-h1` |
| H2 (titres de section) | 36/44 | 28/36 | `.text-h2` |
| H3 | 26/34 | 22/30 | `.text-h3` |
| H4 (titres de carte) | 20/28 | 18/26 | `.text-h4` |
| H5 | 17/24 | 17/24 | `.text-h5` |
| Body XL (chapô hero) | 20/32, Inter 400 | 18/29 | `.text-body-xl` |
| Body L | 18/29 | 16/26 | `.text-body-l` |
| Body M / M Medium | 16/26, 400 / 500 | identique | `.text-body-m` |
| Body S / S Medium | 14/22 | identique | `.text-body-s` |
| Body XS | 12/18 | identique | `.text-body-xs` |
| Label L / M / S | 16/20 · 14/20 (Inter 600) · 12/16 (500) | identique | `.text-label-*` |
| Overline (surtitre) | 12/16, Inter 600, MAJUSCULES, +12 % | identique | `.text-overline` |
| Stat/Number | 40/48, Sora 600 | 32/40 | `.text-stat` |

Entre 390 et 1440 px, interpoler les titres avec `clamp()` plutôt que de sauter d’un palier à l’autre :

```css
.text-display-xl { font: 600 clamp(2.25rem, 1.5rem + 3.2vw, 3.75rem)/1.13 var(--font-display); letter-spacing: -0.02em; }
.text-h1 { font: 600 clamp(2rem, 1.6rem + 1.6vw, 2.75rem)/1.18 var(--font-display); letter-spacing: -0.015em; }
.text-h2 { font: 600 clamp(1.75rem, 1.5rem + 1vw, 2.25rem)/1.22 var(--font-display); letter-spacing: -0.01em; }
.text-h3 { font: 600 clamp(1.375rem, 1.25rem + 0.5vw, 1.625rem)/1.3 var(--font-display); }
.text-overline { font: 600 0.75rem/1.33 var(--font-body); letter-spacing: 0.12em; text-transform: uppercase; }
```

Longueur de ligne : 60–72 caractères pour le texte courant (`max-width: 68ch`), 18–24 mots pour un chapô.

### Grilles et conteneurs

| Point de rupture | Largeur de référence | Colonnes | Gouttière | Marge latérale | Conteneur |
| --- | --- | --- | --- | --- | --- |
| Mobile (`< 768px`) | 390 | 4 | 16 | 20 | 100 % |
| Tablette (`768–1199px`) | 834 | 8 | 20 | 40 | 100 % |
| Desktop (`≥ 1200px`) | 1440 | 12 | 24 | 120 | max 1200 px centré |

```css
.container { width: 100%; max-width: 1200px; margin-inline: auto; padding-inline: 20px; }
@media (min-width: 768px) { .container { padding-inline: 40px; } }
@media (min-width: 1200px) { .container { padding-inline: 0; } }
```

### Rythme vertical des sections

| Élément | Desktop | Mobile |
| --- | --- | --- |
| Padding vertical d’une section | 120 (hero 96 haut / 120 bas) | 64 |
| En-tête de section → contenu | 56 | 32 |
| Écart entre cartes d’une grille | 24 | 16 |
| Padding interne d’une carte | 32 | 24 |
| Hauteur du header | 104 (fixe, verre ; logo 112 × 56) | 88 (logo 96 × 48) |

### Règles responsive (le mobile est repensé, pas réduit)

- Les grilles de 3 ou 4 cartes passent en une colonne ; les listes de services longues deviennent des blocs repliables (voir §7, limite connue de la page Services mobile).
- Les sections « visuel + texte » alternées (gauche/droite) s’empilent toujours texte d’abord, visuel ensuite.
- Le menu desktop devient un bouton menu ouvrant un panneau plein écran (`Header/Mobile`, variante `Menu=Ouvert`).
- Les filtres (Réalisations) deviennent une rangée de puces défilante horizontalement.
- Les boutons d’appel à l’action passent en pleine largeur.
- Zone tactile minimale : 44 × 44 px.

Écrans tablette (page Figma « 03b — Tablette (834) ») : Accueil `77:7513` et Contact `77:9388`. Header mobile avec menu, marges de 40 px, titres au format desktop (Display L, H1, H2), cartes en grille de 2 colonnes, champs du formulaire par paires, options de projet sur 2 colonnes, bouton d’envoi à largeur naturelle. Les autres pages suivent les mêmes règles en code.

## 6. Composants

Tous les composants sont sur la page **01 · Design System**. Pour en lire un depuis Claude Code : `get_design_context` avec `fileKey=G9fhCfbvi9MiIgojXaZ54w` et le `nodeId` ci-dessous. Les variantes Figma deviennent des props typées ; les états Survol/Focus/Désactivé deviennent des pseudo-classes CSS, pas des props.

### Primitives d’interface

| Figma (nodeId) | Variantes et propriétés | Composant React | Notes d’implémentation |
| --- | --- | --- | --- |
| Bouton (`4:481`) | Style = Primaire / Secondaire / Fantôme · Taille = L (52 px) / M (44 px) · État = Défaut / Survol / Désactivé · props Libellé, Afficher l’icône, Icône | `<Button variant size icon asChild>` | Rayon `radius-full`. Survol : fond `primary-hover` + flèche décalée de 4 px (200 ms). Rendre un `<a>` via `asChild` quand c’est un lien. |
| Bouton/Sur fond sombre (`4:542`) | Inverse / Inverse contour | `<Button variant="inverse" \| "inverse-outline">` | Pour hero et sections CTA sombres. |
| Badge (`4:565`) | Statut = Disponible / En développement / Prévu / Produit ZIIIILO / Neutre / Sur fond sombre | `<StatusBadge status>` | Le texte est propre à chaque statut (pas de prop libellé). « Produit ZIIIILO » : texte `primary-hover`. |
| Nav/Lien (`4:572`) | État = Défaut / Survol / Actif | `<NavLink>` | Actif = `aria-current="page"` + trait 2 px sous le lien. |
| Filtre (`4:579`) | Sélectionné oui/non | `<FilterChip pressed>` | `role="button"` + `aria-pressed`. |
| Pastille icône (`6:179`) | Ton = Bleu / Violet / Orange / Sombre · Taille = L (56) / M (44) · prop Icône | `<IconTile tone size icon>` | Ne pas descendre sous 44 px (les icônes se déforment). |
| Motif/Anneau ZIIIILO (`6:143`) | — | `<RingMotif>` (SVG) | Motif décoratif dérivé des arcs du logo, `aria-hidden`. |

### Formulaire

| Figma (nodeId) | Variantes | Composant React | Notes |
| --- | --- | --- | --- |
| Champ/Texte (`10:285`) | État = Défaut / Focus / Rempli / Erreur / Désactivé | `<TextField label help error>` | Hauteur 52, bordure `border-input`, focus `border-focus` + `--focus-ring`. Message d’erreur relié par `aria-describedby`. |
| Liste déroulante (`10:337`) | mêmes états | `<Select>` (natif ou Radix) | Chevron `chevron-down`. |
| Zone de texte (`10:366`) | mêmes états | `<TextArea>` | Hauteur mini 140. |
| Case à cocher (`10:382`) | Cochée oui/non · Erreur | `<Checkbox>` | Consentement RGPD du formulaire de contact. |
| Option de choix (`10:398`) | Sélectionnée oui/non | `<ChoiceCard>` (radio stylisé) | Type de projet ; `role="radio"` dans un `radiogroup`. |
| Alerte (`10:442`) | Succès / Avertissement / Erreur / Info | `<Alert tone>` | Résumé d’erreurs en tête de formulaire, `role="alert"`. |
| Modale (`10:443`) | — | `<Dialog>` | Confirmation d’envoi ; piège du focus, fermeture Échap. |
| Accordéon (`10:418`) | Ouvert / Fermé | `<Accordion>` | FAQ ; `button[aria-expanded]` + région. |

### Structure

| Figma (nodeId) | Variantes | Composant React | Notes |
| --- | --- | --- | --- |
| Header/Desktop (`5:69`) | lien actif par page | `<SiteHeader>` | Fixe, fond verre (`--glass-nav`). Les instances « Lien — X » correspondent aux routes du §3. |
| Header/Mobile (`5:121`) | Menu = Fermé / Ouvert | `<SiteHeader>` (même composant) | Panneau `Menu mobile` (`5:122`) plein écran, verrouillage du défilement. |
| Footer/Desktop (`5:188`), Footer/Mobile (`5:255`) | — | `<SiteFooter>` | Coordonnées, réseaux et mentions = champs à configurer (§12). |
| En-tête de section (`6:220`) | Alignement = Gauche / Centré · Thème = Clair / Sombre · Surtitre, Titre, Description, Afficher la description | `<SectionHeader eyebrow title description align theme>` | Porte les animations de titre du §8. |
| Section CTA (`6:265`) | Taille = Desktop / Mobile | `<CtaSection>` | Fond `--gradient-cta` + anneau. |
| Section/Service détaillé (`10:735`) | Visuel à droite / à gauche / Mobile | `<ServiceDetail reverse>` | Gabarit réutilisable de la page détail service. |

### Cartes

| Figma (nodeId) | Variantes | Composant React | Notes |
| --- | --- | --- | --- |
| Carte/Service (`6:296`) | Défaut / Survol | `<ServiceCard>` | Survol : élévation `shadow-md`, translation -4 px, flèche. Toute la carte est cliquable (lien étendu). |
| Carte/Principe (`6:311`) | — | `<FeatureItem>` | Section « Pourquoi ZIIIILO ». |
| Carte/Étape (`6:325`) | Colonne / Ligne | `<StepItem orientation>` | Numéro en JetBrains Mono. |
| Carte/Produit (`6:382`) | Statut = En développement / Disponible / Emplacement réservé | `<ProductCard status>` | FleetRent = « En développement » tant que ZIIIILO ne confirme pas. |
| Carte/Réalisation (`6:422`) | Format = Standard / Gabarit | `<ProjectCard>` | « Gabarit » = emplacement vide en attendant de vrais cas clients. |
| Carte/Membre (`16:442`) | — | `<MemberCard>` | Gabarit vide : aucune personne inventée. |

### Visuels

| Figma (nodeId) | Variantes | Code | Notes |
| --- | --- | --- | --- |
| Visuel/Hero — Écosystème ZIIIILO (`7:246`) | — | `<HeroVisual>` en SVG/HTML | Composition logo + cartes flottantes ; données fictives étiquetées. |
| Mockup tableau de bord (`7:6`), Mockup mobile (`7:178`) | — | `<DashboardMock>`, `<PhoneMock>` | À coder en HTML/CSS (texte net) plutôt qu’en image. |
| Visuel/Service (`9:400`) | Type = Web / Mobile / Logiciel / Transformation / UIUX / Automatisation / Conseil / Maintenance | `<ServiceVisual type>` | Une illustration abstraite par service. |

### Composants ajoutés en v1.3

| Figma (nodeId) | Variantes et propriétés | Composant React | Notes |
| --- | --- | --- | --- |
| Accordéon/Service (`66:798`) | État = Fermé / Ouvert · Numéro, Titre, Besoin, Réalisation 1–3, Bénéfice 1–3 ; icône via la pastille | `<ServiceAccordion>` | Page Services mobile. `button[aria-expanded]` + région, un seul service ouvert à la fois. |
| Bouton — État=Chargement (dans `4:481`) | 6 variantes (3 styles × 2 tailles) | `<Button loading>` | Indicateur à la place de l’icône, `aria-busy="true"`, bouton désactivé pendant l’envoi. |
| Indicateur de chargement (`73:704`) | Ton = Marque / Inverse | `<Spinner tone>` | 20 px, 1 tour/s ; `role="status"` + texte masqué « Chargement ». |
| Interrupteur (`73:712`) | État = Activé / Désactivé / Verrouillé | `<Switch>` | `button[role="switch"][aria-checked]`. Verrouillé = toujours actif. |
| Squelette/Carte projet (`73:715`) | — | `<ProjectCardSkeleton>` | Reflet animé ; `aria-busy` sur la grille ; statique en mouvement réduit. |
| Bandeau cookies (`74:748`) | Taille = Desktop / Mobile | `<CookieBanner>` | « Tout refuser » et « Tout accepter » au même niveau visuel. |
| Modale/Préférences cookies (`74:813`) | Taille = Desktop / Mobile | `<CookiePreferences>` | Cookies nécessaires verrouillés ; mesure d’audience désactivée par défaut. |

### Composants DocCloud et produits (v1.4)

| Figma (nodeId) | Variantes et propriétés | Composant React | Notes |
| --- | --- | --- | --- |
| Logo/DocCloud (provisoire) (`83:799`), symbole (`83:768`) | Version = Couleur / Blanc | `<DocCloudLogo variant>` | **Provisoire**, réservé aux maquettes. SVG inline. |
| Carte/Document fictif (`83:800`) | prop Type | `<FictitiousDocument type>` | Toujours marqué « DOCUMENT FICTIF — SPÉCIMEN ». Jamais de vraie pièce ni de vraie photo. |
| Statut/Dossier DocCloud (`83:849`) | 7 statuts : Déclaration reçue → Document restitué | `<DossierStatus status>` | Texte + couleur, jamais la couleur seule. |
| Mockup/DocCloud — Mobile accueil, recherche, déclaration, suivi (`84:751`, `84:802`, `84:842`, `84:883`) | — | `<DocCloudPhone screen>` | Maquettes conceptuelles en HTML/CSS ; données fictives, informations sensibles masquées. |
| Mockup/DocCloud — Tableau de bord agence (`86:807`) | — | `<AgencyDashboardMock>` | Mention « Données d’illustration » obligatoire. |
| Visuel/DocCloud — Composition (`86:916`) | — | `<DocCloudVisual>` | Documents fictifs, suivi, lien de correspondance ; hero, cartes et portfolio. |
| Carte/Produit vedette (`87:18054`) | Produit = FleetRent / DocCloud · Taille = Desktop / Mobile | `<FeaturedProductCard product size>` | Section « Nos produits » de l’accueil, fond sombre. Statut toujours visible. |

### Composants SCPB Commercial et portfolio (v1.5)

| Composant | ID | Usage en code |
| --- | --- | --- |
| `Logo/SCPB Commercial` — Version=Sur fond clair / Sur fond sombre ; logo seul : Logo/SCPB (officiel), 118:2995, Fond=Clair / Sombre (plaque claire) | `97:1867` | `<ScpbWordmark variant>` ; logo officiel en SVG inline + nom « SCPB Commercial » en texte |
| `Mockup/SCPB Commercial — 01 Tableau de bord` à `06 Suivi commercial` | `97:1870`, `97:2012`, `97:2166`, `99:1967`, `99:2095`, `99:2220` | Composants statiques 760 × 488, données fictives, chip « Données fictives » obligatoire |
| `Étape/Workflow` — État=Repos / Survol / Mise en avant ; props Numéro, Titre, Description, Icône | `101:2082` | `<WorkflowStep highlighted>` ; `:hover` = styles Survol (bordure `primary/brand`, ombre MD, 200 ms) ; « Mise en avant » réservé à l’étape 4 |
| `Carte/Réalisation vedette` — Projet=FleetRent / DocCloud / SCPB Commercial / StafTrack × Taille=Desktop 588 (grille 2 × 2) / Mobile 342 | `101:4546` | `<RealisationCard>` sur fond sombre ; badge de statut et bouton exposés : le statut vient des données |

Planches : « DS — SCPB Commercial (réalisation) » et « DS — Cartes réalisations (portfolio) », page 01 DS. Sur mobile, les mockups s’affichent en **extraits recadrés** à 72 % (sans barre latérale) pour rester lisibles.

### Composants StafTrack (v1.7)

| Composant | ID | Usage en code |
| --- | --- | --- |
| `Logo/StafTrack (provisoire)` — Version=Sur fond clair / Sur fond sombre | `122:3060` | `<StafTrackWordmark>` en texte + icône ; provisoire |
| `Mockup/StafTrack — 01 Tableau de bord RH`, `02 Pointages`, `03 Heures supplémentaires`, `04 Rapports` | `122:3063`, `122:3258`, `123:3158`, `123:3330` | Composants statiques 760 × 488, données fictives |
| `Mockup/StafTrack — 05 Conversation WhatsApp (illustration)`, `06 Page de pointage` | `124:3278`, `124:3334` | Téléphones 290 × 590 ; conversation générique, sans marque WhatsApp |
| `Carte/Résultat de pointage` — Résultat=Accepté / Refusé | `124:3403` | Issue du pointage (dans la zone ou hors zone, avec la distance) |

`Étape/Workflow` (`101:2082`, anciennement « Étape/Workflow SCPB ») est maintenant générique : SCPB, StafTrack (fonctionnement et mise en place). Le texte du repère de l’état « Mise en avant » se remplace par page (« contrôle humain », « anti-fraude »). Planche : « DS — StafTrack (réalisation) », page 01 DS.

### Composants Prévisions Cacao & Robusta (v1.9)

| Composant | ID | Usage en code |
| --- | --- | --- |
| `Identité/Cacao & Robusta Forecast (provisoire)` | `146:4030` | `<ForecastWordmark>` en texte + icône ; provisoire |
| `Statut/Prévision` — Statut=Non validé / Référence retenue | `146:4042` | `<ForecastStatus>` : « Non validé » = contour pointillé + icône alerte. Aucune variante « Validé » tant qu’aucun horizon ne l’est |
| `Mockup/Prévisions — 01 Dashboard Cacao` à `06 Historique et suivi` | `146:4045`, `146:4159`, `146:4273`, `147:4093`, `147:4191`, `147:4291` | Composants statiques 760 × 488, conceptuels : cours et valeurs de modèle fictifs ; seuls les MAPE cacao de la maquette 05 sont réels |
| `Carte/Réalisation vedette` — Projet=Prévisions Cacao & Robusta | `148:4146` (Desktop), `148:4160` (Mobile) | Même composant que les autres réalisations |

Planche : « DS — Prévisions Cacao & Robusta (réalisation) » (`146:4010`), page 01 DS. La tuile « Et votre projet ? » de l’accueil n’est pas un composant : cadre à pointillés blancs (22 %), icône plus, bouton « Discuter d’un projet avec ZIIIILO » → Contact.

### Composants SCPB Survey (v2.0)

| Composant | ID | Usage en code |
| --- | --- | --- |
| `Identité/SCPB Survey (provisoire)` — Version=Sur fond clair / Sur fond sombre | `196:4519` | `<SurveyWordmark>` en texte + icône ; provisoire |
| `Mockup/SCPB Survey — 01 Accueil agent`, `02 Fiche planteur`, `03 Consentement`, `04 Enquête ménage`, `05 Parcelle GPS`, `06 Synchronisation` | `196:4522`, `196:4638`, `197:4591`, `197:4655`, `197:4712`, `197:4783` | Téléphones 290 × 590, écrans conceptuels ; noms, identifiants, chiffres et lieux fictifs ; aucune donnée d’enfant |
| `Carte/Réalisation vedette` — Projet=SCPB Survey | `198:4630` (Desktop), `198:5224` (Mobile) | Même composant que les autres réalisations |

Planche : « DS — SCPB Survey (réalisation) » (`196:4491`), page 01 DS. La page réutilise `Étape/Workflow` (parcours en 8 étapes, l’étape 03 « Consentement » en Mise en avant avec le repère « Étape clé · accord requis »), `Carte/Principe` et `Alerte` (Info). La tuile « Et votre projet ? » n’existe plus.

### Composants STE-SCPB (v2.1)

| Composant | ID | Usage en code |
| --- | --- | --- |
| `Capture/STE-SCPB — 01 Accueil — version française (desktop)`, `02 … version anglaise`, `03 … version russe`, `04 Catalogue « Nos Produits » — constellation et filtres`, `05 Catalogue — grille des fiches produits`, `06 Fiche produit cacao`, `07 Demande de devis export`, `08 Page EUDR`, `09 CocoaTrack — carte Mapbox de démonstration`, `10 Thème clair` | `231:93`, `231:97`, `231:101`, `231:105`, `231:109`, `231:113`, `231:117`, `231:121`, `231:125`, `231:129` | Captures réelles du site en production (JPEG en remplissage d’image), toujours légendées comme captures |
| `Placeholder/STE-SCPB — Capture mobile à insérer` — Accueil, Catalogue produits, Demande de devis | `231:134`, `231:140`, `231:146` | Emplacements 390 × 844 à remplacer par les vraies captures mobiles ; jamais par une maquette recréée |
| `Carte/Réalisation vedette` — Projet=STE-SCPB, Taille=Desktop / Mobile | `243:87`, `243:557` | Deux boutons : « Voir le projet » (page d’étude) et « Visiter le site » (lien externe) |

Planche : « DS — STE-SCPB (captures du site en production) » (`231:87`), page 01 DS. Les planches « DS — Cartes » et « DS — Formulaires » ont été décalées vers le bas pour lui laisser la place. La page d’étude réutilise `Carte/Principe` et la carte de grille réutilise `Carte/Projet` (Format=Standard).

### Composants Golden Beans SA (v2.2)

| Composant | ID | Usage en code |
| --- | --- | --- |
| `Capture/Golden Beans — 01` à `12` (desktop) : accueil FR, accueil EN, catalogue, fiche fèves, spécifications, traçabilité, EUDR, devis, prix du marché, carte Mapbox, notre usine, ressources | `260:5374` à `260:5418` | Captures réelles 1523–1536 px de large, prises le 22/11/2026, transférées sans réduction |
| `Capture/Golden Beans — M1` à `M6` (mobile 390 px) : accueil FR, fiche fèves, devis, accueil EN, traçabilité, prix du marché | `260:5471` à `260:5491` | Rendu réel du site à 390 px, recadré |
| `Carte/Réalisation vedette` — Projet=Golden Beans SA, Taille=Desktop / Mobile | `267:1687`, `267:1729` | Boutons « Découvrir le projet » et « Visiter le site » |

Planche : « DS — Golden Beans SA (captures du site en production) » (`260:5304`), page 01 DS. Palette Golden Beans affichée uniquement dans la page d’étude (cacao `#492C0E`, or ≈ `#C9A045`, beige `#ECE5D3`, ivoire `#FBF8F1`, brun `#382713`) : valeurs relevées sur les captures, approximatives.

### Composants Ninety One Foot Academy (v2.3)

| Composant | ID | Usage en code |
| --- | --- | --- |
| `Capture/N91 — 01` à `06` (desktop) : accueil FR, équipes, candidature (vide), actualités, programme, accueil EN | `273:5414` à `273:5434` | Captures réelles des pages publiques, photos de joueurs floutées |
| `Capture/N91 — M1` à `M6` (mobile 390 px) | `273:5438` à `273:5458` | Rendu réel à 390 px, photos floutées |
| `Maquette/MatchLab —` tableau de bord, fiche joueur et évaluation, terrain tactique, match en direct (mobile), effectif (mobile), rapport PDF A4 ; `Maquette/Espace privé — Gestion des candidatures` | `274:5333`, `274:5482`, `276:87`, `276:178`, `276:217`, `276:270`, `276:314` | Maquettes conceptuelles, données fictives, mention intégrée à chaque écran |
| `Carte/Réalisation vedette` — Projet=Ninety One Foot Academy, Taille=Desktop / Mobile | `283:87`, `283:272` | Site réel + fenêtre MatchLab conceptuelle |

Planches : « DS — Ninety One Foot Academy (captures du site public) » (`273:5330`) et « DS — N91 MatchLab (maquettes conceptuelles, données fictives) » (`274:5330`). Correctif v2.3 : zone « Actions » des variantes mobiles (STE-SCPB, Golden Beans, N91) ajustée au contenu, le bouton « Visiter le site » était coupé.

### Composants Agora Film Invest (v2.4)

| Composant | ID | Usage en code |
| --- | --- | --- |
| `Capture/Agora — 01` à `10` (desktop) : accueil, qui sommes-nous, réalisations, projet en développement et partenaires, produits, actualités, équipe, galerie, contact, pied de page | `295:7401` à `295:7437` | Captures réelles du 22/11/2026 |
| `Capture/Agora — 11` image Open Graph, `12` icône du site | `295:7441`, `295:7445` | Fichiers réels récupérés sur le site |
| `Capture/Agora — M1` à `M6` (390 px) : accueil, réalisations, équipe, menu mobile, actualités, contact | `295:7449` à `295:7469` | Rendu réel du site |
| `Carte/Réalisation vedette` — Projet=Agora Film Invest, Taille=Desktop / Mobile | `302:87`, `302:273` | Deux captures réelles |

Planche : « DS — Agora Film Invest (captures du site en production) » (`295:7317`). Palette du client montrée dans l’étude uniquement : prune `#35203A`, sable `#D8C39D`, sable foncé `#B89B6A`, vert `#007F59`, noir ; police Raleway.

### Composants CocoaTrack (v2.6)

- Planche « DS — CocoaTrack (maquettes conceptuelles, données fictives) » (`312:87`) : `Maquette/CocoaTrack — 01 Tableau de bord`, `02 Planteur 360`, `03 Carte interactive`, `04 Surveillance satellite`, `05 Achats et lecture des reçus`, `06 Module usine`, `07 Passeport lot` (desktop 1280 × 800), `08a` et `08b Application terrain` (mobile 360 × 760, hors connexion / synchronisation).
- `Carte/Réalisation vedette` — Projet=CocoaTrack, Taille=Desktop (`317:1237`) / Mobile (`317:1781`).
- Nouveau composant `Carte/Réalisation compacte` (`329:415`, Taille=Desktop / Mobile ; propriétés Nom, Catégorie, Description) pour l’aperçu des autres réalisations sur l’accueil.

Identité secondaire CocoaTrack, à utiliser avec modération dans les maquettes et les accents : vert forêt `#1F5E3B`, vert végétation `#4F9A45`, brun cacao `#6B4226`, orange d’alerte `#E8742A`. Elle ne remplace pas la charte ZIIIILO.

## 7. Pages et sections

Chaque page est une suite de sections pleine largeur, dans l’ordre exact des calques Figma. Les noms de calques (« Section — … ») servent d’identifiants : garder le même découpage en composants de section (`sections/home/Hero.tsx`, etc.). Tous les textes sont déjà rédigés en français dans Figma : les reprendre tels quels dans `content/fr.json`, sans en inventer.

### Accueil — `/` (Desktop `11:2`, Mobile `22:2`)

| # | Section | Titre (H2) | Contenu et composants |
| --- | --- | --- | --- |
| 1 | Hero (fond sombre) | H1 « Nous imaginons et construisons les solutions numériques de demain. » | Badge « Sur fond sombre », chapô, 2 boutons `Bouton/Sur fond sombre` (Inverse + Inverse contour), `HeroVisual`. Animations §8 : décodage du H1, surtitre terminal, curseur. |
| 2 | Présentation | La technologie au service de vos ambitions. | Texte, 2 `ServiceCard`, bouton Fantôme M. |
| 3 | Nos expertises | Des compétences complètes pour concrétiser vos projets numériques | 6 `ServiceCard` (grille 3 × 2 → 1 colonne mobile) + bouton Secondaire vers `/services`. |
| 4 | Nos produits | Nous concevons aussi nos propres solutions | Bloc sombre FleetRent : badge « En développement », `IconTile` Sombre, 2 boutons sur fond sombre. |
| 5 | Pourquoi ZIIIILO | Une approche exigeante, centrée sur vos besoins réels | 6 `FeatureItem` (Thème Clair). |
| 6 | Notre méthode | Un parcours clair, en cinq étapes | 5 `StepItem` (Disposition Colonne). |
| 7 | CTA final | Votre prochaine grande idée mérite une solution à la hauteur. | `CtaSection`. |

### Services — `/services` (Desktop `13:861`, Mobile `23:760`)

En-tête de page « Des services numériques complets, de l’idée à la mise en production », puis 8 blocs `ServiceDetail` alternés (visuel à droite / à gauche) : 01 Sites web & plateformes web · 02 Applications mobiles Android & iOS · 03 Logiciels & solutions de gestion sur mesure · 04 Transformation digitale · 05 UI/UX Design & prototypage · 06 Automatisation & intégration · 07 Conseil, architecture & accompagnement technique · 08 Maintenance, évolution & modernisation. Puis CTA. Chaque bloc a un bouton « Voir le détail du service » vers `/services/[slug]`. Sur mobile, les 8 services sont présentés en accordéons (voir « Pages ajoutées en v1.3 »).

### Détail service — `/services/[slug]` (gabarit, exemple « Applications mobiles » : Desktop `13:2161`, Mobile `23:1975`)

En-tête de page → Le besoin (« Les situations dans lesquelles nous intervenons ») → Ce que nous réalisons → Vos bénéfices → Notre démarche (5 étapes) → Questions fréquentes (accordéon) → CTA. Un seul gabarit alimenté par 8 entrées de contenu ; seul l’exemple Applications mobiles est rédigé dans Figma, les 7 autres sont à rédiger avec ZIIIILO.

### Solutions — `/solutions` (Desktop `14:2193`, Mobile `24:1931`)

En-tête « Des produits numériques conçus et développés par ZIIIILO » → Catalogue (`ProductCard` FleetRent + emplacements réservés) → Notre approche produit → CTA.

### FleetRent — `/solutions/fleetrent` (Desktop `15:2676`, Mobile `24:2440`)

Hero produit (« FleetRent — Une solution développée par ZIIIILO », H1 « La location de véhicules, simplifiée de l’agence au client. ») → Présentation → Problématique du secteur → Solution proposée (trois briques) → Fonctionnalités principales (6 badges « En développement », 2 « Prévu » ; aucune fonction n’est marquée Disponible) → Aperçu de l’interface (desktop uniquement ; mockups à données fictives étiquetées) → Positionnement SaaS & marketplace → Développé par ZIIIILO → CTA. Ne passer un badge à « Disponible » que sur confirmation de ZIIIILO.

### À propos — `/a-propos` (Desktop `17:3467`, Mobile `25:3157`)

En-tête → Notre histoire → Mission & vision → Nos valeurs → Innovation → Nos ambitions → L’équipe → CTA. La section Équipe est **masquée par défaut** (`showTeam: false` dans la config) tant que ZIIIILO n’a pas fourni de vrais membres ; aucune date de création, aucun dirigeant ni bureau ne doit être ajouté.

### Réalisations — `/realisations` (Desktop `17:3849`, Mobile `24:3083`)

En-tête → Projets (puces de filtre + `ProjectCard`) → CTA. Seul FleetRent y figure ; les autres cartes sont au format Gabarit (état vide) en attendant des cas clients réels et autorisés. Filtrage côté client, catégorie active reflétée dans l’URL (`?categorie=mobile`).

### Contact — `/contact` (Desktop : formulaire `19:4130`, erreurs `21:4498`, rempli `21:4759`, confirmation `21:5009` · Mobile : `25:3462`, erreurs `25:3692`, confirmation `25:3884`)

Une section deux colonnes : à gauche texte et options de contact direct (e-mail, WhatsApp — coordonnées à configurer), à droite le formulaire. Comportement détaillé au §9.

### FAQ — `/faq` (Desktop `19:4431`, Mobile `25:3959`)

En-tête → Questions (colonne « Une autre question ? » avec bouton Primaire vers `/contact`, et 6 accordéons, le premier ouvert) → CTA. Recommandé : un seul accordéon ouvert à la fois. Générer le balisage `FAQPage` (JSON-LD) à partir du même contenu.

### Éléments communs

- Header fixe et footer identiques sur toutes les pages (§6, Structure).
- Chaque page a un seul H1 ; les titres de section sont des H2.
- Métadonnées par page (`generateMetadata`) : titre « \[Page\] — ZIIIILO », description = chapô de l’en-tête.

### Pages ajoutées en v1.3

- **Services mobile** (`23:760`) : les 8 services sont désormais en accordéons (`Accordéon/Service`), le premier ouvert ; la page passe d’environ 10 800 px à 3 800 px. Le bouton « Voir le détail du service » mène à la page de détail.
- **Services desktop** (`13:861`) : le second bouton de chaque bloc s’appelle désormais « Voir le détail du service » et mène à la page de détail.
- **7 pages de détail service** : même gabarit que « Applications mobiles », avec des textes propres à chaque service (situations, réalisations, bénéfices, démarche, FAQ, titre du CTA), des icônes adaptées et le `Visuel/Service` correspondant. Ces textes sont des propositions à faire valider par ZIIIILO. Slugs suggérés : `sites-web`, `applications-mobiles`, `logiciels-sur-mesure`, `transformation-digitale`, `ui-ux-design`, `automatisation`, `conseil-architecture`, `maintenance-evolution`.
- **Mentions légales** (`/mentions-legales`) et **Politique de confidentialité** (`/confidentialite`) : sommaire et article numéroté. Chaque information non fournie est une étiquette « À configurer », jamais une valeur d’exemple. Une alerte en tête indique que le texte doit être validé par un professionnel du droit. Sur desktop, le sommaire peut rester fixe au défilement (`position: sticky`).
- **Page 404** (`app/[locale]/not-found.tsx`) : « 404 » en JetBrains Mono animé avec curseur, deux actions (accueil, contact) et quatre liens utiles.
- **Bandeau cookies** : affiché à la première visite tant qu’aucun choix n’est enregistré. « Personnaliser » et le lien « Gestion des cookies » du footer ouvrent la modale de préférences.

### DocCloud — `/solutions/doccloud` (v1.4 ; Desktop `90:11552`, Mobile `92:9403`)

Même gabarit que la page FleetRent, dans cet ordre :

1. **Hero** : logotype provisoire, badges « Produit ZIIIILO » + « En développement », H1 « Retrouver ses documents ne devrait plus être un parcours du combattant. », sous-titre, boutons « Voir le fonctionnement » (défilement vers la section 4) et « Nous contacter », visuel `Visuel/DocCloud — Composition`.
2. **Le problème** : 4 constats (recherches compliquées, aucune centralisation, déplacements et incertitude, données exposées).
3. **Notre solution** : 3 acteurs (personnes qui trouvent, propriétaires, points de collecte).
4. **Comment fonctionne DocCloud ?** : frise en 4 étapes (Déclarer · Déposer et vérifier · Rechercher et confirmer · Récupérer) + les 7 statuts du dossier.
5. **Fonctionnalités** : 6 piliers, chacun étiqueté « En conception », avec une note sur le modèle économique (montants à définir, paiements via prestataires agréés).
6. **Aperçu** : tableau de bord agence + 3 écrans mobiles (2 + tableau de bord sur mobile), légende « données fictives ».
7. **Sécurité et confiance** : 6 principes, avec la mention qu’aucune certification ni conformité réglementaire n’est revendiquée.
8. **Vision du projet**.
9. **Développé par ZIIIILO** : « DocCloud est un produit conçu au sein de l’écosystème technologique ZIIIILO. » + lien « Voir nos autres projets ». Puis CTA « DocCloud vous intéresse ? ».

Pages mises à jour pour DocCloud :

- **Accueil** : la section « Nos produits » présente deux `Carte/Produit vedette` (FleetRent, DocCloud), côte à côte sur desktop et tablette, empilées sur mobile, puis un bouton « Tous nos produits ».
- **Solutions** : bloc « DocCloud à la une » sous celui de FleetRent (visuel inversé) ; la carte « Emplacement réservé » du catalogue devient la carte DocCloud.
- **Réalisations** : projet à la une DocCloud sous celui de FleetRent ; carte DocCloud dans la grille (3 colonnes égales). Les deux projets portent l’étiquette « Produit ZIIIILO » : le filtre « Produits ZIIIILO » doit afficher les deux.

Règles de contenu DocCloud : statut « En développement » toujours visible ; aucune fonctionnalité présentée comme disponible ; aucun montant (frais, récompense) affiché tant qu’il n’est pas validé ; aucun partenaire ni point de collecte nommé ; données des maquettes visiblement fictives.

### SCPB Commercial — `/realisations/scpb-commercial` (v1.5 ; Desktop `103:11672`, Mobile `111:11199`)

Ordre : 01 Hero · 02 Le défi (Avant / Avec) · 03 La solution (5 piliers et base commune) · 04 Comment ça fonctionne (6 étapes, étape 4 mise en avant, panneau « Approbation humaine ») · 05 Aperçu (6 maquettes et 10 fonctionnalités) · 06 IA sous contrôle humain · 07 Technologies (6 couches) · 08 Sécurité et fiabilité (4 piliers, 12 garde-fous, alerte de conformité) · 09 Bénéfices métiers (6 cartes) · 10 Adaptabilité · Mentions de la réalisation · 11 ZIIIILO et la transformation digitale (CTA).

- Présenter SCPB Commercial comme une réalisation associée à ZIIIILO pour l’entreprise SCPB. Les mentions « Conception et développement : ZIIIILO — à confirmer » et « Statut : à confirmer » restent visibles.
- Ne jamais écrire « produit commercialisé » et ne jamais revendiquer les droits de propriété intellectuelle.
- Aucun gain chiffré ni indicateur de performance. Le nombre de tests automatisés (160 selon la documentation) n’est pas affiché tant qu’il n’est pas confirmé dans le code.
- Chaque mockup porte la mention « maquette conceptuelle, données fictives ». Les noms d’entreprises sont fictifs (domaine `.test`).
- Les technologies sont des « technologies utilisées », pas des partenaires de ZIIIILO : chips texte, pas de logos.
- Les mécanismes de sécurité sont des « garde-fous intégrés ou prévus ». L’alerte Info de conformité est obligatoire, avec le texte exact de Figma.
- Adaptabilité : seul le besoin initial cacao et café est cité. Aucun autre secteur n’est revendiqué.

### StafTrack — `/realisations/staftrack` (v1.7 ; Desktop `126:14817`, Mobile `131:14099`)

Ordre : 01 Hero · 02 Le problème réglé (Aujourd’hui / Avec StafTrack) · 03 Comment ça marche (5 étapes, résultat accepté ou refusé) · 04 Fonctionnalités (côté employé, 10 modules RH, règles automatiques) · 05 Aperçu (4 maquettes + 2 téléphones) · 06 Sécurité et anti-fraude · 07 Votre espace · 08 Technologie et hébergement · 09 Mise en place · 10 Ce que vous y gagnez · Mentions · 11 Prochaine étape (démonstration).

- Client : SCPB (logo officiel dans le bandeau de mentions) ; rôle de ZIIIILO : conception et développement ; statut : Disponible.
- Les chiffres affichés viennent du document du projet (lien valable 15 minutes, rappel 7 jours avant la fin de stage, vidéo de 75 secondes). Aucun gain chiffré.
- La géolocalisation est une donnée personnelle : l’alerte Info de la section Sécurité est obligatoire ; pas de certification de conformité revendiquée.
- Technologies (Next.js, Vercel, PostgreSQL, Supabase, Supabase Auth, API WhatsApp Business) : « technologies utilisées », pas des partenaires, sans logos.
- Noms d’employés et de sites fictifs (« A. Exemple », « Siège (site fictif) », `exemple.staf-track.com`).

### Prévisions Cacao & Robusta — `/realisations/previsions-cacao-robusta` (v1.9 ; Desktop `149:20336`, Mobile `157:17634`)

Ordre : 01 Hero · 02 Le défi · 03 Notre approche (4 piliers) · 04 Deux marchés, une plateforme · 05 Historique continu (démonstration conceptuelle) · 06 Aperçu du tableau de bord (6 maquettes) · 07 Machine Learning (XGBoost, N-HiTS, Prophet) · 08 Validation · 09 Traçabilité des prévisions · 10 Automatisation · 11 Architecture · 12 Bénéfices métiers · 13 Limites et évolution · Mentions · 14 Réalisation ZIIIILO.

- Client : SCPB (logo officiel dans le bandeau de mentions) ; rôle de ZIIIILO : conception et développement ; statut : En ligne ; droits de propriété intellectuelle non revendiqués.
- Section 08 : « Résultats historiques au 20 novembre 2026 — Aucun horizon validé à cette date. » MAPE réels du cacao (voir `forecast-validation.ts`) : le MAPE est une erreur moyenne, jamais une « précision » ; pas de badge « Validé », pas de gain financier.
- Phrases à reprendre telles quelles : « Nous préférons une prévision non validée à une fausse certitude. », « La confiance se mesure. Elle ne se décrète pas. », « Chaque prévision laisse une trace. », « Une chaîne de traitement automatisée, chaque jour de marché. », « Une architecture conçue pour les données et le calcul prédictif. », « Une démarche d’amélioration continue. », « Quand l’ingénierie logicielle rencontre la science des données. »
- Section 10 : traitement du mardi au samedi à 04:30 (heure de Douala), rattrapage à 06:30 ; dernière séance disponible, pas de temps réel. Section 11 : serveur unique (alerte Info), pas d’architecture haute disponibilité multi-régions ; technologies « utilisées par le projet », pas des partenaires, sans logos.
- Section 12 : avertissement obligatoire (« ne garantissent pas l’évolution future des prix et ne constituent pas un conseil financier personnalisé »). Section 13 : six pistes étiquetées « Piste identifiée », en pointillés, jamais présentées comme livrées.
- Courbes des sections 02, 04 et 05 : synthétiques et étiquetées comme telles ; aucune cotation réelle inventée. Visuels marqués « Maquette conceptuelle — données fictives ».
- Mobile : sections empilées, frises et chaînes verticales, MAPE en barres horizontales (référence pleine, modèle en pointillés), maquettes en extraits recadrés.

### SCPB Survey — `/realisations/scpb-survey` (v2.0 ; Desktop `200:23564`, Mobile `204:16328`)

Ordre : 01 Hero · 02 Contexte et objectifs (5 exigences) · 03 Utilisateurs et rôles (6 rôles) · 04 Fonctionnalités (par statut) · 05 Parcours terrain (8 étapes) · 06 Aperçu de l’application (6 écrans) · 07 Hors ligne et synchronisation · 08 Sécurité et protection des données · 09 Architecture technique · 10 État d’avancement et prochaines étapes · Mentions · 11 Réalisation ZIIIILO.

- Client : SCPB (logo officiel dans le bandeau de mentions) ; rôle : conception et développement ; statut : Pilote en préparation ; droits de propriété intellectuelle non revendiqués.
- Section 04 : trois colonnes — Disponible (10 modules), En finalisation (cartographie en test ; CLMRS moteur prêt, branchement à faire ; questionnaires, diffusion à faire), Maquette (traçabilité des lots, espace auditeur, en pointillés). Ne jamais présenter une maquette comme livrée.
- Section 10 : « Prochaines étapes » étiquetées « À venir — non livré ».
- Sections 02 et 08 : aucune certification de conformité (EUDR, protection de l’enfant) n’est revendiquée ; l’alerte Info « Données personnelles et protection de l’enfant » est obligatoire.
- Technologies (Expo, React Native, SQLCipher, Supabase, EAS Build…) : « utilisées par le projet », pas des partenaires, sans logos.
- Aucune photo de personne, aucune donnée d’enfant : la fiche planteur montre un emplacement de photo vide.
- Mobile : tableau des rôles en cartes empilées, colonnes de statut empilées, écrans en défilement horizontal (overflow horizontal), schéma de synchronisation vertical.

### STE-SCPB — `/realisations/ste-scpb` (v2.1 ; Desktop `233:23711`, Mobile `240:19126`)

Ordre : 01 Hero · 02 Contexte · 03 Défi design · 04 Site multilingue · 05 Catalogue de produits · 06 Parcours de demande de devis · 07 Traçabilité et EUDR · 08 Présence internationale · 09 Gestion de contenu · 10 Technologies de l’expérience · 11 Architecture technique · 12 Qualité · 13 Résultat · 14 Autres solutions SCPB · 15 Expertise digitale ZIIIILO.

- Client : STE-SCPB ; réalisé par ZIIIILO SARL ; statut : En production. Le site de production n’est jamais modifié depuis le projet ZIIIILO.
- Visuels : uniquement des captures réelles du site, légendées ; en mobile, les vues non capturées sont des emplacements « Capture mobile à insérer ».
- Section 04 : versions française, anglaise et russe montrées par des captures réelles ; ne pas annoncer de langue absente du site.
- Section 07 : présente la démarche de traçabilité et la page EUDR du site ; le site n’est ni présenté comme certifié EUDR ni comme garantissant juridiquement la conformité des marchandises.
- Section 08 : la carte Mapbox montrée est celle de la page CocoaTrack (données de démonstration) ; le site ne publie pas de carte des destinations clients. CocoaTrack : lien externe, pas de fiche.
- Section 09 : schéma de contenu Sanity étiqueté « Schéma conceptuel — pas une capture du back-office ».
- Sections 10 et 11 : technologies présentées comme une architecture intégrée, sans logos ni mention de partenariat.
- Sections 12 et 13 : LCP < 2,5 s et CLS < 0,1 affichés comme objectifs de conception, pas comme mesures ; aucun score Lighthouse, audit de sécurité certifié, chiffre de trafic, de ventes ou de conversion.
- Section 14 : liens vers les études SCPB Commercial et Prévisions Cacao & Robusta, sans revendiquer d’architecture ni d’intégration technique commune.
- Charte : la palette STE-SCPB est montrée comme élément du projet et ne remplace pas la charte ZIIIILO.

### Golden Beans SA — `/realisations/golden-beans` (v2.2 ; Desktop `262:24524`, Mobile `266:19740`)

Ordre : 01 Hero · 02 Le défi · 03 Identité digitale · 04 Expérience bilingue · 05 Catalogue et fiches produits · 06 Traçabilité et EUDR (chaîne en 6 étapes) · 07 Conversion commerciale · 08 Contenus et CMS · 09 Automatisation et IA (workflow en 8 étapes) · 10 Données de marché · 11 Cartographie · 12 Architecture technologique · 13 Performance, SEO et sécurité · 14 Résultat · 15 ZIIIILO et les solutions digitales.

- EUDR : service d’information et de préparation documentaire ; aucune conformité de tous les lots ni certification non confirmée (les certifications « envisagées » gardent ce statut).
- IA : contrôles automatiques et détection des doublons avant publication ; aucune validation humaine systématique revendiquée ; heures (08 h, 09 h 15, 14 h, 18 h 30, heure de Douala) = paramètres du système.
- Données de marché : capture datée du 22/11/2026, cours indicatifs ; la page publique utilise des widgets TradingView, ECharts est listé dans la pile technique.
- Carte : données de démonstration, comme l’indique le site.
- CMS : schéma conceptuel (Équipe → Sanity Studio → Site public), jamais présenté comme une capture du back-office.
- Aucun témoignage, chiffre de vente, taux de conversion, score Lighthouse, SLA ni certification de sécurité ; la page « Statistiques d’export » non publiée n’est pas utilisée.
- Mobile : chaînes de traçabilité et workflow IA simplifiés en grille de deux colonnes.

### Ninety One Foot Academy — `/realisations/ninety-one-foot-academy` (v2.3 ; Desktop `278:25463`, Mobile `281:20482`)

Ordre : 01 Hero · 02 Contexte · 03 Trois piliers · 04 Site public · 05 Candidature numérique · 06 Administration du club · 07 N91 MatchLab · 08 Analyse des performances · 09 Match en direct · 10 Terrain tactique · 11 Web et mobile · 12 Rapports sportifs · 13 Sécurité et confidentialité · 14 Architecture technologique · 15 État du projet · 16 Conclusion.

- Mineurs : aucune photo de joueur nette (floutées), aucun dossier, document ou donnée réelle ; joueurs, adversaires, notes et matchs fictifs et signalés.
- Évaluation : 40 % questions communes, 60 % questions du poste, note sur 10, « Non observé » exclu, « À confirmer » sous cinq joueurs évalués, contexte sans effet sur les notes ; « La recommandation aide au tri. La décision reste au staff. »
- IA : assistant local à règles (sans modification sans validation) ; laboratoire de dix pistes non connecté ; aucune IA prédictive ni analyse vidéo automatique revendiquée.
- Statuts : vues parent, joueur, coach en maquette ; mobile V1 distincte de la V2 prévue (vidéo, notifications, partage des PDF, assistant) ; mode direct sans vidéo.
- Partenaires de l’académie (Veo, Footbar, sponsors) jamais présentés comme partenaires de ZIIIILO ; la page publique « Performance Lab » concerne ces outils et n’est pas confondue avec MatchLab.
- Aucun lien vers l’espace privé ni vers MatchLab ; aucune certification de sécurité revendiquée.

### Agora Film Invest — `/realisations/agora-film-invest` (v2.4 ; Desktop `297:27498`, Mobile `300:22316`)

Ordre : 01 Hero · 02 Contexte · 03 Identité visuelle · 04 Expérience one-page (7 sections) · 05 Valorisation des films · 06 Multimédia et galerie · 07 Actualités · 08 Équipe et partenaires · 09 Refonte (12 évolutions détaillées) · 10 Responsive · 11 Performance et accessibilité · 12 SEO et image de marque (aperçu de partage) · 13 Architecture · 14 Contact · 15 Résultat · 16 Conclusion.

- Attribution : « refonte réalisée par ZIIIILO » (confirmée par le client) ; la mention Fastgraphiste du pied de page public reste visible dans les captures, non retouchées, et est signalée en note.
- Distinctions (LEKKIFEST 2026), productions et partenaires appartiennent à Agora Film Invest, jamais à ZIIIILO ; « L’autre clef » reste un projet en développement.
- Avant/après : non montré, faute de captures de l’ancienne version.
- Contact : le formulaire prépare un e-mail dans la messagerie du visiteur ; aucun stockage serveur, CRM ni notification.
- Performance : 17 Mo → environ 850 Ko pour une image (exemple ponctuel) ; aucun score Lighthouse.
- Architecture : site statique pré-généré sans base de données ni CMS.

### CocoaTrack — `/realisations/cocoatrack` (v2.6 ; Desktop `319:1014`, Mobile `325:1796`)

Ordre : 01 Hero · 02 Le défi · 03 La solution (7 piliers) · 04 Planteurs et coopératives · 05 Cartographie · 06 Achats et documents · 07 Intelligence satellite · 08 Traçabilité EUDR · 09 Module usine · 10 Passeport lot · 11 Application terrain · 12 Pilotage et analytique · 13 Architecture · 14 Sécurité · Réalisations associées · 15 Conclusion.

- Page marquée « présentation privée » : sa publication et le niveau de détail public restent soumis à la validation de STE-SCPB.
- Annotations Dev Mode « Statut à confirmer » sur les piliers et les modules usine : notes internes, à ne jamais coder dans l’interface publique.
- Aucun bouton vers l’application, un back-office ou une URL interne.
- Ne jamais présenter CocoaTrack comme garantissant la conformité EUDR ; une alerte satellite n’est pas une preuve ; l’OCR est une assistance à la saisie, vérifiée par un responsable.
- Toutes les données sont fictives (producteurs, parcelles, références, poids, lots) ; aucun prix d’achat, volume interne ni coordonnée réelle.
- Mobile : les maquettes sont montrées en vues recadrées pour rester lisibles ; légendes et indicateurs empilés.

## 8. Animations et motion

Les animations de texte sont construites avec la **motion native de Figma** (timelines à keyframes et préréglage `TextStagger`), pas avec des variantes enchaînées. Claude Code peut donc lire les valeurs exactes :

```text
get_motion_context(fileKey="G9fhCfbvi9MiIgojXaZ54w", nodeId="<id>", recursive=true)
→ nodes[].textAnimations[].derivedTimingInfo (startMs, staggerStepMs, groupDurationMs)
→ nodes[].codeSnippets.motionDev (pistes manuelles : opacité, translation, échelle, tracé)
```

Point d’attention : dans Figma, les timelines **bouclent** (`loopMode: "loop"`, d’où `repeat: Infinity` dans les extraits). En code, toutes les animations se jouent **une seule fois** ; seul le curseur clignote en continu. Retirer `repeat: Infinity` des extraits générés.

### Où trouver les animations dans Figma

| Cadre | nodeId | Contenu |
| --- | --- | --- |
| Accueil desktop | `11:2` | Hero animé, timeline 10 s |
| Accueil mobile | `22:2` | Hero animé, timeline 10 s |
| Section « Animations de texte — Motion » (page 04) | `52:87` | Planche de démonstration |
| Motion/01 — Décodage du titre | `52:92` | `DecodeText` |
| Motion/02 — Surtitre terminal | `52:121` | `TypeLine` + `RevealLines` (lignes) |
| Motion/03 — Révélation par mots | `52:146` | `RevealLines` (mots) |
| Motion/04 — Balayage lumineux | `52:156` | `ScanText` |
| Motion/05 — Soulignement circuit | `52:174` | `CircuitUnderline` |
| Règles communes du motion | `52:201` | Règles (statique) |

Au repos (hors lecture), chaque cadre montre l’état final : la copie cyan qui sert au décodage est à opacité 0 et n’apparaît que pendant la lecture.

### Chorégraphie du hero (Accueil)

| Temps (s) | Élément | Effet |
| --- | --- | --- |
| 0 → 1,4 | Trame de fond | opacité 0 → 1 (desktop seulement) |
| 0,05 → 0,45 | Badge | opacité 0 → 1, y +8 → 0 |
| 0,25 → 1,25 | Visuel hero (desktop) | opacité 0 → 1, y +24 → 0, échelle 0,97 → 1 |
| 0,30 → 1,70 | Front de décodage cyan | 58 caractères, un toutes les 24,1 ms, de gauche à droite |
| 0,42 → 1,82 | H1 blanc | même cadence, décalé de 120 ms sous le front |
| 0,52 → 1,92 | Effacement du front | même cadence, fondu de 27 ms par caractère |
| 1,35 → 2,05 | Sous-titre | ligne par ligne, y +12 → 0, flou 8 px → net, chevauchement 60 % |
| 1,70 → 2,15 | Boutons (desktop) | opacité 0 → 1, y +16 → 0 |
| 1,70 / 1,82 (+0,4) | Boutons (mobile, un par un) | idem |
| 1,90 → 2,70 | Visuel hero (mobile) | opacité 0 → 1, y +24 → 0 |
| 1,97 → ∞ | Curseur | apparaît en fin de titre puis clignote (0,5 s allumé / 0,5 s éteint) |
| 2,00 / 2,10 / 2,20 (+0,35) | Repères (desktop) | opacité 0 → 1, y +8 → 0 |

Courbes : la « sortie » Figma vaut `cubic-bezier(0, 0, .58, 1)` ; l’« entrée-sortie » `cubic-bezier(.42, 0, .58, 1)` ; les micro-interactions du §9 gardent `cubic-bezier(.2, .8, .2, 1)`.

### Composants à créer (`src/components/motion/`)

| Composant | Props | Emplacements | Référence Figma |
| --- | --- | --- | --- |
| `DecodeText` | `text`, `as`, `delay=300`, `duration=1400`, `lag=220`, `cursor`, `scramble=true` | H1 du hero | `52:92`, hero `11:2` / `22:2` |
| `TypeLine` | `text`, `duration=700`, `cursor="block"` | surtitres des en-têtes de section | `52:121` |
| `RevealLines` | `children`, `by="line" \| "word"`, `duration`, `overlap`, `distance`, `blur` | H2 (lignes), titres CTA et produits (mots), sous-titre du hero | `52:121`, `52:146` |
| `ScanText` | `children`, `delay=400` | H2 sur fond sombre | `52:156` |
| `CircuitUnderline` | `children`, `delay=500` | H2 Méthode / Démarche | `52:174` |
| `useRevealOnView` | `amount=0.4`, `once=true` | déclenchement commun | — |

Depuis la v1.3, ces effets sont aussi appliqués dans les maquettes de page (voir « Animations étendues aux pages » plus bas). Ce tableau reste la référence pour le code.

### Tokens et règles CSS communes

```css
:root {
  --ease-reveal: cubic-bezier(0, 0, .58, 1);
  --ease-sweep: cubic-bezier(.42, 0, .58, 1);
  --ease-ui: cubic-bezier(.2, .8, .2, 1);
}
.decode-glyph { color: var(--color-accent-cyan); font-family: var(--font-mono); text-shadow: 0 0 16px rgb(46 188 228 / .55); }
.motion-cursor { display: inline-block; width: .07em; height: .78em; margin-left: .12em; vertical-align: -.04em;
  background: var(--color-accent-cyan); animation: cursor-blink 1s steps(1) infinite; }
.motion-cursor--block { width: .62em; height: 1.1em; background: var(--color-primary-brand); }
@keyframes cursor-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .motion-cursor { display: none; }
  .scan-text { animation: none; background: none; color: var(--scan-base); }
}
```

### DecodeText

Le texte réel est rendu pour les lecteurs d’écran ; la couche visible est `aria-hidden`. Chaque caractère non blanc apparaît à `delay + i × (duration / n)`, reste dans le front cyan pendant `lag`, puis prend sa forme finale. Chaque glyphe de substitution est superposé au caractère réel transparent, ce qui évite tout recalcul de mise en page. Avec `scramble={false}`, le front affiche les vrais caractères en cyan, exactement comme dans Figma.

```tsx
"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = "01<>/{}[]#%+=*ABCDEFXZ";

export function DecodeText({ text, as: Tag = "h1", delay = 300, duration = 1400, lag = 220, cursor = true, scramble = true, className = "" }:
  { text: string; as?: "h1" | "h2" | "p"; delay?: number; duration?: number; lag?: number; cursor?: boolean; scramble?: boolean; className?: string }) {
  const reduce = useReducedMotion();
  const [t, setT] = useState<number | null>(null); // null = rendu serveur / avant hydratation
  const end = delay + duration + lag;
  useEffect(() => {
    if (reduce) return;
    let raf = 0; const t0 = performance.now();
    const tick = (now: number) => { const e = now - t0; setT(e); if (e < end + 50) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, end]);
  // Texte final rendu côté serveur ; masqué seulement si <html> porte la classe "js"
  // (ajoutée par un script inline dans <head>) : CSS `.js .decode-pending { opacity: 0 }`.
  if (reduce || t === null) return <Tag className={`${className} ${reduce ? "" : "decode-pending"}`}>{text}</Tag>;
  const n = text.replace(/\s/g, "").length; const step = duration / n; let k = -1;
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, w) => (
          <span key={w} className="whitespace-nowrap">
            {Array.from(word).map((c, i) => {
              k++; const on = delay + k * step;
              if (t < on) return <span key={i} className="opacity-0">{c}</span>;
              if (t < on + lag) return (
                <span key={i} className="relative">
                  <span className="text-transparent">{c}</span>
                  <span className="decode-glyph absolute inset-0">{scramble ? GLYPHS[(Math.floor(t / 50) + k) % GLYPHS.length] : c}</span>
                </span>);
              return <span key={i}>{c}</span>;
            })}
            {" "}
          </span>
        ))}
        {cursor && t >= end && <span className="motion-cursor" />}
      </span>
    </Tag>
  );
}
```

### TypeLine, RevealLines, ScanText, CircuitUnderline

- **TypeLine** : même mécanique sans front cyan. Les caractères non encore tapés restent dans le flux en `opacity: 0`, et le curseur bloc (`.motion-cursor--block`) est inséré juste après le dernier caractère visible, si bien qu’il suit la frappe. 700 ms pour le surtitre complet, puis clignotement.
- **RevealLines** : chaque mot est un `motion.span`. En mode `line`, les mots sont regroupés par `offsetTop` après une mesure (`useLayoutEffect`, à refaire au redimensionnement) et chaque ligne reçoit le même délai. État initial `{ opacity: 0, y: distance, filter: "blur(<blur>px)" }`, état final `{ opacity: 1, y: 0, filter: "blur(0px)" }`, courbe `--ease-reveal`. Pour les délais exacts, reprendre `startMs` + `staggerStepMs × index` et `groupDurationMs` de `get_motion_context`. Préréglages : H2 = lignes, 800 ms, chevauchement 55 %, 16 px, flou 8 px ; titres CTA = mots, 1 000 ms, 45 %, 20 px, 10 px ; sous-titre du hero = lignes, 700 ms, 60 %, 12 px, 8 px, départ 1 350 ms.
- **ScanText** : un seul passage après la révélation du titre.

```css
.scan-text { --scan-base: var(--color-text-inverse); color: transparent;
  background: linear-gradient(100deg, var(--scan-base) 0 42%, var(--primitive-cyan-300) 50%, var(--scan-base) 58% 100%) 100% 0 / 250% 100% no-repeat;
  -webkit-background-clip: text; background-clip: text;
  animation: scan-sweep 1.2s var(--ease-sweep) .4s both; }
@keyframes scan-sweep { to { background-position: 0 0; } }
@media (forced-colors: active) { .scan-text { color: CanvasText; background: none; } }
```

- **CircuitUnderline** : SVG inline sous le titre, largeur = largeur du titre. Coude à 62 % de la longueur (décalage de 10 px vers le bas), trait 2 px `--color-primary-brand`, extrémités arrondies, 3 nœuds de 10 px (fond blanc, contour 2 px).

```tsx
<svg aria-hidden="true" width={w} height={14} viewBox={`0 -2 ${w} 14`} className="overflow-visible">
  <motion.path d={`M0 0 H${s} L${s + 10} 10 H${w}`} fill="none" stroke="var(--color-primary-brand)" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
    viewport={{ once: true, amount: 0.4 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.42, 0, 0.58, 1] }} />
  {/* nœuds : motion.circle r=4, initial={{ scale: 0 }} → 1 à 0,45 s, ~1,0 s et 1,35 s, transition spring rapide */}
</svg>
```

### Déclenchement et mouvement réduit

- Hero : au montage de la page. Tout le reste : `useInView(ref, { once: true, amount: 0.4 })` de `motion/react`.
- `useReducedMotion()` vrai → rendre directement l’état final (aucun défilement de caractères, aucun balayage, aucun clignotement).
- Le contenu reste lisible sans JavaScript : le rendu serveur produit le texte final, l’animation ne démarre qu’après hydratation (masquer la couche animée via une classe ajoutée côté client, jamais par défaut en CSS).
- Une animation par bloc, jamais de boucle sur un texte, rien de plus long que 1,4 s par effet.

### Animations étendues aux pages (v1.3)

| Où | Effet | Réglages Figma |
| --- | --- | --- |
| Composant `En-tête de section` (21 copies desktop) | surtitre tapé, H2 ligne par ligne, description | surtitre : caractères, 0,5 s ; titre : lignes, départ 0,35 s, 0,8 s, chevauchement 55 %, 16 px, flou 8 px ; description : lignes, départ 0,8 s, 0,6 s, 8 px |
| Variantes sombres de l’en-tête | balayage lumineux | bande cyan en mode « produit », de 1,3 à 2,7 s |
| Composant `Section CTA` (toutes les pages) | titre mot par mot, puis balayage | mots : départ 0,2 s, 1,0 s, 45 %, 20 px, flou 10 px ; description à 0,95 s ; boutons de 1,2 à 1,6 s ; balayage à 1,9 s |
| Titres et surtitres posés directement sur les pages (desktop et mobile) | mêmes réglages que l’en-tête ; balayage si le titre est sur fond sombre | — |
| « Notre méthode » (accueil, 3 formats) et « Notre démarche » (8 pages de détail) | soulignement circuit | tracé de 1,0 à 1,9 s, nœuds à 0,95 / \~1,5 / 1,85 s |
| Page 404 | « 404 » caractère par caractère + curseur | 0,9 s, montée 24 px, flou 14 px ; curseur dès 1,15 s |
| Indicateur de chargement, squelette | rotation continue, reflet | 1 tour/s ; reflet de 1,3 s toutes les 1,6 s |

Toutes les timelines de page durent désormais 20 s (en boucle dans Figma). Dans Figma, tout démarre au chargement de la page ; en code, chaque bloc se déclenche à son entrée dans l’écran (`useInView`, seuil 0,4), sauf le hero. Pour le balayage, Figma utilise une bande en mode « produit » ; en code, garder `.scan-text` (dégradé + `background-clip: text`).

### Chargement : splash d’ouverture, spinner, barre, squelettes (v2.8)

Maquettes : splash desktop `394:299` → `394:1115` et mobile `394:1346` → `394:1994` (13 étapes : paliers de 10 %, pause à 100 %, ouverture en deux temps), parcours « 00 · Ouverture du site » ; composants dans « DS — Chargement » (`385:87`) : `Loader/Spinner` (S 20, M 32, L 56 ; clair, sombre), `Chargement/Barre de progression`, `Squelette/Carte réalisation`.

**Splash d’ouverture — règles**

- Première visite de la session uniquement (`sessionStorage`), jamais sur les pages internes ouvertes directement depuis Google.
- Le pourcentage suit le **chargement réel** : polices (`document.fonts.ready`), image du hero, hydratation. Le compteur avance en douceur vers la progression réelle (interpolation d’environ 400 ms par palier, jamais au-delà du réel) ; l’animation complète dure environ 13,8 s (choix validé le 23/11/2026), même si tout est prêt avant ; le site est déjà chargé derrière.
- Rythme : paliers de 10 % (pause 0,2 s + transition 0,6 s, ease-in-out), pause de 1,2 s à 100 %, ouverture en deux temps (1,3 s puis 1,5 s), fondu final 0,9 s, soit ≈ 13,8 s ; si le chargement réel dépasse ce temps, le compteur attend le réel (12 s maximum de chargement, puis ouverture). Lien « Passer » visible dès 30 %.
- Le contenu de la page est rendu derrière (SSR) : le splash est une couche par-dessus, retirée du DOM après l’ouverture. Il ne bloque ni le référencement ni le LCP.
- Ouverture : après une pause de 1,2 s à 100 %, l’anneau s’agrandit (× 2,6) pendant que le voile passe à 55 % en 1,3 s (ease-in-out), puis s’élargit (× 9) et disparaît en 1,5 s (ease-out) ; fondu final de 0,9 s (`cubic-bezier(.7,0,.84,0)`), l’accueil apparaît.
- `prefers-reduced-motion` : pas d’anneau animé ni de compteur, simple fondu de 200 ms.
- Accessibilité : `role="progressbar"`, `aria-valuenow`, libellé « Chargement du site » ; le statut est lu une seule fois.

```tsx
// src/components/splash/SplashLoader.tsx (principe)
const steps = [
  { weight: 0.3, wait: () => document.fonts.ready },
  { weight: 0.4, wait: () => imageReady('#hero-image') },
  { weight: 0.3, wait: () => new Promise(r => requestIdleCallback(r)) },
];
// progression = somme des poids terminés ; animation du compteur vers la valeur réelle (tween 300 ms)
// fermeture : progression === 1 || timeout 4000 ms || clic sur « Passer »
```

**Spinner, barre, squelettes**

```css
@keyframes spin { to { transform: rotate(360deg); } }
.spinner { animation: spin .9s linear infinite; }
@keyframes shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
.skeleton::after { animation: shimmer 1.4s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .spinner, .skeleton::after { animation: none; } }
```

- Spinner : bouton « Envoyer ma demande » (état Chargement), toute attente de moins de 2 s.
- Barre de progression : uniquement avec un pourcentage réel (envoi de fichier, opération longue).
- Squelettes : grille des réalisations au premier affichage et lors d’un changement de filtre (au-delà de 150 ms).

### Micro-interactions et animations de page (v2.9)

Storyboards et composants dans la page Figma « 08 - Animations et micro-interactions » (`396:87`), planches 01 à 13. Règle commune : si `prefers-reduced-motion: reduce`, l’état final s’affiche directement (ou un fondu de 150 ms au plus).

| # | Animation | Déclencheur | Mouvement, durée, courbe | Notes |
| --- | --- | --- | --- | --- |
| 01 | En-tête qui se compacte | Défilement > 80 px | Hauteur 104 → 72 px (mobile 88 → 64), fond `rgba(2,10,36,.72)` + `backdrop-filter: blur(16px)`, logo 112 → 88 px ; 250 ms ease-out | Retour à l’état normal en haut de page |
| 02 | Barre de lecture | Défilement | Barre fixe 3 px, dégradé cyan → bleu, largeur = progression ; sans transition (rAF) | Études, pages légales, détails de service |
| 03 | Haut de page | Après 1 écran | Bouton 48 px, anneau SVG (`stroke-dashoffset` = progression) ; apparition 200 ms ; clic → `scrollTo({top:0, behavior:'smooth'})` | Mobile : au-dessus du bouton d’appel |
| 04 | Anneau du hero | Mouvement de souris | Anneau ±16 px (X) / ±12 px (Y), cartes ±8 px ; lissage lerp 0,08 | `pointer: fine` uniquement |
| 05 | Captures inclinées | Survol d’une carte | `perspective(1000px) rotateX(4deg) rotateY(-6deg) translateY(-6px) scale(1.02)` ; 300 ms ease-out, retour 400 ms ; ombre plus longue | Composant `Effet/Capture inclinée` |
| 06 | Avant / après | Glisser, clic, flèches | Poignée 44 px, ligne 2 px, `clip-path` sur l’image « avant » | **Bloqué** : captures authentiques de l’ancien site Agora à fournir ; ne rien inventer |
| 07 | Défilement automatique | Mockup visible | `translateY(0 → -(h - fenêtre))` en 12 s, ease-in-out, aller-retour, pause au survol | Composant `Effet/Défilement automatique` |
| 08 | Frise de la méthode | Section visible à 30 % | Ligne `scaleX(0 → 1)` en 1,2 s ; étapes allumées en décalé de 0,24 s | Une fois par visite ; verticale sur mobile |
| 09 | Champs du formulaire | Sortie du champ / envoi | Valide : coche tracée 300 ms ; erreur : tremblement 0, −6, +6, −4, +4, 0 px en 350 ms + bordure rouge | Message d’erreur annoncé (`aria-live`) |
| 10 | Confirmation d’envoi | Réponse du serveur | Cercle 500 ms, coche 300 ms (départ 400 ms), texte qui monte de 12 px (300 ms, départ 700 ms) | Focus sur le titre de confirmation |
| 11 | Bouton d’appel flottant | Hero hors de l’écran | Glisse depuis le bas + fondu, 250 ms ; fixé à 16 px + `env(safe-area-inset-bottom)` | Mobile et tablette ; `tel:+237695607089` ; masqué sur le pied de page et clavier ouvert ; ajouté sur Accueil, Services, Réalisations, Contact (mobile) |
| 12 | Page 404 | Arrivée sur la page | Rotation 1,2 s, segments qui se séparent 600 ms, flottement ±4 px en boucle (4 s) | Message « Cette page s’est perdue en route. » |
| 13 | Liens soulignés | Survol, focus | `background-size: 0% 2px → 100% 2px`, 250 ms ease-out, dégradé #F7AD21 → #94A538 → #1996CE → #641B62 | Composant `Lien/Animé` |

```css
/* 13 — lien souligné */
.link-animated { background: linear-gradient(90deg,#F7AD21,#94A538,#1996CE,#641B62) no-repeat left bottom / 0% 2px; transition: background-size .25s ease-out; }
.link-animated:hover, .link-animated:focus-visible { background-size: 100% 2px; }
/* 09 — tremblement d’erreur */
@keyframes shake { 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
.field--error { animation: shake .35s ease-in-out; }
@media (prefers-reduced-motion: reduce) { .field--error { animation: none; } }
```

### Animations en boucle (v3.0)

Planches 14 à 20 de la page « 08 - Animations et micro-interactions » (`396:87`). Chaque effet est un jeu de variantes `Étape=1…n` relié par « Après délai → Changer vers » en animation intelligente : il tourne seul en mode prototype. Règles communes : boucle mise en pause hors écran (IntersectionObserver) et quand l’onglet est masqué ; avec `prefers-reduced-motion`, l’état final reste fixe ; jamais plus d’une boucle « forte » visible à la fois.

| N° | Effet | Composant Figma | Où | Rythme |
| --- | --- | --- | --- | --- |
| 14 | Anneau du hero en rotation lente + cartes flottantes | `Effet/Anneau rotatif` | Hero accueil | 360° en 60 s linéaire ; cartes ±6 px sur 6 s, décalées de 1,5 s |
| 15 | Indicateur de défilement (souris, molette) | `Effet/Indicateur de défilement` | Bas du hero accueil desktop (ajouté) | 1,6 s ; disparaît au premier défilement |
| 16 | Pastille d’état qui pulse | `Effet/Pastille active` | Badges « En production », « Disponible » | Halo 6 → 18 px toutes les 2 s ; statuts actifs seulement |
| 17 | Halo d’attention du bouton d’appel | `Bouton flottant/Appeler (pulsation)` | Bouton fixe mobile : Accueil, Services, Réalisations, Contact (remplacé) | Toutes les 5 s, 3 répétitions max par page |
| 18 | Bandeau défilant des technologies | `Effet/Bandeau des technologies` | Proposé sous le hero de l’accueil | 40 s par tour, contenu dupliqué, pause au survol, bords en fondu |
| 19 | Onde d’alerte sur la carte CocoaTrack | `Effet/Onde d’alerte` | Étude CocoaTrack, sections Cartographie et Satellite | Toutes les 2,4 s ; parcelles fictives |
| 20 | Halo lumineux du CTA final | `Effet/Halo du CTA` | Bloc « Parlons de votre projet » | Dérive aller-retour 8 s ease-in-out |

Déjà en boucle avant la v3.0 : spinner, reflet des squelettes, défilement automatique des captures (planche 07) et flottement de l’anneau brisé de la page 404 (planche 12).

```css
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes float { from { transform: translateY(-6px); } to { transform: translateY(6px); } }
@keyframes pulse { from { box-shadow: 0 0 0 0 rgb(14 122 80 / .35); } to { box-shadow: 0 0 0 10px rgb(14 122 80 / 0); } }
@keyframes marquee { to { transform: translateX(-50%); } }
.hero-ring { animation: spin 60s linear infinite; }
.hero-card { animation: float 6s ease-in-out infinite alternate; }
.status-dot { animation: pulse 2s ease-out infinite; }
.tech-track { animation: marquee 40s linear infinite; }
.tech-strip:hover .tech-track { animation-play-state: paused; }
.call-fab::after { animation: pulse 1.2s ease-out 3; animation-delay: 5s; }
@media (prefers-reduced-motion: reduce) { .hero-ring, .hero-card, .status-dot, .tech-track, .call-fab::after { animation: none; } }
```

### Pages juridiques : cookies et CGU (v3.0)

Le bandeau cookies (`74:707`, lien « Politique de cookies ») et la modale de préférences (`74:749`) existaient déjà. Deux pages ajoutées, sur le gabarit de la politique de confidentialité (sommaire à gauche, articles numérotés) :

- **Politique de cookies** — `/politique-cookies` (`/en/cookie-policy`) : desktop `405:87`, mobile `405:1270`, tablette `405:9921`. 7 sections : définition, cookies utilisés (nécessaires, mesure d’audience), détail des cookies, consentement, modifier ses choix (bouton qui rouvre la modale), contact, mise à jour.
- **Conditions générales d’utilisation** — `/conditions-utilisation` (`/en/terms-of-use`) : desktop `405:682`, mobile `405:1803`, tablette `405:10145`. 11 sections : objet, éditeur, accès, demandes de contact et de devis, propriété intellectuelle, réalisations et marques des clients, responsabilité, liens externes, données et cookies, droit applicable, modification.
- Pied de page : liens « Politique de cookies » et « Conditions d’utilisation » ajoutés aux deux variantes du composant.
- Textes : **modèles à compléter**, à faire valider par un juriste avant mise en ligne. Restent « À configurer » : le tableau des cookies réellement déposés (nom, finalité, durée, émetteur), l’outil de mesure d’audience retenu, le droit applicable et la juridiction, la date de mise à jour. Ne déposer aucun cookie de mesure avant consentement.

## 9. Interactions, prototype et formulaire

### Prototype Figma (page 04 · Prototype)

| Flux | Départ | Parcours |
| --- | --- | --- |
| 01 · Parcours principal | Accueil desktop | Navigation complète par le header et le footer entre toutes les pages (voir §9 bis). |
| 02 · Démarrer un projet | Accueil → bouton « Démarrer un projet » | Contact → envoi incomplet (état Erreurs) → formulaire rempli → modale de confirmation. |
| 03 · Découverte FleetRent | Accueil → section Nos produits | Solutions → FleetRent → Contact. |

La carte des flux (`30:12`) résume ces liens. Les mêmes parcours existent en mobile (menu ouvert `22:866`).

### Micro-interactions à reproduire

| Élément | Déclencheur | Effet | Durée / courbe |
| --- | --- | --- | --- |
| Bouton | survol / focus clavier | Fond `primary-hover`, icône flèche décalée de 4 px | 200 ms, `cubic-bezier(.2,.8,.2,1)` |
| Bouton | appui | `scale(.98)` | 100 ms |
| Nav/Lien | survol | Texte `text-primary`, trait inférieur qui s’étire de 0 à 100 % | 200 ms |
| Carte/Service | survol | `translateY(-4px)`, `shadow-md`, bordure `primary-soft`, flèche visible | 240 ms |
| Filtre | clic | Fond `secondary-dark`, texte blanc ; la grille se réorganise (fondu + décalage 8 px) | 200 ms / 300 ms |
| Accordéon | clic | Ouverture en hauteur, icône plus → moins | 280 ms |
| Option de choix, case | clic | Bordure et fond `primary-subtle`, coche qui apparaît | 160 ms |
| Champ | focus | Bordure `border-focus` + `--focus-ring` | 150 ms |
| Header | défilement > 24 px | Fond verre + ombre, hauteur légèrement réduite (recommandation) | 200 ms |
| Menu mobile | clic sur le bouton | Panneau plein écran depuis le haut, liens en cascade (40 ms d’écart) | 300 ms |

Les lignes Header et Menu mobile, ainsi que la réorganisation animée de la grille au filtrage, sont des recommandations pour le code : elles ne sont pas animées dans le prototype Figma. Toutes ces transitions sont neutralisées par `prefers-reduced-motion: reduce` (voir §8 et §10).

### Formulaire de contact

| Champ | Composant | Obligatoire | Validation | Message d’erreur |
| --- | --- | --- | --- | --- |
| Nom et prénom | `TextField` | oui | 2 caractères mini | « Veuillez indiquer votre nom. » (à confirmer) |
| Entreprise / organisation | `TextField` | non (facultatif) | — | — |
| Adresse e-mail | `TextField type="email"` | oui | format e-mail | « Veuillez saisir une adresse e-mail valide. » (à confirmer) |
| Téléphone | `TextField type="tel"` | non (facultatif) | format international si rempli | — |
| Type de projet | `ChoiceCard` × 7 : Site web, Application mobile, Logiciel sur mesure, Transformation digitale, Automatisation, Conseil technologique, Autre | oui, choix multiple | au moins 1 | « Veuillez sélectionner au moins un type de projet. » |
| Budget estimatif | `Select` | non (facultatif) | — | — |
| Délai souhaité | `Select` | oui | une valeur | « Veuillez choisir un délai. » (à confirmer) |
| Description du besoin | `TextArea` | oui | 20 caractères mini | « Merci de décrire votre besoin (20 caractères minimum). » |
| Consentement | `Checkbox` | oui | coché | « Votre accord est nécessaire pour envoyer la demande. » |

Les fourchettes de budget et les délais proposés ne sont pas définis dans Figma : les faire valider par ZIIIILO.

Comportement :

1. Validation au premier envoi, puis en direct champ par champ (`mode: "onTouched"` de react-hook-form).
2. En cas d’erreurs : alerte en tête « Certains champs sont à compléter » (`role="alert"`), focus déplacé sur le premier champ en erreur.
3. Pendant l’envoi : bouton désactivé avec indicateur de chargement ; les données saisies restent en cas d’échec réseau, avec un message d’erreur générique.
4. Succès : modale « Merci, votre demande est bien envoyée » avec deux actions (Retour à l’accueil, Découvrir nos solutions), formulaire réinitialisé.
5. Envoi côté serveur (Server Action) vers l’adresse de réception à configurer ; champ piège invisible contre le spam. Le service d’envoi d’e-mails reste à choisir avec ZIIIILO.

```ts
const contactSchema = z.object({
  name: z.string().trim().min(2),
  company: z.string().trim().optional(),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  projectTypes: z.array(z.enum(["web","mobile","software","transformation","automation","consulting","other"])).min(1),
  budget: z.string().optional(),
  timeline: z.string().min(1),
  message: z.string().trim().min(20),
  consent: z.literal(true),
  website: z.string().max(0).optional(), // champ piège
});
```

Contact direct (v2.7) : bloc **Téléphone** (bouton « Appeler », lien `tel:+237695607089`) et bloc **E-mail** (`mailto:christian.momo@ziiiilo.tech`). Un bloc WhatsApp (`https://wa.me/<numéro sans + ni espaces>`) ne sera ajouté que si un numéro WhatsApp est confirmé. Les valeurs viennent de la configuration (§12).

### Interactions ajoutées en v1.3

- **Formulaire de contact** : Envoyer → écran « envoi en cours » (`76:17467`, bouton en état Chargement, libellé « Envoi en cours… ») → confirmation au bout de 1,6 s dans le prototype. En code, l’état de chargement dure le temps réel de la requête.
- **Accordéon de service** (mobile) : un clic sur l’en-tête bascule entre Fermé et Ouvert (smart animate 0,3 s).
- **Cookies** : « Personnaliser » et « Gestion des cookies » (footer) ouvrent la modale en superposition ; « Tout accepter », « Tout refuser » et « Enregistrer mes choix » ferment le bandeau ou la modale. Le choix est mémorisé (cookie de consentement) et aucun script de mesure n’est chargé avant accord.
- **Liens vers les pages de détail** : cartes « Nos expertises » de l’accueil (desktop et mobile), liens Services du footer sur tous les écrans, boutons de la page Services. Les liens « Mentions légales » et « Politique de confidentialité » du footer sont reliés aux nouvelles pages.
- **404** : liens vers Accueil, Contact, Services, Solutions, Réalisations et FAQ.

### Navigation DocCloud (v1.4)

- Accueil (carte DocCloud), Solutions (bloc et carte), Réalisations (bloc et carte), footer desktop (colonne Solutions) → page DocCloud.
- Page DocCloud : « Voir le fonctionnement » défile jusqu’à « Comment fonctionne DocCloud ? » ; « Nous contacter » et « Discutons de votre projet » → Contact ; « Voir nos autres projets » et « Voir nos réalisations » → Réalisations ; fil d’Ariane « Solutions » → Solutions.
- Les liens vers FleetRent sont inchangés. Nouveaux parcours du prototype : « 05 · Découverte DocCloud » (desktop et mobile).

### Navigation SCPB Commercial (v1.5)

- Accueil (carte SCPB), Réalisations (projet à la une et carte), Solutions (section « Solutions métiers ») → page SCPB (`103:11672` / `111:11199`).
- Hero SCPB : « Voir l’aperçu de la plateforme » → défilement vers la section 05 ; « Retour aux réalisations » → `17:3849` / `24:3083`.
- Mentions : « Voir les autres réalisations » → Réalisations. CTA : « Confiez-nous votre projet » → Contact (`19:4130` / `25:3462`), « Voir nos réalisations » → Réalisations.
- Header desktop : lien « Réalisations » actif sur la page SCPB. Menu mobile inchangé (Réalisations → `24:3083`).
- Accueil : le bouton « Tous nos produits » (→ Solutions) devient « Toutes nos réalisations » (→ Réalisations), en desktop et en mobile.
- Parcours de prototype : « 06 · Découverte SCPB Commercial — Desktop » et « — Mobile ».
- Filtres de Réalisations : seul l’état visuel change dans Figma ; le filtrage réel se code à partir de `categories`.

### Navigation StafTrack (v1.7)

- Accueil, Réalisations (projet à la une et carte), Solutions (bloc Solutions métiers) → page StafTrack (`126:14817` / `131:14099`).
- Hero : « Voir le fonctionnement » → défilement vers la section 03 ; « Retour aux réalisations » → Réalisations.
- CTA : « Demander une démonstration » → Contact (`19:4130` / `25:3462`) ; « Voir nos réalisations » → Réalisations.
- Parcours : « 07 · Découverte StafTrack — Desktop » et « — Mobile ».
- Étapes du fonctionnement et de la mise en place : survol Repos → Survol (hérité du composant).

### Navigation Prévisions Cacao & Robusta (v1.9)

- Accueil (carte), Réalisations (projet à la une et carte), Solutions (bloc Solutions métiers) → page Prévisions (`149:20336` / `157:17634`).
- Hero : « Explorer la plateforme » → lien externe `https://forecast.ste-scpb.com` (nouvel onglet, `rel="noopener"`) ; « Voir les réalisations ZIIIILO » → Réalisations. Fil d’Ariane : Accueil, Réalisations.
- Mentions : bouton → Réalisations. CTA : « Discuter d’un projet avec ZIIIILO » → Contact (`19:4130` / `25:3462`) ; « Découvrir nos autres réalisations » → Réalisations.
- Accueil desktop : la tuile « Et votre projet ? » a été retirée en v2.0 (remplacée par la carte SCPB Survey).
- Parcours : « 08 · Découverte Prévisions Cacao & Robusta — Desktop » et « — Mobile ».

### Navigation SCPB Survey (v2.0)

- Accueil (carte), Réalisations (projet à la une et carte), Solutions (bloc) → page SCPB Survey (`200:23564` / `204:16328`).
- Hero : « Voir le parcours terrain » → défilement vers la section 05 ; « Retour aux réalisations » → Réalisations. Fil d’Ariane : Accueil, Réalisations.
- Mentions : bouton → Réalisations. CTA : « Discuter d’un projet avec ZIIIILO » → Contact (`19:4130` / `25:3462`) ; « Découvrir nos autres réalisations » → Réalisations.
- Étapes du parcours : survol Repos → Survol (hérité du composant).
- Parcours : « 09 · Découverte SCPB Survey — Desktop » et « — Mobile ».

### Navigation STE-SCPB (v2.1)

- Accueil (« Réalisation à la une »), Réalisations (projet à la une et carte), Services (exemple du service 01) → page STE-SCPB (`233:23711` / `240:19126`).
- « Visiter le site » / « Visiter le site web » → https://ste-scpb.com, lien externe en nouvel onglet : carte d’accueil (desktop, mobile, tablette), projet à la une, hero.
- Hero : « Voir nos autres réalisations » → Réalisations. Fil d’Ariane : Accueil, Réalisations.
- Section 14 : cartes vers les études SCPB Commercial et Prévisions Cacao & Robusta.
- Section 15 : « Voir toutes nos réalisations » → Réalisations (`17:3849` / `24:3083`) ; « Confiez-nous votre projet web » → Contact (`19:4130` / `25:3462`).
- Parcours : « 10 · Découverte STE-SCPB — Desktop » et « — Mobile ».

### Navigation Golden Beans SA (v2.2)

- Accueil (« Nouvelle réalisation client »), Réalisations (carte de grille, projet mobile), Services (exemple du service 06) → page Golden Beans (`262:24524` / `266:19740`).
- « Visiter Golden Beans » / « Visiter le site » → https://goldenbeans.cm (nouvel onglet) ; « Explorer nos réalisations » et « Voir nos autres projets » → Réalisations ; « Démarrer un projet avec ZIIIILO » → Contact.
- Tablette : seul « Visiter le site » est relié (pas de page d’étude tablette).
- Parcours : « 11 · Découverte Golden Beans SA — Desktop » et « — Mobile ».

### Navigation Ninety One Foot Academy (v2.3)

- Accueil, Réalisations (carte de grille, projet mobile), Services (exemple du service 02) → page N91 (`278:25463` / `281:20482`).
- « Visiter le site officiel » / « Visiter le site » → https://www.ninetyonefootacademy.com/fr/accueil ; « Découvrir les réalisations ZIIIILO » et « Découvrir nos réalisations » → Réalisations ; « Démarrer un projet avec ZIIIILO » → Contact.
- Tablette : seul « Visiter le site » est relié. Réalisations desktop : grille complète 3 × 3, l’état vide est masqué.
- Parcours : « 12 · Découverte Ninety One Foot Academy — Desktop » et « — Mobile ».

### Navigation Agora Film Invest (v2.4)

- Accueil, Réalisations (carte de grille, projet mobile), Services (service 05) → page Agora (`297:27498` / `300:22316`).
- « Visiter Agora Film Invest » / « Visiter le site » / « Voir le site actuel » → https://www.agorafilminvest.com/ ; « Voir toutes nos réalisations » et « Voir nos réalisations » → Réalisations ; « Confiez-nous votre projet » → Contact.
- Grille Réalisations desktop : 10 cartes, l’état vide (792 px) complète la dernière rangée.
- Parcours : « 13 · Découverte Agora Film Invest — Desktop » et « — Mobile ».

### Navigation CocoaTrack (v2.6)

- Accueil (carte mise en avant) et Portfolio (carte desktop, projet mobile) → étude CocoaTrack.
- Hero : « Découvrir les modules » fait défiler jusqu’à la section 03 ; « Parler de votre projet » → Contact.
- Réalisations associées → STE-SCPB, Prévisions Cacao & Robusta, SCPB Commercial (même contexte métier, sans interconnexion technique revendiquée).
- Conclusion : « Voir nos réalisations » → Réalisations ; « Parler de votre projet avec ZIIIILO » → Contact.
- Service 03 (Logiciels et solutions de gestion sur mesure) : exemple CocoaTrack → étude.
- Parcours : « 14 · Découverte CocoaTrack — Desktop » et « — Mobile ».

## 9 bis. Plan de navigation

Vue d’ensemble de toutes les pages publiques, de leurs adresses et des liens qui les relient. C’est la référence pour créer les routes, le header, le menu mobile et le footer. Le français est à la racine du site, l’anglais sous `/en/` avec des adresses traduites.

### Arborescence du site

```text
[Premier chargement] Splash 0 → 100 % → ouverture du site

/                                     Accueil
├── /services                         Services (8 blocs)
│   └── /services/[slug]              Détail service (8 pages)
├── /solutions                        Produits ZIIIILO
│   ├── /solutions/fleetrent
│   └── /solutions/doccloud
├── /realisations                     Portfolio (filtre ?categorie=…)
│   ├── /realisations/scpb-commercial
│   ├── /realisations/staftrack
│   ├── /realisations/previsions-cacao-robusta
│   ├── /realisations/scpb-survey
│   ├── /realisations/ste-scpb
│   ├── /realisations/golden-beans
│   ├── /realisations/ninety-one-foot-academy
│   ├── /realisations/agora-film-invest
│   └── /realisations/cocoatrack      (publication soumise à validation STE-SCPB)
├── /a-propos                         (ancre #methode pour « Notre méthode »)
├── /faq
├── /contact                          (états : erreurs, saisie valide, envoi, confirmation)
├── /mentions-legales
├── /confidentialite
├── /politique-cookies
├── /conditions-utilisation
└── 404                               (toute adresse inconnue)

Couches au-dessus des pages : bandeau cookies (1re visite) · modale Préférences cookies · menu mobile · bouton flottant « Appeler » (mobile)
```

### Tableau des routes

| Page | Route FR | Route EN | Maquette desktop |
| --- | --- | --- | --- |
| Accueil | `/` | `/en` | `11:2` |
| Services | `/services` | `/en/services` | `13:861` |
| Détail service | `/services/[slug]` | `/en/services/[slug]` | `13:2161`, `68:6024`, `68:6541`, `69:7091`, `69:7641`, `69:8170`, `70:8236`, `70:8772` |
| Solutions | `/solutions` | `/en/solutions` | `14:2193` |
| FleetRent | `/solutions/fleetrent` | `/en/solutions/fleetrent` | `15:2676` |
| DocCloud | `/solutions/doccloud` | `/en/solutions/doccloud` | `90:11552` |
| Réalisations | `/realisations` | `/en/work` | `17:3849` |
| Étude de réalisation | `/realisations/[slug]` | `/en/work/[slug]` | `103:11672` à `319:1014` (06b à 06j) |
| À propos | `/a-propos` | `/en/about` | `17:3467` |
| FAQ | `/faq` | `/en/faq` | `19:4431` |
| Contact | `/contact` | `/en/contact` | `19:4130` (états `21:4498`, `21:4759`, `76:17467`, `21:5009`) |
| Mentions légales | `/mentions-legales` | `/en/legal-notice` | `71:8677` |
| Confidentialité | `/confidentialite` | `/en/privacy` | `71:8970` |
| Politique de cookies | `/politique-cookies` | `/en/cookie-policy` | `405:87` |
| Conditions d’utilisation | `/conditions-utilisation` | `/en/terms-of-use` | `405:682` |
| Page introuvable | toute adresse inconnue | idem | `75:9346` |

Les cadres mobile et tablette portent le même nom sur les pages « 03 - Site Mobile » et « 03b - Tablette ». Harmonisation : les études de réalisation sont sous `/en/work/[slug]` en anglais ; les mentions `/en/realisations/…` plus haut dans ce guide sont à lire ainsi. `/en/legal-notice` et `/en/privacy` sont proposés ici pour la première fois. Les slugs des 8 services suivent les titres (`sites-web`, `applications-mobiles`, `logiciels-sur-mesure`, `transformation-digitale`, `ui-ux-design`, `automatisation-integration`, `conseil-architecture`, `maintenance-evolution`) et restent identiques en anglais.

### Menus

- **Header desktop** : Accueil · Services · Solutions · Réalisations · À propos · Contact · sélecteur FR / EN · bouton « Démarrer un projet » → `/contact`. La FAQ n’est pas dans le header, seulement dans le footer.
- **Menu mobile** (ouvert par le bouton du header) : les mêmes 6 liens, « Démarrer un projet », bloc Contact direct (`mailto:` et `tel:`), choix Français · English.
- **Footer desktop** : colonne Services (6 services → `/services/[slug]`) ; colonne Solutions (FleetRent, DocCloud, Tous nos produits → `/solutions`, Réalisations) ; colonne Entreprise (À propos, Notre méthode → `/a-propos#methode`, FAQ, Contact) ; colonne Contact (e-mail, téléphone, adresse) ; Suivez-nous (LinkedIn, Facebook, Instagram : adresses à fournir, ouverture dans un nouvel onglet).
- **Footer mobile** : Services (4 services + « Voir tous les services ») ; Entreprise (Solutions, Réalisations, À propos, FAQ, Contact) ; Contact ; Suivez-nous.
- **Barre légale** (desktop et mobile) : Mentions légales · Politique de confidentialité · Gestion des cookies (ouvre la modale, pas une page) · Politique de cookies · Conditions d’utilisation.
- Le lien actif du header correspond à la rubrique : une étude de réalisation active « Réalisations », un détail service active « Services », FleetRent et DocCloud activent « Solutions ».

### Liens entre les pages

- **Accueil** → détails des services, FleetRent et DocCloud, les 4 réalisations mises en avant et les 7 tuiles compactes (études), CTA final vers `/contact`.
- **Services** → « Voir le détail du service » vers chaque `/services/[slug]`. **Détail service** → retour aux services, exemples de réalisations liées, CTA vers `/contact`.
- **Solutions** → FleetRent et DocCloud. **Réalisations** → chaque étude ; la carte FleetRent pointe vers `/solutions/fleetrent`, la carte DocCloud vers `/solutions/doccloud`.
- **Étude de réalisation** → retour à `/realisations`, site du client dans un nouvel onglet quand il existe (jamais pour CocoaTrack ni SCPB Survey), CTA vers `/contact`.
- **Contact** → envoi du formulaire puis confirmation sur la même page ; liens `tel:+237695607089` et `mailto:christian.momo@ziiiilo.tech`.
- **Bandeau cookies** → « Politique de cookies » et ouverture de la modale ; la page Politique de cookies rouvre aussi la modale (« Modifier vos choix »).
- **Bouton flottant « Appeler »** (mobile : Accueil, Services, Réalisations, Contact) → `tel:`.
- **404** → liens de retour définis dans la maquette `75:9346`.

### Parcours du prototype Figma

Page « 02 - Site Desktop » (équivalents sur mobile) : 00 Ouverture du site (chargement 0 → 100 %) · 01 Parcours principal · 02 Démarrer un projet (formulaire) · 03 Découverte FleetRent · 04 Première visite (cookies) · 05 Découverte DocCloud · 06 à 14 Découverte de chaque réalisation (SCPB Commercial, StafTrack, Prévisions Cacao & Robusta, SCPB Survey, STE-SCPB, Golden Beans SA, Ninety One Foot Academy, Agora Film Invest, CocoaTrack). Les pages juridiques n’ont pas de parcours dédié : elles s’ouvrent depuis le footer.

## 10. Accessibilité et langues

Objectif : WCAG 2.2 niveau AA.

### Contrastes

Les couples de couleurs utilisés ont été vérifiés ; le tableau détaillé est sur la page 00 · Direction artistique. Deux corrections ont été faites à cette occasion : `green/600` est passé à `#0E7A50`, et le texte du badge « Produit ZIIIILO » utilise `primary-hover`. Règles à respecter en code :

- Texte courant sur fond clair : `text-primary` ou `text-secondary` uniquement ; `text-muted` réservé aux textes d’appoint de 14 px et plus.
- Sur fond sombre : `text-inverse` et `text-inverse-muted` ; le cyan `accent-cyan` est réservé aux surtitres, chiffres et effets, jamais au texte courant.
- L’orange et l’or du logo sont décoratifs : jamais de texte orange sur fond blanc.
- Ne jamais transmettre une information par la couleur seule (badges : texte + couleur ; erreurs : icône + message).

### Clavier et lecteurs d’écran

- Lien « Aller au contenu » en premier élément focalisable.
- Focus visible partout : `outline: none` interdit sans remplacement par `--focus-ring`.
- Menu mobile : `aria-expanded` sur le bouton, focus piégé dans le panneau, fermeture Échap, retour du focus au bouton.
- Accordéons, filtres, options de choix, modale : rôles et attributs décrits au §6.
- Les animations de texte du §8 gardent le **texte final dans le DOM** dès le départ (lu tel quel par les lecteurs d’écran) ; les caractères défilés sont dans un calque `aria-hidden`.
- Visuels décoratifs (anneau, motifs, mockups) : `aria-hidden="true"` ; images porteuses de sens : `alt` descriptif.
- Zones cliquables de 44 × 44 px minimum.

### Mouvement réduit

Avec `prefers-reduced-motion: reduce` : aucun défilement de caractères, aucun balayage, aucun clignotement ; le texte apparaît directement (fondu de 150 ms maximum). Les animations ne bloquent jamais la lecture : le contenu est lisible même si le JavaScript ne se charge pas.

### Langues (FR / EN)

| Point | Règle |
| --- | --- |
| Langue par défaut | Français, `/fr/…` (ou racine sans préfixe selon le choix d’hébergement) |
| Anglais | `/en/…` avec slugs traduits (`/en/about`, `/en/work`, etc.) |
| Contenus | Seul le français est rédigé dans Figma. La version anglaise est à traduire et à faire relire par ZIIIILO avant mise en ligne ; en attendant, ne pas publier `/en`. |
| Sélecteur | Bouton « FR » du header : bascule vers la même page dans l’autre langue. |
| Balisage | `<html lang>` dynamique, balises `hreflang` alternées, `og:locale`. |
| Textes longs | Prévoir environ 15 % de longueur en plus pour l’anglais dans les boutons et les titres (pas de largeur fixe). |

## 11. Assets

### Logo

Le logo a été vectorisé à partir du fichier fourni, sans modifier typographie, proportions ni couleurs. Seule exception : la mention « SARL » a été recomposée en Inter Regular (le fichier source était trop petit pour la retracer exactement) ; à remplacer par le vectoriel d’origine si ZIIIILO le retrouve.

| Fichier (à placer dans `public/brand/`) | Usage | Composant Figma |
| --- | --- | --- |
| `ziiiilo-logo-couleur.svg` | Header, footer clair, documents | Logo/Couleur `4:7` |
| `ziiiilo-logo-blanc.svg` | Footer (retenu en v3.1) ; autres fonds sombres (hero, CTA) si besoin | Logo/Monochrome blanc `39:3944` |
| `ziiiilo-symbole.svg` | Favicon, icône d’application, avatar réseaux | Logo/Symbole `39:3915` |
| `ziiiilo-logo-couleur-2536px.png`, `ziiiilo-logo-blanc-2536px.png`, `ziiiilo-symbole-1024px.png` | Partage social (`og:image`), e-mails, usages hors web | — |

Règles : ratio 2:1 (viewBox `-1 0 634 317`), toujours inséré en SVG inline ou `<img>` avec `alt="ZIIIILO"`, jamais recoloré en CSS, jamais étiré. Hauteur du logo dans le header : 56 px desktop (112 × 56), 48 px mobile (96 × 48). Le monochrome blanc est validé pour le footer (v3.1).

Footer (v3.1) : la plaque blanche autour du logo est supprimée. Le footer utilise le logo monochrome blanc (Logo/Monochrome blanc, `39:3944`, fichier `ziiiilo-logo-blanc.svg`), validé par ZIIIILO pour cet usage. Taille : 160 × 80 px sur desktop et mobile. Le logo couleur reste celui du header. Une variante couleur pour fond sombre existe (Logo/Couleur sur fond sombre, `430:984`, mention « SARL » éclaircie) mais n’est pas utilisée. Comparaison des options : planche « Comparaison — logo du footer » (`429:1286`, page 01). L’adresse du footer passe sur deux lignes (« Bonamoussadi – Rond-point Maetur » / « BP 8283 Douala »).

### Icônes

Les icônes Figma (page 01, 24 px, trait 1,75) reprennent le dessin de Lucide. En code : `lucide-react`, `size={24} strokeWidth={1.75}`, couleur héritée (`currentColor`). Les noms marqués \* ont plusieurs équivalents proches dans Lucide : comparer visuellement avec le nœud Figma.

| Figma | lucide-react | Figma | lucide-react |
| --- | --- | --- | --- |
| arrow-right `4:22` | `ArrowRight` | arrow-up-right `4:28` | `ArrowUpRight` |
| check `4:33` | `Check` | chevron-down `4:38` | `ChevronDown` |
| chevron-right `4:43` | `ChevronRight` | menu `4:50` | `Menu` |
| x `4:56` | `X` | plus `4:62` / minus `4:67` | `Plus` / `Minus` |
| globe `4:74` | `Globe` | code `4:80` | `Code` \* |
| smartphone `4:86` | `Smartphone` | layers `4:93` | `Layers` |
| refresh `4:101` | `RefreshCw` \* | pen-tool `4:109` | `PenTool` |
| workflow `4:116` | `Workflow` | cpu `4:130` | `Cpu` |
| cloud `4:135` | `Cloud` | compass `4:141` | `Compass` |
| wrench `4:146` | `Wrench` | database `4:153` | `Database` |
| target `4:160` | `Target` | puzzle `4:165` | `Puzzle` |
| eye `4:171` | `Eye` | sliders `4:184` | `SlidersHorizontal` \* |
| users `4:192` | `Users` | trending-up `4:198` | `TrendingUp` |
| search `4:204` | `Search` | lightbulb `4:211` | `Lightbulb` |
| send `4:217` | `Send` | mail `4:223` | `Mail` |
| message `4:228` | `MessageCircle` \* | phone `4:233` | `Phone` |
| map-pin `4:239` | `MapPin` | car `4:247` | `Car` |
| calendar `4:255` | `Calendar` | file-text `4:264` | `FileText` |
| store `4:271` | `Store` | dashboard `4:279` | `LayoutDashboard` |
| map `4:286` | `Map` | shield `4:292` | `Shield` \* |
| chart `4:300` | `ChartColumn` \* | sparkles `4:305` | `Sparkles` |
| clock `4:311` | `Clock` | info `4:318` | `Info` |
| alert `4:325` | `TriangleAlert` \* | check-circle `4:331` | `CircleCheck` \* |
| external `4:338` | `ExternalLink` | share `4:347` | `Share2` \* |
| zap `4:352` | `Zap` | building `4:367` | `Building2` \* |
| languages `4:377` | `Languages` | layout `4:384` | `LayoutGrid` \* |

### Visuels et images

- Hero, mockups et visuels de services : à coder en SVG/HTML (texte net, poids léger, thème maîtrisé). Les données affichées dans les mockups sont fictives et doivent garder leur mention « données d’illustration ».
- Aucune photo n’est utilisée pour l’instant : pas de banque d’images. Les vraies images (équipe, écrans réels de FleetRent, projets clients) seront ajoutées quand ZIIIILO les fournira ; elles passeront par `next/image` (AVIF/WebP, `sizes` renseigné).
- Page 05 · Assets (`30:5249`) : planche récapitulative à utiliser pour les exports.

DocCloud : le logotype (`83:799`) est **provisoire**, à intégrer en SVG inline et à remplacer dès que le logo définitif existe. Les documents montrés dans les visuels sont fictifs et marqués « SPÉCIMEN » ; ne jamais les remplacer par une vraie pièce d’identité ni par une vraie photo.

SCPB Commercial : aucun asset bitmap. Les mockups sont à recoder en composants ; si des images sont nécessaires, exporter en SVG depuis les composants `97:1870` à `99:2220`. Logo officiel SCPB (v1.6) : `public/brand/scpb-logo.svg`, le fichier SVG fourni avec la v1.6 (vectorisé depuis le PNG du client, rendu identique au pixel près à 99,8 %). Ne jamais le recolorer, le déformer ni le recadrer, et ne pas le réutiliser hors du contexte de cette réalisation.

StafTrack (v1.7) : aucun asset bitmap ; mockups à recoder en composants (ou export SVG depuis `122:3063` à `124:3334`). Ne pas utiliser le logo WhatsApp ni la charte graphique de WhatsApp dans l’illustration de conversation.

Prévisions Cacao & Robusta (v1.9) : aucun asset bitmap, aucune photo de fèves ; mockups à recoder en composants (ou export SVG depuis `146:4045` à `147:4291`). Les maquettes sont des représentations conceptuelles : elles ne copient pas l’interface de production.

SCPB Survey (v2.0) : aucun asset bitmap ; écrans à recoder en composants (ou export SVG depuis `196:4522` à `197:4783`). Pas de photo de planteur ni d’enfant : garder l’emplacement de photo vide ou une icône.

STE-SCPB (v2.1) : dix captures réelles du site en production, intégrées en remplissage d’image (`231:93` à `231:129`), à exporter depuis Figma avec leur légende. Captures mobiles (390 px) de l’accueil, du catalogue et de la demande de devis encore à fournir : emplacements `231:134`, `231:140`, `231:146`, étiquetés comme tels. Ne jamais les remplacer par une maquette recréée présentée comme capture.

Golden Beans SA (v2.2) : 12 captures desktop et 6 vues mobiles réelles, en pleine résolution (1523–1536 px de large), dans les composants `260:5374` à `260:5491` ; à exporter depuis Figma avec leur légende et leur date.

Ninety One Foot Academy (v2.3) : 6 captures desktop et 6 vues mobiles des pages publiques (photos floutées), 7 maquettes conceptuelles MatchLab et administration (données fictives). Si l’académie autorise la réutilisation des photos, remplacer les captures floutées par des versions nettes.

Agora Film Invest (v2.4) : 10 captures desktop, 6 vues mobiles, l’image Open Graph et l’icône réelles du site, en pleine résolution. Affiches, photos et vidéos appartiennent à Agora Film Invest et à leurs ayants droit : à réutiliser seulement dans la limite des droits accordés.

CocoaTrack (v2.6) : aucune capture de l’application (application interne, aucune capture autorisée fournie). Les 9 maquettes conceptuelles portent la mention « Maquette conceptuelle — données fictives ». Si des captures autorisées sont fournies, elles remplaceront les maquettes concernées.

## 12. Contenus à configurer

Ces informations ne figurent volontairement pas dans les maquettes : elles ne doivent pas être inventées. Tant qu’une valeur est vide, le bloc qui l’affiche est masqué (et non rempli par un exemple).

```ts
// src/config/site.ts — toutes les valeurs sont à fournir par ZIIIILO
export const site = {
  contact: {
    email: "",            // adresse de contact affichée + réception du formulaire
    whatsapp: "",         // format international, ex. structure "+XXX XXXXXXXXX"
    phone: "",            // facultatif
    address: "",          // facultatif, seulement si ZIIIILO souhaite l’afficher
  },
  social: { linkedin: "", facebook: "", instagram: "", x: "", github: "" }, // n’afficher que les comptes réels
  legal: {
    companyName: "ZIIIILO SARL",
    registration: "",     // numéro d’immatriculation
    taxId: "",            // identifiant fiscal
    headOffice: "",       // siège social
    publisher: "",        // directeur de la publication
    host: "",             // hébergeur du site
  },
  features: {
    showTeam: false,      // section Équipe de la page À propos
    showEnglish: false,   // publier /en une fois la traduction relue
  },
  form: { budgets: [], timelines: [] }, // fourchettes et délais à valider
};
```

| Élément | Où il apparaît | État actuel dans Figma |
| --- | --- | --- |
| E-mail, WhatsApp | Contact, footer, CTA | « … — à configurer » |
| Réseaux sociaux | Footer | Emplacements à configurer |
| Mentions légales, politique de confidentialité | Footer, consentement du formulaire | Liens présents, pages à rédiger avec les vraies informations juridiques |
| Statuts FleetRent (fonctionnalités) | Solutions, FleetRent, Réalisations | En développement / Prévu — à mettre à jour par ZIIIILO |
| Contenus des 7 autres pages détail service | `/services/[slug]` | Seul « Applications mobiles » est rédigé |
| Membres de l’équipe | À propos | Gabarit vide, section masquée |
| Cas clients, témoignages | Réalisations | Aucun : cartes Gabarit. N’ajouter que des projets réels, avec accord du client |
| Budgets et délais du formulaire | Contact | Non définis |
| Traduction anglaise | Toutes les pages | Non rédigée |
| Photos réelles | À définir | Aucune |
| Nom de domaine, outil de mesure d’audience, service d’envoi d’e-mails | Technique | Non choisis |

Ce qu’il ne faut jamais ajouter sans source fournie par ZIIIILO : chiffres (clients, projets, années d’expérience, satisfaction), logos de clients, certifications, date de création, noms de dirigeants, bureaux, témoignages.

Ajouts v1.3 à fournir ou à valider :

- toutes les étiquettes « À configurer » des pages légales : capital, siège, immatriculation, identifiant fiscal, directeur de la publication, hébergeur, droit applicable, durée de conservation, réglementation de référence, prestataires techniques, localisation des serveurs, mesures de sécurité, date de mise à jour ;
- la relecture juridique des deux pages légales ;
- l’outil de mesure d’audience, s’il y en a un : il conditionne le bandeau cookies ;
- les textes des 7 nouvelles pages de détail service (propositions rédigées, à valider).

DocCloud — à fournir ou à valider :

- le logo définitif (le logotype actuel est provisoire) ;
- les montants éventuels (frais de récupération, récompense du trouveur), après validation juridique ;
- les prestataires de paiement agréés (Mobile Money ou autres) ;
- les points de collecte ou partenaires, s’ils existent ;
- la validation juridique de l’usage de documents officiels et de la facturation de leur restitution ;
- la relecture des textes de la page DocCloud.

* [ ] SCPB Commercial : absent du filtre « Produits ZIIIILO », présent dans « Solutions métiers » et « Intelligence artificielle ».
* [ ] SCPB : aucun chiffre de performance ni nombre de tests affiché.
* [ ] SCPB : mention « maquettes conceptuelles, données fictives » visible près des mockups.
* [ ] SCPB : alerte de conformité présente dans la section Sécurité et fiabilité.
* [ ] SCPB : statut et rôle de ZIIIILO lus depuis les données (`statut`, `roleZiiiilo`), pas codés en dur.

- [ ] StafTrack : présent dans « Solutions métiers » et « Applications web », absent de « Produits ZIIIILO ».
- [ ] StafTrack : alerte « données personnelles » présente dans la section Sécurité et anti-fraude.
- [ ] StafTrack : client affiché « SCPB », avec le logo officiel SCPB dans le bandeau de mentions.

* [ ] Prévisions Cacao & Robusta : présentes dans « Solutions métiers », « Intelligence artificielle » et « Data Science », absentes de « Produits ZIIIILO ».
* [ ] Prévisions : aucun badge « Validé », aucun taux de « précision », aucun gain financier ; « Aucun horizon validé au 20/11/2026 » visible dans le hero et la section 08.
* [ ] Prévisions : avertissement financier présent (section 12) et mention « Maquette conceptuelle — données fictives » sur les visuels.
* [ ] Services 09 et 10 : bouton « Voir le détail du service » masqué tant qu’aucune page de détail n’existe.

- [ ] SCPB Survey : présent dans « Solutions métiers » et « Applications mobiles », absent de « Produits ZIIIILO ».
- [ ] SCPB Survey : statut « Pilote en préparation » ; cartographie « En test », traçabilité des lots et espace auditeur « Maquette », prochaines étapes « À venir — non livré ».
- [ ] SCPB Survey : alerte « Données personnelles et protection de l’enfant » présente ; aucune donnée ni photo d’enfant dans les écrans.

* [ ] STE-SCPB : présent dans « Solutions métiers » et « Applications web », absent de « Produits ZIIIILO ».
* [ ] STE-SCPB : statut « En production » ; « Visiter le site » ouvre https://ste-scpb.com dans un nouvel onglet.
* [ ] STE-SCPB : aucune certification EUDR attribuée au site, aucune garantie juridique de conformité, aucun score, audit ni chiffre de résultat.
* [ ] STE-SCPB : captures réelles légendées ; schéma Sanity marqué « conceptuel » ; emplacements mobiles marqués « à insérer ».
* [ ] CocoaTrack : lien externe uniquement, pas de fiche de réalisation.

- [ ] Golden Beans SA : présent dans « Solutions métiers », « Applications web » et « Intelligence artificielle », absent de « Produits ZIIIILO » ; fiche distincte de STE-SCPB.
- [ ] Golden Beans SA : cours de marché datés, carte marquée « données de démonstration », EUDR présentée comme préparation documentaire, IA avec contrôles et sans promesse d’exactitude.

* [ ] Ninety One Foot Academy : absent de « Produits ZIIIILO » et « Intelligence artificielle » ; statuts réels par volet affichés.
* [ ] Ninety One Foot Academy : aucun visage de joueur net, aucune donnée réelle de mineur ; chaque écran MatchLab porte la mention « Maquette conceptuelle — données fictives ».

- [ ] Agora Film Invest : présent dans « Sites web » et « CreativeTech », absent de « Produits ZIIIILO » ; intervention présentée comme refonte réalisée par ZIIIILO.
- [ ] Filtres v2.4 appliqués en desktop et mobile ; classement des dix projets validé avec le client.

* [ ] CocoaTrack : présent dans « Solutions métiers » et « Data Science », absent de « Produits ZIIIILO » ; tags AgriTech, GeoTech, Traçabilité, Intelligence satellite ; carte et page non publiées sans validation de STE-SCPB.

## 13. Journal des modifications

Ce journal est mis à jour à chaque modification du design. Pour Claude Code : comparer la dernière version implémentée avec la plus récente ci-dessous, puis ne retravailler que les écrans et sections cités.

| Version | Date | Modifications dans Figma | Sections du guide touchées |
| --- | --- | --- | --- |
| v1.0 | 19/11/2026 | Création du site : design system (variables, styles, composants), 8 pages en desktop et mobile (12 + 12 écrans dont les états du formulaire), prototype (3 flux), direction artistique, handoff. | toutes |
| v1.1 | 19/11/2026 | Logo vectorisé et propagé partout ; déclinaisons Symbole et Monochrome blanc ; exports SVG/PNG. Contrastes : `green/600` → `#0E7A50`, texte du badge « Produit ZIIIILO » → `primary-hover`. | §4, §10, §11 |
| v1.2 | 19/11/2026 | Animations de texte en motion native : hero de l’accueil desktop (`11:2`) et mobile (`22:2`). Planche « Animations de texte — Motion » (page 04, section `52:87`). | §2, §3, §8 |
| v1.3 | 19/11/2026 | Animations étendues à toutes les pages, timelines de 20 s. Services mobile en accordéons. 7 pages de détail service. Pages légales, 404, cookies, envoi en cours. Composants : Accordéon/Service, Bouton État=Chargement, Indicateur de chargement, Interrupteur, Squelette, Bandeau et modale cookies. Écrans tablette Accueil et Contact. | §2, §5, §6, §7, §8, §9, §12 |
| v1.4 | 20/11/2026 | Intégration de DocCloud, second produit ZIIIILO : page détail desktop (`90:11552`) et mobile (`92:9403`) ; section « Nos produits » de l’accueil refaite avec deux cartes (desktop, mobile, tablette) ; bloc et carte DocCloud dans Solutions ; projet à la une et carte DocCloud dans Réalisations ; lien DocCloud dans le footer desktop. Univers DocCloud : variables turquoise, logotype provisoire, document fictif, statuts du dossier, 5 mockups conceptuels, composition visuelle, `Carte/Produit vedette`. Navigation et parcours « Découverte DocCloud ». Parcours « Première visite (cookies) » renommé correctement. | §2, §3, §4, §6, §7, §9, §11, §12 |
| v1.5 | 20/11/2026 | Intégration de SCPB Commercial, solution métier réalisée pour l’entreprise SCPB : page « étude de réalisation » desktop (103:11672) et mobile (111:11199), 11 sections et un bandeau de mentions ; section « Nos réalisations » de l’accueil à trois cartes (desktop, mobile, tablette) ; dans Réalisations, projet à la une, carte et nouveaux filtres (Solutions métiers, Intelligence artificielle) ; dans Solutions, section « Des solutions métiers conçues pour des besoins concrets ». Composants : logotype provisoire, 6 mockups conceptuels, Étape/Workflow SCPB (survol), Carte/Réalisation vedette. Parcours « 06 · Découverte SCPB Commercial ». | §2, §3, §4, §6, §7, §9, §11, §12, §13 |
| v1.6 | 20/11/2026 | Logo officiel SCPB intégré à la place de la représentation provisoire : nouveau composant Logo/SCPB (officiel) (118:2995, vecteurs, couleurs d’origine, variante sur plaque blanche) ; lockup Logo/SCPB Commercial reconstruit (logo + nom de la plateforme), propagé aux 6 mockups, aux heros SCPB et aux cartes ; logo client ajouté au bandeau de mentions (desktop et mobile). | §4, §6, §11, §13 |
| v1.7 | 20/11/2026 | Intégration de StafTrack (pointage RH via WhatsApp), solution métier disponible, client à confirmer : page étude de réalisation desktop (126:14817) et mobile (131:14099) ; accueil à 4 cartes groupées Produits ZIIIILO / Solutions métiers (desktop 2 × 2, mobile, tablette 2 × 2) ; projet à la une, carte (Réalisations) et bloc (Solutions). Composants : logotype provisoire, 4 mockups desktop, 2 téléphones, Carte/Résultat de pointage, variantes StafTrack de Carte/Réalisation vedette (desktop passé à 588). Étape/Workflow rendu générique. Parcours « 07 · Découverte StafTrack ». | §2, §3, §4, §6, §7, §9, §11, §12, §13 |
| v1.8 | 20/11/2026 | Client de StafTrack confirmé : SCPB. Mentions « client à confirmer » remplacées sur les pages StafTrack (desktop, mobile), le projet à la une, la carte et les blocs Solutions ; logo officiel SCPB ajouté au bandeau de mentions StafTrack (desktop et mobile). | §2, §3, §7, §12, §13 |
| v1.9 | 20/11/2026 | Intégration de la Plateforme de prévision Cacao & Robusta (solution métier SCPB, en ligne, aucun horizon validé au 20/11/2026) : page étude de réalisation desktop (149:20336) et mobile (157:17634) ; accueil à 5 cartes + tuile « Et votre projet ? » (desktop, mobile, tablette) ; projet à la une, carte et filtres « Data Science » et « SaaS et plateformes » (Réalisations) ; bloc Solutions ; Services 09 « Data Science & Intelligence artificielle » et 10 « Tableaux de bord & Business Intelligence », Service 06 complété (pipelines de données). Composants : identité provisoire, Statut/Prévision, 6 mockups, variantes Prévisions de Carte/Réalisation vedette. Lien externe vers forecast.ste-scpb.com ; parcours « 08 · Découverte Prévisions Cacao & Robusta ». | §2, §3, §4, §6, §7, §9, §11, §12, §13 |
| v2.0 | 21/11/2026 | Intégration de SCPB Survey (application Android de collecte terrain pour SCPB, pilote en préparation) : page étude de réalisation desktop (200:23564) et mobile (204:16328) ; accueil à 6 cartes (Solutions métiers en 2 × 2, tuile « Et votre projet ? » retirée) en desktop, mobile et tablette ; projet à la une et carte (Réalisations) ; bloc Solutions. Composants : identité provisoire, 6 écrans Android conceptuels, variantes SCPB Survey de Carte/Réalisation vedette. Icônes des cartes Prévisions (graphique) et SCPB Survey (téléphone) corrigées dans la grille Réalisations. Parcours « 09 · Découverte SCPB Survey ». | §2, §3, §4, §6, §7, §9, §11, §12, §13 |
| v2.1 | 22/11/2026 | Intégration de STE-SCPB (site web corporate international réalisé par ZIIIILO SARL, en production) : page étude de réalisation en 15 sections desktop (233:23711) et mobile (240:19126) ; bloc « Réalisation à la une » sur l’accueil desktop, mobile et tablette (chapeau passé à sept réalisations) ; projet à la une et carte (Réalisations) ; exemple de réalisation dans le service 01 (Services). Composants : dix captures réelles du site, trois emplacements de captures mobiles, variantes STE-SCPB de Carte/Réalisation vedette. Correction : le lien « Voir la réalisation » de la carte de grille STE-SCPB pointait vers la page SCPB Survey. Parcours « 10 · Découverte STE-SCPB ». | §2, §3, §4, §6, §7, §9, §11, §12, §13 |
| v2.2 | 22/11/2026 | Intégration de Golden Beans SA (plateforme web B2B bilingue, en production) : page étude de réalisation en 15 sections desktop (262:24524) et mobile (266:19740) ; bloc « Nouvelle réalisation client » sur l’accueil desktop, mobile et tablette (chapeau : six réalisations, huit réponses) ; carte Réalisations et projet mobile ; exemple dans le service 06. Composants : 12 captures desktop et 6 vues mobiles réelles en pleine résolution, variantes Golden Beans de Carte/Réalisation vedette. Parcours « 11 · Découverte Golden Beans SA ». | §2, §3, §6, §7, §9, §11, §12, §13 |
| v2.3 | 22/11/2026 | Intégration de Ninety One Foot Academy (site bilingue, espace privé, N91 MatchLab web et mobile V1) : page étude de réalisation en 16 sections desktop (278:25463) et mobile (281:20482) ; bloc d’accueil desktop, mobile et tablette (chapeau : neuf réponses) ; carte Réalisations (grille 3 × 3) et projet mobile ; exemple dans le service 02. Composants : 12 captures publiques (photos floutées), 7 maquettes conceptuelles MatchLab, variantes N91 de Carte/Réalisation vedette. Correctif des boutons coupés des variantes mobiles. Parcours « 12 · Découverte Ninety One Foot Academy ». | §2, §3, §6, §7, §9, §11, §12, §13 |
| v2.4 | 22/11/2026 | Intégration d’Agora Film Invest (modernisation et améliorations d’un site one-page en production) : page étude de réalisation en 16 sections desktop (297:27498) et mobile (300:22316) ; bloc d’accueil desktop, mobile et tablette (chapeau : dix réponses) ; carte Réalisations et projet mobile ; exemple dans le service 05 ; nouveaux filtres du portfolio (Sites web, CreativeTech, SaaS…). Composants : 16 captures réelles, image Open Graph et icône, variantes Agora de Carte/Réalisation vedette. Parcours « 13 · Découverte Agora Film Invest ». | §2, §3, §6, §7, §9, §11, §12, §13 |
| Guide 1.0 | 19/11/2026 | Création de ce guide (§1 à §13). | — |
| Guide 1.1 | 19/11/2026 | Mise à jour pour la v1.3 du design. | §2, §5 à §9, §12, §13 |
| Guide 1.2 | 20/11/2026 | Mise à jour pour la v1.4 (DocCloud). | §2, §3, §4, §6, §7, §9, §11, §12, §13 |
| Guide 1.3 | 20/11/2026 | Mise à jour pour la v1.5 (SCPB Commercial). | §2, §3, §4, §6, §7, §9, §11, §12, §13 |
| Guide 1.4 | 20/11/2026 | Mise à jour pour la v1.6 (logo officiel SCPB). | §4, §6, §11, §13 |
| Guide 1.5 | 20/11/2026 | Mise à jour pour la v1.7 (StafTrack). | §2, §3, §4, §6, §7, §9, §11, §12, §13 |
| Guide 1.6 | 20/11/2026 | Mise à jour pour la v1.8 (client StafTrack : SCPB). | §2, §3, §7, §12, §13 |
| Guide 1.7 | 20/11/2026 | Mise à jour pour la v1.9 (Prévisions Cacao & Robusta, services Data Science & IA et Tableaux de bord & BI). | §2, §3, §4, §6, §7, §9, §11, §12, §13 |
| Guide 1.8 | 21/11/2026 | Mise à jour pour la v2.0 (SCPB Survey). | §2, §3, §4, §6, §7, §9, §11, §12, §13 |
| Guide 1.9 | 22/11/2026 | Mise à jour pour la v2.1 (STE-SCPB). | §2, §3, §4, §6, §7, §9, §11, §12, §13 |
| Guide 2.0 | 22/11/2026 | Mise à jour pour la v2.2 (Golden Beans SA). | §2, §3, §6, §7, §9, §11, §12, §13 |
| Guide 2.1 | 22/11/2026 | Mise à jour pour la v2.3 (Ninety One Foot Academy). | §2, §3, §6, §7, §9, §11, §12, §13 |
| Guide 2.2 | 22/11/2026 | Mise à jour pour la v2.4 (Agora Film Invest, nouveaux filtres). | §2, §3, §6, §7, §9, §11, §12, §13 |
| Guide 2.3 | 22/11/2026 | v2.5 : attribution d’Agora Film Invest corrigée en « refonte réalisée par ZIIIILO » (pages desktop et mobile, badges, section 09, cartes, accueil, tablette, Réalisations, service 05, DS). La mention Fastgraphiste du pied de page public reste signalée comme un fait. | §2, §3, §7, §12, §13 |
| v2.6 | 23/11/2026 | Intégration de CocoaTrack (solution métier interne de STE-SCPB) : planche de 9 maquettes conceptuelles (312:87), variantes de carte vedette, étude détaillée desktop (319:1014) et mobile (325:1796), carte portfolio et projet mobile, exemple dans le service 03. Accueil restructuré (4 mises en avant + composant Carte/Réalisation compacte), anciens blocs archivés. Parcours « 14 · Découverte CocoaTrack ». | Accueil, Réalisations, Services, DS, Prototype |
| Guide 2.4 | 23/11/2026 | Mise à jour pour la v2.6 (CocoaTrack, accueil à 4 mises en avant, règle filtres / tags). | §2, §3, §6, §7, §9, §11, §12, §13 |
| Guide 2.5 | 23/11/2026 | Audit avant développement : vérifications, éléments manquants (bloquants et non bloquants), écrans à ne pas coder, ordre de développement. | §1 bis, §13 |
| v2.7 / Guide 2.6 | 23/11/2026 | Corrections de l’audit : coordonnées réelles (pied de page, Contact, pages légales), Réalisations sans doublon (4 à la une + 7 en grille), état vide masqué, états 07d et 07e du contact mobile, parcours FleetRent mobile, prospect fictif renommé, 8 pages tablette supplémentaires. Captures mobiles STE-SCPB toujours à fournir. | §1 bis, §13 |
| v2.8 / Guide 2.7 | 23/11/2026 | Splash d’ouverture 0 → 100 % (desktop et mobile, 6 étapes, parcours 00), composants Loader/Spinner, barre de progression et squelette de carte ; règles de chargement réel. Contact direct : Téléphone et E-mail. | §8, §9, §13 |
| v2.9 / Guide 2.8 | 23/11/2026 | Splash rallongé (≈ 13,8 s). Nouvelle page « 08 - Animations et micro-interactions » : 13 animations (en-tête compact, barre de lecture, haut de page, anneau du hero, captures inclinées, avant/après, défilement automatique, frise de la méthode, champs, confirmation, bouton d’appel flottant, 404, liens). Composants : Lien/Animé, Effet/Capture inclinée, Comparateur/Avant-après, Effet/Défilement automatique, Bouton flottant/Appeler (ajouté sur 4 écrans mobiles). | §8, §13 |
| v3.0 / Guide 2.9 | 2026-11-23 | 7 animations en boucle (planches 14 à 20, page 08) ; bouton d’appel mobile remplacé par la version qui pulse sur 4 écrans ; indicateur de défilement sur l’accueil desktop ; pages Politique de cookies et CGU (desktop, mobile, tablette) ; liens ajoutés au pied de page et au bandeau cookies. | §8 Animations en boucle, §8 Pages juridiques, §13 |
| Guide 3.0 | 2026-11-23 | Ajout du plan de navigation : arborescence du site, tableau des routes FR / EN avec maquettes, menus (header, menu mobile, footers, barre légale), liens entre les pages, parcours du prototype. Routes anglaises des études harmonisées sous /en/work/. Mentions légales : capital, NIU, directeur de la publication et hébergeurs renseignés. | §3, §9, §9 bis, §1 bis, §13 |

Limites connues : dans le prototype mobile, seul le bouton « Voir le détail » du premier accordéon est relié (Figma ne conserve pas un lien posé sur un calque qui n’existe que dans la variante ouverte) ; l’écran « envoi en cours » n’existe qu’en desktop ; la tablette ne couvre que l’Accueil et le Contact ; les textes des 7 nouvelles pages de détail service restent à valider.

Limites v1.5 (SCPB Commercial) :

- Pas de page tablette SCPB. Seule la grille de l’accueil tablette est mise à jour, et ses cartes n’ont pas de lien.
- Rôle de ZIIIILO, statut et droits du projet à faire confirmer.
- Logo officiel SCPB intégré en v1.6 (fourni par le client).
- Le texte de conformité reste à faire valider juridiquement.
- Les filtres de Réalisations ne filtrent pas dans le prototype (état visuel seulement).
- Les nouvelles sections héritent des animations des composants (en-têtes de section, CTA) ; aucune animation propre à la page n’a été ajoutée.

Limites v1.7 (StafTrack) :

- Logotype StafTrack provisoire.
- Pas de page tablette StafTrack (seule la grille tablette de l’accueil est mise à jour).
- Le cadre légal de la géolocalisation des employés est à faire valider pour chaque entreprise cliente.

Limites v1.9 (Prévisions Cacao & Robusta) :

- Identité visuelle provisoire ; aucune photo de fèves de cacao ou de café.
- Pas de page tablette dédiée (seule la grille tablette de l’accueil est mise à jour).
- Services 09 et 10 sans page de détail ni accès rapide cliquable vers leur section.
- Aucun résultat robusta affiché : son évaluation détaillée reste à compléter.
- Résultats valables au 20/11/2026, à actualiser après la période de test réservée (jusqu’au 29/01/2027).

Limites v2.0 (SCPB Survey) :

- Identité visuelle provisoire ; écrans conceptuels, pas des captures de l’application réelle.
- Pas de page tablette dédiée (seule la grille tablette de l’accueil est mise à jour).
- Statut « Pilote en préparation » à réviser après le pilote ; statuts des modules à mettre à jour au fil des livraisons.

Limites v2.1 (STE-SCPB) :

- Captures mobiles absentes : trois emplacements « Capture mobile à insérer » (accueil, catalogue, demande de devis), dans le hero mobile et sur la planche DS.
- Schéma de gestion de contenu (Sanity) conceptuel, pas une capture du back-office.
- Pas de carte des destinations sur le site : la carte montrée est la carte Mapbox de démonstration de la page CocoaTrack, signalée comme telle.
- Palette STE-SCPB : seul l’or #D4A853 est relevé ; les autres teintes sont indicatives.
- Tablette : pas de page d’étude dédiée ; sur la carte tablette, « Voir le projet » n’a pas de lien (seul « Visiter le site » est actif).

Limites v2.2 (Golden Beans SA) :

- Palette relevée sur les captures, approximative : à confirmer avec la charte officielle.
- Page publique des prix : graphiques TradingView ; l’usage d’ECharts (pile technique) n’est pas visible sur les pages capturées.
- Sanity Studio et workflows n8n non capturés : schémas conceptuels uniquement.
- Tablette : pas de page d’étude ; « Découvrir le projet » sans lien sur la carte tablette.

Limites v2.3 (Ninety One Foot Academy) :

- Espace privé et MatchLab non consultés : écrans MatchLab et administration = maquettes conceptuelles, pas l’interface réelle.
- Photos de joueurs floutées faute d’autorisation de réutilisation confirmée.
- Chiffre de 84 tests automatisés non affiché (non vérifiable à la date de mise à jour).
- Palette N91 relevée sur le site (marine ≈ `#071425`, or ≈ `#C89B2C`, fond `#F7F5EF`, polices Sora et Inter) : utilisée seulement dans les maquettes MatchLab.
- Tablette : pas de page d’étude ; filtre « SportsTech » non ajouté.

Limites v2.4 (Agora Film Invest) :

- Agora Film Invest : la refonte est de ZIIIILO, mais le pied de page public mentionne encore « Site réalisé par Fastgraphiste ». Mettre ce crédit à jour sur le site relève du client (non fait ici).
- Pas de capture tablette ni de capture de l’ancienne version (pas d’avant/après).
- Droits de réutilisation des affiches et photos à confirmer avec Agora Film Invest.
- Classement des projets existants dans les nouveaux filtres : proposition à valider.

Limites v2.6 (CocoaTrack) :

- Statut d’avancement de chaque module à confirmer (annotations internes à mettre à jour).
- Publication de la carte et de l’étude soumise à la validation de STE-SCPB ; la version publique courte n’a pas été créée (choix : une seule page détaillée).
- Le brief listait 9 réalisations sans StafTrack ni SCPB Survey : les deux sont conservées, d’où 11 projets au total.
