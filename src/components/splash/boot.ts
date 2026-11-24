import { site } from "@/config/site";

/** Clé de session : le splash ne s'affiche qu'à la première visite de la session. */
export const SPLASH_KEY = "ziiiilo-splash-vu";

/** Cookie qui mémorise le choix de consentement (seul cookie déposé, après ce choix). */
export const CONSENT_COOKIE = "ziiiilo-consent";

/**
 * Script inline (dans <head>) : pose `js` sur <html> pour les animations, et `splash-pending`
 * à la première visite de la session sur l'accueil, pour couvrir la page dès le premier rendu.
 * Pose aussi `has-consent` si un choix de cookies existe déjà : le bandeau, rendu côté serveur
 * pour s'afficher dès la première peinture, reste alors masqué sans clignotement.
 */
export function bootScript(locales: readonly string[]) {
  const homes = JSON.stringify(["/", ...locales.map((l) => `/${l}`)]);
  const enabled = site.splash.enabled;
  return `(function(){var h=document.documentElement;h.classList.add('js');try{if(document.cookie.indexOf('${CONSENT_COOKIE}=')>-1)h.classList.add('has-consent');if(${enabled}&&${homes}.indexOf(location.pathname.replace(/\\/$/,'')||'/')>-1&&!sessionStorage.getItem('${SPLASH_KEY}')&&!/[?&]nosplash/.test(location.search))h.classList.add('splash-pending')}catch(e){}})();`;
}
