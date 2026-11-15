-- Список запусків підрядника: лише запуски, де викликач — виконавець хоча б однієї задачі, і лише його прогрес
-- (AC-VENDOR-03, AC-VENDOR-05, AC-VENDOR-10, AC-VENDOR-12, AC-VENDOR-16). Без назви й версії шаблону, менеджера запуску
-- та інших людей. Викликача визначає auth.uid(); без входу — порожній результат.

create function private.vendor_runs()
returns table (id uuid, case_name text, status text, your_done integer, your_total integer)
language sql
stable
security definer
set search_path = ''
as $$
  select r.id,
         r.case_name,
         r.status,
         (count(*) filter (where t.status = 'done'))::integer as your_done,
         count(*)::integer as your_total
  from public.runs as r
  join public.run_tasks as t on t.run_id = r.id
  where (select auth.uid()) is not null
    and t.assignee_id = (select auth.uid())
  group by r.id, r.case_name, r.status, r.created_at
  order by r.created_at desc, r.id;
$$;

revoke execute on function private.vendor_runs() from public, anon;
grant execute on function private.vendor_runs() to authenticated;

create function public.vendor_runs()
returns table (id uuid, case_name text, status text, your_done integer, your_total integer)
language sql
stable
security invoker
set search_path = ''
as $$
  select v.id, v.case_name, v.status, v.your_done, v.your_total from private.vendor_runs() as v;
$$;

revoke execute on function public.vendor_runs() from public, anon;
grant execute on function public.vendor_runs() to authenticated;
