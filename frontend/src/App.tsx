import "./App.css";
import { Header } from "./components/ui/Header";
import { ScrollArea } from "./components/ui/scroll-area";
import { Catalog } from "./components/ui/Catalog";
import { Orders } from "./components/ui/Orders";
import "@/index.css";
import { Toaster, toast } from "react-hot-toast";
import {
  Cart,
  type CartItem,
  type Product,
  type Order,
  MAX_QTY,
  MIN_QTY,
} from "@/interfaces";
import { CartSheet } from "./components/ui/Cart";
import { useState, useEffect } from "react";
import { OrderStorage } from "../services/orderStorage";
import { postOrder } from "../services/orderApi";

function App() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const cart = useState(() => new Cart())[0];
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [sessionOrders, setSessionOrders] = useState<Order[]>([]);

  const addToCart = (product: Product) => {
    try {
      cart.addProduct(product);
      syncCart();
      toast.success("Product added to cart!");
    } catch {
      toast.error("Failed to add product to cart");
    }
  };

  const syncCart = () => setCartItems([...cart.items]);

  const increase = (productId: number) => {
    const item = cart.items.find((i) => i.product.id === productId);
    if (!item) return;

    cart.updateQuantity(item, item.quantity + 1);
    syncCart();
  };

  const decrease = (productId: number) => {
  const item = cart.items.find((i) => i.product.id === productId);
  if (!item) return;

  cart.updateQuantity(item, item.quantity - 1);
  syncCart();
};


  const remove = (productId: number) => {
    try {
      cart.remove(productId);
    } catch (err) {
      toast.error("Failed to remove item from cart");
    }
    syncCart();
  };

  const getProductQty = (productId: number) => {
    return cartItems.find((i) => i.product.id === productId)?.quantity ?? 0;
  };

  const updateQuantity = (productId: number, qty: number) => {
    const item = cart.items.find((i) => i.product.id === productId);
    if (!item) return;

    const safeQty = Math.max(MIN_QTY, Math.min(qty, MAX_QTY));

    cart.updateQuantity(item, safeQty);
    syncCart();
  };

  const checkout = async () => {
    const order = cart.checkout();

    if (!order) {
      console.warn("Cannot checkout an empty cart.");
      return;
    }

    const orderToPost = {
      id: order.id,
      time: order.time,
      items: order.items,
      total: order.total,
      status: "sent",
    } as Order;

    try {
      console.log("Posting order:", orderToPost);
      OrderStorage.save(order);
      postOrder(orderToPost);
      toast.success(`Order completed! Total: R$${order.total.toFixed(2)}`);
      syncCart();
      setSessionOrders((prev) => [...prev, order]); //update session orders with previous + newer ones
    } catch (err) {
      console.error("Checkout failed:", err);
    }
  };

  //happens at reload
  useEffect(() => {
    localStorage.clear();
    const fetchProducts = async () => {
      try {
        const PORT = 3000;
        const res = await fetch(`http://localhost:${PORT}/products`);
        const data: Product[] = await res.json();
        setProductsList(data);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading products...
      </div>
    );

  if (!productsList.length)
    return (
      <div className="flex items-center justify-center h-screen">
        No products found
      </div>
    );

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header onUserClick={() => setIsOrdersOpen(true)} />
        <Toaster position="top-right" reverseOrder={false} />
        <CartSheet
          items={cartItems}
          onIncrease={increase}
          onDecrease={decrease}
          onRemove={remove}
          onUpdate={updateQuantity}
          onCheckout={checkout}
        />
        <Orders
          open={isOrdersOpen}
          onClose={() => setIsOrdersOpen(false)}
          orders={sessionOrders}
        />

        <div className="mt-4 w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <ScrollArea className="h-[calc(100vh-64px)] overflow-y-auto">
            <Catalog
              products={productsList}
              addToCart={addToCart}
              getProductQty={getProductQty}
            />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

export default App;
