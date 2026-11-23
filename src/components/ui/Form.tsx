"use client";

import { Check, ChevronDown, CircleAlert, CircleCheck, type LucideIcon } from "lucide-react";
import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Champs de formulaire — Figma 10:234 : Champ/Texte 10:285, Liste 10:337, Zone de texte 10:366,
 * Case 10:382, Option de choix 10:398. États Défaut / Focus / Erreur / Valide / Désactivé
 * rendus par pseudo-classes et `aria-invalid`. Hauteur 52, rayon md, focus = bordure 2 px + anneau.
 */

type FieldShellProps = {
  label: ReactNode;
  optional?: boolean;
  optionalLabel?: string;
  help?: ReactNode;
  error?: ReactNode;
  valid?: boolean;
  /** Relance du tremblement d'erreur (§8 n° 09) à chaque nouvel envoi. */
  shakeKey?: number;
  className?: string;
};

const controlBase = cn(
  "w-full rounded-md border bg-surface-default text-body-m text-text-primary placeholder:text-text-muted",
  "transition-[border-color,box-shadow] duration-150 ease-ui outline-none",
  "focus-visible:border-2 focus-visible:border-border-focus focus-visible:shadow-focus focus-visible:outline-none",
  "disabled:cursor-not-allowed disabled:bg-background-muted disabled:text-text-muted",
);

function stateBorder(error: boolean, valid: boolean) {
  if (error) return "border-(length:--border-strong) border-error-default";
  if (valid) return "border-success-default";
  return "border-border-input";
}

function FieldShell({
  id,
  label,
  optional,
  optionalLabel = "(facultatif)",
  help,
  error,
  shakeKey,
  className,
  children,
  as: Wrapper = "div",
}: FieldShellProps & { id: string; children: ReactNode; as?: "div" | "fieldset" }) {
  const LabelTag = Wrapper === "fieldset" ? "legend" : "label";
  return (
    <Wrapper className={cn("flex min-w-0 flex-col gap-8", className)}>
      <LabelTag
        {...(LabelTag === "label" ? { htmlFor: id } : {})}
        className="flex items-center gap-6 text-text-primary text-label-m"
      >
        {label}
        {optional && <span className="text-text-muted text-body-s">{optionalLabel}</span>}
      </LabelTag>
      <div key={shakeKey} className={cn(error && shakeKey ? "field-shake" : undefined)}>
        {children}
      </div>
      <div aria-live="polite" id={`${id}-message`}>
        {error ? (
          <p className="flex items-start gap-6 text-error-default text-body-s">
            <CircleAlert aria-hidden size={16} strokeWidth={1.75} className="mt-3 shrink-0" />
            <span>{error}</span>
          </p>
        ) : (
          help && <p className="text-text-muted text-body-s">{help}</p>
        )}
      </div>
    </Wrapper>
  );
}

export function TextField({
  label,
  optional,
  optionalLabel,
  help,
  error,
  valid,
  shakeKey,
  className,
  id: idProp,
  ...input
}: FieldShellProps & Omit<ComponentProps<"input">, "className">) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldShell {...{ id, label, optional, optionalLabel, help, error, shakeKey, className }}>
      <div className="relative">
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-message`}
          className={cn(controlBase, "h-52 px-16", valid && !error && "pr-44", stateBorder(!!error, !!valid))}
          {...input}
        />
        {valid && !error && (
          <CircleCheck
            aria-hidden
            size={20}
            strokeWidth={1.75}
            className="pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 text-success-default"
          />
        )}
      </div>
    </FieldShell>
  );
}

export function TextArea({
  label,
  optional,
  optionalLabel,
  help,
  error,
  valid,
  shakeKey,
  className,
  id: idProp,
  ...textarea
}: FieldShellProps & Omit<ComponentProps<"textarea">, "className">) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldShell {...{ id, label, optional, optionalLabel, help, error, shakeKey, className }}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-message`}
        className={cn(controlBase, "min-h-140 resize-y px-16 py-12", stateBorder(!!error, !!valid))}
        {...textarea}
      />
    </FieldShell>
  );
}

