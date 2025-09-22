import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey)

// For server-side operations, we'll use the regular client with service role key
export async function getSupabaseClient() {
  return supabaseAdmin
}

export async function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseServiceKey)
}
