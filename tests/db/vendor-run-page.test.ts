// Задача vendor-run-page: сторінка запуску для вендора. Написано ЗІ ТЕКСТУ AC (requirements/39-assign-a-vendor.md) до
// реалізації: AC-VENDOR-04, AC-VENDOR-06, AC-VENDOR-11.
// Контракт (дослівно — в intent задачі фабрики):
//   * public.vendor_run_tasks(p_run_id uuid) — лише задачі викликача в цьому запуску, у порядку розділів і задач
//     шаблону; рівно колонки id, name, section_name, is_required, status (без виконавців і їхніх email);
//     запуск без задач викликача — порожній результат (не помилка);
//   * заголовок сторінки вендора — з public.vendor_runs() (задача vendor-list): case_name, your_done, your_total.
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createVendorWorld, REPAIR_REQUEST, type VendorWorld } from "./vendor-support";

let w: VendorWorld;

const runTasksOf = (userId: string, runId: string) =>
  w.t.asUser<Record<string, unknown>>(userId, "select * from public.vendor_run_tasks($1)", [runId]);

beforeAll(async () => {
  w = await createVendorWorld();
}, 60_000);

afterAll(async () => {
  await w.t.db.close();
});

describe("База: сторінка запуску вендора — vendor_run_tasks()", () => {
  it("AC-VENDOR-04: V бачить рівно задачі 3 і 4 — назва, розділ, required/optional, статус; без задач 1, 2, 5 і без email", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const { runId } = await w.apartment12(w.MANAGER_A, vendor.id);

    const rows = await runTasksOf(vendor.id, runId);

    expect(rows.map((row) => [row.name, row.section_name, row.is_required, row.status])).toEqual([
      ["Order cleaning", "Before move-in", false, "to_do"],
      ["Hand over the keys", "Move-in day", true, "to_do"],
    ]);
    for (const row of rows) expect(Object.keys(row).sort()).toEqual(["id", "is_required", "name", "section_name", "status"]);
    expect(JSON.stringify(rows)).not.toMatch(/@example\.test/);
  });

  it("AC-VENDOR-06: запуск «Apartment 14, repair» без задач V за прямим посиланням — жодної задачі", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    await w.apartment12(w.MANAGER_A, vendor.id);
    const repair = await w.launch(w.MANAGER_A, "Apartment 14, repair", {}, REPAIR_REQUEST);

    expect(await runTasksOf(vendor.id, repair)).toEqual([]);
    const listed = await w.t.asUser<{ id: string }>(vendor.id, "select id from public.vendor_runs()");
    expect(listed.map((row) => row.id)).not.toContain(repair);
  });

  it("AC-VENDOR-11: задачі 3 «done» і 4 «to do» — у заголовку «Apartment 12, move-in» і «1 of 2» своїх задач", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const { runId, tasks } = await w.apartment12(w.MANAGER_A, vendor.id);
    await w.t.asUser(vendor.id, "select public.mark_task_done($1, false)", [tasks[2].id]);

    const [header] = await w.t.asUser<{ case_name: string; your_done: number; your_total: number }>(
      vendor.id,
      "select case_name, your_done, your_total from public.vendor_runs() where id = $1",
      [runId],
    );
    expect(header).toEqual({ case_name: "Apartment 12, move-in", your_done: 1, your_total: 2 });
    const statuses = (await runTasksOf(vendor.id, runId)).map((row) => row.status);
    expect(statuses).toEqual(["done", "to_do"]);
  });
});
