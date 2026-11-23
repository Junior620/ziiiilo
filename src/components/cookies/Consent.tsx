"use client";

import { useTranslations } from "next-intl";
import { createContext, useCallback, useContext, useEffect, useId, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog, Switch } from "@/components/ui/Interactive";
import { isConfigured, site } from "@/config/site";
import { Link } from "@/i18n/navigation";

/**
 * Consentement aux cookies (§8 v3.0, §9 bis) — bandeau 74:748 et modale 74:813.
 * Aucun cookie n'est déposé avant un choix explicite ; le seul cookie écrit ensuite
 * est celui qui mémorise ce choix. Aucun outil de mesure n'est chargé tant que
 * `legal.analyticsTool` n'est pas configuré.
 */
type Consent = { analytics: boolean; date: string };

const COOKIE = "ziiiilo-consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 6 mois

function readConsent(): Consent | null {
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE}=`));
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw.slice(COOKIE.length + 1))) as Consent;
  } catch {
    return null;
  }
}

function writeConsent(consent: Consent) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
}

type Ctx = { consent: Consent | null; openPreferences: () => void };
const ConsentContext = createContext<Ctx>({ consent: null, openPreferences: () => {} });

export const useConsent = () => useContext(ConsentContext);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);

  useEffect(() => {
    // Lecture d'un état externe (cookie) au montage, impossible côté serveur.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(readConsent());
    setReady(true);
  }, []);

  const save = useCallback((analytics: boolean) => {
    const next = { analytics, date: new Date().toISOString() };
    writeConsent(next);
    setConsent(next);
    setPrefsOpen(false);
  }, []);

  const openPreferences = useCallback(() => setPrefsOpen(true), []);

  return (
    <ConsentContext.Provider value={{ consent, openPreferences }}>
      {children}
      {ready && !consent && !prefsOpen && (
        <CookieBanner
          onAccept={() => save(true)}
          onReject={() => save(false)}
          onCustomize={openPreferences}
        />
      )}
      <CookiePreferences
        open={prefsOpen}
        initial={consent?.analytics ?? false}
        onClose={() => setPrefsOpen(false)}
        onSave={save}
      />
    </ConsentContext.Provider>
  );
}

function CookieBanner({
  onAccept,
  onReject,
  onCustomize,
}: {
  onAccept: () => void;
  onReject: () => void;
  onCustomize: () => void;
}) {
  const t = useTranslations("cookies");
  const titleId = useId();
  return (
    <section
      aria-labelledby={titleId}
      className="fixed inset-x-16 bottom-16 z-50 mx-auto flex max-w-[65rem] flex-col gap-16 rounded-lg border border-border-default bg-surface-default p-20 shadow-lg tablet:flex-row tablet:items-center tablet:gap-32 tablet:p-24"
    >
      <div className="flex flex-1 flex-col gap-6">
        <h2 id={titleId} className="text-text-primary text-label-l">
          {t("bannerTitle")}
        </h2>
        <p className="text-text-secondary text-body-s">{t("bannerText")}</p>
        <Link href="/politique-cookies" className="w-fit text-text-link text-label-m hover:underline">
          {t("policyLink")}
        </Link>
      </div>
      {/* « Tout refuser » et « Tout accepter » au même niveau visuel (74:748) */}
      <div className="flex flex-col gap-10 tablet:flex-row tablet:items-center tablet:gap-12">
        <Button variant="ghost" size="M" icon={null} onClick={onCustomize} className="order-3 tablet:order-1">
          {t("customize")}
        </Button>
        <Button variant="secondary" size="M" icon={null} onClick={onReject} className="order-2">
          {t("rejectAll")}
        </Button>
        <Button
          variant="secondary"
          size="M"
          icon={null}
          onClick={onAccept}
          className="order-1 tablet:order-3"
        >
          {t("acceptAll")}
        </Button>
      </div>
    </section>
  );
}

function CookiePreferences({
  open,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  initial: boolean;
  onClose: () => void;
  onSave: (analytics: boolean) => void;
}) {
  const t = useTranslations("cookies");
  const a11y = useTranslations("a11y");
  const titleId = useId();
  const [analytics, setAnalytics] = useState(initial);
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setAnalytics(initial);
  }
  const tool = isConfigured(site.legal.analyticsTool) ? site.legal.analyticsTool : t("toConfigure");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      closeLabel={a11y("close")}
      widthClass="max-w-560"
      className="tablet:p-32"
    >
      <div className="flex flex-col gap-20">
        <h2 id={titleId} className="pr-48 text-h4 text-text-primary">
          {t("prefsTitle")}
        </h2>
        <p className="text-text-secondary text-body-s">{t("prefsText")}</p>
        <Category title={t("necessaryTitle")} text={t("necessaryText")}>
          <Switch checked locked label={t("necessaryTitle")} />
        </Category>
        <Category title={t("analyticsTitle")} text={t("analyticsText", { tool })}>
          <Switch checked={analytics} onChange={setAnalytics} label={t("analyticsTitle")} />
        </Category>
        <div className="flex flex-col gap-12 tablet:flex-row tablet:justify-end">
          <Button
            variant="secondary"
            size="M"
            icon={null}
            onClick={() => onSave(false)}
            className="order-2 tablet:order-1"
          >
            {t("rejectAll")}
          </Button>
          <Button size="M" icon={null} onClick={() => onSave(analytics)} className="order-1 tablet:order-2">
            {t("save")}
          </Button>
        </div>
        <Link
          href="/confidentialite"
          onClick={onClose}
          className="w-fit text-text-link text-label-m hover:underline"
        >
          {t("privacyLink")}
        </Link>
      </div>
    </Dialog>
  );
}

function Category({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-16 rounded-md border border-border-default p-16">
      <div className="flex flex-1 flex-col gap-4">
        <p className="text-text-primary text-label-m">{title}</p>
        <p className="text-text-secondary text-body-s">{text}</p>
      </div>
      {children}
    </div>
  );
}
