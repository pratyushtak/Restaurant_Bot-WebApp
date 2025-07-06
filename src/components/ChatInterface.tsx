import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MapPin, Clock, Star, Phone } from 'lucide-react';
import { ChatMessage, Restaurant, MenuItem, Order, Reservation } from '../types';
import RestaurantCard from './RestaurantCard';
import MenuCard from './MenuCard';
import OrderSummary from './OrderSummary';
import NearbyRestaurantCard from './NearbyRestaurantCard';
import ReservationCard from './ReservationCard';
const BASE_URL = import.meta.env.VITE_API_URL || '';


const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello! I'm your restaurant assistant. I can help you find restaurants, browse menus, make reservations, and place orders. What would you like to do today?",
      sender: 'bot',
      timestamp: new Date().toISOString(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Process the message and determine the response
      await processMessage(inputMessage);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const processMessage = async (message: string) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('nearby') || lowerMessage.includes('near me') || lowerMessage.includes('close')) {
      await handleNearbyRestaurants();
    } else if (lowerMessage.includes('reservation') || lowerMessage.includes('book') || lowerMessage.includes('table')) {
      await handleReservationRequest();
    } else if (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('restaurant')) {
      await handleRestaurantSearch(message);
    } else if (lowerMessage.includes('menu')) {
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: 'Please select a restaurant first to view its menu.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, botMessage]);
    } else {
      // Default chat response
      const response = await fetch(`${BASE_URL}/api/restaurants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, botMessage]);
    }
  };

  const handleReservationRequest = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/restaurants`);
      const restaurants: Restaurant[] = await response.json();

      // Generate random available seats for each restaurant (8-20 seats)
      const restaurantsWithAvailability = restaurants.map(restaurant => ({
        ...restaurant,
        availableSeats: Math.floor(Math.random() * 13) + 8 // Random between 8-20
      }));

      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: 'Here are the restaurants with available seats:',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        type: 'reservation',
        data: restaurantsWithAvailability
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching restaurants for reservation:', error);
    }
  };

  const handleTableBooking = (restaurant: any, seats: number) => {
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      text: `Table booked successfully at ${restaurant.name} for ${seats} ${seats === 1 ? 'person' : 'people'}!`,
      sender: 'bot',
      timestamp: new Date().toISOString(),
      type: 'text'
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleNearbyRestaurants = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/restaurants`);
      const restaurants: Restaurant[] = await response.json();

      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: 'Here are the restaurants nearby:',
        sender: 'bot',
        timestamp: new Date().toISOString(),
        type: 'nearby',
        data: restaurants
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching nearby restaurants:', error);
    }
  };

  const handleRestaurantSearch = async (query: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/restaurants`);
      const restaurants: Restaurant[] = await response.json();

      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `I found ${restaurants.length} restaurants for you:`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        type: 'restaurant',
        data: restaurants
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleRestaurantSelect = async (restaurant: Restaurant) => {
    try {
      const response = await fetch(`${BASE_URL}/api/restaurants/${restaurant.id}/menu`);
      const menu: MenuItem[] = await response.json();

      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        text: `Here's the menu for ${restaurant.name}:`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        type: 'menu',
        data: { restaurant, menu }
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message: ChatMessage) => {
    const isUser = message.sender === 'user';
    
    return (
      <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`flex max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex-shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isUser ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {isUser ? <User size={16} /> : <Bot size={16} />}
            </div>
          </div>
          <div className={`px-4 py-2 rounded-lg ${
            isUser 
              ? 'bg-emerald-500 text-white' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            <p className="text-sm">{message.text}</p>
            {message.type === 'reservation' && message.data && (
              <div className="mt-3 space-y-2">
                {message.data.map((restaurant: any) => (
                  <ReservationCard 
                    key={restaurant.id} 
                    restaurant={restaurant}
                    onBookTable={handleTableBooking}
                  />
                ))}
              </div>
            )}
            {message.type === 'nearby' && message.data && (
              <div className="mt-3 space-y-2">
                {message.data.map((restaurant: Restaurant) => (
                  <NearbyRestaurantCard 
                    key={restaurant.id} 
                    restaurant={restaurant}
                    onSelect={handleRestaurantSelect}
                  />
                ))}
              </div>
            )}
            {message.type === 'restaurant' && message.data && (
              <div className="mt-3 space-y-2">
                {message.data.map((restaurant: Restaurant) => (
                  <RestaurantCard 
                    key={restaurant.id} 
                    restaurant={restaurant}
                    onSelect={handleRestaurantSelect}
                  />
                ))}
              </div>
            )}
            {message.type === 'menu' && message.data && (
              <div className="mt-3">
                <MenuCard 
                  restaurant={message.data.restaurant}
                  menu={message.data.menu}
                />
              </div>
            )}
            <div className="text-xs opacity-70 mt-1">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center">
          <Bot className="text-emerald-500 mr-2" size={24} />
          <h1 className="text-xl font-semibold text-gray-800">Restaurant Assistant</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(renderMessage)}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex">
              <div className="flex-shrink-0 mr-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                  <Bot size={16} />
                </div>
              </div>
              <div className="px-4 py-2 rounded-lg bg-gray-100">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t px-4 py-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;