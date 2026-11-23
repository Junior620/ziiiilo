import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Spinner } from "./Spinner";

/**
 * Bouton ZIIIILO — Figma « Bouton » (4:481) et « Bouton/Sur fond sombre » (4:542).
 * Pilule, L = 56 px / M = 48 px. Survol : fond plus soutenu + flèche décalée de 4 px (200 ms).
 * Rend un lien localisé (`href`), un lien externe (`externalHref`) ou un <button>.
 */
export type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse" | "inverse-outline";
export type ButtonSize = "L" | "M";

type LinkHref = ComponentProps<typeof Link>["href"];

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icône de fin (flèche par défaut) ; `null` pour la masquer. */
  icon?: LucideIcon | null;
  /** Icône de début (ex. téléphone). */
  leadingIcon?: LucideIcon;
  loading?: boolean;
  /** Pleine largeur (CTA mobiles, §5). */
  block?: boolean;
  /** Halo cyan du bouton principal des CTA sombres (6:233). */
  glow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps> & { href?: undefined; externalHref?: undefined };
type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps | "href"> & {
    href: LinkHref;
    externalHref?: undefined;
  };
type ButtonAsExternal = CommonProps &
  Omit<ComponentProps<"a">, keyof CommonProps | "href"> & { externalHref: string; href?: undefined };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsExternal;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary-default text-text-inverse hover:bg-primary-hover",
  secondary: "border border-border-strong bg-surface-default text-text-primary hover:bg-surface-sunken",
  ghost: "text-text-link hover:bg-primary-subtle",
  inverse: "bg-surface-default text-secondary-dark hover:bg-background-muted",
  "inverse-outline":
    "border-(length:--border-strong) border-inverse-outline text-text-inverse hover:bg-inverse-hover",
};

const sizes: Record<ButtonSize, { root: string; icon: number }> = {
  L: { root: "h-56 px-28 text-label-l", icon: 20 },
  M: { root: "h-48 px-22 text-label-m", icon: 18 },
};

export function buttonClasses({
  variant = "primary",
  size = "L",
  block,
  glow,
  className,
}: Pick<CommonProps, "variant" | "size" | "block" | "glow" | "className">) {
  // `hidden tablet:inline-flex` : ne pas poser `inline-flex` de base, qui masquerait `hidden`
  const display = /(^|\s)hidden(\s|$)/.test(className ?? "") ? undefined : "inline-flex";
  return cn(
    "group/button relative shrink-0 items-center justify-center gap-8 whitespace-nowrap rounded-full",
    display,
    "transition-[background-color,color,border-color,transform] duration-200 ease-ui active:scale-98",
    "aria-disabled:pointer-events-none aria-disabled:opacity-40 disabled:pointer-events-none disabled:opacity-40",
    variants[variant],
    sizes[size].root,
    block && "w-full",
    glow && "shadow-glow",
    className,
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "L",
    icon = ArrowRight,
    leadingIcon: Leading,
    loading = false,
    block,
    glow,
    className,
    children,
    ...rest
  } = props;
  const Icon = icon;
  const iconSize = sizes[size].icon;
  const spinnerTone = variant === "primary" || variant === "inverse-outline" ? "inverse" : "brand";

  const content = (
    <>
      {Leading && <Leading aria-hidden size={iconSize} strokeWidth={1.75} />}
      <span>{children}</span>
      {loading ? (
        <Spinner size={iconSize} tone={spinnerTone} label={null} />
      ) : (
        Icon && (
          <Icon
            aria-hidden
            size={iconSize}
            strokeWidth={1.75}
            className="transition-transform duration-200 ease-ui group-hover/button:translate-x-4 group-focus-visible/button:translate-x-4"
          />
        )
      )}
    </>
  );

  const classes = buttonClasses({ variant, size, block, glow, className });

  if ("externalHref" in rest && rest.externalHref) {
    const { externalHref, ...anchor } = rest as ButtonAsExternal;
    return (
      <a href={externalHref} className={classes} {...anchor}>
        {content}
      </a>
    );
  }
  if ("href" in rest && rest.href !== undefined) {
    const { href, ...link } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...link}>
        {content}
      </Link>
    );
  }
  const { type = "button", disabled, ...button } = rest as ButtonAsButton;
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...button}
    >
      {content}
    </button>
  );
}
