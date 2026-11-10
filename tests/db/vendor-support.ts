// Спільні хелпери тестів зрізу «вендор» (не тест: Vitest цей файл не запускає). Використовують vendor-*.test.ts.
// Правила, які перевіряють ці тести, виконує база (RLS, GRANT, функції) на справжньому Postgres (PGlite).
import { createTestDb, type TestDb } from "./supabase-pglite";

export const TENANT_MOVE_IN = "10000000-0000-4000-8000-000000000001";
export const REPAIR_REQUEST = "10000000-0000-4000-8000-000000000002";

export type Role = "manager" | "admin" | "vendor";

export async function createVendorWorld() {
  const t: TestDb = await createTestDb();
  const ADMIN = t.users["admin@example.test"];
  const MANAGER_A = t.users["manager.a@example.test"];
  const MANAGER_B = t.users["manager.b@example.test"];
  let counter = 0;

  /** Новий користувач Auth (як це робить create-demo-users: Auth → тригер профілю → service_role ставить роль). */
  async function newUser(role: Role, label: string) {
    counter += 1;
    const id = `b0000000-0000-0000-0000-${String(counter).padStart(12, "0")}`;
    const email = `${label}-${counter}@example.test`;
    await t.db.exec("begin; set local role supabase_auth_admin;");
    try {
      await t.db.query("insert into auth.users (id, email, raw_user_meta_data) values ($1, $2, $3)", [
        id,
        email,
        { full_name: `${label} ${counter}` },
      ]);
      await t.db.exec("commit");
    } catch (error) {
      await t.db.exec("rollback").catch(() => {});
      throw error;
    }
    await t.asService("update public.profiles set role = $2 where id = $1", [id, role]);
    return { id, email };
  }

  const templateTaskIds = async (templateId: string) =>
    (
      await t.asService<{ id: string }>(
        `select tt.id from public.template_tasks as tt join public.template_sections as s on s.id = tt.section_id
         where tt.template_id = $1 order by s.position, tt.position`,
        [templateId],
      )
    ).map((r) => r.id);

  /** Запуск так, як його робить server action: supabase.rpc('launch_run', …) від імені користувача. */
  async function launch(
    userId: string,
    caseName: string,
    assignments: Record<string, string> = {},
    templateId = TENANT_MOVE_IN,
  ) {
    const [row] = await t.asUser<{ id: string }>(userId, "select public.launch_run($1, $2, $3) as id", [
      templateId,
      caseName,
      assignments,
    ]);
    return row.id;
  }

  /** Задачі запуску за порядком шаблону (в обхід RLS — для підготовки й перевірки результату). */
  const runTasks = (runId: string) =>
    t.asService<{ id: string; status: string; assignee_id: string }>(
      `select rt.id, rt.status, rt.assignee_id from public.run_tasks as rt
       join public.run_sections as s on s.id = rt.section_id where rt.run_id = $1 order by s.position, rt.position`,
      [runId],
    );

  const countRuns = async () => (await t.asService<{ n: number }>("select count(*)::int as n from public.runs"))[0].n;

  /** «Apartment 12, move-in»: задачі 3 і 4 — за вендором, решта — за тим, хто запустив. */
  async function apartment12(manager: string, vendor: string, caseName = "Apartment 12, move-in") {
    const ids = await templateTaskIds(TENANT_MOVE_IN);
    const runId = await launch(manager, caseName, { [ids[2]]: vendor, [ids[3]]: vendor });
    return { runId, tasks: await runTasks(runId) };
  }

  return { t, ADMIN, MANAGER_A, MANAGER_B, newUser, launch, runTasks, countRuns, apartment12 };
}

export type VendorWorld = Awaited<ReturnType<typeof createVendorWorld>>;
