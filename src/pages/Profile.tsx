import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useProfile } from "@/hooks/useProfile"
import { useTranslation } from "react-i18next"

export default function ProfilePage() {
    const { t } = useTranslation()
    const { profile, loading, error, updateProfile } = useProfile()
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        nationality: "",
        risk_profile: ""
    })

    // Update form data when profile loads
    useState(() => {
        if (profile) {
            setFormData({
                full_name: profile.full_name || "",
                phone: profile.phone || "",
                nationality: profile.nationality || "",
                risk_profile: profile.risk_profile || ""
            })
        }
    })

    const handleSave = async () => {
        setSaving(true)
        const { error } = await updateProfile(formData)
        setSaving(false)

        if (!error) {
            setIsEditing(false)
        }
    }

    if (loading) {
        return (
            <div className="container py-10">
                <div className="flex items-center justify-center">
                    <p className="text-muted-foreground">{t('profile.loading')}</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-10">
                <div className="flex items-center justify-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl py-10">
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight">{t('profile.title')}</h1>
                <p className="mt-2 text-muted-foreground">
                    {t('dashboard.welcome')}, {profile?.full_name || 'User'}
                </p>
            </div>

            <div className="grid gap-6">
                {/* Personal Information Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>{t('profile.personal_info')}</CardTitle>
                            <CardDescription>
                                Your account and profile information
                            </CardDescription>
                        </div>
                        {isEditing ? (
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setIsEditing(false)} disabled={saving}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSave} disabled={saving}>
                                    {saving ? "Saving..." : t('profile.save')}
                                </Button>
                            </div>
                        ) : (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>
                                {t('profile.edit')}
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="full_name">{t('profile.full_name')}</Label>
                                <Input
                                    id="full_name"
                                    value={isEditing ? formData.full_name : (profile?.full_name || "N/A")}
                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('profile.email')}</Label>
                                <Input
                                    id="email"
                                    value={profile?.email || "N/A"}
                                    disabled
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">{t('profile.phone')}</Label>
                                <Input
                                    id="phone"
                                    value={isEditing ? formData.phone : (profile?.phone || "N/A")}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nationality">{t('profile.nationality')}</Label>
                                <Input
                                    id="nationality"
                                    value={isEditing ? formData.nationality : (profile?.nationality || "N/A")}
                                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="risk_profile">{t('profile.risk_profile')}</Label>
                                <Input
                                    id="risk_profile"
                                    value={isEditing ? formData.risk_profile : (profile?.risk_profile || "N/A")}
                                    onChange={(e) => setFormData({ ...formData, risk_profile: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Account Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Account Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Verification Status</p>
                                <p className="text-xs text-muted-foreground">Your account is verified</p>
                            </div>
                            <Badge variant="default">Verified</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