export function Select({
  label,
  optional,
  optionalLabel,
  help,
  error,
  valid,
  shakeKey,
  className,
  id: idProp,
  placeholder,
  options,
  ...select
}: FieldShellProps &
  Omit<ComponentProps<"select">, "className"> & {
    placeholder: string;
    options: readonly { value: string; label: string }[];
  }) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <FieldShell {...{ id, label, optional, optionalLabel, help, error, shakeKey, className }}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-message`}
          className={cn(controlBase, "h-52 appearance-none pr-44 pl-16", stateBorder(!!error, !!valid))}
          {...select}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          size={20}
          strokeWidth={1.75}
          className="pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 text-text-secondary"
        />
      </div>
    </FieldShell>
  );
}

/** Case à cocher — Figma 10:382 (consentement RGPD). */
export function Checkbox({
  label,
  error,
  shakeKey,
  className,
  id: idProp,
  ...input
}: { label: ReactNode; error?: ReactNode; shakeKey?: number; className?: string } & Omit<
  ComponentProps<"input">,
  "type" | "className"
>) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div
        key={shakeKey}
        className={cn("flex items-start gap-12", error && shakeKey ? "field-shake" : undefined)}
      >
        <span className="relative mt-2 inline-flex size-22 shrink-0">
          <input
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={`${id}-message`}
            className={cn(
              "peer size-22 cursor-pointer appearance-none rounded-xs border bg-surface-default",
              "transition-colors duration-150 ease-ui checked:border-primary-default checked:bg-primary-default",
              error ? "border-(length:--border-strong) border-error-default" : "border-border-input",
            )}
            {...input}
          />
          <Check
            aria-hidden
            size={16}
            strokeWidth={2.5}
            className="pointer-events-none absolute inset-0 m-auto text-text-inverse opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
          />
        </span>
        <label htmlFor={id} className="cursor-pointer text-text-secondary text-body-s">
          {label}
        </label>
      </div>
      <div aria-live="polite" id={`${id}-message`}>
        {error && (
          <p className="flex items-start gap-6 text-error-default text-body-s">
            <CircleAlert aria-hidden size={16} strokeWidth={1.75} className="mt-3 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Option de choix — Figma 10:398. Choix multiple du type de projet (§9) :
 * case à cocher native stylisée (le groupe est un fieldset/legend).
 */
export function ChoiceCard({
  label,
  icon: Icon,
  className,
  ...input
}: { label: string; icon: LucideIcon; className?: string } & Omit<
  ComponentProps<"input">,
  "type" | "className"
>) {
  return (
    <label
      className={cn(
        "group relative flex h-60 cursor-pointer items-center gap-12 rounded-md border border-border-input bg-surface-default px-16",
        "transition-[background-color,border-color] duration-150 ease-ui hover:border-primary-brand",
        "has-checked:border-2 has-checked:border-primary-brand has-checked:bg-primary-subtle",
        "has-focus-visible:shadow-focus",
        className,
      )}
    >
      <input type="checkbox" className="peer sr-only" {...input} />
      <Icon
        aria-hidden
        size={20}
        strokeWidth={1.75}
        className="shrink-0 text-text-secondary peer-checked:text-primary-default"
      />
      <span className="flex-1 text-text-primary text-label-m peer-checked:text-primary-default">{label}</span>
      <span
        aria-hidden
        className="flex size-20 shrink-0 scale-0 items-center justify-center rounded-full bg-primary-default text-text-inverse transition-transform duration-150 ease-ui peer-checked:scale-100"
      >
        <Check size={14} strokeWidth={2.5} />
      </span>
    </label>
  );
}

export function FieldGroup({
  legend,
  error,
  shakeKey,
  children,
  className,
  id,
}: {
  legend: ReactNode;
  error?: ReactNode;
  shakeKey?: number;
  children: ReactNode;
  className?: string;
  id: string;
}) {
  return (
    <fieldset
      aria-describedby={`${id}-message`}
      aria-invalid={error ? true : undefined}
      className={cn("flex min-w-0 flex-col gap-12", className)}
    >
      <legend className="mb-12 text-text-primary text-label-m">{legend}</legend>
      <div key={shakeKey} className={cn(error && shakeKey ? "field-shake" : undefined)}>
        {children}
      </div>
      <div aria-live="polite" id={`${id}-message`}>
        {error && (
          <p className="flex items-start gap-6 text-error-default text-body-s">
            <CircleAlert aria-hidden size={16} strokeWidth={1.75} className="mt-3 shrink-0" />
            <span>{error}</span>
          </p>
        )}
      </div>
    </fieldset>
  );
}
