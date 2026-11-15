// Задача vendor-list: тексти й стан списку запусків вендора — дослівно з AC (AC-VENDOR-03, 05, 10, 12, 16).
// Контракт (дослівно — в intent): у src/lib/runs/domain.ts — formatYourTasks(done, total) і vendorRunsListState(rows);
// у src/lib/runs/messages.ts — MESSAGES.noTasksAssigned.
import { describe, expect, it } from "vitest";
import { formatYourTasks, vendorRunsListState } from "./domain";
import { MESSAGES } from "./messages";

describe("Список запусків вендора", () => {
  it("AC-VENDOR-03: свої задачі у рядку — «Your tasks: 0 of 2 done»", () => {
    expect(formatYourTasks(0, 2)).toBe("Your tasks: 0 of 2 done");
  });

  it("AC-VENDOR-05: після позначки — «Your tasks: 1 of 2 done»", () => {
    expect(formatYourTasks(1, 2)).toBe("Your tasks: 1 of 2 done");
  });

  it("AC-VENDOR-16: необов'язкова задача завершеного запуску — «Your tasks: 1 of 1 done»", () => {
    expect(formatYourTasks(1, 1)).toBe("Your tasks: 1 of 1 done");
  });

  it("AC-VENDOR-10: без жодної задачі — «No tasks assigned to you yet.» і без таблиці", () => {
    expect(MESSAGES.noTasksAssigned).toBe("No tasks assigned to you yet.");
    expect(vendorRunsListState([])).toBe("empty");
    expect(vendorRunsListState(null)).toBe("empty");
  });

  it("AC-VENDOR-12: є запуск зі своїми задачами — таблиця", () => {
    expect(vendorRunsListState([{ id: "r1" }])).toBe("table");
  });
});
