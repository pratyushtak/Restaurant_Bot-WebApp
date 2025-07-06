export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  priceRange: string;
  rating: number;
  image: string;
  description: string;
  phone: string;
  address: string;
  hours: string;
  features: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  restaurantId: string;
  items: CartItem[];
  customerInfo: {
    name: string;
    phone: string;
    email: string;
    address?: string;
  };
  orderType: 'delivery' | 'pickup';
  paymentMethod: string;
  status: 'confirmed' | 'preparing' | 'ready' | 'delivered';
  total: number;
  createdAt: string;
  estimatedDelivery: string;
}

export interface Reservation {
  id: string;
  restaurantId: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  specialRequests?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  type?: 'text' | 'restaurant' | 'menu' | 'reservation' | 'order' | 'nearby';
  data?: any;
}