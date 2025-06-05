# إرشادات النشر على Netlify

## الخطوات المطلوبة للنشر:

### 1. ربط المشروع بـ Netlify
- اذهب إلى [Netlify](https://netlify.com)
- انقر على "New site from Git"
- اربط مستودع GitHub الخاص بك
- اختر البرانش المراد نشره

### 2. إعدادات البناء
Netlify سيكتشف تلقائياً الإعدادات من ملف `netlify.toml`:
- **Build command**: `cd frontend && yarn install && yarn build`
- **Publish directory**: `frontend/build`
- **Functions directory**: `netlify/functions`

### 3. متغيرات البيئة المطلوبة
أضف هذه المتغيرات في إعدادات Netlify (Site settings > Environment variables):

```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database
DB_NAME=your_database_name
```

**ملاحظة**: استخدم MongoDB Atlas للحصول على رابط cloud database

### 4. التحقق من النشر
بعد النشر الناجح:
- الصفحة الرئيسية ستكون متاحة على رابط Netlify
- API endpoints ستكون متاحة على: `your-site.netlify.app/api/`
- تحقق من عمل الاتصال بقاعدة البيانات

### 5. الميزات المدعومة
- ✅ SPA Routing (React Router)
- ✅ API Functions (بديل FastAPI)
- ✅ MongoDB Atlas اتصال
- ✅ CORS مُكَوَّن
- ✅ أمان البيانات (لا توجد مفاتيح مكشوفة)

### 6. استكشاف الأخطاء
إذا واجهت مشاكل:
- تحقق من Function logs في Netlify dashboard
- تأكد من صحة متغيرات البيئة
- تحقق من اتصال MongoDB Atlas

### الملفات المهمة:
- `netlify.toml` - تكوين Netlify
- `netlify/functions/api.js` - وظائف Serverless
- `frontend/public/_redirects` - قواعد التوجيه
- `frontend/.env` - متغيرات البيئة للتطوير المحلي