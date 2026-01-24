import { CartItem, Product } from "../interfaces";

export interface NormalizedItem {
  product_id: number;
  quantity: number;
  price_at_time: number;
}

export interface NormalizedOrder {
  items: NormalizedItem[];
  total: number;
}

export function normalizeOrder(
  items: CartItem[],
  products: Product[]
): NormalizedOrder {
  if (!items || items.length === 0) {
    throw new Error("Empty order");
  }

  const normalizedItems: NormalizedItem[] = [];
  let total = 0;

  for (const item of items) {
    if (!item.product?.id || !item.quantity) {
      throw new Error("Invalid item format");
    }

    if (item.quantity < 1 || item.quantity > 10) {
      throw new Error("Invalid quantity");
    }

    const product = products.find(p => p.id === item.product.id);
    if (!product) {
      throw new Error("Product not found");
    }

    const subtotal = product.price * item.quantity;
    total += subtotal;

    normalizedItems.push({
      product_id: product.id,
      quantity: item.quantity,
      price_at_time: product.price,
    });
  }

  return { items: normalizedItems, total };
}
