// Задача vendor-closed: шаблони недоступні вендору навіть прямим запитом (AC-VENDOR-08, AC-VENDOR-14). Написано ЗІ
// ТЕКСТУ AC до реалізації. Контракт (дослівно — в intent): RLS на templates, template_sections, template_tasks,
// template_versions і template_draft_names перелічує дозволені ролі явно — вендор не отримує жодного рядка;
// менеджер, як і раніше, бачить збережені шаблони й поточну версію.
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createVendorWorld, TENANT_MOVE_IN, type VendorWorld } from "./vendor-support";

let w: VendorWorld;

const rowsOf = (userId: string, sql: string, params: unknown[] = []) => w.t.asUser<Record<string, unknown>>(userId, sql, params);

beforeAll(async () => {
  w = await createVendorWorld();
}, 60_000);

afterAll(async () => {
  await w.t.db.close();
});

describe("База: шаблони закриті для вендора", () => {
  it("AC-VENDOR-08: вендор напряму читає список шаблонів — жодного шаблону, а менеджер бачить «Tenant move-in»", async () => {
    const vendor = await w.newUser("vendor", "vendor");

    expect(await rowsOf(vendor.id, "select id from public.templates")).toEqual([]);
    const managerSees = await rowsOf(w.MANAGER_A, "select name from public.templates where id = $1", [TENANT_MOVE_IN]);
    expect(managerSees).toEqual([{ name: "Tenant move-in" }]);
  });

  it("AC-VENDOR-14: вендор напряму читає розділи, задачі, версії й робочу назву «Tenant move-in» — нічого", async () => {
    const vendor = await w.newUser("vendor", "vendor");

    for (const table of ["template_sections", "template_tasks", "template_versions", "template_draft_names"]) {
      expect(await rowsOf(vendor.id, `select * from public.${table} where template_id = $1`, [TENANT_MOVE_IN]), table).toEqual([]);
    }
    const versions = await rowsOf(w.MANAGER_A, "select number from public.template_versions where template_id = $1", [TENANT_MOVE_IN]);
    expect(versions.length).toBe(1);
  });
});
