import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"

export function FinancingRequestForm() {
    const { t } = useTranslation()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const [formData, setFormData] = useState({
        assetValue: 100000,
        downPayment: 20000,
        duration: 60,
        productType: 'auto',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user) {
            alert(t('common.pleaseLogin') || 'Please login first')
            return
        }

        setLoading(true)
        setSuccess(false)

        try {
            const { error } = await supabase
                .from('financing_requests')
                .insert([
                    {
                        user_id: user.id,
                        asset_value: formData.assetValue,
                        down_payment: formData.downPayment,
                        duration_months: formData.duration,
                        status: 'pending',
                    }
                ])

            if (error) throw error

            setSuccess(true)
            // Reset form
            setFormData({
                assetValue: 100000,
                downPayment: 20000,
                duration: 60,
                productType: 'auto',
            })
        } catch (error) {
            console.error('Error submitting financing request:', error)
            alert(t('common.error') || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const financingAmount = formData.assetValue - formData.downPayment

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{t('financing.applyNow') || 'Apply for Financing'}</CardTitle>
                <CardDescription>
                    {t('financing.applyDescription') || 'Fill out the form to submit your financing request'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="productType">{t('financing.productType') || 'Product Type'}</Label>
                        <select
                            id="productType"
                            value={formData.productType}
                            onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                        >
                            <option value="auto">{t('financing.types.auto') || 'Auto Financing'}</option>
                            <option value="real_estate">{t('financing.types.realEstate') || 'Real Estate'}</option>
                            <option value="personal">{t('financing.types.personal') || 'Personal'}</option>
                            <option value="business">{t('financing.types.business') || 'Business'}</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="assetValue">{t('financing.assetValue') || 'Asset Value (SAR)'}</Label>
                        <Input
                            id="assetValue"
                            type="number"
                            value={formData.assetValue}
                            onChange={(e) => setFormData({ ...formData, assetValue: Number(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="downPayment">{t('financing.downPayment') || 'Down Payment (SAR)'}</Label>
                        <Input
                            id="downPayment"
                            type="number"
                            value={formData.downPayment}
                            onChange={(e) => setFormData({ ...formData, downPayment: Number(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration">{t('financing.duration') || 'Duration (Months)'}</Label>
                        <Input
                            id="duration"
                            type="number"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                            required
                            min={12}
                            max={300}
                        />
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">{t('financing.financingAmount') || 'Financing Amount'}</span>
                                <span className="font-semibold">{financingAmount.toLocaleString()} SAR</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">{t('financing.estimatedMonthly') || 'Estimated Monthly'}</span>
                                <span className="font-semibold">
                                    {Math.round((financingAmount * 1.05) / formData.duration).toLocaleString()} SAR
                                </span>
                            </div>
                        </div>
                    </div>

                    {success && (
                        <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                            {t('financing.requestSubmitted') || 'Your request has been submitted successfully!'}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? (t('common.submitting') || 'Submitting...') : (t('financing.submitRequest') || 'Submit Request')}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
