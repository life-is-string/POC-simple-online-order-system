import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import type { Product } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
interface ProductsGridProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

interface AddToCartButtonProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export function AddToCartButton({
  product,
  addToCart,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <Button
      aria-label="User"
      variant="default"
      size="icon"
      onClick={handleClick}
      className="rounded-full hover:scale-105 active:scale-90
      transition duration-150 ease-in-out"
    >
      {added ? <Check /> : <Plus />}
    </Button>
  );
}

export function Catalog({ products, addToCart }: ProductsGridProps) {
  let content;

  if (products.length === 0) {
    content = <div>No products found.</div>;
  } else {
    content = products.map((product) => (
      <Card
        key={product.id}
        className="w-full max-w-50 h-80 shadow-sm flex flex-col p-2"
      >
        {/*Image*/}
        <div className="h-3/4 w-full bg-gray-200 rounded-t-md overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
        <CardHeader className="p-3 top-1">
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 p-1 leading-snug">
          <p className="text-xs text-slate-700 overflow-auto max-h-12">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="font-bold text-sm">R${product.price.toFixed(2)}</p>
            <AddToCartButton product={product} addToCart={addToCart} />
          </div>
        </CardContent>
      </Card>
    ));
  }

  return (
    <div
      className="grid gap-4 p-4
  grid-cols-2        /* mobile: 2 cards  */
  sm:grid-cols-3     /* tablet: 3 cards */
  md:grid-cols-3    /* desktop m: 4 cards */
  lg:grid-cols-4     /* desktop g: 6 cards */"
    >
      {content}
    </div>
  );
}
