// Defines the shape for a single item within an order
export interface IOrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product: string; // This will be the product's _id
}

// Defines the shape for the shipping address
export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
}

// Defines the shape for the payment result (e.g., from Stripe or PayPal)
export interface IPaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

// Defines the shape for a populated user object within an order
export interface IOrderUser {
  _id: string;
  name: string;
  email: string;
}

// This is the main interface for a complete Order object
export interface IOrder {
  _id: string;
  user: IOrderUser; // We expect the user to be populated with name and email
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentResult?: IPaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string; // Dates will come from the API as strings
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt: string; // from timestamps
  updatedAt: string; // from timestamps
}
