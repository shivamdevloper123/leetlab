# CodeLab

> A full-stack online coding platform inspired by LeetCode, where users can solve programming problems, write and execute code, submit solutions, and track their coding progress.

## 🚀 Overview

**CodeLab** is a full-stack coding practice platform designed to provide an interactive environment for solving programming problems.

The platform allows users to browse coding problems, write solutions using an in-browser code editor, execute their code, submit solutions, and view submission results.

The project is built using the **MERN stack** with a modern React-based frontend and a Node.js/Express backend.

---

## ✨ Features

### 👤 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Secure password hashing using bcrypt
* Email verification
* Password reset functionality
* Change password
* Logout functionality
* Role-based authorization
* Admin functionality

### 💻 Problem Solving

* Browse coding problems
* View detailed problem descriptions
* Difficulty levels
* Problem search
* Problem filtering
* Pagination
* Problem categories/tags
* Code editor with syntax highlighting
* Run code against test cases
* Submit solutions
* View execution results
* View submission history

### 🧑‍💻 Online Code Editor

CodeLab provides an interactive coding environment using **Monaco Editor**.

Features include:

* Syntax highlighting
* Code editing
* Multiple programming languages
* Run code
* Submit code
* Execution output
* Error messages
* Test case results

### 📊 Submissions

Users can:

* View previous submissions
* Check submission status
* View execution results
* Review submitted code
* Track their problem-solving activity

### 💬 Discussion

The platform is designed to support problem-specific discussions where users can share:

* Solutions
* Approaches
* Explanations
* Questions
* Tips and tricks

### 🛠️ Admin Features

Administrators can manage the coding platform, including:

* Create problems
* Update problems
* Delete problems
* Manage test cases
* Manage users
* Manage problem data

---

# 🏗️ Tech Stack

## Frontend

| Technology      | Purpose                 |
| --------------- | ----------------------- |
| React.js        | Frontend UI             |
| React Router    | Client-side routing     |
| Zustand         | Global state management |
| Tailwind CSS    | Styling                 |
| DaisyUI         | UI components           |
| shadcn/ui       | Reusable UI components  |
| Monaco Editor   | Online code editor      |
| React Hook Form | Form management         |
| Zod             | Form validation         |
| Lucide React    | Icons                   |

## Backend

| Technology | Purpose             |
| ---------- | ------------------- |
| Node.js    | Runtime environment |
| Express.js | Backend framework   |
| MongoDB    | Database            |
| Mongoose   | MongoDB ODM         |
| JWT        | Authentication      |
| bcrypt     | Password hashing    |

## Code Execution

Code execution is handled using **Judge0**, which provides a secure environment for compiling and executing submitted programs.

---

# 📂 Project Structure

```text
CodeLab/
│
├── frontend/
│   │
│   ├── public/
│   │
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── stores/
│       ├── lib/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   │
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── .gitignore
├── README.md
└── package.json
```

---

# 🔄 Application Flow

```text
                    ┌─────────────────┐
                    │      User       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ React Frontend  │
                    └────────┬────────┘
                             │
                    REST API │
                             ▼
                    ┌─────────────────┐
                    │ Express Backend │
                    └───────┬─┬───────┘
                            │ │
                  ┌─────────┘ └─────────┐
                  ▼                     ▼
          ┌───────────────┐      ┌──────────────┐
          │   MongoDB     │      │   Judge0     │
          │   Database    │      │ Code Runner  │
          └───────────────┘      └──────┬───────┘
                                        │
                                        ▼
                                 Execution Result
                                        │
                                        ▼
                                 React Frontend
```

---

# 🧩 Main Modules

## 1. Authentication Module

The authentication system uses JWT-based authentication.

Typical authentication flow:

```text
Register
   ↓
Validate User
   ↓
Hash Password
   ↓
Store User
   ↓
Login
   ↓
Generate JWT
   ↓
Authenticated Requests
```

---

## 2. Problem Module

Problems contain information such as:

```text
Problem
├── Title
├── Description
├── Difficulty
├── Examples
├── Constraints
├── Test Cases
├── Supported Languages
└── Expected Output
```

Users can search, filter, and solve problems through the problem interface.

---

## 3. Code Execution Module

The code execution flow is:

```text
User writes code
       ↓
Click "Run"
       ↓
Frontend sends code
       ↓
Backend validates request
       ↓
Judge0 receives submission
       ↓
Code execution
       ↓
Execution result
       ↓
Backend response
       ↓
Frontend displays result
```

