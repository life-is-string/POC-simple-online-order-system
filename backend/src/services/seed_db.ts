import sqlite3 from "sqlite3";
import { promisify } from "util";
export async function seed(db: sqlite3.Database) {
  const get = promisify(db.get.bind(db));
  const row: any = await get("SELECT COUNT(*) as count FROM products");

  if (row.count === 0) {
    db.run(`
        INSERT INTO products (name, price, description, category, image_url)
        VALUES
        ('Basic Black T-Shirt', 59.90, 'Comfortable everyday t-shirt in classic black', 'Shirt', 'https://github.com/life-is-string/POC-simple-online-order-system/blob/main/frontend/src/assets/catalog/black_tshirt.jpg?raw=true'),
        ('White Oversized T-Shirt', 79.90, 'Relaxed fit white t-shirt with oversized silhouette', 'Shirt', 'https://github.com/life-is-string/POC-simple-online-order-system/blob/main/frontend/src/assets/catalog/white.jpg?raw=true'),
        ('Classic Hoodie Gray', 149.90, 'Cozy gray hoodie perfect for cold weather', 'Hoodie', 'https://github.com/life-is-string/POC-simple-online-order-system/blob/main/frontend/src/assets/catalog/gray_hoodie.jpg?raw=true'),
        ('Black Hoodie Zip', 159.90, 'Warm black hoodie with full zip closure', 'Hoodie', 'https://github.com/life-is-string/POC-simple-online-order-system/blob/main/frontend/src/assets/catalog/black_hoodie.jpg?raw=true'),
        ('Blue Tank Top', 69.90, 'Loose blue tank top for hot days', 'Tanktop', 'https://github.com/life-is-string/POC-simple-online-order-system/blob/main/frontend/src/assets/catalog/tanktop.jpg?raw=true'),
        ('Baseball Cap Black', 49.90, 'Classic black baseball cap for everyday style', 'Cap', 'https://github.com/life-is-string/POC-simple-online-order-system/blob/main/frontend/src/assets/catalog/cap.jpg?raw=true'),
        ('Beanie Black', 39.90, 'Warm black beanie to keep you cozy', 'Beanie', 'https://github.com/life-is-string/POC-simple-online-order-system/blob/main/frontend/src/assets/catalog/beanie.jpg?raw=true'),
        ('Flannel plaid shirt', 69.90, 'Classic flannel plaid shirt for a cozy look', 'Shirt', 'https://github.com/life-is-string/POC-simple-online-order-system/blob/main/frontend/src/assets/catalog/plaid.jpg?raw=true'),
        ('Pouch Hoodie Pink', 139.90, 'Trendy pink hoodie with cozy front pouch', 'Hoodie', 'https://github.com/life-is-string/POC-simple-online-order-system/blob/main/frontend/src/assets/catalog/pink.jpg?raw=true'),
        ('Black Ankle Socks', 19.90, 'Neutral basic style socks for everyday use', 'Socks', 'https://github.com/life-is-string/POC-simple-online-order-system/blob/main/frontend/src/assets/catalog/socks.jpg?raw=true');


    `);
  }
}
