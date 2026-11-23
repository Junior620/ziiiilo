"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Compass,
  Globe,
  Layers,
  MoreHorizontal,
  RefreshCw,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Checkbox, ChoiceCard, FieldGroup, Select, TextArea, TextField } from "@/components/ui/Form";
import { Dialog } from "@/components/ui/Interactive";
import { Alert } from "@/components/ui/Misc";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import {
  contactSchema,
  hasBudgets,
  hasTimelines,
  PROJECT_TYPES,
  SERVICE_TO_PROJECT_TYPE,
  type ContactData,
  type ContactInput,
  type ProjectType,
} from "@/lib/contact";

const TYPE_ICONS: Record<ProjectType, LucideIcon> = {
  web: Globe,
  mobile: Smartphone,
  software: Layers,
  transformation: RefreshCw,
  automation: Workflow,
  consulting: Compass,
  other: MoreHorizontal,
};

type ErrorKey = "name" | "email" | "phone" | "projectTypes" | "timeline" | "message" | "consent";
type SendError = "network" | "rateLimit" | null;

const EMPTY: ContactInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectTypes: [],
  budget: "",
  timeline: "",
  message: "",
  consent: false as unknown as true,
  website: "",
};

/**
 * Formulaire de contact — Figma 19:4221 (états : erreurs 21:4498, rempli 21:4759, envoi 76:17467,
 * confirmation 21:5009 ; mobile 25:3462). react-hook-form + zod (`mode: "onTouched"`), alerte
 * `role="alert"` et focus sur le premier champ en erreur, bouton en chargement pendant l'envoi,
 * saisie conservée en cas d'échec, modale de confirmation puis formulaire réinitialisé.
 * Budget et délai masqués tant que leurs listes ne sont pas validées (`site.form`).
 */
