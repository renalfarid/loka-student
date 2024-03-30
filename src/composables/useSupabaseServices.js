import { createClient } from '@supabase/supabase-js'

let supabaseInstance = null

export function useSupabaseServices() {   
    if (!supabaseInstance) {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
        const supabaseSecurityKey = import.meta.env.VITE_SUPABASE_SECURITY_KEY

        supabaseInstance = createClient(supabaseUrl, supabaseSecurityKey)
    }

    return supabaseInstance
}