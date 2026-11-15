// Задача vendor-mark: прямі позначки вендора й необов'язкова задача завершеного запуску в базі. Написано ЗІ ТЕКСТУ AC:
// AC-VENDOR-07, AC-VENDOR-15 (requirements/39-assign-a-vendor.md), AC-TASK-19 (requirements/3-…).
// Ці правила база вже виконує (mark_task_done з ws9-base): тести фіксують їх, щоб жодна зміна зрізу їх не зламала.
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createVendorWorld, REPAIR_REQUEST, TENANT_MOVE_IN, type VendorWorld } from "./vendor-support";

let w: VendorWorld;

const mark = (userId: string, taskId: string, confirmed = false) =>
  w.t.asUser(userId, "select public.mark_task_done($1, $2)", [taskId, confirmed]);
const runStatus = async (runId: string) =>
  (await w.t.asService<{ status: string }>("select status from public.runs where id = $1", [runId]))[0].status;

beforeAll(async () => {
  w = await createVendorWorld();
}, 60_000);

afterAll(async () => {
  await w.t.db.close();
});

describe("База: прямі позначки вендора", () => {
  it("AC-VENDOR-07: V напряму позначає задачу 1 менеджера A у своєму запуску — відмова, задача 1 лишається «to do»", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    const { runId, tasks } = await w.apartment12(w.MANAGER_A, vendor.id);

    await expect(mark(vendor.id, tasks[0].id)).rejects.toThrow(/NOT_ALLOWED/);
    await expect(
      w.t.asUser(vendor.id, "update public.run_tasks set status = 'done' where id = $1", [tasks[0].id]),
    ).rejects.toThrow(/permission denied/);
    expect((await w.runTasks(runId))[0].status).toBe("to_do");
  });

  it("AC-VENDOR-15: V напряму позначає задачу 1 у «Apartment 14, repair», де в нього немає задач — відмова, «to do»", async () => {
    const vendor = await w.newUser("vendor", "vendor");
    await w.apartment12(w.MANAGER_A, vendor.id);
    const repair = await w.launch(w.MANAGER_A, "Apartment 14, repair", {}, REPAIR_REQUEST);
    const [first] = await w.runTasks(repair);

    await expect(mark(vendor.id, first.id)).rejects.toThrow(/NOT_ALLOWED/);
    expect((await w.runTasks(repair))[0].status).toBe("to_do");
  });
});

describe("База: необов'язкова задача завершеного запуску", () => {
  it("AC-TASK-19: виконавець позначає необов'язкову задачу «to do» запуску «completed» — «done», запуск «completed», прогрес її рахує", async () => {
    const ids = (
      await w.t.asService<{ id: string }>(
        `select tt.id from public.template_tasks tt join public.template_sections s on s.id = tt.section_id
         where tt.template_id = $1 order by s.position, tt.position`,
        [TENANT_MOVE_IN],
      )
    ).map((row) => row.id);
    const runId = await w.launch(w.MANAGER_A, "Apartment 19, completed", { [ids[4]]: w.MANAGER_B });
    const tasks = await w.runTasks(runId);
    await mark(w.MANAGER_A, tasks[0].id);
    await mark(w.MANAGER_A, tasks[1].id);
    await mark(w.MANAGER_A, tasks[3].id, true);
    expect(await runStatus(runId)).toBe("completed");

    await mark(w.MANAGER_B, tasks[4].id);

    expect((await w.runTasks(runId))[4].status).toBe("done");
    expect(await runStatus(runId)).toBe("completed");
    const [overview] = await w.t.asUser<{ done_count: number; total_count: number }>(
      w.MANAGER_A,
      "select done_count, total_count from public.run_overview where id = $1",
      [runId],
    );
    expect([overview.done_count, overview.total_count]).toEqual([4, 5]);
  });
});
