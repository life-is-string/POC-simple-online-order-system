import sqlite3 from "sqlite3";
import { promisify } from "util";
export async function seed(db: sqlite3.Database) {
  const get = promisify(db.get.bind(db));
  const row: any = await get("SELECT COUNT(*) as count FROM products");

  if (row.count === 0) {
    db.run(`
        INSERT INTO products (name, price, description, category, gender, size, image_url) 
        VALUES ('Basic Black T-Shirt', 59.90, 'Comfortable everyday t-shirt in classic black', 'Shirt', 'U', 'M', NULL), ('White Oversized T-Shirt', 79.90, 'Relaxed fit white t-shirt with oversized silhouette', 'Shirt', 'U', 'G', NULL), ('Classic Hoodie Gray', 149.90, 'Cozy gray hoodie perfect for cold weather', 'Hoodie', 'U', 'G', NULL), ('Black Hoodie Zip', 159.90, 'Warm black hoodie with full zip closure', 'Hoodie', 'M', 'M', NULL), ('Skull Print Blue Tank Top', 69.90, 'Edgy blue tank top with skull graphic print', 'Tanktop', 'U', 'U', NULL), ('Baseball Cap Black', 49.90, 'Classic black baseball cap for everyday style', 'Cap', 'U', 'U', NULL), ('Beanie Black', 39.90, 'Warm black beanie to keep you cozy', 'Beanie', 'U', 'U', NULL), ('Slim Fit Shirt Blue', 69.90, 'Modern slim fit shirt in vibrant blue', 'Shirt', 'M', 'M', NULL), ('Pouch Hoodie Pink', 139.90, 'Trendy pink hoodie with cozy front pouch', 'Hoodie', 'F', 'P', NULL), ('Butterfly Print Ankle Socks', 19.90, 'Colorful socks with delicate butterfly pattern', 'Socks', 'U', 'U', NULL);
    `);
  }
}
