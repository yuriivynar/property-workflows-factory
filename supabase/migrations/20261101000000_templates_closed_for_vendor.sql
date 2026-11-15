-- Виконавець не працює з шаблонами (AC-VENDOR-08, AC-VENDOR-14): SELECT-політики templates і template_versions
-- перелічують дозволені ролі явно. template_sections, template_tasks і template_draft_names уже лише для admin.

drop policy templates_select_admin_or_saved on public.templates;

create policy templates_select_admin_or_saved
  on public.templates for select to authenticated
  using (
    (select private.current_app_role()) = 'admin'
    or ((select private.current_app_role()) = 'manager' and current_version is not null)
  );

drop policy template_versions_select_admin_or_current on public.template_versions;

create policy template_versions_select_admin_or_current
  on public.template_versions for select to authenticated
  using (
    (select private.current_app_role()) = 'admin'
    or (
      (select private.current_app_role()) = 'manager'
      and exists (
        select 1 from public.templates as t
        where t.id = template_versions.template_id and t.current_version = template_versions.number
      )
    )
  );
