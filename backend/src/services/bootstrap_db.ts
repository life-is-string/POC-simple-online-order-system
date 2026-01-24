import sqlite3 from "sqlite3";

export function bootstrap(db: sqlite3.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK(price >= 0),
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      total REAL NOT NULL CHECK(total >= 0),
      created_at DATETIME NOT NULL,
      status TEXT NOT NULL CHECK(status in ('sent', 'cancelled'))
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL CHECK(quantity BETWEEN 1 AND 10),
      price_at_time REAL NOT NULL CHECK(price_at_time >= 0),
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);
}