export function ContactForm() {
  const t = useTranslations("contact");
  const uid = useId();
  const [attempt, setAttempt] = useState(0);
  const [sendError, setSendError] = useState<SendError>(null);
  const [success, setSuccess] = useState(false);
  const successTitle = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<ContactInput, unknown, ContactData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: EMPTY,
  });

  // « Demander un devis » depuis une page service : type de projet présélectionné.
  useEffect(() => {
    const service = new URLSearchParams(window.location.search).get("service");
    const type = service ? SERVICE_TO_PROJECT_TYPE[service] : undefined;
    if (type) setValue("projectTypes", [type]);
  }, [setValue]);

  const hasErrors = Object.keys(errors).length > 0;
  const err = (key: ErrorKey) => (errors[key] ? t(`form.errors.${key}`) : undefined);
  const shake = attempt;

  const onSubmit = async (data: ContactData) => {
    setSendError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        reset(EMPTY);
        setSuccess(true);
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string; fields?: string[] };
      if (res.status === 400 && body.fields?.length) {
        body.fields.forEach((field, i) =>
          setError(field as ErrorKey, { type: "server" }, { shouldFocus: i === 0 }),
        );
        setAttempt((n) => n + 1);
        return;
      }
      setSendError(res.status === 429 ? "rateLimit" : "network");
    } catch {
      setSendError("network");
    }
  };

  const onInvalid = () => {
    setAttempt((n) => n + 1);
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        aria-labelledby={`${uid}-title`}
        className="flex flex-col gap-20 tablet:gap-24"
      >
        <div className="flex flex-col gap-8">
          <h2 id={`${uid}-title`} className="hidden text-text-primary text-h3 tablet:block">
            {t("form.title")}
          </h2>
          <p className="text-text-secondary text-body-s">{t("form.required")}</p>
        </div>

        {hasErrors && submitCount > 0 && (
          <div>
            <Alert tone="error" role="alert" title={t("form.errors.summaryTitle")}>
              {t("form.errors.summaryText")}
            </Alert>
          </div>
        )}

        <div className="grid gap-20 tablet:grid-cols-2">
          <TextField
            label={t("form.name.label")}
            placeholder={t("form.name.placeholder")}
            autoComplete="name"
            error={err("name")}
            shakeKey={shake}
            {...register("name")}
          />
          <TextField
            label={t("form.company.label")}
            optional
            optionalLabel={t("form.optional")}
            placeholder={t("form.company.placeholder")}
            autoComplete="organization"
            {...register("company")}
          />
          <TextField
            type="email"
            label={t("form.email.label")}
            placeholder={t("form.email.placeholder")}
            autoComplete="email"
            inputMode="email"
            error={err("email")}
            shakeKey={shake}
            {...register("email")}
          />
          <TextField
            type="tel"
            label={t("form.phone.label")}
            optional
            optionalLabel={t("form.optional")}
            placeholder={t("form.phone.placeholder")}
            autoComplete="tel"
            error={err("phone")}
            shakeKey={shake}
            {...register("phone")}
          />
        </div>

        <FieldGroup
          id={`${uid}-types`}
          legend={t("form.projectTypes.legend")}
          error={err("projectTypes")}
          shakeKey={shake}
        >
          <div className="grid gap-8 tablet:grid-cols-2 tablet:gap-12 desktop:grid-cols-3">
            {PROJECT_TYPES.map((type) => (
              <ChoiceCard
                key={type}
                value={type}
                icon={TYPE_ICONS[type]}
                label={t(`form.projectTypes.options.${type}`)}
                className="max-tablet:h-52"
                {...register("projectTypes")}
              />
            ))}
          </div>
        </FieldGroup>

        {(hasBudgets || hasTimelines) && (
          <div className="grid gap-20 tablet:grid-cols-2">
            {hasBudgets && (
              <Select
                label={t("form.budget.label")}
                optional
                optionalLabel={t("form.optional")}
                placeholder={t("form.budget.placeholder")}
                options={site.form.budgets.map((b) => ({ value: b, label: b }))}
                {...register("budget")}
              />
            )}
            {hasTimelines && (
              <Select
                label={t("form.timeline.label")}
                placeholder={t("form.timeline.placeholder")}
                options={site.form.timelines.map((d) => ({ value: d, label: d }))}
                error={err("timeline")}
                shakeKey={shake}
                {...register("timeline")}
              />
            )}
          </div>
        )}

        <TextArea
          label={t("form.message.label")}
          placeholder={t("form.message.placeholder")}
          help={t("form.message.help")}
          rows={5}
          error={err("message")}
          shakeKey={shake}
          {...register("message")}
        />

        {/* Champ piège : hors écran, ignoré par les lecteurs d'écran et la navigation clavier. */}
        <div aria-hidden className="absolute -left-[625rem] size-1 overflow-hidden">
          <label>
            {t("form.honeypot")}
            <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </label>
        </div>

        <Checkbox
          label={
            <>
              {t("form.consent.before")}
              <Link href="/confidentialite" className="text-text-link underline underline-offset-2">
                {t("form.consent.link")}
              </Link>
              {t("form.consent.after")}
            </>
          }
          error={err("consent")}
          shakeKey={shake}
          {...register("consent")}
        />

        {sendError && (
          <Alert tone="error" role="alert" title={t("form.errors.summaryTitle")}>
            {t(`form.errors.${sendError}`, { email: site.contact.email })}
          </Alert>
        )}

        <Button type="submit" block loading={isSubmitting} disabled={isSubmitting}>
          {isSubmitting ? t("form.sending") : t("form.submit")}
        </Button>
      </form>

      <Dialog
        open={success}
        onClose={() => setSuccess(false)}
        labelledBy={`${uid}-success`}
        closeLabel={t("success.close")}
        initialFocus={successTitle}
      >
        <div className="flex flex-col items-center gap-16 pt-16 text-center">
          <span
            aria-hidden
            className="flex size-72 items-center justify-center rounded-full bg-success-subtle text-success-default"
          >
            <svg viewBox="0 0 24 24" className="size-36" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12.5l4.5 4.5L19 7.5" className="success-check" />
            </svg>
          </span>
          <h2
            id={`${uid}-success`}
            ref={successTitle}
            tabIndex={-1}
            className="text-text-primary outline-none text-h3"
          >
            {t("success.title")}
          </h2>
          <p className="text-text-secondary text-body-m">{t("success.text")}</p>
          <div className="flex w-full flex-col gap-12 pt-8 tablet:flex-row tablet:justify-center">
            <Button href="/" variant="secondary" icon={null} className="w-full tablet:w-auto">
              {t("success.home")}
            </Button>
            <Button href="/solutions" className="w-full tablet:w-auto">
              {t("success.solutions")}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
