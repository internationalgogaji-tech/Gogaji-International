import { redirect } from "next/navigation";

export default function ChildCategoriesPage() {
  redirect("/admin/categories/sub");
}