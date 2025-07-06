import React from 'react';
import { Search, Calendar, ShoppingCart, MapPin, Clock, Star } from 'lucide-react';

interface QuickActionsProps {
  onActionSelect: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionSelect }) => {
  const actions = [
    {
      id: 'search',
      label: 'Find Restaurants',
      icon: <Search size={16} />,
      color: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'Search by cuisine, location, or price'
    },
    {
      id: 'reservation',
      label: 'Make Reservation',
      icon: <Calendar size={16} />,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Book a table for dining'
    },
    {
      id: 'order',
      label: 'Order Food',
      icon: <ShoppingCart size={16} />,
      color: 'bg-amber-500 hover:bg-amber-600',
      description: 'Order for delivery or pickup'
    },
    {
      id: 'nearby',
      label: 'Nearby Restaurants',
      icon: <MapPin size={16} />,
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Find restaurants near you'
    },
    {
      id: 'popular',
      label: 'Popular Now',
      icon: <Star size={16} />,
      color: 'bg-rose-500 hover:bg-rose-600',
      description: 'Trending restaurants and dishes'
    },
    {
      id: 'hours',
      label: 'Open Now',
      icon: <Clock size={16} />,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Find restaurants open now'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionSelect(action.id)}
            className={`${action.color} text-white p-3 rounded-lg transition-colors text-left group`}
          >
            <div className="flex items-center space-x-2 mb-1">
              {action.icon}
              <span className="font-medium text-sm">{action.label}</span>
            </div>
            <p className="text-xs opacity-90">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;