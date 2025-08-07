
# 📦 Warehouse Inventory Management

**Live Project Links**  
🌐 Frontend: [https://warehouse-inventory-management.netlify.app/](https://warehouse-inventory-management.netlify.app/)  
🔗 Backend API: [https://warehouse-inventroy-management-assignment.onrender.com/](https://warehouse-inventroy-management-assignment.onrender.com/)

---

## 📝 Project Overview

This is a **full-stack warehouse inventory tracking application**. It allows users to manage products and track inventory transactions (like stock IN/OUT) in a clean and user-friendly interface. The project demonstrates a simple MVP-level CRUD-based stock tracker system using **Django for the backend** and **React for the frontend**.

---

## 🛠️ Tech Stack

### 🔧 Backend (Render)
- **Django 5.2.5**
- **Django REST Framework**
- **Gunicorn**
- **SQLite** (default DB)
- **CORS Handling** using `django-cors-headers`

### 🎨 Frontend (Netlify)
- **React**
- **Axios**
- **Bootstrap 5**
- **React Hooks & Components**

---

## ⚙️ Features

- 📋 View product list
- ➕ Add new products from UI
- 🔁 Record stock IN / OUT transactions
- 📊 Real-time inventory summary
- ☁️ Fully deployed: Backend (Render) & Frontend (Netlify)
- ✅ Mobile-friendly & responsive UI

---

## 🗂️ Project Structure

```

warehouse-inventory-management/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   └── Inventory\_management/
│       ├── settings.py
│       ├── urls.py
│       └── Warehouse/
│           ├── models.py
│           ├── views.py
│           ├── serializers.py
│           └── urls.py
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── services/
│       ├── App.js
│       └── index.js
└── README.md

````

---

## 🚀 Deployment Info

- **Backend** is hosted on **Render** and auto-deployed via GitHub.
- **Frontend** is hosted on **Netlify** and automatically builds from the React app.
- CORS setup enables seamless interaction between the frontend and backend.

---

## 🧪 Running Locally (Optional)

### Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
````

### Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 🙌 Special Thanks

Thanks to **Render** for free backend hosting and **Netlify** for seamless frontend deployment.


