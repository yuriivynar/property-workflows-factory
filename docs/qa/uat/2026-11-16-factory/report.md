# Звіт UAT — 16.11.2026

- **Застосунок:** https://property-workflows-factory-eight.vercel.app (/api/health: коміт `cd5b90d`)
- **Код тестів:** `HEAD` @ `060e0be`
- **Прогін:** 16.11.2026, 10:08 (Київ), Playwright 377.3 с; AC: 19 — PASS 12, FAIL 7, NEEDS-HUMAN 0
- **Рецензент:** `claude-haiku-5-5`; суперечки → `claude-sonnet-5-5`. Разом за розбір: $0.1970 (ціни API; за підпискою — у межах ліміту плану)
- **Прибирання:** синтетичних uat-*@example.test видалено 41, лишилось 0, їхніх рядків, що лишились: 0
- **Відео й траси:** не в git — `test-results/` локально або артефакт CI; трасу відкриває `npx playwright show-trace <trace.zip>`

| AC | Перевірки | Агент | Підсумок | Чому | Playwright | Розбір |
|---|---|---|---|---|---|---|
| AC-TASK-19 | пройшли | Haiku: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 21.9 с | $0.0026, 7.8 с |
| AC-VENDOR-01 | пройшли | Haiku: NEEDS-HUMAN, Sonnet: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 26.7 с | $0.0390, 26.9 с |
| AC-VENDOR-02 | пройшли | Haiku: NEEDS-HUMAN, Sonnet: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 17.7 с | $0.0471, 22.5 с |
| AC-VENDOR-03 | впали | Haiku: PASS | **FAIL** | R1: перевірка впала — FAIL завжди, агент не перекриває | 16.8 с | $0.0022, 8.0 с |
| AC-VENDOR-04 | впали | Haiku: PASS | **FAIL** | R1: перевірка впала — FAIL завжди, агент не перекриває | 21.0 с | $0.0025, 9.2 с |
| AC-VENDOR-05 | впали | Haiku: PASS | **FAIL** | R1: перевірка впала — FAIL завжди, агент не перекриває | 17.5 с | $0.0023, 6.7 с |
| AC-VENDOR-06 | пройшли | Haiku: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 13.0 с | $0.0024, 7.8 с |
| AC-VENDOR-07 | пройшли | Haiku: NEEDS-HUMAN, Sonnet: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 16.5 с | $0.0394, 23.4 с |
| AC-VENDOR-08 | пройшли | Haiku: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 10.1 с | $0.0021, 7.4 с |
| AC-VENDOR-09 | впали | Haiku: PASS | **FAIL** | R1: перевірка впала — FAIL завжди, агент не перекриває | 21.0 с | $0.0023, 9.0 с |
| AC-VENDOR-10 | пройшли | Haiku: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 8.6 с | $0.0021, 5.5 с |
| AC-VENDOR-11 | впали | Haiku: PASS | **FAIL** | R1: перевірка впала — FAIL завжди, агент не перекриває | 16.4 с | $0.0024, 7.7 с |
| AC-VENDOR-12 | впали | Haiku: PASS | **FAIL** | R1: перевірка впала — FAIL завжди, агент не перекриває | 19.5 с | $0.0020, 6.7 с |
| AC-VENDOR-13 | пройшли | Haiku: NEEDS-HUMAN, Sonnet: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 9.8 с | $0.0343, 19.8 с |
| AC-VENDOR-14 | пройшли | Haiku: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 23.1 с | $0.0037, 10.2 с |
| AC-VENDOR-15 | пройшли | Haiku: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 20.9 с | $0.0025, 10.2 с |
| AC-VENDOR-16 | впали | Haiku: NEEDS-HUMAN | **FAIL** | R1: перевірка впала — FAIL завжди, агент не перекриває | 17.2 с | $0.0021, 8.7 с |
| AC-VENDOR-17 | пройшли | Haiku: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 16.6 с | $0.0023, 7.3 с |
| AC-VENDOR-18 | пройшли | Haiku: PASS | **PASS** | R6: перевірки, агент і цитати збігаються | 20.0 с | $0.0037, 11.3 с |

## AC-TASK-19 — PASS

**Тест:** AC-TASK-19: виконавець позначає необов'язкову задачу «to do» запуску «completed» — задача «done», запуск лишається «completed», прогрес її рахує

**Критерій** (requirements/3-complete-tasks-and-track-run-progress.md):

> AC-TASK-19: Given a run with status "completed" that has the optional task "Order a part" with status "to do", and the assignee of this task. When the assignee marks "Order a part" as done. Then the task has status "done", the run stays "completed", and the progress counts the task as done.

![Кадр «Тоді» 1](frames/AC-TASK-19-then-1.png)

**Кроки:** ✔ Дано: a run with status "completed" that has the optional task "Order a part" with status "to do", and the assignee of this task → ✔ Коли: the assignee marks "Order a part" as done → ✔ Тоді: the task has status "done", the run stays "completed", and the progress counts the task as done.

**Агент (claude-haiku-5-5, PASS):** На кадрі frame-then-1.png у рядку «Order a part (optional)» видно бейдж «done», статус запуску — «completed», а прогрес — «3 of 3 done». Усі три видимі частини «Тоді» збігаються з критерієм посимвольно. Частини «до дії» та база даних не оцінювалися, бо їх немає на кадрі.

