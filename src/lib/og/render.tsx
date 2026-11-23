import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { OgPage } from "./pages";
import { OG_SIZE } from "./size";
import { alpha, primitive } from "./theme";

const root = process.cwd();
const font = (file: string) => readFileSync(join(root, "src/assets/og-fonts", file));
const FONTS = [
  { name: "Sora", data: font("Sora-SemiBold.ttf"), weight: 600 as const, style: "normal" as const },
  { name: "Inter", data: font("Inter-Medium.ttf"), weight: 500 as const, style: "normal" as const },
  { name: "Inter", data: font("Inter-SemiBold.ttf"), weight: 600 as const, style: "normal" as const },
  {
    name: "JetBrains Mono",
    data: font("JetBrainsMono-Medium.ttf"),
    weight: 500 as const,
    style: "normal" as const,
  },
];

const svgDataUri = (file: string) =>
  `data:image/svg+xml;base64,${readFileSync(join(root, "public/brand", file)).toString("base64")}`;
const LOGO = svgDataUri("ziiiilo-logo-blanc.svg");
const RING = svgDataUri("motif-anneau.svg");

/** Visuel du projet recadré au format du cadre (Satori ne lit pas le WebP). */
async function frameImage(path: string, width: number, height: number): Promise<string> {
  const png = await sharp(join(root, "public", path))
    .resize(width * 2, height * 2, { fit: "cover", position: "top" })
    .png()
    .toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

/** Taille du titre selon sa longueur : jamais de texte minuscule, au plus trois lignes. */
function titleSize(title: string, withImage: boolean): number {
  const n = title.length;
  if (withImage) return n <= 30 ? 60 : n <= 44 ? 50 : 44;
  return n <= 40 ? 72 : n <= 70 ? 56 : 50;
}

/** Surtitre sur une seule ligne : au-delà de la place disponible, seul le premier segment reste. */
function eyebrowText(eyebrow: string, withImage: boolean): string {
  const max = withImage ? 30 : 46;
  return eyebrow.length > max ? eyebrow.split(" · ")[0] : eyebrow;
}

/** Cadre du visuel au format 3:2 des vignettes de réalisation (légendes intégrées non coupées). */
const FRAME = { width: 510, height: 340 };

/**
 * Carte de partage ZIIIILO : fond du hero, logo blanc officiel, surtitre « terminal »,
 * titre en Sora, visuel réel du projet (ou anneau de la marque), bandeau des expertises.
 * Rendue en JPEG pour rester légère (aperçus WhatsApp).
 */
export async function renderOgImage(page: OgPage, tagline: string, domain: string): Promise<Uint8Array> {
  const image = page.image ? await frameImage(page.image, FRAME.width, FRAME.height) : null;
  const white = primitive("gray-0");
  const cyan = primitive("cyan-400");

  const response = new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        padding: "56px 64px 0",
        backgroundImage: `linear-gradient(135deg, ${primitive("navy-950")} 0%, ${primitive("navy-900")} 55%, ${primitive("navy-800")} 100%)`,
        fontFamily: "Inter",
        color: white,
      }}
    >
      {/* Anneau de la marque, décoratif */}
      {/* eslint-disable-next-line @next/next/no-img-element -- rendu Satori, pas du DOM */}
      <img
        src={RING}
        alt=""
        width={image ? 520 : 560}
        height={image ? 520 : 560}
        style={{
          position: "absolute",
          right: image ? -150 : -170,
          top: image ? -170 : 10,
          opacity: image ? 0.22 : 0.9,
        }}
      />

      <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, height: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendu Satori, pas du DOM */}
          <img src={LOGO} alt="" width={144} height={72} />

          <div
            style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, gap: 24 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontFamily: "JetBrains Mono",
                fontSize: 22,
                letterSpacing: 1,
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                color: cyan,
              }}
            >
              <span style={{ color: primitive("blue-500") }}>{">"}</span>
              <span>{eyebrowText(page.eyebrow, Boolean(image))}</span>
              <span style={{ width: 13, height: 28, backgroundColor: cyan }} />
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Sora",
                fontWeight: 600,
                fontSize: titleSize(page.title, Boolean(image)),
                lineHeight: 1.12,
                letterSpacing: -1.5,
                maxWidth: image ? 530 : 720,
              }}
            >
              {page.title}
            </div>
            {page.markers && (
              <div style={{ display: "flex", gap: 12 }}>
                {page.markers.map((m) => (
                  <div
                    key={m}
                    style={{
                      display: "flex",
                      padding: "10px 20px",
                      borderRadius: 999,
                      border: `1.5px solid ${alpha("gray-0", 0.18)}`,
                      backgroundColor: alpha("gray-0", 0.06),
                      fontSize: 22,
                      fontWeight: 600,
                    }}
                  >
                    {m}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {image && (
          <div
            style={{
              display: "flex",
              width: FRAME.width,
              height: FRAME.height,
              borderRadius: 24,
              overflow: "hidden",
              border: `1.5px solid ${alpha("gray-0", 0.16)}`,
              boxShadow: `0 32px 72px -20px ${alpha("navy-950", 0.9)}, 0 0 56px ${alpha("cyan-400", 0.25)}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- rendu Satori, pas du DOM */}
            <img
              src={image}
              alt=""
              width={FRAME.width}
              height={FRAME.height}
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
      </div>

      {/* Bandeau des expertises + domaine */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 92,
          borderTop: `1px solid ${alpha("gray-0", 0.12)}`,
          fontSize: 24,
          fontWeight: 600,
          color: primitive("gray-300"),
        }}
      >
        <span>{tagline}</span>
        <span style={{ fontFamily: "JetBrains Mono", fontSize: 24, color: primitive("cyan-300") }}>
          {domain}
        </span>
      </div>

      {/* Filet aux couleurs du logo */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 8,
          backgroundImage: `linear-gradient(90deg, ${primitive("orange-500")}, ${primitive("blue-500")} 45%, ${primitive("cyan-400")} 70%, ${primitive("violet-600")})`,
        }}
      />
    </div>,
    { ...OG_SIZE, fonts: FONTS },
  );

  const png = Buffer.from(await response.arrayBuffer());
  return new Uint8Array(await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer());
}
