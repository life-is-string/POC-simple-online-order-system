import type { Order } from "../src/interfaces";

const STORAGE_KEY = "orders";

export class OrderStorage {
  static getAll(): Order[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  static save(order: Order) {
    const orders = OrderStorage.getAll();
    orders.push(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  static clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
}