---

## 4. Submission Module

When a user submits a solution:

```text
Submit Code
     ↓
Validate Solution
     ↓
Send to Judge0
     ↓
Execute Against Test Cases
     ↓
Check Result
     ↓
Store Submission
     ↓
Return Submission Status
```

Possible statuses include:

* Accepted
* Wrong Answer
* Time Limit Exceeded
* Compilation Error
* Runtime Error

---

# 🗄️ Database

CodeLab uses **MongoDB** as its primary database.

Major collections include:

```text
Users
Problems
Submissions
TestCases
Discussions
```

### Example User

```javascript
{
  username: "shivam",
  email: "user@example.com",
  password: "hashed-password",
  role: "user"
}
```

### Example Problem

```javascript
{
  title: "Two Sum",
  description: "Given an array of integers...",
  difficulty: "Easy",
  tags: ["Array", "Hash Table"],
  testCases: [...]
}
```

### Example Submission

```javascript
{
  userId: "...",
  problemId: "...",
  language: "javascript",
  code: "...",
  status: "Accepted",
  runtime: "...",
  memory: "..."
}
```

---

# 🔐 Security

CodeLab implements several security practices:

* JWT authentication
* Password hashing with bcrypt
* Protected API routes
* Role-based authorization
* Input validation
* Authentication middleware
* Environment variables for sensitive configuration
* Secure authentication cookies where applicable

Sensitive information should **never** be committed to GitHub.

---

# ⚙️ Installation

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB
* Git

You will also need access to a **Judge0 API** instance/service for code execution.

---

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/codelab.git

cd codelab
```

---

## 2. Install Backend Dependencies

```bash
cd backend

npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd ../frontend

npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

JUDGE0_URL=your_judge0_api_url

JUDGE0_API_KEY=your_judge0_api_key
```

> Do not upload your `.env` file to GitHub.

Add it to `.gitignore`:

```gitignore
.env
node_modules/
dist/
```

---

# ▶️ Running the Project

## Start Backend

```bash
cd backend

npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

## Start Frontend

Open another terminal:

```bash
cd frontend

npm run dev
```

Frontend will normally run on:

```text
http://localhost:5173
```

---

# 🧪 Development

During development, the project can be run using:

```bash
npm run dev
```

Make sure:

* MongoDB is running
* Backend environment variables are configured
* Judge0 is accessible
* Frontend API configuration points to the backend
* CORS configuration allows the frontend origin

---

# 📸 Screenshots

Add screenshots of your application here.

### Home Page

```text
[Add screenshot here]
```

### Problems Page

```text
[Add screenshot here]
```

### Problem Solving Page

```text
[Add screenshot here]
```

### Code Editor

```text
[Add screenshot here]
```

### Submission Result

```text
[Add screenshot here]
```

---

# 🛣️ Future Improvements

Planned improvements for CodeLab include:

* [ ] User profile and coding statistics
* [ ] Leaderboard
* [ ] Daily coding challenges
* [ ] Contest system
* [ ] More programming languages
* [ ] Advanced problem filtering
* [ ] Problem bookmarking
* [ ] Solution explanations
* [ ] Community discussions
* [ ] User following system
* [ ] Achievement/badge system
* [ ] Improved code execution performance
* [ ] Docker-based isolated code execution
* [ ] Admin analytics dashboard
* [ ] Dark/light theme improvements

---

# 🎯 Learning Objectives

This project helped demonstrate practical knowledge of:

* Full-stack web development
* React.js
* State management with Zustand
* REST API development
* Node.js and Express.js
* MongoDB and Mongoose
* JWT authentication
* Role-based authorization
* Secure password handling
* API integration
* Code execution systems
* Monaco Editor integration
* Form validation
* Frontend routing
* Database design
* Error handling
* Git and GitHub workflow

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add new feature"
```

5. Push the branch

```bash
git push origin feature/new-feature
```

6. Open a Pull Request

---

# 📄 License

This project is developed for educational and portfolio purposes.

You can add a specific license such as **MIT License** if you decide to open-source the project.

---

# 👨‍💻 Author

## Shivam Kumar

**Full Stack Developer**

* LinkedIn: [Add your LinkedIn profile]
* GitHub: [Add your GitHub profile]

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

> **CodeLab — Practice. Code. Improve.**
