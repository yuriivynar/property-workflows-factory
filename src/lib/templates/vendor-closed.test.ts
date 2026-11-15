// Задача vendor-closed: сторінки шаблонів і форма запуску закриті для вендора (AC-VENDOR-08, AC-VENDOR-14).
// Контракт (дослівно — в intent): у src/lib/templates/domain.ts тип TemplatePage = "list" | "launch" | "view" | "edit"
// | "versions"; templatePageAccess(role, page): вендору — "not-enough-rights" на кожній сторінці; менеджеру — "ok" на
// "list", "launch", "view" і "not-enough-rights" на "edit", "versions" (як було); адміністратору — "ok" скрізь.
// refusalBackLink(role): вендору — { href: "/runs", label: "Back to runs" }, іншим — { href: "/templates",
// label: "Back to templates" }. Тексти — дослівно з AC.
import { describe, expect, it } from "vitest";
import { refusalBackLink, TEMPLATE_MESSAGES, templatePageAccess } from "./domain";

describe("Шаблони закриті для вендора", () => {
  it("AC-VENDOR-08: вендор на списку шаблонів — «Not enough rights» і посилання «Back to runs»", () => {
    expect(templatePageAccess("vendor", "list")).toBe("not-enough-rights");
    expect(TEMPLATE_MESSAGES.notEnoughRights).toBe("Not enough rights");
    expect(refusalBackLink("vendor")).toEqual({ href: "/runs", label: "Back to runs" });
  });

  it("AC-VENDOR-08: менеджер і адміністратор список шаблонів бачать; їхнє посилання на відмові — «Back to templates»", () => {
    expect(templatePageAccess("manager", "list")).toBe("ok");
    expect(templatePageAccess("admin", "list")).toBe("ok");
    expect(refusalBackLink("manager")).toEqual({ href: "/templates", label: "Back to templates" });
  });

  it("AC-VENDOR-14: вендор за прямим посиланням на форму запуску, сторінку шаблону, версії й редактор — «Not enough rights»", () => {
    for (const page of ["launch", "view", "versions", "edit"] as const) {
      expect(templatePageAccess("vendor", page), page).toBe("not-enough-rights");
    }
  });

  it("AC-VENDOR-14: менеджер — форма запуску й сторінка шаблону відкриті, версії й редактор — ні; адміністратор — усе", () => {
    expect(templatePageAccess("manager", "launch")).toBe("ok");
    expect(templatePageAccess("manager", "view")).toBe("ok");
    expect(templatePageAccess("manager", "edit")).toBe("not-enough-rights");
    for (const page of ["list", "launch", "view", "versions", "edit"] as const) expect(templatePageAccess("admin", page)).toBe("ok");
  });
});
