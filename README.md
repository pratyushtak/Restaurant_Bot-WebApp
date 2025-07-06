
# 🤖 Restaurant Bot WebApp

A smart and interactive Restaurant Bot web application that allows users to:

- 🛒 **Order food**
- 📅 **Make table reservations**
- 📍 **Find nearby restaurants**

This bot is designed to understand natural language prompts such as:

- "Please give restaurant near me"
- "I want to order, please give restaurant name"
- "I want to make a reservation for restaurant nearby"

---

## ✨ Features

- 💬 Conversational user experience
- 🛒 Add multiple food items to a cart and place orders
- 📅 Book tables by specifying restaurant and time
- 📍 Get restaurant suggestions based on location-like prompts
- 🧪 Health check endpoint at `/api/health`

---

## 💬 Prompt Examples

| Feature        | User Prompt                                               |
|----------------|------------------------------------------------------------|
| Nearby Search  | `Please give restaurant near me`                          |
| Order Food     | `I want to order, please give restaurant name`            |
| Reservation    | `I want to make a reservation for restaurant nearby`      |

---

## 🛠 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Storage**: JSON file (can be extended to MongoDB or SQL)
- **API Communication**: RESTful endpoints

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pratyushtak/Restaurant_Bot-WebApp.git
cd Restaurant_Bot-WebApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Backend Server

```bash
node server.js
```

- Server runs at: `http://localhost:3001`
- Health check: `http://localhost:3001/api/health`

### 4. Run Frontend App

```bash
npm run dev
```

- Frontend runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
Restaurant_Bot-WebApp/
├── data/
│   └── restaurants.json       # Restaurant database
├── server.js                  # Express backend server
├── src/
│   ├── App.jsx                # Main React component
│   └── main.jsx               # React entry point
├── public/
│   └── index.html             # HTML template
├── package.json               # Project metadata and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── vite.config.js             # Vite bundler configuration
└── README.md                  # You're here!
```

---

## 📌 To-Do / Future Enhancements

- [ ] Add real-time geolocation API for more accurate nearby results
- [ ] Integrate payment gateway (e.g., Razorpay, Stripe)
- [ ] Add user authentication and admin dashboard
- [ ] Expand data source to real-time restaurant APIs (like Zomato/Swiggy)

---

## 📞 Contact

Created with ❤️ by **Pratyush Tak**  
📫 GitHub: [@pratyushtak](https://github.com/pratyushtak)

> This project was built as part of a web development learning journey and can be extended into a full-scale food delivery or restaurant management platform.
