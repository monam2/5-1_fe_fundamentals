import type { MenuCategory } from "@/shared/types";

export function isMenuCategory(value: string | null): value is MenuCategory {
  return value === "커피" || value === "음료" || value === "디저트";
}
