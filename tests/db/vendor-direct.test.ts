// Задача vendor-direct: прямі читання вендора в обхід сторінок (AC-VENDOR-17, AC-VENDOR-18). Написано ЗІ ТЕКСТУ AC до
// реалізації. Контракт (дослівно — в intent задачі фабрики):
//   * run_tasks: вендор напряму читає лише задачі, де він виконавець; менеджер і адміністратор — як раніше;
//   * runs, run_overview, run_sections: вендор напряму не отримує жодного рядка (сторінки вендора беруть дані лише з
//     vendor_runs() і vendor_run_tasks());
//   * profiles — лише власний; staff_directory() вендору — порожньо (як і раніше).
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createVendorWorld, REPAIR_REQUEST, type VendorWorld } from "./vendor-support";

let w: VendorWorld;

const rows = (userId: string, sql: string, params: unknown[] = []) => w.t.asUser<Record<string, unknown>>(userId, sql, params);

beforeAll(async () => {
  w = await createVendorWorld();
}, 60_000);

afterAll(async () => {
  await w.t.db.close();
});

describe("База: прямі читання вендора", () => {
  it("AC-VENDOR-17: V напряму запитує задачі «Apartment 12, move-in» (5 задач) — отримує лише задачі 3 і 4", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const { runId, tasks } = await w.apartment12(w.MANAGER_A, vendor.id);

    const direct = await rows(vendor.id, "select id from public.run_tasks where run_id = $1", [runId]);

    expect(direct.map((row) => row.id).sort()).toEqual([tasks[2].id, tasks[3].id].sort());
    const managerSees = await rows(w.MANAGER_A, "select id from public.run_tasks where run_id = $1", [runId]);
    expect(managerSees).toHaveLength(5);
  });

  it("AC-VENDOR-18: V напряму запитує email і профілі інших, задачі й рядки «Apartment 14, repair» — нічого", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const { runId } = await w.apartment12(w.MANAGER_A, vendor.id);
    const repair = await w.launch(w.MANAGER_A, "Apartment 14, repair", {}, REPAIR_REQUEST);

    const profiles = await rows(vendor.id, "select id from public.profiles");
    expect(profiles.map((row) => row.id)).toEqual([vendor.id]);
    expect(await rows(vendor.id, "select * from public.staff_directory()")).toEqual([]);
    expect(await rows(vendor.id, "select id from public.run_tasks where run_id = $1", [repair])).toEqual([]);
    for (const [table, column] of [
      ["runs", "id"],
      ["run_overview", "id"],
      ["run_sections", "run_id"],
    ]) {
      expect(await rows(vendor.id, `select * from public.${table} where ${column} = any($1::uuid[])`, [[runId, repair]]), table).toEqual([]);
    }
  });
});
