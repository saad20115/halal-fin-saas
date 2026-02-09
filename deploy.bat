@echo off
echo ========================================
echo   خطوات نشر المشروع - Deployment Steps
echo ========================================
echo.

REM التأكد من وجود Git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git غير مثبت! الرجاء تثبيت Git أولاً من: https://git-scm.com
    pause
    exit /b 1
)

echo [1/5] جاري التحقق من Git...
echo.

REM التحقق من وجود remote
git remote -v | findstr "origin" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  تحذير: Remote موجود مسبقاً!
    echo.
    choice /C YN /M "هل تريد إزالة Remote الحالي وإضافة واحد جديد؟ (Y/N)"
    if errorlevel 2 goto :skip_remote
    git remote remove origin
)

echo.
echo [2/5] الرجاء إدخال اسم حساب GitHub الخاص بك:
set /p GITHUB_USERNAME="Username: "

echo.
echo [3/5] جاري إضافة Remote...
git remote add origin https://github.com/%GITHUB_USERNAME%/halal-fin-saas.git
echo ✓ تم إضافة Remote بنجاح!

:skip_remote
echo.
echo [4/5] جاري رفع المشروع على GitHub...
echo سيطلب منك تسجيل الدخول لـ GitHub في المتصفح...
echo.
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ❌ فشل رفع المشروع!
    echo نصائح:
    echo - تأكد من إنشاء Repository على GitHub أولاً
    echo - تأكد من صحة اسم المستخدم
    echo - تأكد من صلاحيات الوصول
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✓ تم رفع المشروع بنجاح!
echo ========================================
echo.
echo الخطوات التالية:
echo.
echo 1. اذهب إلى: https://vercel.com
echo 2. سجل الدخول بحساب GitHub
echo 3. اضغط "New Project"
echo 4. اختر "halal-fin-saas"
echo 5. أضف Environment Variables:
echo    - VITE_SUPABASE_URL
echo    - VITE_SUPABASE_ANON_KEY
echo 6. اضغط "Deploy"
echo.
echo للتفاصيل الكاملة، افتح ملف: DEPLOYMENT.md
echo.
pause
