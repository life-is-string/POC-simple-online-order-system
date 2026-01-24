// Cross-server shared interfaces -> data typing

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  gender: 'M' | 'F' | 'U';
  size: 'P' | 'M' | 'G' | 'U';
  image_url: string | null;
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order{
  id: string;
  items: CartItem[]
  total: number
  time: string;
  status: 'sent' | 'cancelled';
}