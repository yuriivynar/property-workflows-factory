// Задача vendor-list: список запусків вендора. Написано ЗІ ТЕКСТУ AC (requirements/39-assign-a-vendor.md) до реалізації:
// AC-VENDOR-03, AC-VENDOR-05, AC-VENDOR-10, AC-VENDOR-12, AC-VENDOR-16.
// Контракт (дослівно — в intent задачі фабрики):
//   * public.vendor_runs() — запуски, у яких викликач має хоча б одну задачу, найновіші першими; рівно колонки
//     id, case_name, status, your_done, your_total (свої задачі «done» / усі свої задачі цього запуску);
//     без назви чи версії шаблону, без менеджера запуску;
//   * позначка задачі — наявна public.mark_task_done(task, confirmed).
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createVendorWorld, REPAIR_REQUEST, type VendorWorld } from "./vendor-support";

let w: VendorWorld;

type VendorRun = { id: string; case_name: string; status: string; your_done: number; your_total: number };

const vendorRuns = (userId: string) => w.t.asUser<VendorRun>(userId, "select * from public.vendor_runs()");
const mark = (userId: string, taskId: string, confirmed = false) =>
  w.t.asUser(userId, "select public.mark_task_done($1, $2)", [taskId, confirmed]);

beforeAll(async () => {
  w = await createVendorWorld();
}, 60_000);

afterAll(async () => {
  await w.t.db.close();
});

describe("База: список запусків вендора — vendor_runs()", () => {
  it("AC-VENDOR-03: V бачить лише «Apartment 12, move-in» зі статусом і «0 of 2» своїх задач, без «Apartment 14, repair»", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const { runId } = await w.apartment12(w.MANAGER_A, vendor.id);
    await w.launch(w.MANAGER_A, "Apartment 14, repair", {}, REPAIR_REQUEST);

    const rows = await vendorRuns(vendor.id);

    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ id: runId, case_name: "Apartment 12, move-in", status: "in_progress" });
    expect([rows[0].your_done, rows[0].your_total]).toEqual([0, 2]);
  });

  it("AC-VENDOR-12: рядок вендора — назва випадку, статус і свої задачі; жодної назви шаблону «Tenant move-in»", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    await w.apartment12(w.MANAGER_A, vendor.id);

    const [row] = await w.t.asUser<Record<string, unknown>>(vendor.id, "select * from public.vendor_runs()");

    expect(Object.keys(row).sort()).toEqual(["case_name", "id", "status", "your_done", "your_total"]);
    expect(Object.values(row)).not.toContain("Tenant move-in");
  });

  it("AC-VENDOR-05: V позначає свою задачу 3 (не остання обов'язкова) — вона «done», у V «1 of 2»", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const { runId, tasks } = await w.apartment12(w.MANAGER_A, vendor.id);

    await mark(vendor.id, tasks[2].id);

    expect((await w.runTasks(runId))[2].status).toBe("done");
    const [row] = await vendorRuns(vendor.id);
    expect([row.your_done, row.your_total]).toEqual([1, 2]);
  });

  it("AC-VENDOR-10: вендор без жодної задачі — порожній список, хоча інші запуски агенції є", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const other = await w.newUser("vendor", "other-vendor");
    await w.apartment12(w.MANAGER_A, other.id);

    expect(await vendorRuns(vendor.id)).toEqual([]);
  });

  it("AC-VENDOR-16: V позначає свою необов'язкову задачу 3 у запуску «completed» — «done», «1 of 1», запуск лишається «completed»", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const ids = await w.t.asService<{ id: string }>(
      `select tt.id from public.template_tasks as tt join public.template_sections as s on s.id = tt.section_id
       where tt.template_id = '10000000-0000-4000-8000-000000000001' order by s.position, tt.position`,
    );
    const runId = await w.launch(w.MANAGER_A, "Apartment 12, move-in", { [ids[2].id]: vendor.id });
    const tasks = await w.runTasks(runId);
    await mark(w.MANAGER_A, tasks[0].id);
    await mark(w.MANAGER_A, tasks[1].id);
    await mark(w.MANAGER_A, tasks[3].id, true);
    const [{ status: before }] = await w.t.asService<{ status: string }>("select status from public.runs where id = $1", [runId]);
    expect(before).toBe("completed");

    await mark(vendor.id, tasks[2].id);

    expect((await w.runTasks(runId))[2].status).toBe("done");
    const [row] = await vendorRuns(vendor.id);
    expect(row).toMatchObject({ id: runId, status: "completed", your_done: 1, your_total: 1 });
  });
});
