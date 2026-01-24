import sqlite3 from "sqlite3";
import { promisify } from "util";
export async function seed(db: sqlite3.Database) {
  const get = promisify(db.get.bind(db));
  const row: any = await get("SELECT COUNT(*) as count FROM products");

  if (row.count === 0) {
    db.run(`
        INSERT INTO products (name, price, description, category, image_url) 
        VALUES 
        ('Basic Black T-Shirt', 59.90, 'Comfortable everyday t-shirt in classic black', 'Shirt', NULL),
        ('White Oversized T-Shirt', 79.90, 'Relaxed fit white t-shirt with oversized silhouette', 'Shirt', NULL),
        ('Classic Hoodie Gray', 149.90, 'Cozy gray hoodie perfect for cold weather', 'Hoodie', NULL),
        ('Black Hoodie Zip', 159.90, 'Warm black hoodie with full zip closure', 'Hoodie', NULL),
        ('Skull Print Blue Tank Top', 69.90, 'Edgy blue tank top with skull graphic print', 'Tanktop', NULL),
        ('Baseball Cap Black', 49.90, 'Classic black baseball cap for everyday style', 'Cap', NULL),
        ('Beanie Black', 39.90, 'Warm black beanie to keep you cozy', 'Beanie', NULL),
        ('Flannel Shirt Red', 69.90, 'Lumberjack style plaid for a timeless look', 'Shirt', NULL),
        ('Pouch Hoodie Pink', 139.90, 'Trendy pink hoodie with cozy front pouch', 'Hoodie', NULL),
        ('Spiral Print Ankle Socks', 19.90, 'Colorful socks with intriguing spiral pattern', 'Socks', NULL);

    `);
  }
}
