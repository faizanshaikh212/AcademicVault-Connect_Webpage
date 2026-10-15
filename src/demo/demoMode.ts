import type { User } from "@/types";
import { demoUsers } from "./data/demoUsers";

export type DemoMode =
  | "logged-out"
  | "student"
  | "teacher"
  | "admin"
  | "admin-teacher";

export const DEMO_MODE_STORAGE_KEY = "academic-vault-demo-mode";

export const demoModes: { value: DemoMode; label: string }[] = [
  { value: "logged-out", label: "Logged out" },
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher" },
  { value: "admin", label: "Admin" },
  { value: "admin-teacher", label: "Admin + teacher" },
];

export function getDemoMode(): DemoMode {
  const saved = localStorage.getItem(DEMO_MODE_STORAGE_KEY);
  return demoModes.some((mode) => mode.value === saved)
    ? (saved as DemoMode)
    : "student";
}

export function setDemoMode(mode: DemoMode): void {
  localStorage.setItem(DEMO_MODE_STORAGE_KEY, mode);
}

export function getDemoUser(mode = getDemoMode()): User | null {
  if (mode === "logged-out") return null;
  const accountForMode = {
    student: "jane.student",
    teacher: "jack.teacher",
    admin: "john.admin",
    "admin-teacher": "james.admin.teacher",
  } as const;
  const account = demoUsers.find((user) => user.username === accountForMode[mode]);
  if (!account) return null;

  return {
    ...account,
    newsletterSubscription: {
      _id: `subscription-${mode}`,
      isActive: true,
      subscriptionDate: account.updatedAt ?? "2025-04-01T12:00:00.000Z",
    },
  };
}
