import { Link } from "@/i18n/navigation";

/** 404 provisoire (étape 1) : la maquette 75:9346 est codée à l'étape 4. */
export default function NotFound() {
  return (
    <section className="container flex min-h-dvh flex-col items-start justify-center gap-24 py-64">
      <p className="font-mono text-stat text-primary-default">404</p>
      <h1 className="text-h1">Cette page s’est perdue en route.</h1>
      <Link href="/" className="text-text-link underline underline-offset-4 text-label-l">
        Accueil
      </Link>
    </section>
  );
}
