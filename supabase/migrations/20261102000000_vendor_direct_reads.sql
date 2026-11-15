-- Прямі читання підрядника: лише його власні задачі (AC-VENDOR-17, AC-VENDOR-18).
-- runs, run_overview (security_invoker) і run_sections для vendor не повертають рядків; run_tasks — лише де він виконавець.
-- Менеджери й адміністратори — без змін. Сторінки підрядника читають через security definer функції
-- vendor_runs() і vendor_run_tasks(), яких це не стосується.

create or replace function private.can_see_run(p_run_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.runs as r
    where r.id = p_run_id
      and (select private.current_app_role()) is distinct from 'vendor'
      and (
        (select private.current_app_role()) = 'admin'
        or r.run_manager_id = (select auth.uid())
        or exists (
          select 1 from public.run_tasks as t
          where t.run_id = r.id and t.assignee_id = (select auth.uid())
        )
      )
  );
$$;

revoke execute on function private.can_see_run(uuid) from public, anon;
grant execute on function private.can_see_run(uuid) to authenticated;

drop policy run_tasks_select_visible on public.run_tasks;

create policy run_tasks_select_visible
  on public.run_tasks for select to authenticated
  using (
    case
      when (select private.current_app_role()) = 'vendor'
        then assignee_id = (select auth.uid())
      else private.can_see_run(run_id)
    end
  );
