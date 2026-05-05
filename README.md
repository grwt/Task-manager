# 📋 Team Task Manager

A full-stack web application for managing projects, assigning tasks, and tracking team progress with role-based access control.

🔗 **Frontend-Url:** [https://task-manager-51cn.vercel.app](https://task-manager-51cn.vercel.app/login)  
🚀 **Backend-Urk:** [https://task-manager-production-ff41.up.railway.app](https://task-manager-production-ff41.up.railway.app)

---

## ✨ Features

- **Authentication** — Secure signup/login with JWT-based session management
- **Role-Based Access Control** — Admin and Member roles with distinct permissions
- **Project Management** — Create and manage projects with team members
- **Task Management** — Create, assign, and update tasks with due dates and priorities
- **Status Tracking** — Track task progress (Todo → In Progress → Completed)
- **Dashboard** — Overview of tasks, statuses, and overdue items with charts
- **File Uploads** — Attach files to tasks via Multer
- **Reports** — Export task reports using ExcelJS

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Redux Toolkit + redux-persist | State management |
| React Router v7 | Client-side routing |
| Axios | HTTP requests |
| Tailwind CSS v4 | Styling |
| Recharts | Dashboard charts |
| React Hot Toast | Notifications |
| Vite | Build tool |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | Server framework |
| MongoDB + Mongoose | Database |
| JWT + bcryptjs | Authentication |
| Multer | File uploads |
| ExcelJS | Report generation |
| Cookie Parser | Cookie handling |
| CORS | Cross-origin requests |

---

## 📁 Project Structure

```
Task-Management-App/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── CreateTask.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ManageTasks.jsx
│   │   │   │   └── ManageUsers.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── SignUp.jsx
│   │   │   └── user/
│   │   ├── redux/
│   │   │   ├── slice/
│   │   │   └── store.js
│   │   ├── routes/
│   │   │   └── PrivateRoute.jsx
│   │   ├── utils/
│   │   │   ├── axiosInstance.js
│   │   │   ├── data.js
│   │   │   ├── helper.js
│   │   │   └── uploadImage.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   └── package.json
│
└── backend/
    ├── controller/
    │   ├── auth.controller.js
    │   ├── report.controller.js
    │   ├── task.controller.js
    │   └── user.controller.js
    ├── models/
    │   ├── task.model.js
    │   └── user.model.js
    ├── routes/
    │   ├── auth.route.js
    │   ├── report.route.js
    │   ├── task.route.js
    │   └── user.route.js
    ├── utils/
    │   ├── error.js
    │   ├── multer.js
    │   └── verifyUser.js
    ├── uploads/
    ├── .env
    ├── index.js
    └── package.json
```

---

## ⚙️ Local Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [MongoDB](https://www.mongodb.com/atlas) database (Atlas free tier works)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Task-Management-App.git
cd Task-Management-App
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_JOIN_CODE=your_admin_code
FRONT_END_URL=http://localhost:5173
PORT=3000
```

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string from Atlas or local |
| `JWT_SECRET` | Any long random string for signing tokens |
| `ADMIN_JOIN_CODE` | Secret code required to register as Admin |
| `FRONT_END_URL` | Frontend URL for CORS (no trailing slash) |
| `PORT` | Port to run the backend on (default: 3000) |

Start the backend:

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

Backend will run at: `http://localhost:3000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

## 🔑 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/sign-up` | Register a new user | Public |
| POST | `/api/auth/sign-in` | Login | Public |
| POST | `/api/auth/sign-out` | Logout | Public |
| GET | `/api/auth/user-profile` | Get logged-in user profile | Auth |
| PUT | `/api/auth/update-profile` | Update user profile | Auth |
| POST | `/api/auth/upload-image` | Upload profile image | Public |

### Users — `/api/users`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/users/get-users` | Get all users | Admin |
| GET | `/api/users/:id` | Get user by ID | Auth |

### Tasks — `/api/tasks`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/tasks/create` | Create a new task | Admin |
| GET | `/api/tasks` | Get all tasks | Auth |
| GET | `/api/tasks/dashboard-data` | Get admin dashboard stats | Admin |
| GET | `/api/tasks/user-dashboard-data` | Get member dashboard stats | Auth |
| GET | `/api/tasks/:id` | Get task by ID | Auth |
| PUT | `/api/tasks/:id` | Update task details | Auth |
| DELETE | `/api/tasks/:id` | Delete a task | Admin |
| PUT | `/api/tasks/:id/status` | Update task status | Auth |
| PUT | `/api/tasks/:id/todo` | Update task checklist | Auth |

### Reports — `/api/reports`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/reports` | Download Excel report | Admin |

---

## 👥 Role-Based Access

| Feature | Admin | Member |
|---|---|---|
| Create/delete tasks | ✅ | ❌ |
| Assign tasks to users | ✅ | ❌ |
| Update task status | ✅ | ✅ |
| View all tasks | ✅ | ✅ (own) |
| Manage users | ✅ | ❌ |
| Export reports | ✅ | ❌ |
| View dashboard | ✅ | ✅ |

> To register as an Admin, use the **Admin Join Code** set in your backend `.env`.

---

## 🚀 Deployment

### Backend — Railway

1. Push your code to GitHub (make sure `.env` is in `.gitignore`)
2. Create a new project on [Railway](https://railway.app)
3. Connect your GitHub repo and set the **root directory** to `backend`
4. Add the following environment variables in Railway → Variables:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_JOIN_CODE=your_admin_code
FRONT_END_URL=https://your-vercel-app.vercel.app
```

5. Railway auto-detects `npm start` from `package.json`

### Frontend — Vercel

1. Import your repo on [Vercel](https://vercel.com)
2. Set the **root directory** to `frontend`
3. Add the environment variable in Vercel → Settings → Environment Variables:

```
VITE_API_URL=https://your-railway-app.up.railway.app/api
```

4. Deploy — Vercel auto-runs `npm run build`

---

## 🧪 Test Credentials

You can test the app using these demo accounts on the live deployment:

| Role | Email | Password |
|---|---|---|
| Admin | admin@demo.com | demo1234 |
| Member | member@demo.com | demo1234 |

---

## 📄 License

This project was built as a full-stack assignment. Feel free to use it as a reference.
