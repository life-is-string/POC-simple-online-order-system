import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "./scroll-area";
import type { Order } from "@/interfaces";

interface OrdersSheetProps {
  open: boolean;
  onClose: () => void;
  orders: Order[];
}

export function Orders({ open, onClose, orders }: OrdersSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="
        max-w-sm
        flex flex-col
        h-full
        p-0">
        <SheetHeader className="px-4 py-4 border-b">
          <SheetTitle>Your Orders</SheetTitle>
        </SheetHeader>

        {orders.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No orders yet.
          </div>
        ) : (
          <ScrollArea className="flex-1 px-4 py-2 overflow-y-auto">
            <div className="flex flex-col divide-y max-w-md mx-auto">
              {orders.map((order) => (
                <div key={order.id} className="py-3 px-2 border rounded-md mb-2">
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <p>Total: R${order.total.toFixed(2)}</p>
                  <p>Time: {order.time}</p>
                  <p>Status: {order.status}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
