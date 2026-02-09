import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useProfile } from "@/hooks/useProfile"
import { useAuth } from "@/contexts/AuthContext"
import { useTranslation } from "react-i18next"
import {
    User,
    Mail,
    Phone,
    MapPin,
    Shield,
    Bell,
    Wallet,
    TrendingUp,
    Settings,
    CheckCircle2,
    Edit2,
    Save,
    X
} from "lucide-react"

export default function ProfilePage() {
    const { t, i18n } = useTranslation()
    const isRTL = i18n.language === 'ar'
    const { profile, loading, error, updateProfile } = useProfile()
    const { user } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)

    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        nationality: "",
        risk_profile: ""
    })

    // Update form data when profile loads
    useEffect(() => {
        if (profile) {
            setFormData({
                full_name: profile.full_name || "",
                phone: profile.phone || "",
                nationality: profile.nationality || "",
                risk_profile: profile.risk_profile || ""
            })
        }
    }, [profile])

    const handleSave = async () => {
        setSaving(true)
        const { error } = await updateProfile(formData)
        setSaving(false)

        if (!error) {
            setIsEditing(false)
        }
    }

    const handleCancel = () => {
        if (profile) {
            setFormData({
                full_name: profile.full_name || "",
                phone: profile.phone || "",
                nationality: profile.nationality || "",
                risk_profile: profile.risk_profile || ""
            })
        }
        setIsEditing(false)
    }

    if (loading) {
        return (
            <div className="container py-10">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center space-y-3">
                        <div className="h-12 w-12 mx-auto rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                        <p className="text-muted-foreground">{t('profile.loading')}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-10">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Card className="max-w-md">
                        <CardContent className="pt-6">
                            <p className="text-red-500 text-center">Error: {error}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Header with Profile Avatar */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="h-24 w-24 border-4 border-white/30 shadow-2xl">
                            <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-indigo-500">
                                {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-center md:text-start space-y-2">
                            <h1 className="text-3xl md:text-4xl font-bold">
                                {profile?.full_name || 'User'}
                            </h1>
                            <p className="text-blue-100 flex items-center gap-2 justify-center md:justify-start">
                                <Mail className="h-4 w-4" />
                                {user?.email}
                            </p>
                            <div className="flex gap-2 justify-center md:justify-start">
                                <Badge className="bg-white/20 text-white border-white/40">
                                    <CheckCircle2 className={`h-3 w-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                    Verified Account
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <Tabs defaultValue="personal" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
                        <TabsTrigger value="personal" className="gap-2">
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">{t('profile.personal_info')}</span>
                            <span className="sm:hidden">Info</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="gap-2">
                            <Shield className="h-4 w-4" />
                            <span className="hidden sm:inline">Security</span>
                            <span className="sm:hidden">Security</span>
                        </TabsTrigger>
                        <TabsTrigger value="preferences" className="gap-2">
                            <Settings className="h-4 w-4" />
                            <span className="hidden sm:inline">Preferences</span>
                            <span className="sm:hidden">Settings</span>
                        </TabsTrigger>
                        <TabsTrigger value="activity" className="gap-2">
                            <TrendingUp className="h-4 w-4" />
                            <span className="hidden sm:inline">Activity</span>
                            <span className="sm:hidden">Activity</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Personal Information Tab */}
                    <TabsContent value="personal" className="space-y-6">
                        <Card className="border-2 shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-blue-600" />
                                        {t('profile.personal_info')}
                                    </CardTitle>
                                    <CardDescription>
                                        Manage your personal details and information
                                    </CardDescription>
                                </div>
                                {!isEditing ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsEditing(true)}
                                        className="gap-2"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                        {t('profile.edit')}
                                    </Button>
                                ) : (
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleCancel}
                                            disabled={saving}
                                            className="gap-2"
                                        >
                                            <X className="h-4 w-4" />
                                            Cancel
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
                                        >
                                            <Save className="h-4 w-4" />
                                            {saving ? "Saving..." : t('profile.save')}
                                        </Button>
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="full_name" className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {t('profile.full_name')}
                                        </Label>
                                        <Input
                                            id="full_name"
                                            value={isEditing ? formData.full_name : (profile?.full_name || "N/A")}
                                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                            disabled={!isEditing}
                                            className="border-2"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            {t('profile.email')}
                                        </Label>
                                        <Input
                                            id="email"
                                            value={profile?.email || "N/A"}
                                            disabled
                                            className="border-2 bg-muted"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            {t('profile.phone')}
                                        </Label>
                                        <Input
                                            id="phone"
                                            value={isEditing ? formData.phone : (profile?.phone || "N/A")}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            disabled={!isEditing}
                                            className="border-2"
                                            placeholder="+966 xxx xxx xxx"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nationality" className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            {t('profile.nationality')}
                                        </Label>
                                        <Input
                                            id="nationality"
                                            value={isEditing ? formData.nationality : (profile?.nationality || "N/A")}
                                            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                            disabled={!isEditing}
                                            className="border-2"
                                            placeholder="Saudi Arabia"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="risk_profile" className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                            {t('profile.risk_profile')}
                                        </Label>
                                        <Input
                                            id="risk_profile"
                                            value={isEditing ? formData.risk_profile : (profile?.risk_profile || "N/A")}
                                            onChange={(e) => setFormData({ ...formData, risk_profile: e.target.value })}
                                            disabled={!isEditing}
                                            className="border-2"
                                            placeholder="Conservative, Moderate, Aggressive"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6">
                        <Card className="border-2 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-blue-600" />
                                    Security Settings
                                </CardTitle>
                                <CardDescription>
                                    Manage your account security and authentication
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-lg border-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                                                <CheckCircle2 className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-green-900 dark:text-green-100">Email Verified</p>
                                                <p className="text-sm text-green-700 dark:text-green-300">Your email address is confirmed</p>
                                            </div>
                                        </div>
                                        <Badge className="bg-green-500">Active</Badge>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-lg border-2">
                                        <div>
                                            <p className="font-semibold">Password</p>
                                            <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                                        </div>
                                        <Button variant="outline" size="sm">Change Password</Button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-lg border-2">
                                        <div>
                                            <p className="font-semibold">Two-Factor Authentication</p>
                                            <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                        </div>
                                        <Button variant="outline" size="sm">Enable</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Preferences Tab */}
                    <TabsContent value="preferences" className="space-y-6">
                        <Card className="border-2 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-blue-600" />
                                    Preferences
                                </CardTitle>
                                <CardDescription>
                                    Customize your experience
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-lg border-2">
                                        <div className="flex items-center gap-3">
                                            <Bell className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-semibold">Email Notifications</p>
                                                <p className="text-sm text-muted-foreground">Receive updates via email</p>
                                            </div>
                                        </div>
                                        <Badge>Enabled</Badge>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-lg border-2">
                                        <div className="flex items-center gap-3">
                                            <Wallet className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="font-semibold">Currency</p>
                                                <p className="text-sm text-muted-foreground">SAR - Saudi Riyal</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">Change</Button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-lg border-2">
                                        <div className="flex items-center gap-3">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                            </svg>
                                            <div>
                                                <p className="font-semibold">Language</p>
                                                <p className="text-sm text-muted-foreground">{i18n.language === 'ar' ? 'العربية' : 'English'}</p>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm">Switch</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Activity Tab */}
                    <TabsContent value="activity" className="space-y-6">
                        <Card className="border-2 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-blue-600" />
                                    Recent Activity
                                </CardTitle>
                                <CardDescription>
                                    Your latest actions and transactions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { action: "Profile Updated", time: "2 hours ago", type: "update" },
                                        { action: "Login from New Device", time: "1 day ago", type: "security" },
                                        { action: "Password Changed", time: "30 days ago", type: "security" }
                                    ].map((activity, index) => (
                                        <div key={index} className="flex items-center gap-4 p-4 rounded-lg border-2 hover:bg-muted/50 transition-colors">
                                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activity.type === 'update' ? 'bg-blue-100 dark:bg-blue-950' :
                                                    'bg-amber-100 dark:bg-amber-950'
                                                }`}>
                                                {activity.type === 'update' ? (
                                                    <Settings className="h-5 w-5 text-blue-600" />
                                                ) : (
                                                    <Shield className="h-5 w-5 text-amber-600" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold">{activity.action}</p>
                                                <p className="text-sm text-muted-foreground">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
