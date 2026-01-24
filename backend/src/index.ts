import express from "express";
import sqlite3 from "sqlite3";
import { promisify } from "util";
import { Product, Order } from "./interfaces";
// index.ts do backend
import cors from "cors";
import { bootstrap } from "./services/bootstrap_db";
import { normalizeOrder } from "./orders/normalizeOrder";
import { saveOrder } from "./orders/saveOrder";
import { seed } from "./services/seed_db";

//SQLite ini
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("SQLite Connection error", err.message);
  } else {
    console.log("Connected to SQLite");
    bootstrap(db);
    seed(db);
  }
});

//Express ini
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors()); //crucial for frontend-backend communication -> Cross-Origin Resource Sharing

// Promisify db methods for async/await
const dbAll = promisify(db.all.bind(db));
const dbRun = promisify(db.run.bind(db));
let products: Product[] = [];

// ============================================
// PRODUCTS ENDPOINT
// ============================================

app.get("/products", async (req, res) => {
  try {
    products = (await dbAll("SELECT * FROM products")) as Product[];
    res.json(products); //spit all data
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error when gathering products from database" });
  }
});

// ============================================
// ORDERS ENDPOINT -> DEBUG
// ============================================

app.get("/orders", async (req, res) => {
  try {
    const orders = (await dbAll("SELECT * FROM orders")) as Order[];
    res.json(orders); //spit all data
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error when gathering orders from database" });
  }
});

// ============================================
// POST ROUTE
// ============================================
app.post("/orders", async (req, res) => {
 try {
    const { items, id, time } = req.body;

    const normalized = normalizeOrder(items, products);

    await saveOrder(db, id, time, normalized);

    res.status(201).json({ message: "Order saved successfully" });
  } catch (err: any) {
    console.error(err.message);

    res.status(400).json({
      error: err.message || "Failed to save order",
    });
  }
});

// ============================================
// ROOT ROUTE
// ============================================
app.get("/", (req, res) => {
  res.json({
    mensagem: "API CRUD - Routes",
    endpoints: {
      "GET /products": "Available products list",
      "GET /orders": "Orders received",
      "GET /orders/items": "Order items",
    },
  });
});

//server start
app.listen(PORT, () => {
  console.log(`Server running ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Error while closing db:", err.message);
    } else {
      console.log("DB Closed successfully.");
    }
    process.exit(0);
  });
});
