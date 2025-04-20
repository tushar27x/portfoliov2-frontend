import { redirect } from "next/navigation"

export default function AdminPage() {
  // Redirect to the projects page by default
  redirect("/admin/login")
}
