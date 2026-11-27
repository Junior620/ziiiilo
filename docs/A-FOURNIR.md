# Ce que ZIIIILO doit fournir ou valider

État au 26/11/2026, site https://ziiiilo.tech. Sources : `src/config/site.ts`, `.env.example`, `docs/DESIGN.md` (§1 bis, §11, §12, limites par version).

Règle du projet : aucune valeur n’est inventée. Tant qu’un champ reste vide, le bloc qui l’affiche est masqué ou porte l’étiquette « À configurer ». Il suffit de renseigner la valeur au bon endroit (colonne « Où ») pour que le bloc apparaisse.

## 1. Bloquant avant la mise en ligne officielle

| # | Élément | Où | État |
| --- | --- | --- | --- |
| 1 | Numéro RCCM complet (préfixe connu : RC/DLA/2023/B/) | `site.legal.rccm` | Vide |
| 2 | Fonction du directeur de la publication (DJOUNDA NGAPGHO MOMO Christian) | `site.legal.publisherRole` | Vide |
| 3 | Droit applicable | `site.legal.governingLaw` | Vide |
| 4 | Durées de conservation des données (demandes de contact, cookie de consentement…) | `site.legal.retention` | Vide |
| 5 | Service d’envoi d’e-mails retenu (Resend proposé) | `site.legal.emailService` | Vide |
| 6 | Outil de mesure d’audience, s’il y en a un : il conditionne le bandeau cookies | `site.legal.analyticsTool` | Vide, aucun outil chargé |
| 7 | Date de mise à jour des pages légales | `site.legal.updatedAt` | Vide |
| 8 | Relecture juridique : mentions légales, confidentialité, politique de cookies, CGU | Pages légales | Non faite |
| 9 | Formulaire de contact : clé Resend et adresse d’expédition sur un domaine vérifié (DNS dans Cloudflare) | Variables Vercel `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` | À vérifier sur Vercel |
| 10 | Accord de STE-SCPB pour publier CocoaTrack (page et cartes) | `site.publication.cocoatrack` (`false` masque tout) | Publié en attendant l’accord |

## 2. Coordonnées et présence en ligne

- **WhatsApp** : numéro, seulement s’il diffère du téléphone (+237 695 607 089). Où : `site.contact.whatsapp`.
- **Réseaux sociaux** : URL réelles de LinkedIn, Facebook et Instagram. Où : `site.social`. Le footer n’affiche que les comptes renseignés.
- **Site officiel de FleetRent** : URL, pour activer le bouton « Visiter le site ». Où : `site.products.fleetrentUrl`.
- **Limite de débit du formulaire** (recommandé) : base Upstash Redis. Où : variables `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN`. Sans elles, une limite en mémoire s’applique.

## 3. Formulaire de contact

- **Fourchettes de budget** : sans elles, le champ budget reste masqué. Où : `site.form.budgets`.
- **Délais proposés** : le champ est signalé « à configurer ». Où : `site.form.timelines`.
- **Messages d’erreur du formulaire** : marqués « à confirmer » dans le guide (§9).

## 4. Contenus à valider

- **Pages de détail des services** : les textes des 7 pages autres que « Applications mobiles » sont des propositions rédigées, à relire.
- **Services 09 (Data Science & IA) et 10 (Tableaux de bord & BI)** : pas de page de détail ; le bouton « Voir le détail » est masqué. Il faut fournir les contenus pour créer ces pages, ou confirmer qu’elles n’existeront pas.
- **FleetRent** : statuts des fonctionnalités (« En développement » / « Prévu ») à mettre à jour.
- **SCPB Commercial** : rôle de ZIIIILO et statut du projet. La page affiche « à confirmer » (`src/data/realisations.ts`). Le texte de conformité est aussi à faire valider juridiquement.
- **CocoaTrack** : statut d’avancement de chaque module.
- **SCPB Survey** : statut « Pilote en préparation », à réviser après le pilote.
- **Prévisions Cacao & Robusta** :
  - résultats valables au 20/11/2026, à actualiser après la période de test (jusqu’au 29/01/2027) ;
  - évaluation robusta à compléter.
- **StafTrack** : cadre légal de la géolocalisation des employés, à valider pour chaque entreprise cliente.
- **Classement du portfolio** : catégories des projets dans les filtres de Réalisations (proposition à valider).
- **DocCloud** :
  - montants (frais de récupération, récompense du trouveur) ;
  - prestataires de paiement agréés ;
  - points de collecte ou partenaires ;
  - validation juridique de l’usage de documents officiels ;
  - relecture de la page.

## 5. Visuels et droits

- **Logos définitifs** de DocCloud, StafTrack, Prévisions Cacao & Robusta et SCPB Survey : les logotypes actuels sont provisoires.
- **STE-SCPB** : 3 captures mobiles (accueil, catalogue, demande de devis), à prendre sur téléphone (390 px). Elles ne sont pas affichées pour l’instant.
- **Ninety One Foot Academy** : autorisation de réutiliser les photos des joueurs. Sans elle, les captures restent floutées.
- **Agora Film Invest** :
  - droits de réutilisation des affiches et photos ;
  - captures de l’ancien site, s’il en existe, pour un avant/après (non montré faute de captures) ;
  - la mention Fastgraphiste du pied de page public reste visible dans les captures, non retouchées ; sa mise à jour relève du client.
- **Golden Beans SA** : charte officielle, pour confirmer la palette relevée sur les captures.
- **CocoaTrack** : captures autorisées de l’application, si STE-SCPB en fournit. Elles remplaceraient les maquettes conceptuelles.
- **Photos réelles** (équipe, écrans réels de FleetRent) : aucune pour l’instant.

## 6. À propos et version anglaise

- **Équipe** : noms, fonctions et photos des membres, avec leur accord. La section reste masquée jusque-là (`site.features.showTeam`).
- **Version anglaise** : relecture de la traduction. `/en` est masqué (`site.features.showEnglish`). À ce jour, seule la navigation est traduite.

## 7. À ne jamais ajouter sans source fournie par ZIIIILO

Ne jamais ajouter sans source :

- chiffres (clients, projets, années d’expérience, satisfaction) ;
- logos de clients ;
- certifications ;
- date de création ;
- témoignages ;
- noms de dirigeants ;
- bureaux ;
- scores Lighthouse ou SLA.
