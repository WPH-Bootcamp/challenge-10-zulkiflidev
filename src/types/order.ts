export interface OrderItem {
  menuId: number;
  quantity: number;
}

export interface OrderRestaurant {
  restaurantId: number;
  items: OrderItem[];
}

export interface CheckoutRequest {
  restaurants: OrderRestaurant[];
  deliveryAddress: string;
  phone: string;
  paymentMethod: string;
  notes?: string;
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export interface MyOrderParams {
  status?: string;
  page?: number;
  limit?: number;
}

export interface OrderItemDetail {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
  itemTotal: number;
}

export interface OrderRestaurantDetail {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: OrderItemDetail[];
  subtotal: number;
}

export interface OrderData {
  id: number;
  transactionId: string;
  paymentMethod: string;
  status: string;
  deliveryAddress: string;
  phone: string;
  pricing: {
    subtotal: number;
    serviceFee: number;
    deliveryFee: number;
    totalPrice: number;
  };
  restaurants: OrderRestaurantDetail[];
  createdAt: string;
}
