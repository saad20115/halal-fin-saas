# إصلاح خطأ RLS Policy

## المشكلة
```
Error: new row violates row-level security policy for table "user_profiles"
```

## السبب
الـ INSERT policy غير مفعّل في قاعدة بيانات Supabase

## الحل السريع ✅

### الطريقة 1: تشغيل SQL في Supabase (موصى به)

1. افتح لوحة تحكم Supabase: https://supabase.com/dashboard
2. اختر مشروعك
3. اذهب إلى **SQL Editor** من القائمة الجانبية
4. انسخ والصق هذا الكود:

```sql
-- Add INSERT policy for user_profiles
create policy "Users can insert own profile" on public.user_profiles
  for insert with check (auth.uid() = id);
```

5. اضغط **Run** أو `Ctrl+Enter`
6. انتظر رسالة النجاح ✅

### الطريقة 2: إعادة تشغيل Schema كامل

إذا أردت إعادة بناء كل شيء من الصفر:

1. في Supabase SQL Editor
2. شغل محتوى الملف: `supabase/schema.sql`
3. **تحذير:** هذا سيحذف كل البيانات الموجودة!

## التحقق من النجاح

بعد تشغيل الـ SQL:
1. سجل خروج من الموقع
2. سجل دخول مرة أخرى
3. افتح صفحة `/profile`
4. يجب أن يعمل بدون أخطاء! ✨

## ملاحظة
الملف `fix_rls_policy.sql` موجود في المشروع للرجوع إليه.
