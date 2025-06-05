# Netlify Full-Stack Application

هذا التطبيق تم إعادة هيكلته للعمل على منصة Netlify.

## الهيكل الجديد

```
/app/
├── frontend/                 # تطبيق React
│   ├── src/
│   ├── public/
│   │   └── _redirects       # ملف التوجيه لـ Netlify
│   ├── package.json
│   └── .env
├── netlify/
│   └── functions/
│       └── api.js           # وظائف Netlify Serverless
├── netlify.toml             # تكوين Netlify
├── package.json             # تبعيات المشروع الرئيسية
└── README.md
```

## المزايا الجديدة

1. **متوافق مع Netlify**: تم تحويل جميع الملفات للعمل على منصة Netlify
2. **Serverless Functions**: تم تحويل الـ backend إلى وظائف Netlify
3. **No API Keys**: لا توجد مفاتيح APIs مكشوفة في الملفات
4. **SPA Routing**: يدعم التوجيه في تطبيقات الصفحة الواحدة
5. **Auto Build**: بناء تلقائي عند النشر

## متغيرات البيئة المطلوبة في Netlify

يجب إضافة هذه المتغيرات في إعدادات Netlify:

- `MONGO_URL`: رابط قاعدة البيانات MongoDB
- `DB_NAME`: اسم قاعدة البيانات

## كيفية النشر على Netlify

1. ربط المستودع بـ Netlify
2. إضافة متغيرات البيئة
3. النشر التلقائي سيحدث

## الملفات التي تم تعديلها

- ✅ إنشاء `netlify.toml` للتكوين
- ✅ تحويل API إلى Netlify Functions
- ✅ تحديث متغيرات البيئة
- ✅ إضافة ملف `_redirects`
- ✅ تحديث تكوين التطبيق

## التطوير المحلي

```bash
# تثبيت التبعيات
yarn install

# تشغيل التطوير مع Netlify
netlify dev

# أو تشغيل الـ frontend فقط
cd frontend && yarn start
```
