import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, CheckCircle } from 'lucide-react';
import { Restaurant, MenuItem, CartItem } from '../types';

interface MenuCardProps {
  restaurant: Restaurant;
  menu: MenuItem[];
}

const MenuCard: React.FC<MenuCardProps> = ({ restaurant, menu }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
    
    setQuantities({ ...quantities, [item.id]: 1 });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities({ ...quantities, [itemId]: newQuantity });
  };

  const handleOrder = (orderType: 'delivery' | 'pickup') => {
    setOrderPlaced(true);
    // Reset cart after a delay
    setTimeout(() => {
      setCart([]);
      setQuantities({});
      setOrderPlaced(false);
    }, 3000);
  };

  const groupedMenu = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as { [key: string]: MenuItem[] });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (orderPlaced) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl text-center">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="text-green-500 mr-2" size={32} />
          <h3 className="text-xl font-semibold text-green-600">Order Placed!</h3>
        </div>
        <p className="text-gray-600">Your order has been successfully placed. Thank you for choosing {restaurant.name}!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{restaurant.name} Menu</h3>
        {cart.length > 0 && (
          <div className="flex items-center space-x-2 bg-emerald-100 px-3 py-1 rounded-full">
            <ShoppingCart size={16} className="text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">
              {totalItems} items • ₹{totalPrice.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {Object.entries(groupedMenu).map(([category, items]) => (
          <div key={category}>
            <h4 className="font-medium text-gray-700 mb-2 border-b pb-1">{category}</h4>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{item.name}</h5>
                    <p className="text-xs text-gray-600">{item.description}</p>
                    <p className="text-sm font-semibold text-emerald-600">₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) - 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">
                      {quantities[item.id] || 1}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) + 1)}
                      className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-emerald-500 text-white px-3 py-1 rounded text-sm hover:bg-emerald-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-700">Order Summary</span>
            <span className="font-semibold text-emerald-600">₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="space-y-1 text-sm text-gray-600 mb-3">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleOrder('delivery')}
              className="flex-1 bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition-colors"
            >
              Order for Delivery
            </button>
            <button 
              onClick={() => handleOrder('pickup')}
              className="flex-1 bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition-colors"
            >
              Order for Pickup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCard;