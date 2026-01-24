import "./App.css";
import { Header } from "./components/ui/Header";
import { ScrollArea } from "./components/ui/scroll-area";
import { Catalog } from "./components/ui/Catalog";
import { Cart, type CartItem, type Product, PORT } from "@/interfaces";
import { CartSheet } from "./components/ui/Cart";
import { useState, useEffect } from "react";
import { OrderStorage } from "../services/orderStorage";
import { postOrder } from "../services/orderApi";

function App() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const cart = useState(() => new Cart())[0];
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const addToCart = (product: Product) => {
    try {
      cart.addProduct(product); //enlist product with quantity 1
      setCartItems([...cart.items]); // re-render for cart sheet component
    } catch (err) {
      //-> toast notification can be added here
    }
  };
  const syncCart = () => setCartItems([...cart.items]);

  //Toast trigger potential area
  const increase = (productId: number) => {
    const item = cart.items.find((i) => i.product.id === productId);
    if (item) {
      cart.updateQuantity(item, item.quantity + 1);
      syncCart();
    }
  };

  const decrease = (productId: number) => {
    const item = cart.items.find((i) => i.product.id === productId);
    if (item) {
      cart.updateQuantity(item, item.quantity - 1);
      syncCart();
    }
  };

  const remove = (productId: number) => {
    cart.remove(productId);
    syncCart();
  };

  const updateQuantity = (productId: number, qty: number) => {
    const item = cart.items.find((i) => i.product.id === productId);
    if (!item) return;

    try {
      cart.updateQuantity(item, qty);
      syncCart();
    } catch (err) {
      console.warn(err);
    }
    syncCart();
  };

  const checkout = async () => {
    // 1️⃣ Gera o pedido a partir do cart
    const order = cart.checkout(); // retorna null se vazio

    if (!order) {
      console.warn("Cannot checkout an empty cart.");
      return;
    }

    // 2️⃣ Normaliza o pedido para o backend
    const orderToPost = {
      id: order.id, // id no backend
      time: order.time, // time no backend
      items: order.items, // lista de CartItem
      total: order.total,
      status: "sent",
    };

    try {
      console.log("Posting order:", orderToPost);

      // 3️⃣ Salva no localStorage
      OrderStorage.save(order);

      // 4️⃣ Faz o post pro backend
      const res = await fetch(`http://localhost:${PORT}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderToPost),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Failed to post order. Status: ${res.status}, Body: ${text}`,
        );
      }

      console.log("Order posted successfully");

      // 5️⃣ Atualiza o carrinho para rerenderizar
      syncCart(); // vai zerar a lista de items e atualizar o estado
    } catch (err) {
      console.error("Checkout failed:", err);
      // opcional: mostrar toast ou alert pro usuário
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
        <Header />
        <CartSheet
          items={cartItems}
          onIncrease={increase}
          onDecrease={decrease}
          onRemove={remove}
          onUpdate={updateQuantity}
          onCheckout={checkout}
        />
        <div className="mt-4 w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <ScrollArea className="h-[calc(100vh-64px)] overflow-y-auto">
            <Catalog products={productsList} addToCart={addToCart} />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

export default App;