**Цитати агента, звірені зі сторінкою (aria):**
- «Order a part (optional)» — є на сторінці
- «done» — є на сторінці
- «Status» — є на сторінці
- «completed» — є на сторінці
- «Progress» — є на сторінці
- «3 of 3 done» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/optional-after-completed-A-0a10c-completed»-прогрес-її-рахує-chromium/video.webm` · **траса:** `test-results/artifacts/optional-after-completed-A-0a10c-completed»-прогрес-її-рахує-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-TASK-19 — …») · @login: ____

## AC-VENDOR-01 — PASS

**Тест:** AC-VENDOR-01: менеджер A запускає «Tenant move-in» для «Apartment 12, move-in» і призначає вендора V на задачі 3 і 4 — вони за V, а задачі 1, 2 і 5 за A

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-01: Given manager A, vendor V and the template "Tenant move-in" with 5 tasks. When A launches the template for the case "Apartment 12, move-in" and assigns V as the assignee of tasks 3 and 4. Then tasks 3 and 4 have V as the assignee, and tasks 1, 2 and 5 have A.

![Кадр «Тоді» 1](frames/AC-VENDOR-01-then-1.png)

**Кроки:** ✔ Дано: manager A, vendor V and the template "Tenant move-in" with 5 tasks → ✔ Коли: A launches the template for the case "Apartment 12, move-in" and assigns V as the assignee of tasks 3 and 4 → ✔ Тоді: tasks 3 and 4 have V as the assignee, and tasks 1, 2 and 5 have A.

**Агент (claude-sonnet-5-5, PASS):** На кадрі заголовок «Apartment 12, move-in». Задачі «Order cleaning» і «Hand over the keys» мають виконавця ...-v01-vnd@example.test, а «Sign the lease», «Collect the deposit» і «Record meter readings» — ...-v01-mgr-a@example.test. Імена email відповідають V і A.

Haiku сказав NEEDS-HUMAN, тож розбір повторив Sonnet; рішення агента — за Sonnet.

**Цитати агента, звірені зі сторінкою (aria):**
- «Apartment 12, move-in» — є на сторінці
- «Order cleaning» — є на сторінці
- «uat-261116080809-v01-vnd@example.test» — є на сторінці
- «Hand over the keys» — є на сторінці
- «uat-261116080809-v01-vnd@example.test» — є на сторінці
- «Sign the lease» — є на сторінці
- «uat-261116080809-v01-mgr-a@example.test» — є на сторінці
- «Collect the deposit» — є на сторінці
- «uat-261116080809-v01-mgr-a@example.test» — є на сторінці
- «Record meter readings» — є на сторінці
- «uat-261116080809-v01-mgr-a@example.test» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/vendor-assign-AC-VENDOR-01-f0642--за-V-а-задачі-1-2-і-5-за-A-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-assign-AC-VENDOR-01-f0642--за-V-а-задачі-1-2-і-5-за-A-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-01 — …») · @login: ____

## AC-VENDOR-02 — PASS

**Тест:** AC-VENDOR-02: у виборі виконавця менеджер A бачить email менеджера B, адміністратора й вендора V — і жодних імен, ролей чи інших даних профілю

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-02: Given managers A and B, an administrator and vendor V, and A launching a template. When A opens the assignee picker. Then A sees the emails of B, of the administrator and of V, and no names, roles or other profile data.

![Кадр «Тоді» 1](frames/AC-VENDOR-02-then-1.png)

**Кроки:** ✔ Дано: managers A and B, an administrator and vendor V, and A launching a template → ✔ Коли: A opens the assignee picker → ✔ Тоді: A sees the emails of B, of the administrator and of V, and no names, roles or other profile data.

**Агент (claude-sonnet-5-5, PASS):** На кадрі /runs/new відкритий список виконавця для задачі «Sign the lease». У ньому є «Me (run manager)» та email-адреси, зокрема email менеджера B (mgr-b), адміністратора (adm) і вендора V (vnd). Імен і ролей у видимому списку немає. Решта задач показує закритий список із «Me (run manager)», тому наявність цих email у списках інших задач на кадрі не перевірити.

Haiku сказав NEEDS-HUMAN, тож розбір повторив Sonnet; рішення агента — за Sonnet.

**Цитати агента, звірені зі сторінкою (aria):**
- «uat-261116080809-v02-mgr-b@example.test» — є на сторінці
- «uat-261116080809-v02-adm@example.test» — є на сторінці
- «uat-261116080809-v02-vnd@example.test» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/vendor-assign-AC-VENDOR-02-6a9c2-олей-чи-інших-даних-профілю-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-assign-AC-VENDOR-02-6a9c2-олей-чи-інших-даних-профілю-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-02 — …») · @login: ____

## AC-VENDOR-03 — FAIL

**Тест:** AC-VENDOR-03: вендор V із двома задачами в «Apartment 12, move-in» і без задач в «Apartment 14, repair» бачить у списку лише перший запуск, його статус і «Your tasks: 0 of 2 done»

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-03: Given vendor V who is the assignee of 2 tasks in the run "Apartment 12, move-in" and of no task in the run "Apartment 14, repair". When V opens the list of runs. Then V sees only the run "Apartment 12, move-in" with its run status and "Your tasks: 0 of 2 done", and does not see "Apartment 14, repair".

