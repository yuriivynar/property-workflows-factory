-- Сторінка запуску підрядника: лише його задачі в цьому запуску (AC-VENDOR-04, AC-VENDOR-06, AC-VENDOR-11).
-- Без виконавців і email, без інших задач. Викликача визначає auth.uid(); без входу, чужий чи невідомий запуск —
-- порожній результат, не помилка.

create function private.vendor_run_tasks(p_run_id uuid)
returns table (id uuid, name text, section_name text, is_required boolean, status text)
language sql
stable
security definer
set search_path = ''
as $$
  select t.id, t.name, s.name, t.is_required, t.status
  from public.run_tasks as t
  join public.run_sections as s on s.id = t.section_id
  where (select auth.uid()) is not null
    and t.run_id = p_run_id
    and t.assignee_id = (select auth.uid())
  order by s.position, t.position, t.id;
$$;

revoke execute on function private.vendor_run_tasks(uuid) from public, anon;
grant execute on function private.vendor_run_tasks(uuid) to authenticated;

create function public.vendor_run_tasks(p_run_id uuid)
returns table (id uuid, name text, section_name text, is_required boolean, status text)
language sql
stable
security invoker
set search_path = ''
as $$
  select v.id, v.name, v.section_name, v.is_required, v.status from private.vendor_run_tasks(p_run_id) as v;
$$;

revoke execute on function public.vendor_run_tasks(uuid) from public, anon;
grant execute on function public.vendor_run_tasks(uuid) to authenticated;

-- Чи потрібне підтвердження для задачі викликача: це остання обов'язкова задача «to do» запуску (AC-TASK-04, AC-TASK-16).
-- Підрядник не бачить чужих задач, тож відповідь дає база: лише так (true/false) і лише для його власної задачі.
create function private.vendor_task_needs_confirmation(p_task_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((
    select t.is_required
       and t.status <> 'done'
       and not exists (
         select 1 from public.run_tasks as o
         where o.run_id = t.run_id and o.is_required and o.status <> 'done' and o.id <> t.id
       )
    from public.run_tasks as t
    where t.id = p_task_id
      and (select auth.uid()) is not null
      and t.assignee_id = (select auth.uid())
  ), false);
$$;

revoke execute on function private.vendor_task_needs_confirmation(uuid) from public, anon;
grant execute on function private.vendor_task_needs_confirmation(uuid) to authenticated;

create function public.vendor_task_needs_confirmation(p_task_id uuid)
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select private.vendor_task_needs_confirmation(p_task_id);
$$;

revoke execute on function public.vendor_task_needs_confirmation(uuid) from public, anon;
grant execute on function public.vendor_task_needs_confirmation(uuid) to authenticated;
