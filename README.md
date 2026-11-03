# 🔷 مشروع تعلم OOP باستخدام Node.js + C++

سيستم متكامل لإدارة وتحسيب المساحات بالأشكال الهندسية (Shapes Management System)، مبني بالـ **C++ والـ Node.js** عشان يوضح التطبيق العملي لمبادئ البرمجة الكائنية الأربعة (Object-Oriented Programming).

## 💡 فكرة المشروع (Project Overview)

التطبيق بيحسب مساحات الأشكال الهندسية المختلفة، ومتقسم كالتالي:

* **C++:** مسئول عن بناء الـ Classes، والـ Validation، ومعادلات حساب المساحات بالكامل طبقاً لـ OOP.

* **Node.js:** بيوفر الـ REST API لخدمة الموقع وبيكتلم مع ملف الـ C++ المترجم (Executable).

* **طريقة التواصل:** بيتم نقل البيانات بصيغة JSON عبر الـ Standard Input والـ Standard Output باستخدام `child_process` في Node.js.

## 🛠️ التقنيات المستخدمة (Technologies)

* **C++17**

* **Node.js**

* **TypeScript**

* **Express.js**

* **nlohmann/json** (مكتبة التعامل مع JSON في C++)

* **GCC / MinGW**

* **PowerShell**

## 🧩 تطبيق مبادئ الـ OOP (Object-Oriented Programming)

### 1️⃣ الكبسولة (Encapsulation)

مطبقة في الـ Classes الخاصة بـ `Circle` و `Rectangle`:

* أبعاد الأشكال الهندسية متعرّفة كـ `private properties`.

* الـ Constructors بتهتم بالتجهيز والتأكد من صحة البيانات (Validation).

* استخدام `getter methods` عامة (Public) للوصول للبيانات بشكل آمن ومحكوم.

### 2️⃣ التجريد (Abstraction)

مطبق من خلال الـ Abstract Class الأساسي `Shape`:

* الـ `Shape` بيعرّف Pure Virtual Function اسمها `calculateArea()`.

* كل Class مشتق لازم يكتب التطبيق الخاص بيه للحساب.

* غير مسموح بإنشاء كائن (Object) مباشر من الـ `Shape`.

### 3️⃣ الوراثة (Inheritance)

مطبقة كالتالي:

* `Circle : public Shape`

* `Rectangle : public Shape`

الـ Classes المشتقة بتورث الواجهة الأساسية (Interface) من الـ `Shape`.

### 4️⃣ تعدد الأشكال (Polymorphism)

مطبق باستخدام الـ Virtual Functions ومؤشرات الـ Base Class (`Shape` pointers):

* بيتم التعامل مع أشكال مختلفة من خلال مؤشرات الـ `Shape`.

* كل كائن بينفذ الدالة الخاصة بيه `calculateArea()` وقت التشغيل (Runtime).

## 📂 هيكل المشروع (Project Structure)

```text
NASR_2/
│
├── cpp/
│   ├── include/
│   │   ├── interfaces/
│   │   ├── shapes/
│   │   ├── factories/
│   │   ├── services/
│   │   └── handlers/
│   │
│   ├── src/
│   │   ├── shapes/
│   │   ├── factories/
│   │   ├── services/
│   │   ├── handlers/
│   │   └── main.cpp
│   │
│   ├── tests/
│   └── build/
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   └── shapes/
│   │   ├── routes/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

## 📐 معماريّة التطبيق (Application Architecture)

```text
HTTP Client
    |
    v
Express Routes
    |
    v
Shape Controller
    |
    v
Shape Service (Node.js)
    |
    |  إرسال بيانات JSON عبر stdin
    v
C++ Executable
    |
    v
JsonHandler
    |
    v
ShapeService
    |
    v
ShapeFactory
    |
    +------> Circle
    |
    +------> Rectangle
    |
    v
 إرجاع الاستجابة JSON عبر stdout
    |
    v
Node.js HTTP Response
```

## ⚙️ المتطلبات التشغيلية (Requirements)

* **Node.js و npm**

* مترجم **GCC** يدعم C++17

* مكتبة **nlohmann/json** للـ C++

* **PowerShell**

## 🔨 بناء وتحزيم الـ C++ (C++ Build)

شغّل الأمر ده من الفولدر الرئيسي للمشروع:

```powershell
g++ -std=c++17 -Wall -Wextra -Wpedantic -I cpp/include cpp/src/main.cpp cpp/src/handlers/JsonHandler.cpp cpp/src/services/ShapeService.cpp cpp/src/factories/ShapeFactory.cpp cpp/src/shapes/Circle.cpp cpp/src/shapes/Rectangle.cpp -o cpp/build/shapes.exe
```

## 🧪 اختبارات الـ C++ (C++ Tests)

شغّل السكريبت ده:

```powershell
.\cpp\tests\run_tests.ps1
```

مجموعة الاختبارات بتغطي:

* الوراثة (Inheritance)

* تعدد الأشكال (Polymorphism)

* عمليات حساب المساحة (Area Calculations)

* الأبعاد غير الصحيحة (Invalid dimensions)

* القيم غير المنتهية (Non-finite values)

* تجاوز الحدود الرقمية (Numeric overflow)

* اختبارات الـ Compilation السلبية للـ Encapsulation والـ Abstraction

## 🚀 تشغيل وتجهيز الـ Node.js (Node.js Setup)

ادخل على فولدر الـ Backend:

```powershell
cd backend
```

ثبّت المكتبات:

```powershell
npm install
```

تأكد من سلامة الـ Types:

```powershell
npm run typecheck
```

ابني الـ Backend:

```powershell
npm run build
```

شغّل سيرفر التطوير:

```powershell
npm run dev
```

الـ API هيشتغل على الرابط:

`http://localhost:3000`

## 🔌 مسارات الـ REST API

### 1️⃣ فحص الخدمة (Health Check)

`GET /api/health`

### 2️⃣ حساب مساحة الشكل (Calculate Shape Area)

`POST /api/shapes/calculate-area`
`Content-Type: application/json`

**طلب حساب الدائرة (Circle request):**

```json
{
    "shape": "circle",
    "dimensions": [5]
}
```

**طلب حساب المستطيل (Rectangle request):**

```json
{
    "shape": "rectangle",
    "dimensions": [4, 6]
}
```

**شكل الاستجابة عند النجاح (Success response):**

```json
{
    "success": true,
    "data": {
        "shape": "circle",
        "area": 78.53981633974483
    }
}
```

**شكل الاستجابة عند الخطأ (Error response):**

```json
{
    "success": false,
    "error": {
        "message": "Circle radius must be a positive finite number."
    }
}
```

## 🎯 هدف المشروع (Project Objective)

الهدف الرئيسي من المشروع هو فهم وتطبيق مبادئ الـ OOP الأربعة عمقاً في C++، مع ربطه بـ REST API شغال بـ Node.js لتوضيح كيفية الربط والتعامل التفاعلي بين لغتين برمجيتين مختلفين مع الفصل التام بين مسئوليات كل لغة منهم.

❤️ **تم التطوير بواسطة Techno Science**
