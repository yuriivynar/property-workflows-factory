// Задача vendor-closed: навігація й перша сторінка після входу (AC-VENDOR-13) — підписи дослівно з AC.
// Контракт (дослівно — в intent): src/lib/auth/nav.ts — navItems(role) і landingPath(role).
//   navItems: вендору — [{ href: "/runs", label: "Runs" }, { href: "/", label: "Profile" }];
//             менеджеру й адміністратору — Templates (/templates), Runs (/runs), Profile (/).
//   landingPath: вендору — "/runs" (список запусків одразу після входу); іншим — "/".
import { describe, expect, it } from "vitest";
import { landingPath, navItems } from "./nav";

describe("Навігація за роллю", () => {
  it("AC-VENDOR-13: навігація вендора — лише «Runs» і «Profile»", () => {
    expect(navItems("vendor")).toEqual([
      { href: "/runs", label: "Runs" },
      { href: "/", label: "Profile" },
    ]);
  });

  it("AC-VENDOR-13: після входу вендор бачить список запусків", () => {
    expect(landingPath("vendor")).toBe("/runs");
  });

  it("AC-VENDOR-13: менеджер і адміністратор — як і раніше: Templates, Runs, Profile; після входу — профіль", () => {
    for (const role of ["manager", "admin"] as const) {
      expect(navItems(role).map((item) => item.label)).toEqual(["Templates", "Runs", "Profile"]);
      expect(landingPath(role)).toBe("/");
    }
  });
});
