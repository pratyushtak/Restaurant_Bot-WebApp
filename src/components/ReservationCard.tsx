import React, { useState } from 'react';
import { Calendar, Users, Plus, Minus, CheckCircle } from 'lucide-react';
import { Restaurant } from '../types';

interface ReservationCardProps {
  restaurant: Restaurant & { availableSeats: number };
  onBookTable: (restaurant: Restaurant & { availableSeats: number }, seats: number) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ restaurant, onBookTable }) => {
  const [seats, setSeats] = useState(2);
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = () => {
    setIsBooked(true);
    onBookTable(restaurant, seats);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsBooked(false);
    }, 3000);
  };

  const updateSeats = (newSeats: number) => {
    if (newSeats >= 1 && newSeats <= restaurant.availableSeats) {
      setSeats(newSeats);
    }
  };

  if (isBooked) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 border border-green-200">
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <CheckCircle size={20} />
          <span className="font-medium">Table Booked!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex items-start space-x-3">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">{restaurant.name}</h4>
          <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
            <Users size={12} />
            <span>{restaurant.availableSeats} seats available</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-600">Guests:</span>
              <button
                onClick={() => updateSeats(seats - 1)}
                className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                disabled={seats <= 1}
              >
                <Minus size={10} />
              </button>
              <span className="w-6 text-center text-sm font-medium">{seats}</span>
              <button
                onClick={() => updateSeats(seats + 1)}
                className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                disabled={seats >= restaurant.availableSeats}
              >
                <Plus size={10} />
              </button>
            </div>
            
            <button
              onClick={handleBooking}
              className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors flex items-center space-x-1"
            >
              <Calendar size={12} />
              <span>Book Table</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;