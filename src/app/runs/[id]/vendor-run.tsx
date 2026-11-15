import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { TextLink } from "@/components/ui/text-link";
import { isUuid, markRefusalMessage, vendorRunView } from "@/lib/runs/domain";
import { LABELS } from "@/lib/runs/messages";
import { createClient } from "@/lib/supabase/server";
import { MarkDoneButton } from "./mark-done-button";
import { RunNotFound } from "./run-not-found";

// Сторінка запуску для підрядника (AC-VENDOR-04, 06, 11): лише vendor_runs() + vendor_run_tasks() + vendorRunView.
// Жодного читання run_overview, run_tasks, шаблону, версії чи довідника колег.
export async function VendorRun({ id, errorCode }: { id: string; errorCode?: string }) {
  const supabase = await createClient();

  let run: { case_name: string; your_done: number; your_total: number } | null = null;
  let tasks: { id: string; name: string; section_name: string; is_required: boolean; status: string }[] = [];
  if (isUuid(id)) {
    const [{ data: runs }, { data: rows }] = await Promise.all([
      supabase.rpc("vendor_runs"),
      supabase.rpc("vendor_run_tasks", { p_run_id: id }),
    ]);
    run = (runs ?? []).find((r) => r.id === id) ?? null;
    tasks = rows ?? [];
  }
  const view = vendorRunView(run, tasks);
  const message =
    errorCode === undefined
      ? undefined
      : markRefusalMessage({ role: "vendor", hasTaskInRun: run !== null, code: errorCode });

  if (view.kind === "not-found") {
    // Заголовок уже «Run not found»: окремий Alert з тим самим текстом не потрібен.
    return <RunNotFound title={view.message} message={message === view.message ? undefined : message} />;
  }

  // Підтвердження останньої обов'язкової задачі запуску вирішує база: підрядник не бачить чужих задач.
  const confirmIds = new Set<string>();
  await Promise.all(
    tasks
      .filter((t) => t.is_required && t.status !== "done")
      .map(async (t) => {
        const { data } = await supabase.rpc("vendor_task_needs_confirmation", { p_task_id: t.id });
        if (data === true) confirmIds.add(t.id);
      }),
  );

  const sections: string[] = [];
  for (const t of view.tasks) if (!sections.includes(t.section)) sections.push(t.section);
  const error = message ?? undefined;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold" data-testid="case-name">
          {view.title}
        </h1>
        <p className="text-sm tabular-nums text-muted-foreground" data-testid="run-progress">
          {view.yourTasks}
        </p>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      {sections.map((section) => (
        <section key={section} className="flex flex-col gap-2">
          <h2 className="text-base font-semibold">{section}</h2>
          <Card className="gap-0 py-0">
            <ul className="flex flex-col divide-y divide-border">
              {view.tasks.map((task, index) =>
                task.section === section ? (
                  <li key={tasks[index].id} data-testid="run-task" className="flex flex-col gap-2 px-4 py-3 text-sm">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span>
                        {task.name} <span className="text-muted-foreground">({task.required})</span>
                      </span>
                      <span className="text-muted-foreground" data-testid="task-status">
                        {task.status}
                      </span>
                    </div>
                    {task.status !== "done" ? (
                      <MarkDoneButton
                        runId={id}
                        taskId={tasks[index].id}
                        taskName={task.name}
                        confirm={confirmIds.has(tasks[index].id)}
                      />
                    ) : null}
                  </li>
                ) : null,
              )}
            </ul>
          </Card>
        </section>
      ))}

      <TextLink href="/runs" className="w-fit text-sm">
        {LABELS.backToRuns}
      </TextLink>
    </main>
  );
}
