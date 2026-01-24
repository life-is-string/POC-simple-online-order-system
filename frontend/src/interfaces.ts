// no methods -> interfaces
export const PORT = 3000;
export const MAX_QTY = 10;
export const MIN_QTY = 1;

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

//Local Storage Cart class
export class Cart{
  items: CartItem[] = [];
  private total: number = 0;

  addProduct(product: Product): void{ //add by 1
    const existingItem = this.items.find(item => item.product.id === product.id); //match?

    if(existingItem){ //increases by logic
      if(existingItem.quantity++ > MAX_QTY){
        console.warn('Total quantity for this product cannot exceed ', MAX_QTY);
        throw new Error('Max quantity exceeded.');
        return;
      }
      existingItem.quantity ++;
    }else{
      const newItem: CartItem = {
        product: product,
        quantity: 1
      };
      this.items.push(newItem);
    }
  }
  remove(productId: number): void{
    if(!this.items.find(item => item.product.id === productId)){
      console.warn('Product not found in cart.');
      throw new Error('Product not found in cart.');
    }
    //new list without the selected product
    this.items = this.items.filter(item => item.product.id !== productId);
  }
  //increase/decrease by input
  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity <= 10 && newQuantity >= 1) {
      item.quantity = newQuantity;
    }else{
      console.warn(`Quantity must be between ${MIN_QTY} and ${MAX_QTY}.`);
    }
  }
  private get_total(): void {
    this.items.forEach((item)=>{this.total+= item.quantity * item.product.price})
  }
  checkout(): Order | null {
    if(this.items.length === 0){
      console.warn('Cart is empty.');
      return null;
    }
    this.get_total();
    const order: Order =
    {
      id: crypto.randomUUID(),
      items: structuredClone(this.items), 
      total: this.total,
      time: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'sent'
    }
    //empty cart
    this.items = [];
    this.total = 0;
    return order;
  }
}