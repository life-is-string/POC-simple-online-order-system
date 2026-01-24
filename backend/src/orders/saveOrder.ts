import sqlite3 from "sqlite3";
import { NormalizedOrder } from "./normalizeOrder";

export function saveOrder(
  db: sqlite3.Database,
  orderId: string,
  createdAt: string,
  order: NormalizedOrder
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION");

      db.run(
        `
        INSERT INTO orders (id, total, created_at, status)
        VALUES (?, ?, ?, ?)
        `,
        [orderId, order.total, createdAt, "sent"],
        (err) => {
          if (err) {
            db.run("ROLLBACK");
            return reject(err);
          }
        }
      );

      const stmt = db.prepare(`
        INSERT INTO order_items
        (order_id, product_id, quantity, price_at_time)
        VALUES (?, ?, ?, ?)
      `);

      for (const item of order.items) {
        stmt.run(orderId, item.product_id, item.quantity, item.price_at_time);
      }

      stmt.finalize(err => {
        if (err) {
          db.run("ROLLBACK");
          return reject(err);
        }

        db.run("COMMIT", err => {
          if (err) return reject(err);
          resolve();
        });
      });
    });
  });
}
