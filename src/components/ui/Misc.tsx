import { ChevronRight, CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

/* ——— Squelette (§8, Figma 385:122) : reflet, statique en mouvement réduit ——— */
export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden className={cn("skeleton block rounded-md", className)} />;
}

/* ——— Barre de progression (Figma 385:116) : uniquement avec un pourcentage réel ——— */
export function ProgressBar({
  value,
  label,
  tone = "light",
  className,
}: {
  value: number;
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cn(
        "h-6 w-full overflow-hidden rounded-full",
        tone === "dark" ? "bg-glass-inverse" : "bg-background-muted",
        className,
      )}
    >
      <div
        className="h-full origin-left rounded-full bg-(image:--gradient-reading) transition-transform duration-300 ease-ui"
        style={{ transform: `scaleX(${pct / 100})` }}
      />
    </div>
  );
}

/* ——— Lien/Animé (396:338, §8 n° 13) ——— */
export function AnimatedLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link className={cn("link-animated pb-2", className)} {...props} />;
}
export function AnimatedAnchor({ className, ...props }: ComponentProps<"a">) {
  return <a className={cn("link-animated pb-2", className)} {...props} />;
}

/* ——— Fil d'Ariane ——— */
type Crumb = { label: string; href?: ComponentProps<typeof Link>["href"] };

export function Breadcrumb({
  items,
  label,
  theme = "light",
  className,
}: {
  items: Crumb[];
  label: string;
  theme?: "light" | "dark";
  className?: string;
}) {
  const muted = theme === "dark" ? "text-text-inverse-muted" : "text-text-muted";
  const current = theme === "dark" ? "text-text-inverse" : "text-text-primary";
  return (
    <nav aria-label={label} className={className}>
      <ol className={cn("flex flex-wrap items-center gap-8 text-body-s", muted)}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-8">
              {item.href && !last ? (
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={cn(last && current, "font-medium")}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden size={14} strokeWidth={1.75} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ——— Alerte (10:442) : Succès / Avertissement / Erreur / Info ——— */
export type AlertTone = "success" | "warning" | "error" | "info";

const alertTones = {
  success: {
    box: "border-success-default bg-success-subtle",
    text: "text-success-default",
    Icon: CircleCheck,
  },
  warning: {
    box: "border-warning-default bg-warning-subtle",
    text: "text-warning-default",
    Icon: TriangleAlert,
  },
  error: { box: "border-error-default bg-error-subtle", text: "text-error-default", Icon: CircleAlert },
  info: { box: "border-primary-brand bg-primary-subtle", text: "text-primary-default", Icon: Info },
} as const;

export function Alert({
  tone,
  title,
  children,
  className,
  ...rest
}: {
  tone: AlertTone;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
} & Omit<ComponentProps<"div">, "title">) {
  const { box, text, Icon } = alertTones[tone];
  return (
    <div className={cn("flex items-start gap-12 rounded-md border px-16 py-12", box, className)} {...rest}>
      <Icon aria-hidden size={16} strokeWidth={1.75} className={cn("mt-2 shrink-0", text)} />
      <div className="flex flex-col gap-2">
        <p className={cn("text-label-m", text)}>{title}</p>
        {children && <div className="text-text-secondary text-body-s">{children}</div>}
      </div>
    </div>
  );
}

/* ——— Surtitre avec marque tricolore (6:185) ——— */
export function Eyebrow({
  children,
  theme = "light",
  className,
}: {
  children: ReactNode;
  theme?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-10", className)}>
      <BrandMark />
      <span
        className={cn(
          "text-overline",
          theme === "dark" ? "text-text-accent-on-dark" : "text-primary-default",
        )}
      >
        {children}
      </span>
    </span>
  );
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex shrink-0 gap-3", className)}>
      <span className="h-3 w-10 rounded-xs bg-accent-orange" />
      <span className="h-3 w-10 rounded-xs bg-accent-violet" />
      <span className="h-3 w-10 rounded-xs bg-accent-cyan" />
    </span>
  );
}
