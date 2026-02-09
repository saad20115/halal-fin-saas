import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

interface UserProfile {
    id: string
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
                // Try to fetch existing profile
                const { data, error: fetchError } = await supabase
                    .from('user_profiles')
                    .select('*')
                    .eq('id', user.id)
                    .maybeSingle() // Use maybeSingle() instead of single()

                if (fetchError) throw fetchError

                // If profile doesn't exist, create it
                if (!data) {
                    const newProfile = {
                        id: user.id,
                        email: user.email || '',
                        full_name: user.user_metadata?.full_name || '',
                        phone: '',
                        nationality: '',
                        risk_profile: ''
                    }

                    const { data: createdProfile, error: createError } = await supabase
                        .from('user_profiles')
                        .insert([newProfile])
                        .select()
                        .single()

                    if (createError) throw createError

                    setProfile(createdProfile)
                } else {
                    setProfile(data)
                }
            } catch (err: any) {
                console.error('Profile fetch/create error:', err)
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
                .eq('id', user.id)

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
