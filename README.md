# POC Online Order and Cart API System
<img width="1875" height="890" alt="image" src="https://github.com/user-attachments/assets/0ac4a7ff-381d-4467-9eb6-d2dcbf402b58" />
<br><br>
This repository contains a **Proof of Concept (POC)** built to validate the system architecture, dependencies, and core application flow.
<br><br>
The goal of this project is to serve as an experimental base for testing features, frontend/backend integration, and development environment setup.

## Dependencies

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

### Build

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

* **[Node.js 18+](https://nodejs.org/en/download)**
* **npm** (included with Node.js)

Check your versions:

```bash
node -v
npm -v
```

## 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/life-is-string/POC-simple-online-order-system
```

2. Navigate to the project root:

```bash
cd POC-simple-online-order-system
```

3. Install dependencies:

```bash
cd backend
npm install
cd ..
cd frontend
npm install
```
Or run in the **root directory**

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

### Implemented functionalities:
* [x] Product Listing
  * Return a list of products from the database with: id, name, description, price, image (image is optional, can be static).
* [x] Cart (API)
  * Add item to cart.
  * Remove item from cart.
  * Change quantity.
  * Validation (minimum quantity per product = 1, maximum quantity per product = 10).
  Order Checkout (simulated)
  * Endpoint that receives the cart, marks it as sent, and returns a success message.
* [x] Order Checkout
  * Button to finalize.
  * Display success screen/message.
  * Clear cart after checkout.
* [x] Posted Orders Database API
  * A routine to actually record valid checkouts in the database, generates a unique ID and stores the placing date.
  * Users can successfully view the active session's submitted orders by accessing the database endpoint view via UI.
* [x] Functional
  * Cart persistence in localStorage.
  * Feedback toasts (e.g., "Product added
  successfully").
  * Order table lifecycle.
  * Componentization and UI reusability.
  * Styling with a framework
  * Folder organization following good practices.
  * Smooth animations or transitions.
  * Responsive layout.
  * Friendly error messages

## 🔮 Future ideas

* Search and filter api
* Automated test
* Modularization of services
* API docs
* Catalog pagination api
