import type { AppRole } from "@/lib/auth/require-role";

export type NavItem = { href: string; label: string };

/** Головна навігація за роллю: виконавець бачить лише «Runs» і «Profile» (AC-VENDOR-13). */
export function navItems(role: AppRole): NavItem[] {
  if (role === "vendor") {
    return [
      { href: "/runs", label: "Runs" },
      { href: "/", label: "Profile" },
    ];
  }
  return [
    { href: "/templates", label: "Templates" },
    { href: "/runs", label: "Runs" },
    { href: "/", label: "Profile" },
  ];
}

/** Куди потрапляє користувач після входу, якщо не просив конкретну сторінку. */
export function landingPath(role: AppRole): string {
  return role === "vendor" ? "/runs" : "/";
}
