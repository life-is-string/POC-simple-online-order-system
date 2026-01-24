import { PORT, type Order } from "../src/interfaces";

export async function postOrder(order: Order) {
  const res = await fetch(`http://localhost:${PORT}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!res.ok) {
    throw new Error("Failed to post order");
  }
  console.log("Order posted successfully");
  return res.json();
}