![Кадр «Тоді» 1](frames/AC-VENDOR-03-then-1.png)

**Кроки:** ✔ Дано: vendor V who is the assignee of 2 tasks in the run "Apartment 12, move-in" and of no task in the run "Apartment 14, repair" → ✔ Коли: V opens the list of runs → ✘ Тоді: V sees only the run "Apartment 12, move-in" with its run status and "Your tasks: 0 of 2 done", and does not see "Apartment 14, repair".

**Перевірка впала:**

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('run-row').first().getByTestId('your-tasks')
Expected: "Your tasks: 0 of 2 done"
Timeout: 5000ms
Error: element(s) not found

Call log:
```

**Агент (claude-haiku-5-5, PASS):** На кадрі frame-then-1.png (/runs) у таблиці видно один рядок: «Apartment 12, move-in», статус «in progress» і «Your tasks: 0 of 2 done». Другого рядка немає, а «Apartment 14, repair» на кадрі не з'являється; відсутність цього запуску перевіряють автоматичні перевірки, тож я її не оцінював.

**Цитати агента, звірені зі сторінкою (aria):**
- «Apartment 12, move-in» — є на сторінці
- «in progress» — є на сторінці
- «Your tasks: 0 of 2 done» — є на сторінці

**Правило:** R1: перевірка впала — FAIL завжди, агент не перекриває

**Відео:** `test-results/artifacts/vendor-runs-AC-VENDOR-03-в-597b4--і-«Your-tasks-0-of-2-done»-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-runs-AC-VENDOR-03-в-597b4--і-«Your-tasks-0-of-2-done»-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-03 — …») · @login: ____

## AC-VENDOR-04 — FAIL

**Тест:** AC-VENDOR-04: вендор V відкриває «Apartment 12, move-in» (5 задач) і бачить рівно задачі 3 і 4 — назва, розділ, «required» чи «optional» і статус, без чужих задач, email інших користувачів і прогресу всього запуску

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-04: Given vendor V who is the assignee of tasks 3 and 4 in the run "Apartment 12, move-in" (5 tasks). When V opens this run. Then V sees exactly tasks 3 and 4, each with its name, its section, the mark "required" or "optional" and its status, and does not see tasks 1, 2 and 5, the emails of other users or the progress of the whole run.

![Кадр «Тоді» 1](frames/AC-VENDOR-04-then-1.png)

**Кроки:** ✔ Дано: vendor V who is the assignee of tasks 3 and 4 in the run "Apartment 12, move-in" (5 tasks) → ✔ Коли: V opens this run → ✘ Тоді: V sees exactly tasks 3 and 4, each with its name, its section, the mark "required" or "optional" and its status, and does not see tasks 1, 2 and 5, the emails of other users or the progress of the whole run.

**Перевірка впала:**

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('run-progress')
Expected: 0
Received: 1
Timeout:  5000ms

Call log:
```

**Агент (claude-haiku-5-5, PASS):** На кадрі видно заголовок «Apartment 12, move-in» і рівно дві картки задач: «Order cleaning (optional)» у розділі «Before move-in» і «Hand over the keys (required)» у розділі «Move-in day», обидві зі статусом «to do». Лічильник «Your tasks: 0 of 2 done» стосується лише задач користувача, а не всього запуску; назви задач 1, 2, 5, email і прогрес запуску за правилами не оцінювалися.

**Цитати агента, звірені зі сторінкою (aria):**
- «Your tasks: 0 of 2 done» — є на сторінці
- «Order cleaning (optional)» — є на сторінці
- «Hand over the keys (required)» — є на сторінці
- «Before move-in» — є на сторінці
- «Order cleaning (optional)» — є на сторінці
- «to do» — є на сторінці
- «Move-in day» — є на сторінці
- «Hand over the keys (required)» — є на сторінці
- «to do» — є на сторінці

**Правило:** R1: перевірка впала — FAIL завжди, агент не перекриває

**Відео:** `test-results/artifacts/vendor-runs-AC-VENDOR-04-в-9b0aa-в-і-прогресу-всього-запуску-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-runs-AC-VENDOR-04-в-9b0aa-в-і-прогресу-всього-запуску-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-04 — …») · @login: ____

## AC-VENDOR-05 — FAIL

**Тест:** AC-VENDOR-05: вендор V позначає виконаною свою задачу 3 (не остання обов'язкова) — вона «done», а V бачить «Your tasks: 1 of 2 done»

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-05: Given vendor V who is the assignee of task 3 with status "to do", which is not the last required task of the run "Apartment 12, move-in". When V marks task 3 as done. Then task 3 has status "done", and V sees "Your tasks: 1 of 2 done".

![Кадр «Тоді» 1](frames/AC-VENDOR-05-then-1.png)

**Кроки:** ✔ Дано: vendor V who is the assignee of task 3 with status "to do", which is not the last required task of the run "Apartment 12, move-in" → ✔ Коли: V marks task 3 as done → ✘ Тоді: task 3 has status "done", and V sees "Your tasks: 1 of 2 done".

**Перевірка впала:**

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('your-tasks')
Expected: "Your tasks: 1 of 2 done"
Timeout: 5000ms
Error: element(s) not found

Call log:
```

**Агент (claude-haiku-5-5, PASS):** На кадрі сторінки «Apartment 12, move-in» у розділі «Before move-in» задача «Order cleaning (optional)» має статус «done», а під заголовком видно «Your tasks: 1 of 2 done». Номер задачі на кадрі не показано, тож відповідність «Order cleaning» задачі 3 взята з ac.md; це не розходиться з кадром.

**Цитати агента, звірені зі сторінкою (aria):**
- «Order cleaning (optional)» — є на сторінці
- «done» — є на сторінці
- «Your tasks: 1 of 2 done» — є на сторінці

**Правило:** R1: перевірка впала — FAIL завжди, агент не перекриває

**Відео:** `test-results/artifacts/vendor-runs-AC-VENDOR-05-в-e392a-ть-«Your-tasks-1-of-2-done»-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-runs-AC-VENDOR-05-в-e392a-ть-«Your-tasks-1-of-2-done»-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-05 — …») · @login: ____

