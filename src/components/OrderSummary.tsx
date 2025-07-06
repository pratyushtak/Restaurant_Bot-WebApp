import React from 'react';
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';
import { Order } from '../types';

interface OrderSummaryProps {
  order: Order;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'preparing':
        return <Clock className="text-yellow-500" size={20} />;
      case 'ready':
        return <Package className="text-blue-500" size={20} />;
      case 'delivered':
        return <Truck className="text-green-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Order Confirmed';
      case 'preparing':
        return 'Preparing Your Order';
      case 'ready':
        return 'Ready for Pickup';
      case 'delivered':
        return 'Order Delivered';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Order #{order.id.slice(-6)}</h3>
        <div className="flex items-center space-x-2">
          {getStatusIcon(order.status)}
          <span className="text-sm font-medium text-gray-700">{getStatusText(order.status)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm text-gray-600">
          <p><strong>Order Type:</strong> {order.orderType}</p>
          <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
          <p><strong>Payment:</strong> {order.paymentMethod}</p>
          {order.orderType === 'delivery' && (
            <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleTimeString()}</p>
          )}
        </div>

        <div className="border-t pt-3">
          <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
          <div className="space-y-1 text-sm">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-3">
          <h4 className="font-medium text-gray-700 mb-2">Customer Info:</h4>
          <div className="text-sm text-gray-600">
            <p>{order.customerInfo.name}</p>
            <p>{order.customerInfo.phone}</p>
            <p>{order.customerInfo.email}</p>
            {order.customerInfo.address && <p>{order.customerInfo.address}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;