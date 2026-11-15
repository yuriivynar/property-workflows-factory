"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { safeNextPath } from "@/lib/auth/access";
import { landingPath } from "@/lib/auth/nav";
import { currentUser } from "@/lib/auth/require-role";
import { createClient } from "@/lib/supabase/server";

// Вхід email + пароль. Реєстрації в шаблоні немає: користувачів створює
// scripts/create-demo-users.mjs (Admin API), бо вбудований SMTP Supabase
// надсилає лише 2 листи/год і лише членам команди проєкту.
export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  // Сторінка, з якої відвідувача відправили на вхід (AC-DSYS-08); лише шлях цього застосунку.
  const next = safeNextPath(formData.get("next"));
  const back = next === "/" ? "" : `&next=${encodeURIComponent(next)}`;

  if (!email || !password) {
    redirect(`/login?error=missing${back}`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Не показуємо текст помилки Auth: він може підказати, чи існує email.
    redirect(`/login?error=invalid${back}`);
  }

  revalidatePath("/", "layout");
  // Без явно запитаної сторінки виконавець потрапляє до списку запусків (AC-VENDOR-13).
  let target = next;
  if (next === "/") {
    try {
      const user = await currentUser(supabase);
      if (user.ok) target = landingPath(user.role);
    } catch {
      // Роль не прочитано — як раніше, на головну.
    }
  }
  redirect(target);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
