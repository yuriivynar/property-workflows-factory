-- Роль vendor: зовнішній підрядник може бути виконавцем задач запуску (requirements/39-assign-a-vendor.md;
-- AC-VENDOR-01, AC-VENDOR-02, AC-VENDOR-09). Порядок як у 20261020115700_roles_manager_admin.sql:
--   0) знімаємо старий check; 1) дані не змінюються; 2) default лишається 'manager'; 3) новий check.
-- Запускати шаблони, як і раніше, можуть лише manager і admin: vendor дістає LAUNCH_NOT_ALLOWED.

alter table public.profiles drop constraint profiles_role_check;

-- Наявні дані не змінюються: усі ролі manager і admin лишаються чинними.

alter table public.profiles alter column role set default 'manager';

alter table public.profiles
  add constraint profiles_role_check check (role in ('manager', 'admin', 'vendor'));

-- launch_run: виконавцем задачі може бути manager, admin або vendor. Тіло функції не переписуємо вручну (воно містить
-- довгий набір пробільних символів): беремо чинне визначення і замінюємо в ньому лише перевірку ролі виконавця.
-- Перевірка ролі того, хто запускає (manager або admin), лишається без змін.
do $migration$
declare
  v_def text := pg_get_functiondef('private.launch_run(uuid, text, jsonb, integer)'::regprocedure);
  v_new text;
begin
  v_new := replace(
    v_def,
    'and p.role in (''manager'', ''admin'')',
    'and p.role in (''manager'', ''admin'', ''vendor'')'
  );
  if v_new = v_def then
    raise exception 'launch_run: assignee role check not found';
  end if;
  execute v_new;
end;
$migration$;

-- staff_directory: довідник для вибору виконавця повертає й vendor; поля лише id та email; рядки — лише викликачу
-- з роллю manager або admin.
drop function public.staff_directory();
drop function private.staff_directory();

create function private.staff_directory()
returns table (id uuid, email text)
language sql
stable
security definer
set search_path = ''
as $$
  select p.id, p.email
  from public.profiles as p
  where (select private.current_app_role()) in ('manager', 'admin')
    and p.role in ('manager', 'admin', 'vendor')
  order by p.email;
$$;

revoke execute on function private.staff_directory() from public, anon;
grant execute on function private.staff_directory() to authenticated;

create function public.staff_directory()
returns table (id uuid, email text)
language sql
stable
security invoker
set search_path = ''
as $$
  select d.id, d.email from private.staff_directory() as d;
$$;

revoke execute on function public.staff_directory() from public, anon;
grant execute on function public.staff_directory() to authenticated;
