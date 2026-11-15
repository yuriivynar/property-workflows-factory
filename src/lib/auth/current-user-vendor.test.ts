// Задача vendor-list: вендор — дійсна роль застосунку. Без цього сторінка /runs не відкривається вендору (AC-VENDOR-03,
// AC-VENDOR-10). Контракт (дослівно — в intent): currentUser() з src/lib/auth/require-role.ts повертає
// { ok: true, userId, role: "vendor" } для профілю з роллю vendor; requireAdmin() вендору — NOT_ALLOWED.
import { describe, expect, it } from "vitest";
import { currentUser, requireAdmin } from "./require-role";

function clientWithRole(role: string | null, userId: string | null = "user-v") {
  const chain = {
    select: () => chain,
    eq: () => chain,
    maybeSingle: async () => ({ data: role ? { role } : null, error: null }),
  };
  return {
    auth: { getClaims: async () => ({ data: userId ? { claims: { sub: userId } } : null }) },
    from: () => chain,
  } as unknown as Parameters<typeof currentUser>[0];
}

describe("currentUser: роль vendor", () => {
  it("AC-VENDOR-03: вендор, що увійшов, — дійсний користувач з роллю vendor (роль — з profiles)", async () => {
    expect(await currentUser(clientWithRole("vendor"))).toEqual({ ok: true, userId: "user-v", role: "vendor" });
  });

  it("AC-VENDOR-10: вендор без задач теж відкриває свій список — роль приймається, а не «NOT_ALLOWED»", async () => {
    const user = await currentUser(clientWithRole("vendor", "user-empty"));
    expect(user.ok).toBe(true);
  });

  it("AC-VENDOR-03: вендор не адміністратор — requireAdmin відмовляє", async () => {
    expect(await requireAdmin(clientWithRole("vendor"))).toEqual({ ok: false, reason: "NOT_ALLOWED" });
  });
});
