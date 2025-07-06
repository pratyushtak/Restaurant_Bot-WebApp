import React from 'react';
import { Restaurant } from '../types';

interface NearbyRestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (restaurant: Restaurant) => void;
}

const NearbyRestaurantCard: React.FC<NearbyRestaurantCardProps> = ({ restaurant, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(restaurant)}
      className="bg-white rounded-lg shadow-sm p-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-200 flex items-center space-x-3"
    >
      <img 
        src={restaurant.image} 
        alt={restaurant.name}
        className="w-12 h-12 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 text-sm">{restaurant.name}</h4>
      </div>
    </div>
  );
};

export default NearbyRestaurantCard;