## AC-VENDOR-06 — PASS

**Тест:** AC-VENDOR-06: вендор V за прямим посиланням на «Apartment 14, repair», де в нього немає задач, бачить «Run not found» і жодної задачі запуску

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-06: Given the run "Apartment 14, repair" in which vendor V has no task. When V opens the page of this run by a direct link. Then V sees the message "Run not found" and none of the tasks of the run.

![Кадр «Тоді» 1](frames/AC-VENDOR-06-then-1.png)

**Кроки:** ✔ Дано: the run "Apartment 14, repair" in which vendor V has no task → ✔ Коли: V opens the page of this run by a direct link → ✔ Тоді: V sees the message "Run not found" and none of the tasks of the run.

**Агент (claude-haiku-5-5, PASS):** На кадрі frame-then-1.png видно сторінку з заголовком «Run not found» і посиланням «Back to runs», написи збігаються з критерієм посимвольно. Частини про відсутність задач і назви запуску на сторінці та про адресу не з кадрів, тому я їх не оцінюю.

**Цитати агента, звірені зі сторінкою (aria):**
- «Run not found» — є на сторінці
- «Back to runs» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/vendor-runs-AC-VENDOR-06-в-f3fdf-nd»-і-жодної-задачі-запуску-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-runs-AC-VENDOR-06-в-f3fdf-nd»-і-жодної-задачі-запуску-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-06 — …») · @login: ____

## AC-VENDOR-07 — PASS

**Тест:** AC-VENDOR-07: вендор V прямим запитом, в обхід сторінок, позначає задачу 1 менеджера A — відмова, задача 1 лишається «to do», V бачить текст AC-TASK-03

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-07: Given the run "Apartment 12, move-in" in which task 1 is assigned to manager A and tasks 3 and 4 to vendor V. When V tries to mark task 1 as done directly, bypassing the pages of the application. Then task 1 stays "to do", and V gets the message "Only the task's assignee, the run manager, or an administrator can mark a task as done".

![Кадр «Тоді» 1](frames/AC-VENDOR-07-then-1.png)

**Кроки:** ✔ Дано: the run "Apartment 12, move-in" in which task 1 is assigned to manager A and tasks 3 and 4 to vendor V → ✔ Коли: V tries to mark task 1 as done directly, bypassing the pages of the application → ✔ Тоді: task 1 stays "to do", and V gets the message "Only the task's assignee, the run manager, or an administrator can mark a task as done".

**Агент (claude-sonnet-5-5, PASS):** На сторінці «Apartment 12, move-in» видно червоне повідомлення з точним текстом критерію. Показано лише дві задачі («Order cleaning», «Hand over the keys»), обидві «to do», а лічильник каже «Your tasks: 0 of 2 done». Номерів задач на кадрі немає, тому відповідність цих двох задач задачам 3 і 4 виведена з кількості, а не побачена напряму.

Haiku сказав NEEDS-HUMAN, тож розбір повторив Sonnet; рішення агента — за Sonnet.

**Цитати агента, звірені зі сторінкою (aria):**
- «Only the task's assignee, the run manager, or an administrator can mark a task as done» — є на сторінці
- «Your tasks: 0 of 2 done» — є на сторінці
- «Order cleaning» — є на сторінці
- «Hand over the keys» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/vendor-forbidden-AC-VENDOR-f562a-»-V-бачить-текст-AC-TASK-03-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-forbidden-AC-VENDOR-f562a-»-V-бачить-текст-AC-TASK-03-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-07 — …») · @login: ____

## AC-VENDOR-08 — PASS

**Тест:** AC-VENDOR-08: вендор V за прямим посиланням на список шаблонів бачить «Not enough rights», посилання «Back to runs» і жодного шаблону

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-08: Given vendor V signed in. When V opens the list of templates by a direct link. Then V sees the message "Not enough rights" and the link "Back to runs", and no template.

![Кадр «Тоді» 1](frames/AC-VENDOR-08-then-1.png)

**Кроки:** ✔ Дано: vendor V signed in → ✔ Коли: V opens the list of templates by a direct link → ✔ Тоді: V sees the message "Not enough rights" and the link "Back to runs", and no template.

**Агент (claude-haiku-5-5, PASS):** На кадрі frame-then-1.png видно заголовок «Not enough rights» і посилання «Back to runs» під ним, а на сторінці немає жодної таблиці чи рядків шаблонів. Обидві видимі частини «Тоді» збігаються з критерієм посимвольно. Частини «Не з кадрів» (відсутність шаблонів у даних, адреса на тому самому місці) не оцінювались.

