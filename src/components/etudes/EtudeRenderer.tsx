import { ArrowRight, Check, ChevronRight, Info, TriangleAlert, X } from "lucide-react";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/Logo";
import { CtaSection } from "@/components/layout/CtaSection";
import { ReadingProgress } from "@/components/layout/PageAids";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal } from "@/components/motion/text";
import { CheckList, ProductHero } from "@/components/produits/parts";
import { Button } from "@/components/ui/Button";
import { IconTile } from "@/components/ui/IconTile";
import { Breadcrumb } from "@/components/ui/Misc";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { icon } from "./icons";
import type {
  Block,
  CardItem,
  ContentSection,
  EtudeContent,
  EtudeImage,
  EtudeLink,
  EtudeSection,
  HeroSection,
  MentionsSection,
} from "./types";

type Href = ComponentProps<typeof Link>["href"];
type Ctx = { dark: boolean };

/** `/realisations/<slug>` → route typée ; les autres chemins sont des routes statiques. */
function internalHref(href: string): Href {
  const m = href.match(/^\/realisations\/([^/?#]+)$/);
  if (m) return { pathname: "/realisations/[slug]", params: { slug: m[1] } };
  return href as Href;
}

function LinkButton({
  link,
  variant,
  className,
  icon: Icon,
}: {
  link: EtudeLink;
  variant: ComponentProps<typeof Button>["variant"];
  className?: string;
  icon?: null;
}) {
  if (link.href.startsWith("#") || link.href.startsWith("http")) {
    const external = link.href.startsWith("http");
    return (
      <Button
        externalHref={link.href}
        variant={variant}
        icon={Icon}
        aria-label={link.ariaLabel}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {link.label}
      </Button>
    );
  }
  return (
    <Button href={internalHref(link.href)} variant={variant} icon={Icon} className={className}>
      {link.label}
    </Button>
  );
}

/* ——— Visuels ——— */

function Visual({ image, priority, sizes }: { image: EtudeImage; priority?: boolean; sizes?: string }) {
  const fixed = image.display;
  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      unoptimized={image.src.endsWith(".svg")}
      sizes={fixed ? `${fixed.width}px` : (sizes ?? "(min-width: 75rem) 1200px, 100vw")}
      style={fixed ? { width: fixed.width, height: fixed.height } : undefined}
      className={cn(
        "h-auto",
        !fixed && "w-full",
        image.rounded !== false && !fixed && "rounded-lg",
        image.fade && "[mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)]",
        image.mobile && "max-tablet:hidden",
      )}
    />
  );
  return (
    <>
      {img}
      {image.mobile && (
        <Image
          src={image.mobile.src}
          alt={image.mobile.alt ?? image.alt}
          width={image.mobile.width}
          height={image.mobile.height}
          priority={priority}
          sizes="(min-width: 48rem) 1px, 100vw"
          className={cn("h-auto w-full tablet:hidden", image.rounded !== false && "rounded-lg")}
        />
      )}
    </>
  );
}

function Figure({ image, dark }: { image: EtudeImage; dark: boolean }) {
  return (
    <Reveal
      as="div"
      distance={24}
      className={cn("flex flex-col gap-16", image.desktopOnly && "max-tablet:hidden")}
    >
      <figure className="flex flex-col gap-16">
        <Visual image={image} />
        {image.caption && (
          <figcaption className={cn("text-body-s", dark ? "text-text-inverse-muted" : "text-text-secondary")}>
            {image.caption}
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

/* ——— Blocs ——— */

const COLS: Record<number, string> = {
  1: "",
  2: "tablet:grid-cols-2",
  3: "tablet:grid-cols-2 desktop:grid-cols-3",
  4: "tablet:grid-cols-2 desktop:grid-cols-4",
  5: "tablet:grid-cols-2 desktop:grid-cols-5",
  6: "tablet:grid-cols-3 desktop:grid-cols-6",
};

function Card({ item, ctx, style }: { item: CardItem; ctx: Ctx; style: "card" | "plain" }) {
  const { dark } = ctx;
  return (
    <div
      className={cn(
        "relative flex h-full flex-col gap-16",
        style === "card" && "rounded-lg border p-24",
        style === "card" &&
          (dark ? "border-glass-card-border bg-glass-card" : "border-border-default bg-surface-default"),
        item.dashed && "border-dashed",
        item.highlight && (dark ? "border-accent-cyan" : "border-primary-brand shadow-md"),
      )}
    >
      {item.highlight && (
        <span className="w-fit rounded-full bg-primary-default px-10 py-4 text-text-inverse text-label-s">
          {item.highlight}
        </span>
      )}
      {(item.icon || item.number || item.badge) && (
        <div className="flex items-center justify-between gap-12">
          <span className="flex items-center gap-12">
            {item.icon && <IconTile icon={icon(item.icon)} tone={dark ? "glass" : "blue"} size="M" />}
            {item.number && (
              <span
                aria-hidden
                className={cn("font-mono text-label-m", dark ? "text-accent-cyan" : "text-primary-default")}
              >
                {item.number}
              </span>
            )}
          </span>
          {item.badge && <StatusBadge tone={item.badge.tone}>{item.badge.label}</StatusBadge>}
        </div>
      )}
      <div className="flex flex-col gap-8">
        {item.label && (
          <p className={cn("text-overline", dark ? "text-text-accent-on-dark" : "text-primary-default")}>
            {item.label}
          </p>
        )}
        <h3 className={cn("text-h5", dark ? "text-text-inverse" : "text-text-primary")}>
          {item.number && <span className="sr-only">{item.number}. </span>}
          {item.title}
        </h3>
        {item.text && (
          <p className={cn("text-body-s", dark ? "text-text-inverse-muted" : "text-text-secondary")}>
            {item.text}
          </p>
        )}
      </div>
      {item.chips && <Chips items={item.chips} dark={dark} />}
      {item.points && <CheckList items={item.points} dark={dark} />}
      {item.link && (
        <LinkButton link={item.link} variant={dark ? "inverse-outline" : "ghost"} className="mt-auto w-fit" />
      )}
    </div>
  );
}

function Chips({ items, dark, label }: { items: string[]; dark: boolean; label?: string }) {
  return (
    <div className="flex flex-col gap-12">
      {label && (
        <p className={cn("text-overline", dark ? "text-text-accent-on-dark" : "text-primary-default")}>
          {label}
        </p>
      )}
      <ul className="flex flex-wrap gap-8">
        {items.map((chip) => (
          <li
            key={chip}
            className={cn(
              "rounded-full border px-12 py-6 text-label-s",
              dark
                ? "border-inverse-line bg-secondary-dark text-text-inverse"
                : "border-border-default bg-background-subtle text-text-primary",
            )}
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Compare({ columns, ctx }: { columns: Extract<Block, { type: "compare" }>["columns"]; ctx: Ctx }) {
  return (
    <div className="grid gap-16 desktop:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] desktop:items-center desktop:gap-24">
      {columns.map((col, i) => (
        <FragmentWithArrow key={col.title} arrow={i === 1}>
          <Reveal
            delay={i * 120}
            className={cn(
              "flex h-full flex-col gap-20 rounded-xl border p-24 tablet:p-32",
              col.positive
                ? ctx.dark
                  ? "border-accent-cyan bg-glass-card"
                  : "border-primary-brand bg-surface-default shadow-md"
                : ctx.dark
                  ? "border-glass-card-border bg-glass-card"
                  : "border-border-default bg-background-muted",
            )}
          >
            <StatusBadge tone={col.positive ? "product" : "neutral"}>{col.label}</StatusBadge>
            <h3 className={cn("text-h4", ctx.dark ? "text-text-inverse" : "text-text-primary")}>
              {col.title}
            </h3>
            <ul className="flex flex-col gap-16">
              {col.items.map((item) => (
                <li key={item.title} className="flex items-start gap-12">
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-28 shrink-0 items-center justify-center rounded-full",
                      col.positive
                        ? "bg-primary-subtle text-primary-default"
                        : "bg-error-subtle text-error-default",
                    )}
                  >
                    {col.positive ? <Check size={16} strokeWidth={2} /> : <X size={16} strokeWidth={2} />}
                  </span>
                  <span className="flex flex-col gap-4">
                    <span
                      className={cn("text-label-l", ctx.dark ? "text-text-inverse" : "text-text-primary")}
                    >
                      {item.title}
                    </span>
                    {item.text && (
                      <span
                        className={cn(
                          "text-body-s",
                          ctx.dark ? "text-text-inverse-muted" : "text-text-secondary",
                        )}
                      >
                        {item.text}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </FragmentWithArrow>
      ))}
    </div>
  );
}

function FragmentWithArrow({ arrow, children }: { arrow: boolean; children: ReactNode }) {
  return (
    <>
      {arrow && (
        <span
          aria-hidden
          className="mx-auto flex size-48 rotate-90 items-center justify-center rounded-full bg-primary-default text-text-inverse desktop:size-56 desktop:rotate-0"
        >
          <ArrowRight size={22} strokeWidth={1.75} />
        </span>
      )}
      {children}
    </>
  );
}

function Steps({
  items,
  ctx,
  columns,
  compact,
}: {
  items: CardItem[];
  ctx: Ctx;
  columns?: number;
  compact?: boolean;
}) {
  const n = columns ?? items.length;
  return (
    <ol
      className={cn(
        "grid gap-16",
        compact && "max-tablet:grid-cols-2 max-tablet:gap-12",
        COLS[Math.min(n, 6)],
      )}
    >
      {items.map((item, i) => {
        const number = item.number ?? String(i + 1).padStart(2, "0");
        return (
          <Reveal as="li" key={item.title} delay={(i % 6) * 80} className="flex">
            <div
              className={cn(
                "relative flex w-full flex-col gap-12 rounded-lg border p-20",
                compact && "max-tablet:p-16",
                ctx.dark
                  ? "border-glass-card-border bg-glass-card"
                  : "border-border-default bg-surface-default",
                item.highlight && (ctx.dark ? "border-accent-cyan" : "border-primary-brand shadow-md"),
                item.dashed && "border-dashed",
              )}
            >
              {item.highlight && (
                <span className="w-fit rounded-full bg-primary-default px-10 py-4 text-text-inverse text-label-s">
                  {item.highlight}
                </span>
              )}
              <span className="flex items-center gap-12">
                <span
                  aria-hidden
                  className="flex size-32 shrink-0 items-center justify-center rounded-full bg-secondary-dark font-mono text-accent-cyan text-label-s"
                >
                  {number}
                </span>
                {item.icon && <IconTile icon={icon(item.icon)} tone={ctx.dark ? "glass" : "blue"} size="M" />}
              </span>
              <h3 className={cn("text-h5", ctx.dark ? "text-text-inverse" : "text-text-primary")}>
                <span className="sr-only">{number}. </span>
                {item.title}
              </h3>
              {item.text && (
                <p
                  className={cn("text-body-s", ctx.dark ? "text-text-inverse-muted" : "text-text-secondary")}
                >
                  {item.text}
                </p>
              )}
              {item.badge && <StatusBadge tone={item.badge.tone}>{item.badge.label}</StatusBadge>}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

function Panel({ block, ctx }: { block: Extract<Block, { type: "panel" }>; ctx: Ctx }) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-20 rounded-xl border p-24 tablet:p-32",
        ctx.dark ? "border-glass-card-border bg-glass-card" : "border-primary-soft bg-primary-subtle",
      )}
    >
      <div className="flex flex-col gap-12">
        {block.label && <StatusBadge tone={ctx.dark ? "dark" : "product"}>{block.label}</StatusBadge>}
        <div className="flex items-start gap-12">
          {block.icon && <IconTile icon={icon(block.icon)} tone={ctx.dark ? "glass" : "blue"} size="M" />}
          <div className="flex flex-col gap-8">
            <h3 className={cn("text-h4", ctx.dark ? "text-text-inverse" : "text-text-primary")}>
              {block.title}
            </h3>
            {block.text && (
              <p className={cn("text-body-m", ctx.dark ? "text-text-inverse-muted" : "text-text-secondary")}>
                {block.text}
              </p>
            )}
          </div>
        </div>
      </div>
      {block.items && (
        <ul className="grid gap-12 tablet:grid-cols-2 desktop:grid-cols-3">
          {block.items.map((item) => {
            const Icon = icon(item.icon ?? "check");
            return (
              <li
                key={item.label}
                className={cn(
                  "flex items-center gap-12 rounded-md border px-16 py-12 text-label-l",
                  ctx.dark
                    ? "border-inverse-line bg-secondary-dark text-text-inverse"
                    : "border-border-default bg-surface-default text-text-primary",
                )}
              >
                <Icon aria-hidden size={18} strokeWidth={1.75} className="shrink-0 text-primary-brand" />
                {item.label}
              </li>
            );
          })}
        </ul>
      )}
      {block.chips && <Chips items={block.chips} dark={ctx.dark} />}
    </Reveal>
  );
}

function Rows({ block, ctx }: { block: Extract<Block, { type: "rows" }>; ctx: Ctx }) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-16 rounded-xl border p-20 tablet:p-32",
        ctx.dark ? "border-glass-card-border bg-glass-card" : "border-border-default bg-surface-default",
      )}
    >
      {block.title && (
        <h3 className={cn("text-h5", ctx.dark ? "text-text-inverse" : "text-text-primary")}>{block.title}</h3>
      )}
      <ul className="flex flex-col gap-12">
        {block.items.map((item) => (
          <li
            key={item.title}
            className={cn(
              "flex flex-wrap items-center gap-x-16 gap-y-8 rounded-md border p-16",
              ctx.dark
                ? "border-inverse-line bg-secondary-dark"
                : "border-border-default bg-background-subtle",
            )}
          >
            {item.icon && <IconTile icon={icon(item.icon)} tone={ctx.dark ? "glass" : "blue"} size="M" />}
            <span className="flex min-w-0 flex-1 flex-col gap-4">
              <span className={cn("text-label-l", ctx.dark ? "text-text-inverse" : "text-text-primary")}>
                {item.title}
              </span>
              {item.text && (
                <span
                  className={cn("text-body-s", ctx.dark ? "text-text-inverse-muted" : "text-text-secondary")}
                >
                  {item.text}
                </span>
              )}
            </span>
            {item.tag && (
              <span className="max-tablet:basis-full">
                <StatusBadge tone={ctx.dark ? "dark" : "product"}>{item.tag}</StatusBadge>
              </span>
            )}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function BlockView({ block, ctx }: { block: Block; ctx: Ctx }): ReactNode {
  const { dark } = ctx;
  switch (block.type) {
    case "cards":
      return (
        <div className="flex flex-col gap-24">
          {block.title && (
            <h3 className={cn("text-h4", dark ? "text-text-inverse" : "text-text-primary")}>{block.title}</h3>
          )}
          <ul className={cn("grid grid-cols-1 gap-16 tablet:gap-24", COLS[block.columns ?? 3])}>
            {block.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 4) * 80} className="flex">
                <div className="w-full">
                  <Card item={item} ctx={ctx} style={block.style ?? "card"} />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      );
    case "compare":
      return <Compare columns={block.columns} ctx={ctx} />;
    case "steps":
      return (
        <Steps items={block.items} ctx={ctx} columns={block.columns} compact={block.mobileColumns === 2} />
      );
    case "panel":
      return <Panel block={block} ctx={ctx} />;
    case "image":
      return <Figure image={block} dark={dark} />;
    case "images":
      return (
        <figure className="flex flex-col gap-16">
          <div className={cn("grid grid-cols-1 gap-16 tablet:gap-24", COLS[block.columns ?? 2])}>
            {block.items.map((image) => (
              <Figure key={image.src} image={image} dark={dark} />
            ))}
          </div>
          {block.caption && (
            <figcaption
              className={cn("text-body-s", dark ? "text-text-inverse-muted" : "text-text-secondary")}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "checks":
      return (
        <Reveal
          className={cn(
            "flex flex-col gap-20 rounded-xl border p-20 tablet:p-32",
            dark ? "border-glass-card-border bg-glass-card" : "border-border-default bg-surface-default",
          )}
        >
          {block.title && (
            <h3 className={cn("text-h5", dark ? "text-text-inverse" : "text-text-primary")}>{block.title}</h3>
          )}
          <ul className="flex flex-wrap gap-12">
            {block.items.map((item) => (
              <li
                key={item}
                className={cn(
                  "flex items-center gap-8 rounded-md border px-12 py-8 text-body-s",
                  dark
                    ? "border-inverse-line bg-secondary-dark text-text-inverse"
                    : "border-border-default bg-background-subtle text-text-primary",
                )}
              >
                <Check aria-hidden size={16} strokeWidth={2} className="shrink-0 text-primary-brand" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      );
    case "alert": {
      const warning = block.tone === "warning";
      const AlertIcon = warning ? TriangleAlert : Info;
      return (
        <div
          role="note"
          className={cn(
            "flex items-start gap-12 rounded-lg border-l-4 p-16 tablet:p-20",
            warning ? "border-warning-default bg-warning-subtle" : "border-primary-brand bg-primary-subtle",
          )}
        >
          <AlertIcon
            aria-hidden
            size={20}
            strokeWidth={1.75}
            className={cn("mt-2 shrink-0", warning ? "text-warning-default" : "text-primary-default")}
          />
          <div className="flex flex-col gap-4 text-text-primary text-body-s">
            {block.title && <p className="text-label-l">{block.title}</p>}
            <p className="text-text-secondary">{block.text}</p>
          </div>
        </div>
      );
    }
    case "note":
      return (
        <p
          className={cn(
            "flex items-start gap-8 text-body-xs",
            dark ? "text-text-inverse-muted" : "text-text-muted",
          )}
        >
          <Info aria-hidden size={14} strokeWidth={1.75} className="mt-2 shrink-0" />
          {block.text}
        </p>
      );
    case "quote":
      return (
        <p
          className={cn(
            "border-l-4 border-primary-brand pl-20 text-h4",
            dark ? "text-text-inverse" : "text-text-primary",
          )}
        >
          {block.text}
        </p>
      );
    case "rows":
      return <Rows block={block} ctx={ctx} />;
    case "text":
      return (
        <Reveal
          className={cn(
            "flex flex-col gap-20 text-body-l",
            dark ? "text-text-inverse-muted" : "text-text-secondary",
          )}
        >
          {block.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      );
    case "chips":
      return <Chips items={block.items} dark={dark} label={block.label} />;
    case "flow":
      return (
        <div className={cn("flex flex-col gap-12", block.mobileOnly && "tablet:hidden")}>
          {block.label && (
            <p className={cn("text-label-l", dark ? "text-text-inverse" : "text-text-primary")}>
              {block.label}
            </p>
          )}
          <ol className="flex flex-wrap items-center gap-8">
            {block.items.map((item, i) => (
              <li key={item} className="flex items-center gap-8">
                <span
                  className={cn(
                    "rounded-full border px-12 py-6 text-label-s",
                    dark
                      ? "border-inverse-line bg-secondary-dark text-text-inverse"
                      : "border-border-default bg-surface-default text-text-primary",
                  )}
                >
                  {item}
                </span>
                {i < block.items.length - 1 && (
                  <ChevronRight
                    aria-hidden
                    size={14}
                    strokeWidth={1.75}
                    className={dark ? "text-text-inverse-muted" : "text-text-muted"}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      );
    case "actions":
      return (
        <div className="flex flex-col gap-12 tablet:flex-row tablet:flex-wrap">
          {block.items.map((link, i) => (
            <LinkButton
              key={link.label}
              link={link}
              variant={i === 0 ? (dark ? "inverse" : "primary") : dark ? "inverse-outline" : "secondary"}
              className="w-full tablet:w-auto"
            />
          ))}
        </div>
      );
    case "split":
      return (
        <div className="grid gap-32 desktop:grid-cols-2 desktop:items-start desktop:gap-48">
          <div className="flex min-w-0 flex-col gap-24">
            {block.left.map((b, i) => (
              <BlockView key={i} block={b} ctx={ctx} />
            ))}
          </div>
          <div className="flex min-w-0 flex-col gap-24">
            {block.right.map((b, i) => (
              <BlockView key={i} block={b} ctx={ctx} />
            ))}
          </div>
        </div>
      );
  }
}

/* ——— Sections ——— */

const THEMES = {
  light: "",
  subtle: "bg-background-subtle",
  dark: "bg-background-inverse text-text-inverse",
} as const;

function Section({ section }: { section: ContentSection }) {
  const theme = section.theme ?? "light";
  const ctx = { dark: theme === "dark" };
  const blocks = section.blocks ?? [];
  const split = section.layout === "split";
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className={cn("scroll-mt-(--header-height) py-64 desktop:py-120", THEMES[theme])}
    >
      <div
        className={cn(
          "container flex flex-col gap-32 desktop:gap-48",
          split &&
            "desktop:grid desktop:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] desktop:items-start desktop:gap-72",
        )}
      >
        <SectionHeader
          id={`${section.id}-title`}
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
          theme={ctx.dark ? "dark" : "light"}
          align={section.align}
          className={cn(
            section.align === "center" && "max-tablet:mx-0 max-tablet:items-start max-tablet:text-left",
            split && "desktop:sticky desktop:top-[calc(var(--header-height)+var(--space-32))]",
          )}
        />
        {blocks.length > 0 && (
          <div className="flex min-w-0 flex-col gap-32 desktop:gap-40">
            {blocks.map((block, i) => (
              <BlockView key={i} block={block} ctx={ctx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

async function Hero({ section }: { section: HeroSection }) {
  const nav = await getTranslations("nav");
  const a11y = await getTranslations("a11y");
  return (
    <ProductHero
      breadcrumb={
        <Breadcrumb
          theme="dark"
          label={a11y("breadcrumb")}
          items={[
            { label: nav("home"), href: "/" },
            { label: nav("realisations"), href: "/realisations" },
            { label: section.crumb },
          ]}
        />
      }
      badges={
        <>
          {(section.logo || section.logoText) && (
            <span className="flex w-full items-center gap-16">
              {section.logo && <Visual image={section.logo} priority />}
              {section.logoText && (
                <span className="text-text-inverse text-h3">
                  {section.logoText[0]}
                  {section.logoText[1] && (
                    <span className="text-body-xl text-text-inverse-muted"> {section.logoText[1]}</span>
                  )}
                </span>
              )}
            </span>
          )}
          {section.badges.map((badge) => (
            <StatusBadge key={badge.label} tone={badge.tone} pulse={badge.pulse}>
              {badge.label}
            </StatusBadge>
          ))}
        </>
      }
      title={section.title}
      lead={section.lead}
      actions={
        (section.actions?.length || section.note) && (
          <div className="flex flex-col gap-16">
            {section.actions && (
              <div className="flex flex-col gap-12 tablet:flex-row">
                {section.actions.map((action, i) => (
                  <LinkButton
                    key={action.label}
                    link={action}
                    variant={i === 0 ? "inverse" : "inverse-outline"}
                    icon={i === 0 ? undefined : null}
                    className="w-full tablet:w-auto"
                  />
                ))}
              </div>
            )}
            {section.note && <p className="text-text-inverse-muted text-body-xs">{section.note}</p>}
          </div>
        )
      }
      visual={
        section.visual && (
          <div className="mx-auto w-full max-w-[35rem] desktop:max-w-none">
            <Visual
              image={section.visual}
              priority
              sizes="(min-width: 75rem) 592px, (min-width: 48rem) 560px, 100vw"
            />
          </div>
        )
      }
    />
  );
}

function Mentions({ section }: { section: MentionsSection }) {
  return (
    <section aria-labelledby="mentions-title" className="py-48 desktop:py-64">
      <div className="container">
        <Reveal className="flex flex-col gap-24 rounded-xl border border-border-default bg-background-subtle p-24 tablet:p-32 desktop:flex-row desktop:items-center desktop:gap-40">
          <div className="flex shrink-0 flex-wrap items-center gap-16">
            <span className="flex items-center justify-center rounded-lg border border-border-default bg-surface-default px-20 py-12">
              <Logo width={112} />
            </span>
            {section.logos.map((logo) => (
              <span
                key={logo.src}
                className="flex items-center justify-center rounded-lg border border-border-default bg-surface-default px-20 py-12"
              >
                <Visual image={logo} />
              </span>
            ))}
          </div>
          <div className="flex flex-1 flex-col gap-8">
            <h2 id="mentions-title" className="text-h4 text-text-primary">
              {section.title}
            </h2>
            <p className="text-text-secondary text-body-m">{section.text}</p>
          </div>
          {section.action && (
            <LinkButton link={section.action} variant="secondary" className="max-tablet:w-full" />
          )}
        </Reveal>
      </div>
    </section>
  );
}

function SectionView({ section }: { section: EtudeSection }) {
  switch (section.type) {
    case "hero":
      return <Hero section={section} />;
    case "section":
      return <Section section={section} />;
    case "mentions":
      return <Mentions section={section} />;
    case "cta":
      return (
        <CtaSection
          title={section.title}
          description={section.description}
          primary={{ label: section.primary.label, href: internalHref(section.primary.href) }}
          secondary={
            section.secondary
              ? { label: section.secondary.label, href: internalHref(section.secondary.href) }
              : null
          }
        />
      );
  }
}

/** Étude de réalisation rendue depuis `etudes.<slug>` (content/fr.json). */
export async function EtudeRenderer({ slug }: { slug: string }) {
  const t = await getTranslations("etudes");
  const content = t.raw(slug) as EtudeContent;
  return (
    <>
      <ReadingProgress />
      {content.sections.map((section, i) => (
        <SectionView key={i} section={section} />
      ))}
    </>
  );
}
