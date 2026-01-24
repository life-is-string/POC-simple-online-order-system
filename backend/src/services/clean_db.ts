import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error connecting to SQLite:", err.message);
    process.exit(1);
  }
});

function cleanDatabase() {
  db.serialize(() => {
    console.log("Cleaning database...");

    // DELETE tables
    db.run("DELETE FROM order_items");
    db.run("DELETE FROM orders");

    db.close((err) => {
      if (err) console.error("Error closing db:", err.message);
      else console.log("Database connection closed.");
      process.exit(0);
    });
  });
}

cleanDatabase();
