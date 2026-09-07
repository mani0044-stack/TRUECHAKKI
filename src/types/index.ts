export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  product_count?: number;
}

export interface ProductVariant {
  id: string;
  weightSize: string; // e.g. "500g", "1 Litre", "5kg"
  price: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'atta' | 'oils' | 'pickles' | 'spices';
  categoryName: string;
  description: string;
  shortDescription: string;
  basePrice: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  image: string;
  gallery: string[];
  variants: ProductVariant[];
  ingredients?: string[];
  nutritionalInfo?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
}

export interface CartItem {
  id: string; // unique cart item id (product.id + variant.id)
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface UserAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: UserAddress[];
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  variantName: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  shippingAddress: UserAddress;
  paymentMethod: 'COD' | 'CARD' | 'UPI';
}
