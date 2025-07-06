import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

  const app = express();
  const cors = require('cors');
  const PORT = process.env.PORT || 3001;

  // Middleware
  app.use(cors());
  app.use(express.json());


// Data storage functions
const getDataPath = (filename) => join(__dirname, 'data', filename);


const readData = (filename) => {
  const filePath = getDataPath(filename);
  if (!existsSync(filePath)) {
    return [];
  }
  try {
    return JSON.parse(readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
};

const writeData = (filename, data) => {
  const filePath = getDataPath(filename);
  const dataDir = dirname(filePath);
  
  // Ensure the directory exists before writing
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
  
  try {
    writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
  }
};

// Initialize data files
const initializeData = () => {
  const dataDir = join(__dirname, 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // Sample restaurants data
  const sampleRestaurants = [
    {
      id: '1',
      name: 'Bella Vista Italian',
      cuisine: 'Italian',
      location: 'Downtown',
      priceRange: '₹₹₹',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Authentic Italian cuisine with fresh pasta and wood-fired pizzas',
      phone: '(555) 123-4567',
      address: '123 Main St, Downtown',
      hours: 'Mon-Sun: 5:00 PM - 11:00 PM',
      features: ['Outdoor Seating', 'Wine Bar', 'Romantic']
    },
    {
      id: '2',
      name: 'Tokyo Sushi Bar',
      cuisine: 'Japanese',
      location: 'Midtown',
      priceRange: '₹₹₹₹',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Premium sushi and Japanese cuisine by master chefs',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, Midtown',
      hours: 'Tue-Sun: 6:00 PM - 12:00 AM',
      features: ['Omakase', 'Sake Bar', 'Chef\'s Table']
    },
    {
      id: '3',
      name: 'The Green Garden',
      cuisine: 'Vegetarian',
      location: 'Uptown',
      priceRange: '₹₹',
      rating: 4.6,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Fresh, organic vegetarian and vegan dishes',
      phone: '(555) 345-6789',
      address: '789 Pine St, Uptown',
      hours: 'Mon-Sun: 11:00 AM - 10:00 PM',
      features: ['Organic', 'Vegan Options', 'Healthy']
    },
    {
      id: '4',
      name: 'Smoky BBQ House',
      cuisine: 'BBQ',
      location: 'Westside',
      priceRange: '₹₹',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Authentic BBQ with house-made sauces and sides',
      phone: '(555) 456-7890',
      address: '321 Elm St, Westside',
      hours: 'Mon-Sun: 12:00 PM - 10:00 PM',
      features: ['Takeout', 'Family Friendly', 'Casual']
    }
  ];

  const sampleMenus = {
    '1': [
      { id: '1', name: 'Margherita Pizza', price: 450, category: 'Pizza', description: 'Fresh mozzarella, tomato sauce, basil', image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: '2', name: 'Spaghetti Carbonara', price: 550, category: 'Pasta', description: 'Pancetta, egg, pecorino romano, black pepper', image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: '3', name: 'Tiramisu', price: 220, category: 'Dessert', description: 'Classic Italian dessert with mascarpone', image: 'https://images.pexels.com/photos/6074893/pexels-photo-6074893.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ],
    '2': [
      { id: '4', name: 'Omakase Set', price: 2100, category: 'Sushi', description: 'Chef\'s choice of 10 premium sushi pieces', image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: '5', name: 'Chirashi Bowl', price: 850, category: 'Sashimi', description: 'Assorted fresh sashimi over sushi rice', image: 'https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: '6', name: 'Miso Soup', price: 150, category: 'Soup', description: 'Traditional miso soup with tofu and seaweed', image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ],
    '3': [
      { id: '7', name: 'Buddha Bowl', price: 420, category: 'Bowls', description: 'Quinoa, roasted vegetables, tahini dressing', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: '8', name: 'Avocado Toast', price: 320, category: 'Breakfast', description: 'Multigrain bread, avocado, hemp seeds', image: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: '9', name: 'Green Smoothie', price: 220, category: 'Drinks', description: 'Spinach, banana, mango, coconut water', image: 'https://images.pexels.com/photos/616833/pexels-photo-616833.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ],
    '4': [
      { id: '10', name: 'Brisket Platter', price: 620, category: 'BBQ', description: 'Slow-smoked brisket with two sides', image: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: '11', name: 'Pulled Pork Sandwich', price: 420, category: 'Sandwiches', description: 'House-made BBQ sauce, coleslaw, brioche bun', image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { id: '12', name: 'Mac & Cheese', price: 220, category: 'Sides', description: 'Creamy four-cheese blend with breadcrumbs', image: 'https://images.pexels.com/photos/14737/pexels-photo-14737.jpeg?auto=compress&cs=tinysrgb&w=400' }
    ]
  };

  if (!existsSync(getDataPath('restaurants.json'))) {
    writeData('restaurants.json', sampleRestaurants);
  }
  if (!existsSync(getDataPath('menus.json'))) {
    writeData('menus.json', sampleMenus);
  }
  if (!existsSync(getDataPath('orders.json'))) {
    writeData('orders.json', []);
  }
  if (!existsSync(getDataPath('reservations.json'))) {
    writeData('reservations.json', []);
  }
  if (!existsSync(getDataPath('users.json'))) {
    writeData('users.json', []);
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.get('/api/restaurants', (req, res) => {
  const { cuisine, location, priceRange, search } = req.query;
  let restaurants = readData('restaurants.json');
  
  if (cuisine) {
    restaurants = restaurants.filter(r => r.cuisine.toLowerCase().includes(cuisine.toLowerCase()));
  }
  if (location) {
    restaurants = restaurants.filter(r => r.location.toLowerCase().includes(location.toLowerCase()));
  }
  if (priceRange) {
    restaurants = restaurants.filter(r => r.priceRange === priceRange);
  }
  if (search) {
    restaurants = restaurants.filter(r => 
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurants = readData('restaurants.json');
  const restaurant = restaurants.find(r => r.id === req.params.id);
  
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  
  res.json(restaurant);
});

app.get('/api/restaurants/:id/menu', (req, res) => {
  const menus = readData('menus.json');
  const menu = menus[req.params.id] || [];
  res.json(menu);
});

app.post('/api/reservations', (req, res) => {
  const { restaurantId, date, time, guests, name, phone, specialRequests } = req.body;
  
  const reservation = {
    id: uuidv4(),
    restaurantId,
    date,
    time,
    guests,
    name,
    phone,
    specialRequests,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  
  const reservations = readData('reservations.json');
  reservations.push(reservation);
  writeData('reservations.json', reservations);
  
  res.json(reservation);
});

app.get('/api/reservations', (req, res) => {
  const reservations = readData('reservations.json');
  res.json(reservations);
});

app.post('/api/orders', (req, res) => {
  const { restaurantId, items, customerInfo, orderType, paymentMethod } = req.body;
  
  const order = {
    id: uuidv4(),
    restaurantId,
    items,
    customerInfo,
    orderType,
    paymentMethod,
    status: 'confirmed',
    total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString()
  };
  
  const orders = readData('orders.json');
  orders.push(order);
  writeData('orders.json', orders);
  
  res.json(order);
});

app.get('/api/orders', (req, res) => {
  const orders = readData('orders.json');
  res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
  const orders = readData('orders.json');
  const order = orders.find(o => o.id === req.params.id);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
});

app.put('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const orders = readData('orders.json');
  const orderIndex = orders.findIndex(o => o.id === req.params.id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  orders[orderIndex].status = status;
  writeData('orders.json', orders);
  
  res.json(orders[orderIndex]);
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  
  // Simple chatbot logic
  let response = '';
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('find') || lowerMessage.includes('search') || lowerMessage.includes('restaurant')) {
    response = 'I can help you find restaurants! What type of cuisine are you looking for? You can also specify a location or price range.';
  } else if (lowerMessage.includes('menu')) {
    response = 'I can show you menus for any restaurant. Which restaurant would you like to see the menu for?';
  } else if (lowerMessage.includes('reservation') || lowerMessage.includes('book')) {
    response = 'I can help you make a reservation! Please let me know which restaurant, date, time, and number of guests.';
  } else if (lowerMessage.includes('order')) {
    response = 'I can help you place an order for delivery or pickup. Which restaurant and items would you like to order?';
  } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    response = 'Hello! I\'m your restaurant assistant. I can help you find restaurants, browse menus, make reservations, and place orders. What would you like to do today?';
  } else {
    response = 'I can help you with restaurant searches, menu browsing, reservations, and orders. What would you like to do?';
  }
  
  res.json({ response });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize data and start server
console.log('Initializing data...');
initializeData();

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📁 Data directory: ${join(__dirname, 'data')}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});