**Цитати агента, звірені зі сторінкою (aria):**
- «Not enough rights» — є на сторінці
- «Back to runs» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/vendor-forbidden-AC-VENDOR-28ad3--to-runs»-і-жодного-шаблону-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-forbidden-AC-VENDOR-28ad3--to-runs»-і-жодного-шаблону-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-08 — …») · @login: ____

## AC-VENDOR-09 — FAIL

**Тест:** AC-VENDOR-09: вендор V прямим запитом, в обхід сторінок, запускає «Tenant move-in» — запуск не створено, список запусків не змінився

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-09: Given vendor V signed in and the template "Tenant move-in" with current version 1. When V tries to launch this template directly, bypassing the pages of the application. Then no run is created, and the list of runs does not change.

![Кадр «Тоді» 1](frames/AC-VENDOR-09-then-1.png)

**Кроки:** ✔ Дано: vendor V signed in and the template "uat-261116080809-v09-tpl" (the tasks of "Tenant move-in") with current version 1 → ✔ Коли: V tries to launch this template directly, bypassing the pages of the application → ✘ Тоді: no run is created, and the list of runs does not change.

**Перевірка впала:**

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('run-row').first().getByTestId('your-tasks')
Expected: "Your tasks: 0 of 2 done"
Timeout: 5000ms
Error: element(s) not found

Call log:
```

**Агент (claude-haiku-5-5, PASS):** На кадрі /runs видно лише один рядок у таблиці: «Apartment 12, move-in», статус «in progress», «Your tasks: 0 of 2 done». Рядка «Apartment 16, move-in» немає, тож друга частина виконана. Кадру «до» немає, тому порівняти список із початковим станом за самим кадром неможливо; оцінка спирається на те, що видно в момент «Тоді».

**Цитати агента, звірені зі сторінкою (aria):**
- «Apartment 12, move-in» — є на сторінці
- «Your tasks: 0 of 2 done» — є на сторінці
- «Apartment 12, move-in» — є на сторінці

**Правило:** R1: перевірка впала — FAIL завжди, агент не перекриває

**Відео:** `test-results/artifacts/vendor-forbidden-AC-VENDOR-01f35-список-запусків-не-змінився-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-forbidden-AC-VENDOR-01f35-список-запусків-не-змінився-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-09 — …») · @login: ____

## AC-VENDOR-10 — PASS

**Тест:** AC-VENDOR-10: вендор V, якому не призначено жодної задачі, відкриває список запусків і бачить «No tasks assigned to you yet.» без порожньої таблиці

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-10: Given vendor V to whom no task is assigned. When V opens the list of runs. Then V sees the message "No tasks assigned to you yet." and no empty table.

![Кадр «Тоді» 1](frames/AC-VENDOR-10-then-1.png)

**Кроки:** ✔ Дано: vendor V to whom no task is assigned → ✔ Коли: V opens the list of runs → ✔ Тоді: V sees the message "No tasks assigned to you yet." and no empty table.

**Агент (claude-haiku-5-5, PASS):** На кадрі сторінки /runs (заголовок «Runs») видно текст «No tasks assigned to you yet.» — слово в слово, з крапкою в кінці. Таблиці чи рядків запусків на кадрі немає; відсутність таблиці та чужого запуску не оцінювалася, бо це поза кадрами.

**Цитати агента, звірені зі сторінкою (aria):**
- «No tasks assigned to you yet.» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/vendor-runs-AC-VENDOR-10-в-75084-yet-»-без-порожньої-таблиці-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-runs-AC-VENDOR-10-в-75084-yet-»-без-порожньої-таблиці-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-10 — …») · @login: ____

## AC-VENDOR-11 — FAIL

**Тест:** AC-VENDOR-11: вендор V із задачами 3 («done») і 4 («to do») відкриває «Apartment 12, move-in» — заголовок сторінки — назва випадку, «Your tasks: 1 of 2 done», без статусу запуску, назви й версії шаблону

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-11: Given vendor V who is the assignee of tasks 3 ("done") and 4 ("to do") in the run "Apartment 12, move-in" (5 tasks). When V opens this run. Then V sees the case name "Apartment 12, move-in" as the title of the page and "Your tasks: 1 of 2 done", and does not see the run status, the template name or the template version.

![Кадр «Тоді» 1](frames/AC-VENDOR-11-then-1.png)

**Кроки:** ✔ Дано: vendor V who is the assignee of tasks 3 ("done") and 4 ("to do") in the run "Apartment 12, move-in" (5 tasks) → ✔ Коли: V opens this run → ✘ Тоді: V sees the case name "Apartment 12, move-in" as the title of the page and "Your tasks: 1 of 2 done", and does not see the run status, the template name or the template version.

**Перевірка впала:**

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('your-tasks')
Expected: "Your tasks: 1 of 2 done"
Timeout: 5000ms
Error: element(s) not found

