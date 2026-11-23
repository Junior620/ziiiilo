import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Liens et navigation typés sur les routes du §9 bis (adresses traduites en anglais). */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
