import React from 'react';
import { MapPin, Clock, Star, Phone } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(restaurant)}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
    >
      <div className="flex items-start space-x-3">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{restaurant.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine} • {restaurant.priceRange}</p>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-400 mr-1" />
              <span>{restaurant.rating}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{restaurant.location}</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-600 line-clamp-2">{restaurant.description}</p>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {restaurant.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;