Call log:
```

**Агент (claude-haiku-5-5, PASS):** На кадрі frame-then-1.png видно заголовок «Apartment 12, move-in» і рядок «Your tasks: 1 of 2 done» під ним, обидва текстуально збігаються з критерієм. Статус запуску та назву шаблону на кадрі не видно, але за правилами це частина «Не з кадрів», тому її не оцінюю.

**Цитати агента, звірені зі сторінкою (aria):**
- «Apartment 12, move-in» — є на сторінці
- «Your tasks: 1 of 2 done» — є на сторінці

**Правило:** R1: перевірка впала — FAIL завжди, агент не перекриває

**Відео:** `test-results/artifacts/vendor-runs-AC-VENDOR-11-в-96627-уску-назви-й-версії-шаблону-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-runs-AC-VENDOR-11-в-96627-уску-назви-й-версії-шаблону-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-11 — …») · @login: ____

## AC-VENDOR-12 — FAIL

**Тест:** AC-VENDOR-12: вендор V відкриває список запусків — рядок «Apartment 12, move-in» показує назву випадку, статус запуску й «Your tasks: 0 of 2 done», без назви шаблону «Tenant move-in»

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-12: Given vendor V who is the assignee of 2 tasks in the run "Apartment 12, move-in", launched from the template "Tenant move-in". When V opens the list of runs. Then the row of this run shows the case name, the run status and "Your tasks: 0 of 2 done", and does not show the template name "Tenant move-in".

![Кадр «Тоді» 1](frames/AC-VENDOR-12-then-1.png)

**Кроки:** ✔ Дано: vendor V who is the assignee of 2 tasks in the run "Apartment 12, move-in", launched from the template "Tenant move-in" → ✔ Коли: V opens the list of runs → ✘ Тоді: the row of this run shows the case name, the run status and "Your tasks: 0 of 2 done", and does not show the template name "Tenant move-in".

**Перевірка впала:**

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('run-row').first().getByTestId('your-tasks')
Expected: "Your tasks: 0 of 2 done"
Timeout: 5000ms
Error: element(s) not found

Call log:
```

**Агент (claude-haiku-5-5, PASS):** На кадрі /runs з одним рядком: назва випадку «Apartment 12, move-in», статус у бейджі «in progress» і «Your tasks: 0 of 2 done» у колонці Your tasks. Назви шаблону «Tenant move-in» у рядку не видно; за правилами це не оцінюю, бо це частина «Не з кадрів».

**Цитати агента, звірені зі сторінкою (aria):**
- «Apartment 12, move-in» — є на сторінці
- «in progress» — є на сторінці
- «Your tasks: 0 of 2 done» — є на сторінці

**Правило:** R1: перевірка впала — FAIL завжди, агент не перекриває

**Відео:** `test-results/artifacts/vendor-runs-AC-VENDOR-12-в-7c4c2-ви-шаблону-«Tenant-move-in»-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-runs-AC-VENDOR-12-в-7c4c2-ви-шаблону-«Tenant-move-in»-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-12 — …») · @login: ____

## AC-VENDOR-13 — PASS

**Тест:** AC-VENDOR-13: вендор V входить — бачить список запусків, а навігація показує лише «Runs» і «Profile»

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-13: Given vendor V who is the assignee of 2 tasks in the run "Apartment 12, move-in". When V signs in. Then V sees the list of runs, and the navigation shows only "Runs" and "Profile".

![Кадр «Тоді» 1](frames/AC-VENDOR-13-then-1.png)

**Кроки:** ✔ Дано: vendor V who is the assignee of 2 tasks in the run "Apartment 12, move-in" → ✔ Коли: V signs in → ✔ Тоді: V sees the list of runs, and the navigation shows only "Runs" and "Profile".

**Агент (claude-sonnet-5-5, PASS):** На кадрі сторінка «Runs» з рядком «Apartment 12, move-in», статус «in progress», «Your tasks: 0 of 2 done». У верхній навігації посилання лише «Runs» і «Profile». Поруч є перемикач «Theme» з випадним списком «System»: це елемент керування темою, а не пункт навігації.

Haiku сказав NEEDS-HUMAN, тож розбір повторив Sonnet; рішення агента — за Sonnet.

**Цитати агента, звірені зі сторінкою (aria):**
- «Runs» — є на сторінці
- «Apartment 12, move-in» — є на сторінці
- «Runs» — є на сторінці
- «Profile» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/vendor-runs-AC-VENDOR-13-в-9311d-зує-лише-«Runs»-і-«Profile»-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-runs-AC-VENDOR-13-в-9311d-зує-лише-«Runs»-і-«Profile»-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-13 — …») · @login: ____

## AC-VENDOR-14 — PASS

**Тест:** AC-VENDOR-14: вендор V за прямим посиланням на форму запуску, сторінку шаблону, список версій і редактор бачить «Not enough rights» і «Back to runs», без вмісту шаблону

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-14: Given vendor V signed in. When V opens the launch form, the page of a template, the list of versions or the editor by a direct link. Then V sees the message "Not enough rights" and the link "Back to runs", and no content of the template.

![Кадр «Тоді» 1](frames/AC-VENDOR-14-then-1.png)
![Кадр «Тоді» 2](frames/AC-VENDOR-14-then-2.png)
![Кадр «Тоді» 3](frames/AC-VENDOR-14-then-3.png)
![Кадр «Тоді» 4](frames/AC-VENDOR-14-then-4.png)

