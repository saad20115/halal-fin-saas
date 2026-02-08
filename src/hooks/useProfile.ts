import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export interface UserProfile {
    id: string
    full_name: string | null
    email: string | null
    phone: string | null
    role: 'user' | 'premium_user' | 'bank_admin' | 'shariah_auditor' | 'investment_partner' | 'super_admin'
    is_premium: boolean
    nationality: string | null
    risk_profile: 'low' | 'medium' | 'high' | null
}

export function useProfile() {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProfile() {
            try {
                const { data: { user } } = await supabase.auth.getUser()

                if (!user) {
                    setLoading(false)
                    return
                }

                const { data, error } = await supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (error) {
                    throw error
                }

                setProfile(data as UserProfile)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    return { profile, loading, error }
}
