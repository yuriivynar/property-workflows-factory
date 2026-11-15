// Задача vendor-core: роль вендора, призначення під час запуску, довідник колег, заборона запуску для вендора.
// Написано ЗІ ТЕКСТУ AC вимоги PM `requirements/39-assign-a-vendor.md` до реалізації (AC-VENDOR-01, 02, 09).
// Контракт (його дослівно повторює intent задачі фабрики):
//   * профіль може мати роль 'vendor' (profiles.role);
//   * public.launch_run(template, case, assignments) приймає вендора виконавцем, а викликати його вендору не можна;
//   * public.staff_directory() віддає менеджеру й адміністратору лише id і email — вендорів теж.
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createVendorWorld, type VendorWorld } from "./vendor-support";

let w: VendorWorld;

beforeAll(async () => {
  w = await createVendorWorld();
}, 60_000);

afterAll(async () => {
  await w.t.db.close();
});

describe("База: вендор — призначення, довідник, заборона запуску", () => {
  it("AC-VENDOR-01: менеджер A призначає вендора V на задачі 3 і 4 — вони за V, а задачі 1, 2 і 5 за A", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const { tasks } = await w.apartment12(w.MANAGER_A, vendor.id);

    expect(tasks.map((task) => task.assignee_id)).toEqual([w.MANAGER_A, w.MANAGER_A, vendor.id, vendor.id, w.MANAGER_A]);
  });

  it("AC-VENDOR-01: адміністратор теж може призначити вендора виконавцем", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const { tasks } = await w.apartment12(w.ADMIN, vendor.id, "Admin assigns vendor");

    expect(tasks.map((task) => task.assignee_id)).toEqual([w.ADMIN, w.ADMIN, vendor.id, vendor.id, w.ADMIN]);
  });

  it("AC-VENDOR-02: у виборі виконавця A бачить email B, адміністратора й V — і лише поля id та email", async () => {
    const vendor = await w.newUser("vendor", "vendor");

    const rows = await w.t.asUser<Record<string, unknown>>(w.MANAGER_A, "select * from public.staff_directory()");

    const emails = rows.map((row) => row.email);
    expect(emails).toContain("manager.b@example.test");
    expect(emails).toContain("admin@example.test");
    expect(emails).toContain(vendor.email);
    for (const row of rows) expect(Object.keys(row).sort()).toEqual(["email", "id"]);
    expect(rows.find((row) => row.email === vendor.email)?.id).toBe(vendor.id);
  });

  it("AC-VENDOR-09: V напряму запускає «Tenant move-in» — запуск не створено, кількість запусків не змінилась", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const before = await w.countRuns();

    await expect(w.launch(vendor.id, "Vendor launch attempt")).rejects.toThrow(/./);
    await expect(
      w.t.asUser(
        vendor.id,
        "insert into public.runs (template_name, case_name, run_manager_id) values ('X', 'Vendor direct', $1)",
        [vendor.id],
      ),
    ).rejects.toThrow(/permission denied/);

    expect(await w.countRuns()).toBe(before);
  });
});