**Кроки:** ✔ Дано: vendor V signed in → ✔ Коли: V opens the launch form by a direct link → ✔ Тоді: V sees the message "Not enough rights" and the link "Back to runs", and no content of the template (the launch form). → ✔ Коли: V opens the page of a template by a direct link → ✔ Тоді: V sees the message "Not enough rights" and the link "Back to runs", and no content of the template (the page of a template). → ✔ Коли: V opens the list of versions by a direct link → ✔ Тоді: V sees the message "Not enough rights" and the link "Back to runs", and no content of the template (the list of versions). → ✔ Коли: V opens the editor by a direct link → ✔ Тоді: V sees the message "Not enough rights" and the link "Back to runs", and no content of the template (the editor).

**Агент (claude-haiku-5-5, PASS):** На всіх чотирьох кадрах (сторінка запуску, шаблону, версій і редактора) видно однаковий екран з написом «Not enough rights» і посиланням «Back to runs». Жодного вмісту шаблону, форм чи таблиць на кадрах немає. Адресу посилання та інші «Не з кадрів» частини не оцінювались.

**Цитати агента, звірені зі сторінкою (aria):**
- «Not enough rights» — є на сторінці
- «Back to runs» — є на сторінці
- «Not enough rights» — є на сторінці
- «Back to runs» — є на сторінці
- «Not enough rights» — є на сторінці
- «Back to runs» — є на сторінці
- «Not enough rights» — є на сторінці
- «Back to runs» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/vendor-forbidden-AC-VENDOR-c5338-to-runs»-без-вмісту-шаблону-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-forbidden-AC-VENDOR-c5338-to-runs»-без-вмісту-шаблону-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-14 — …») · @login: ____

## AC-VENDOR-15 — PASS

**Тест:** AC-VENDOR-15: вендор V прямим запитом, в обхід сторінок, позначає задачу 1 менеджера A в «Apartment 14, repair», де в нього немає задач — задача 1 лишається «to do», V бачить лише «Run not found»

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-15: Given the run "Apartment 14, repair" in which vendor V has no task and task 1 is assigned to manager A. When V tries to mark task 1 as done directly, bypassing the pages of the application. Then task 1 stays "to do", and V gets the message "Run not found".

![Кадр «Тоді» 1](frames/AC-VENDOR-15-then-1.png)

**Кроки:** ✔ Дано: the run "Apartment 14, repair" in which vendor V has no task and task 1 is assigned to manager A → ✔ Коли: V tries to mark task 1 as done directly, bypassing the pages of the application → ✔ Тоді: task 1 stays "to do", and V gets the message "Run not found".

**Агент (claude-haiku-5-5, PASS):** На кадрі видно заголовок «Run not found» і посилання «Back to runs» під ним; списку задач немає, а єдиний інший текст — це навігаційне посилання, а не повідомлення. Окремий текст для «жодної задачі» на кадрі не вимагається, тому цитата для другої частини — лише єдиний додатковий напис. Перевірки «NOT_ALLOWED» і статусу «to_do» в базі не оцінював, бо це не з кадрів.

**Цитати агента, звірені зі сторінкою (aria):**
- «Run not found» — є на сторінці
- «Back to runs» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/vendor-forbidden-AC-VENDOR-85777-бачить-лише-«Run-not-found»-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-forbidden-AC-VENDOR-85777-бачить-лише-«Run-not-found»-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-15 — …») · @login: ____

## AC-VENDOR-16 — FAIL

**Тест:** AC-VENDOR-16: вендор V позначає свою необов'язкову задачу 3 у «Apartment 12, move-in» зі статусом «completed» — «done», «Your tasks: 1 of 1 done», запуск лишається «completed»

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-16: Given the run "Apartment 12, move-in" with status "completed" in which vendor V is the assignee of the optional task 3 with status "to do". When V marks task 3 as done. Then task 3 has status "done", V sees "Your tasks: 1 of 1 done", and the run stays "completed".


**Кроки:** ✘ Дано: the run "Apartment 12, move-in" with status "completed" in which vendor V is the assignee of the optional task 3 with status "to do"

**Перевірка впала:**

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('your-tasks')
Expected: "Your tasks: 0 of 1 done"
Timeout: 5000ms
Error: element(s) not found

Call log:
```

**Агент (claude-haiku-5-5, NEEDS-HUMAN):** Перевірка не може бути завершена: файл frame-then-1.png не знайдено, а journey.md показує, що крок «Дано» (run «Apartment 12, move-in» зі статусом completed і завдання 3 для вендора V) упав. Тому жодна з трьох видимих частин «Тоді» не оцінена; потрібен повторний прогін із кадрами або ручна перевірка.

**Агент бачить вади:**
- Кадр frame-then-1.png відсутній у теці перевірки, тому жодну частину «Тоді» не можна підтвердити з кадрів.
- journey.md фіксує, що крок «Дано» упав ("крок упав"), тобто браузер не дійшов до дії V і стану «Тоді». Кадри «Тоді» за такого прогону не могли бути зняті коректно.

**Правило:** R1: перевірка впала — FAIL завжди, агент не перекриває

**Відео:** `test-results/artifacts/optional-after-completed-A-e6c2b-апуск-лишається-«completed»-chromium/video.webm` · **траса:** `test-results/artifacts/optional-after-completed-A-e6c2b-апуск-лишається-«completed»-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-16 — …») · @login: ____

## AC-VENDOR-17 — PASS

