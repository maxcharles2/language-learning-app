import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import ProgressDashboard from "@/components/progress/progress-dashboard"

export default async function ProgressPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      <ProgressDashboard userId={user.id} />
    </div>
  )
}
