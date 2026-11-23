"use client";

import { ChevronRight, Mail, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { site } from "@/config/site";
import { MAIN_NAV, activeSection } from "@/config/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/**
 * Header flottant — Figma Header/Desktop 5:69, Header/Mobile 5:121, Menu mobile 5:122.
 * Verre clair ; au-delà de 80 px de défilement il se compacte en verre bleu nuit (§8 n° 01).
 * Le lien de la rubrique courante porte `aria-current="page"`.
 */
export function SiteHeader() {
  const t = useTranslations("nav");
  const a11y = useTranslations("a11y");
  const pathname = usePathname();
  const active = activeSection(pathname);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer le menu au changement de page
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  const dark = compact && !open;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "ease-out pointer-events-auto mx-auto flex w-full max-w-[calc(var(--container-max)+var(--space-40))] items-center transition-[padding] duration-250",
          compact
            ? "p-8 desktop:px-20 desktop:pt-12 desktop:pb-8"
            : "p-12 desktop:px-20 desktop:pt-20 desktop:pb-12",
        )}
      >
        <div
          className={cn(
            "relative flex w-full items-center justify-between border shadow-nav [backdrop-filter:var(--glass-nav)]",
            "rounded-xl pr-8 pl-12 desktop:rounded-full desktop:pr-10 desktop:pl-16",
            "ease-out transition-[height,background-color,border-color] duration-250",
            compact ? "h-56 desktop:h-64" : "h-64 desktop:h-72",
            dark
              ? "border-glass-inverse-border bg-glass-nav-compact"
              : "border-glass-nav-border bg-glass-nav",
          )}
        >
          <Link href="/" aria-label={a11y("home")} className="flex shrink-0 rounded-md">
            <span
              className={cn(
                "relative block transition-[width] duration-250",
                compact ? "w-88" : "w-96 desktop:w-112",
              )}
            >
              <Logo
                variant="color"
                width={112}
                priority
                className={cn("h-auto! w-full! transition-opacity duration-250", dark && "opacity-0")}
              />
              <Logo
                variant="white"
                width={112}
                className={cn(
                  "absolute inset-0 h-auto! w-full! transition-opacity duration-250",
                  dark ? "opacity-100" : "opacity-0",
                )}
              />
            </span>
          </Link>

          <nav aria-label={a11y("mainNav")} className="hidden desktop:block">
            <ul className="flex items-center gap-4">
              {MAIN_NAV.map((item) => {
                const isActive = active === item.key;
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group/nav relative flex h-40 items-center rounded-full px-16 font-medium transition-colors duration-200 text-body-s",
                        dark
                          ? isActive
                            ? "bg-glass-inverse text-text-inverse"
                            : "text-text-inverse-muted hover:text-text-inverse"
                          : isActive
                            ? "bg-primary-subtle font-semibold text-text-primary"
                            : "text-text-secondary hover:text-text-primary",
                      )}
                    >
                      {t(item.key)}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-16 bottom-6 h-2 origin-left rounded-full transition-transform duration-200 ease-ui",
                          dark ? "bg-accent-cyan" : "bg-primary-brand",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-8">
            <Button href="/contact" size="M" className="hidden desktop:inline-flex">
              {t("startProject")}
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? a11y("closeMenu") : a11y("openMenu")}
              className={cn(
                "flex size-48 items-center justify-center rounded-full transition-colors duration-200 desktop:hidden",
                open
                  ? "bg-secondary-dark text-text-inverse"
                  : dark
                    ? "bg-glass-inverse text-text-inverse"
                    : "bg-background-muted text-text-primary",
              )}
            >
              {open ? (
                <X aria-hidden size={22} strokeWidth={1.75} />
              ) : (
                <Menu aria-hidden size={22} strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </header>
  );
}

/** Menu mobile plein écran — Figma 5:122 : glissement vertical + fondu, liens en cascade (40 ms). */
function MobileMenu({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: ReturnType<typeof activeSection>;
}) {
  const t = useTranslations("nav");
  const a11y = useTranslations("a11y");
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      // Piège du focus : panneau + bouton de fermeture du header
      const header = panel.current?.closest("header");
      const nodes = Array.from(header?.querySelectorAll<HTMLElement>("a[href],button") ?? []).filter(
        (n) => n.offsetParent !== null,
      );
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="menu-mobile"
          className="pointer-events-auto fixed inset-0 -z-10 overflow-y-auto bg-background-inverse pt-88 pb-40 desktop:hidden"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: reduce ? 0.15 : 0.24, ease: "easeOut" }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute right-[-30%] bottom-[-10%] size-420 rounded-full bg-[radial-gradient(circle,var(--color-primary-brand)_0%,transparent_65%)] opacity-40"
          />
          <nav aria-label={a11y("mainNav")} className="relative px-24 pt-16">
            <ul>
              {MAIN_NAV.map((item, i) => (
                <motion.li
                  key={item.key}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : 0.08 + i * 0.04, duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active === item.key ? "page" : undefined}
                    className={cn(
                      "flex h-64 items-center justify-between border-b border-border-inverse text-h3",
                      active === item.key ? "text-text-accent-on-dark" : "text-text-inverse",
                    )}
                  >
                    {t(item.key)}
                    <ChevronRight aria-hidden size={20} strokeWidth={1.75} />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="relative px-24 pt-32">
            <Button href="/contact" variant="inverse" block onClick={onClose}>
              {t("startProject")}
            </Button>
          </div>
          <div className="relative flex flex-col gap-12 px-24 pt-32">
            <p className="text-overline text-text-inverse-muted">{t("contactDirect")}</p>
            <a
              href={`mailto:${site.contact.email}`}
              className="flex min-h-touch items-center gap-12 text-text-inverse-muted text-body-s hover:text-text-inverse"
            >
              <Mail aria-hidden size={18} strokeWidth={1.75} className="text-accent-cyan" />
              {site.contact.email}
            </a>
            <a
              href={site.contact.phoneHref}
              className="flex min-h-touch items-center gap-12 text-text-inverse-muted text-body-s hover:text-text-inverse"
            >
              <Phone aria-hidden size={18} strokeWidth={1.75} className="text-accent-cyan" />
              {site.contact.phone}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
