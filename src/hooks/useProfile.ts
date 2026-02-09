import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

interface UserProfile {
    user_id: string
    email: string
    full_name?: string
    phone?: string
    nationality?: string
    risk_profile?: string
    created_at?: string
    updated_at?: string
}

export function useProfile() {
    const { user } = useAuth()
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!user) {
            setProfile(null)
            setLoading(false)
            return
        }

        async function fetchProfile() {
            if (!user) return

            try {
                const { data, error } = await supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('user_id', user.id)
                    .single()

                if (error) throw error

                setProfile(data)
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [user])

    const updateProfile = async (updates: Partial<UserProfile>) => {
        if (!user) return { error: 'No user logged in' }

        try {
            const { error } = await supabase
                .from('user_profiles')
                .update(updates)
                .eq('user_id', user.id)

            if (error) throw error

            // Update local state
            setProfile((prev) => prev ? { ...prev, ...updates } : null)

            return { error: null }
        } catch (err: any) {
            return { error: err.message }
        }
    }

    return { profile, loading, error, updateProfile }
}
