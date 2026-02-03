export type Product = {
  id: string;
  name: string;
  price: number;
  photoUrl: string;
  ratings: number;
  sold: number;
  merchant: string;
  description: string;
  stock: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = CartItem[];