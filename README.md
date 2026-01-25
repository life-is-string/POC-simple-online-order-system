# POC Online Order and Cart API System

This repository contains a **Proof of Concept (POC)** built to validate the system architecture, dependencies, and core application flow.

The goal of this project is to serve as an experimental base for testing features, frontend/backend integration, and development environment setup.

## 🚀 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* shadcn/ui
* Lucide Icons

### Backend

* Node.js
* Express
* TypeScript
* SQLite

### Tooling

* npm
* Vite Dev Server

## 📂 Project Structure

```
/
├── frontend/
│   ├── src/
│   ├── index.html
│   └── vite.config.ts
├── backend/
│   ├── src/
│   ├── database/
│   └── tsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

The project is managed from the **root directory**, which orchestrates both frontend and backend with npm concurrently.

## ⚙️ Prerequisites

Before running the project, make sure you have:

* **Node.js 18+**
* **npm** (included with Node.js)

Check your versions:

```bash
node -v
npm -v
```

## 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repository.git
```

2. Navigate to the project root:

```bash
cd your-repository
```

3. Install dependencies:

```bash
npm install
```

## ▶️ Running the Project

From the **root directory**, start the development environment:

```bash
npm run dev
```

This command runs both frontend and backend in development mode.

### 🔗 Default URLs

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend API: [http://localhost:3000](http://localhost:3000)

Ports may vary depending on configuration. Check the terminal output if needed.

## 🧪 Notes

* This project is a **Proof of Concept**, not intended for production use.
* Architecture and implementation decisions prioritize clarity and experimentation over optimization.

## 🔮 Future Improvements

* Search and filter api
* Authentication and authorization
* Database migrations
* Automated tests

## 📄 License

This project is intended for educational and experimental purposes.

