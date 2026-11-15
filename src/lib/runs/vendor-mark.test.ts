// Задача vendor-mark: текст відмови позначки для вендора (AC-VENDOR-07, AC-VENDOR-15) — дослівно з AC.
// Контракт (дослівно — в intent): markRefusalMessage({ role, hasTaskInRun, code }) у src/lib/runs/domain.ts:
//   вендор без жодної своєї задачі в цьому запуску — "Run not found" (сторінка не підказує, що запуск існує), хоч би
//   який код помилки повернула база; в усіх інших випадках — messageForError(code).
import { describe, expect, it } from "vitest";
import { markRefusalMessage } from "./domain";

const ONLY = "Only the task's assignee, the run manager, or an administrator can mark a task as done";

describe("markRefusalMessage", () => {
  it("AC-VENDOR-15: вендор без задач у «Apartment 14, repair» позначає задачу 1 напряму — «Run not found»", () => {
    expect(markRefusalMessage({ role: "vendor", hasTaskInRun: false, code: "NOT_ALLOWED" })).toBe("Run not found");
    expect(markRefusalMessage({ role: "vendor", hasTaskInRun: false, code: "UNEXPECTED" })).toBe("Run not found");
  });

  it("AC-VENDOR-07: вендор у своєму запуску позначає чужу задачу 1 напряму — текст про виконавця, менеджера й адміністратора", () => {
    expect(markRefusalMessage({ role: "vendor", hasTaskInRun: true, code: "NOT_ALLOWED" })).toBe(ONLY);
  });

  it("AC-VENDOR-07: для менеджера правило те саме, що й до зрізу (AC-TASK-03) — текст про виконавця, менеджера й адміністратора", () => {
    expect(markRefusalMessage({ role: "manager", hasTaskInRun: false, code: "NOT_ALLOWED" })).toBe(ONLY);
  });
});
