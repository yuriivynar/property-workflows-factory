// Задача vendor-run-page: що показує сторінка запуску вендору (AC-VENDOR-04, 06, 11) — тексти дослівно з AC.
// Контракт (дослівно — в intent): vendorRunView(run, tasks) у src/lib/runs/domain.ts повертає
//   { kind: "not-found", message: "Run not found" }, коли run = null (запуску немає серед vendor_runs());
//   { kind: "run", title, yourTasks, tasks }, де title — назва випадку, yourTasks — formatYourTasks(done, total),
//   tasks — [{ name, section, required: "required" | "optional", status: "to do" | "done" }]. Жодних інших ключів:
//   ні статусу запуску, ні шаблону, ні версії, ні виконавців.
import { describe, expect, it } from "vitest";
import { vendorRunView } from "./domain";

const run = { case_name: "Apartment 12, move-in", your_done: 1, your_total: 2 };
const tasks = [
  { id: "t3", name: "Order cleaning", section_name: "Before move-in", is_required: false, status: "done" },
  { id: "t4", name: "Hand over the keys", section_name: "Move-in day", is_required: true, status: "to_do" },
];

describe("vendorRunView", () => {
  it("AC-VENDOR-11: заголовок — назва випадку і «Your tasks: 1 of 2 done»; без статусу запуску, шаблону й версії", () => {
    const view = vendorRunView(run, tasks);
    expect(view).toMatchObject({ kind: "run", title: "Apartment 12, move-in", yourTasks: "Your tasks: 1 of 2 done" });
    expect(Object.keys(view).sort()).toEqual(["kind", "tasks", "title", "yourTasks"]);
  });

  it("AC-VENDOR-04: кожна задача — назва, розділ, «required»/«optional» і статус словом", () => {
    const view = vendorRunView(run, tasks);
    expect(view.kind === "run" && view.tasks).toEqual([
      { name: "Order cleaning", section: "Before move-in", required: "optional", status: "done" },
      { name: "Hand over the keys", section: "Move-in day", required: "required", status: "to do" },
    ]);
  });

  it("AC-VENDOR-06: запуску немає серед запусків вендора — «Run not found» і жодної задачі", () => {
    expect(vendorRunView(null, [])).toEqual({ kind: "not-found", message: "Run not found" });
    expect(vendorRunView(null, tasks)).toEqual({ kind: "not-found", message: "Run not found" });
  });
});
