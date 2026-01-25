import { Button } from "@/components/ui/button";
import {
  ShoppingCartIcon,
  Plus,
  Minus,
  Trash,
  Check,
  Frown,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MAX_QTY, type CartItem, MIN_QTY } from "@/interfaces";
import { useEffect, useState } from "react";

interface CartProps {
  items: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
  onCheckout: () => void;
  onUpdate: (productId: number, qty: number) => void;
}
interface CartRowProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  onUpdate: (qty: number) => void;
}
function CartRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
  onUpdate,
}: CartRowProps) {
  const [qty, setQty] = useState<number | "">(item.quantity); //Custom input control for item quantity

  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  return (
    <div className="flex gap-3 items-start py-4">
      <img
        src={item.product.image_url ?? undefined}
        className="w-16 h-16 rounded object-cover"
      />
      <div className="flex-1">
        <p className="font-medium sm:text-sm ">{item.product.name}</p>
        <p className="sm:text-xs text-sm text-muted-foreground">
          R${item.product.price.toFixed(2)}
        </p>
        <p className="text-sm font-semibold">
          Subtotal: R${(item.product.price * item.quantity).toFixed(2)}
        </p>
        {/* Increase/Decrease Controls */}
        <div className="flex items-center gap-2 mt-2">
          <Button
            className="
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
            size="icon"
            variant="outline"
            onClick={onIncrease}
            disabled={item.quantity == MAX_QTY}
          >
            <Plus />
          </Button>

          <input
            type="number"
            min={MIN_QTY}
            max={MAX_QTY}
            value={item.quantity}
            inputMode="numeric"
            onChange={(e) => {
              const value = Number(e.target.value);
              if (Number.isNaN(value)) return;

              const safeQty = Math.max(MIN_QTY, Math.min(value, MAX_QTY));

              onUpdate(safeQty);
            }}
            onBlur={() => {
              const safeQty = Math.max(
                MIN_QTY,
                Math.min(item.quantity, MAX_QTY),
              );
              onUpdate(safeQty);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            className="
    w-12
    text-center
    border
    rounded-md
    text-sm
    focus:outline-none
    focus:ring-2
    focus:ring-[#3D5F7B]
    [appearance:textfield]
    [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none
  "
          />

          <Button
            className="
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
            size="icon"
            variant="outline"
            onClick={onDecrease}
            disabled={item.quantity == MIN_QTY}
          >
            <Minus />
          </Button>
        </div>
      </div>
      {/* Remove */}
      <Button
        size="icon"
        variant="default"
        className="
          mt-1
          h-8 w-8      
          bg-[#c74444]
        "
        onClick={onRemove}
      >
        <Trash />
      </Button>
    </div>
  );
}

export function CartSheet({
  items,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
  onUpdate,
}: CartProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full h-14 w-14 bg-[#3D5F7B] hover:bg-[#2C4A5A] shadow-lg z-50 transform-color">
          <ShoppingCartIcon strokeWidth={2.5} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="
        flex
        flex-col
        w-full
        max-w-md
        p-0"
      >
        <SheetHeader className="flex px-4 py-4 shrink-0 border-b">
          <div className="flex items-center gap-7">
            <SheetTitle asChild>
              <div className="flex items-center gap-2">
                <ShoppingCartIcon className="h-5 w-5" />
                <span>My Cart</span>
              </div>
            </SheetTitle>

            <span className="text-xl font-semibold text-muted-foreground">
              R${total.toFixed(2)}
            </span>
          </div>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground gap-3">
            <Frown className="h-10 w-10 opacity-40" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-4">
            <div className="flex flex-col divide-y">
              {items.map((item) => (
                <CartRow
                  key={item.product.id}
                  item={item}
                  onIncrease={() => onIncrease(item.product.id)}
                  onDecrease={() => onDecrease(item.product.id)}
                  onRemove={() => onRemove(item.product.id)}
                  onUpdate={(qty) => onUpdate(item.product.id, qty)}
                />
              ))}
            </div>
          </ScrollArea>
        )}
        <Button
          onClick={onCheckout}
          hidden={items.length === 0}
          className="
          absolute
          bottom-6
          right-6
          z-50

          flex items-center gap-2
          rounded-full

          bg-[#3D5F7B]
          text-white
          shadow-lg

          hover:bg-[#2f4f6a]
          transition-all

          px-6 py-4
          /*mobile*/
          text-xl
          h-15 w-40 
          /*desktop*/
          sm:text-sm
          sm:h-12 sm:w-30 
          "
        >
          <Check />
          Checkout
        </Button>
      </SheetContent>
    </Sheet>
  );
}