**Тест:** AC-VENDOR-17: вендор V прямим запитом, в обхід сторінок, задач «Apartment 12, move-in» (5 задач) отримує лише задачі 3 і 4

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-17: Given vendor V who is the assignee of tasks 3 and 4 in the run "Apartment 12, move-in" (5 tasks). When V requests the tasks of this run directly, bypassing the pages of the application. Then V receives only tasks 3 and 4.

![Кадр «Тоді» 1](frames/AC-VENDOR-17-then-1.png)

**Кроки:** ✔ Дано: vendor V who is the assignee of tasks 3 and 4 in the run "Apartment 12, move-in" (5 tasks) → ✔ Коли: V requests the tasks of this run directly, bypassing the pages of the application → ✔ Тоді: V receives only tasks 3 and 4.

**Агент (claude-haiku-5-5, PASS):** На кадрі сторінка «Apartment 12, move-in» показує рівно дві картки задач: «Order cleaning (optional)» у блоці «Before move-in» і «Hand over the keys (required)» у блоці «Move-in day». Лічильник «Your tasks: 0 of 2 done» узгоджується з двома задачами. Частини «Не з кадрів» (REST, RPC, фільтр без умов) не оцінювалися.

**Цитати агента, звірені зі сторінкою (aria):**
- «Order cleaning» — є на сторінці
- «Hand over the keys» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/vendor-direct-reads-AC-VEN-7b450-ч-отримує-лише-задачі-3-і-4-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-direct-reads-AC-VEN-7b450-ч-отримує-лише-задачі-3-і-4-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-17 — …») · @login: ____

## AC-VENDOR-18 — PASS

**Тест:** AC-VENDOR-18: вендор V прямим запитом, в обхід сторінок, email і профілів інших користувачів і задач «Apartment 14, repair» не отримує нічого

**Критерій** (requirements/39-assign-a-vendor.md):

> AC-VENDOR-18: Given vendor V who is the assignee of tasks 3 and 4 in the run "Apartment 12, move-in" and of no task in the run "Apartment 14, repair". When V requests directly, bypassing the pages of the application, the emails and profiles of other users and the tasks of "Apartment 14, repair". Then V receives nothing about other users or about "Apartment 14, repair".

![Кадр «Тоді» 1](frames/AC-VENDOR-18-then-1.png)
![Кадр «Тоді» 2](frames/AC-VENDOR-18-then-2.png)
![Кадр «Тоді» 3](frames/AC-VENDOR-18-then-3.png)

**Кроки:** ✔ Дано: vendor V who is the assignee of tasks 3 and 4 in the run "Apartment 12, move-in" and of no task in the run "Apartment 14, repair" → ✔ Коли: V requests directly, bypassing the pages of the application, the emails and profiles of other users and the tasks of "Apartment 14, repair" → ✔ Тоді: V receives nothing about other users → ✔ Коли: V opens the list of runs → ✔ Тоді: or about "Apartment 14, repair". → ✔ Коли: V opens the page of "Apartment 14, repair" by a direct link → ✔ Тоді: V receives nothing about "Apartment 14, repair" (the page of the run by a direct link).

**Агент (claude-haiku-5-5, PASS):** На кадрі 1 (профіль) видно лише власний email V «uat-261116080809-v18-vnd@example.test» і роль vendor, без email інших користувачів. На кадрі 2 (Runs) єдиний рядок — «Apartment 12, move-in»; рядка «Apartment 14, repair» немає. На кадрі 3 (пряме посилання на запуск) видно заголовок «Run not found» і без жодних задач. Усі видимі частини «Тоді» підтверджено.

**Цитати агента, звірені зі сторінкою (aria):**
- «uat-261116080809-v18-vnd@example.test» — є на сторінці
- «Apartment 12, move-in» — є на сторінці
- «Apartment 12, move-in» — є на сторінці
- «Run not found» — є на сторінці

**Правило:** R6: перевірки, агент і цитати збігаються

**Відео:** `test-results/artifacts/vendor-direct-reads-AC-VEN-a5a71-4-repair»-не-отримує-нічого-chromium/video.webm` · **траса:** `test-results/artifacts/vendor-direct-reads-AC-VEN-a5a71-4-repair»-не-отримує-нічого-chromium/trace.zip` (не в git)

**Рішення PM:** ☐ приймаю · ☐ відхилення від вимог (issue «Відхилення від вимог: AC-VENDOR-18 — …») · @login: ____

## Як читати підсумок

- **PASS** — автоматичні перевірки пройшли, агент-рецензент погодився з кадром, а кожну його цитату знайдено на сторінці.
- **FAIL** — впала автоматична перевірка. Агент цього не перекриває: невидимі вади (буфер обміну, база) він на кадрі не побачить.
- **NEEDS-HUMAN** — перевірки зелені, але агент не погодився або його цитати немає на сторінці. Часто це слабкий тест або розбіжність між текстом AC і тестом — питання до PM, а не обов'язково вада продукту.

Правила: R1: перевірка впала — FAIL завжди, агент не перекриває; R2: немає вердикту агента або кадру; R3: перевірки пройшли, агент не погоджується — вирішує людина; R4: цитати агента немає на сторінці (aria) — не підтверджено; R5: помилка сторінки або 5xx під час сценарію; R6: перевірки, агент і цитати збігаються.
