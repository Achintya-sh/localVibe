# 🛍️ LocalVibe - Artisan Marketplace

![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-purple?style=for-the-badge&logo=vite)
![React Router](https://img.shields.io/badge/React_Router-6.x-red?style=for-the-badge&logo=react-router)
![Vanilla CSS](https://img.shields.io/badge/Vanilla_CSS-3.x-blue?style=for-the-badge&logo=css3)

**LocalVibe** is a modern, modular React-based e-commerce platform designed to connect local artisans and small businesses with customers. It features a complete customer storefront and a dedicated seller management dashboard, all powered by a robust, localized data layer using the browser's `localStorage`.

---

## ✨ Features

### 🛒 Customer Storefront
* **Product Catalog:** Browse products with search functionality and category/price filtering.
* **Product Details:** View rich product descriptions, images, and user reviews.
* **Shopping Cart:** Add products to the cart, adjust quantities, and calculate subtotals dynamically.
* **Wishlist:** Save favorite products for later viewing.
* **Checkout Flow:** Simulated checkout process that converts a cart into a tracked order.
* **Order Tracking:** Track the status of active orders.

### 🏪 Seller Dashboard
* **Inventory Management:** Add new products, edit existing listings, and manage stock levels.
* **Order Fulfillment:** View incoming customer orders and update their fulfillment status (`Pending` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`).
* **Analytics:** Dashboard overview showing total products, total orders, and low-stock alerts.

---

## 🏗️ Technical Architecture

LocalVibe relies on a strictly separated architecture to ensure clean data flow and prevent race conditions. The application is divided into **Global State (Context API)**, **Data Persistence (Services)**, and **UI Components**.

### 1. The Service Layer (Data Persistence)
Instead of relying on a backend database, LocalVibe uses the browser's `localStorage` as a mock database. All reads and writes go through dedicated service wrappers to ensure data integrity.

```javascript
// src/services/productService.js
export const productService = {
  getProducts: () => { /* ... */ },
  addProduct: (product) => { /* ... */ },
  updateProduct: (id, updatedProduct) => { /* ... */ },
  deleteProduct: (id) => { /* ... */ }
};
```

### 2. Global State Management (Context API)
We use React's Context API to manage global state in-memory and keep the UI perfectly synced with the Service layer.

* **`ProductContext`**: Holds the catalog and provides methods for the seller to manage inventory.
* **`CartContext`**: Merges product data with cart quantities, handles subtotals, and powers the Navbar cart badge.
* **`WishlistContext`**: Stores an array of favorited Product IDs.
* **`OrderContext`**: Handles the creation of new orders during checkout and status updates by the seller.

```javascript
// Example usage of Context in a Component
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <button onClick={() => addToCart(product.id, 1)}>Add to Cart</button>
    </div>
  );
};
```

---

## 📦 Data Contracts & Schemas

To maintain consistency across the application, LocalVibe adheres strictly to the following data schemas:

### Product Object
```javascript
{
  id: 1,
  name: "Handmade Ceramic Mug",
  category: "Home Decor",
  price: 18.99,
  image: "/assets/ceramic-mug.jpg",
  seller: "ClayCraft Studio",
  rating: 4.8,
  stock: 12,
  description: "A handmade ceramic mug crafted by local artisans.",
  reviews: [
    { user: "Ayesha", rating: 5, comment: "Beautiful!" }
  ]
}
```

### Cart Item
The cart strictly stores the `productId` and `quantity`. The `CartContext.getCartDetails()` helper dynamically merges this with the `ProductContext` for UI rendering.
```javascript
{
  productId: 1,
  quantity: 2
}
```

### Order Object
Generated upon checkout.
```javascript
{
  id: "ORD-1712345678",
  customerName: "John Doe",
  email: "john@example.com",
  address: "123 Main St",
  items: [
    { productId: 1, name: "Handmade Ceramic Mug", quantity: 2, price: 18.99 }
  ],
  total: 37.98,
  status: "Pending", // Transitions to 'Processing', 'Shipped', 'Delivered'
  createdAt: "2026-05-08T12:00:00Z"
}
```

### Wishlist
A simple array of saved Product IDs.
```javascript
[1, 5, 12]
```

---

## 📂 Project Structure

```bash
localvibe/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── components/
│   │   ├── layout/         # Shared Shell (Navbar, Footer)
│   │   └── ui/             # Reusable widgets (Cards, Search, Filters)
│   ├── constants/          # Routing paths, Storage Keys
│   ├── context/            # React Context Providers
│   ├── data/               # JSON/JS seed data mocks
│   ├── hooks/              # Custom React hooks (useLocalStorage)
│   ├── pages/
│   │   ├── customer/       # Storefront views (Home, Cart, Checkout)
│   │   └── seller/         # Dashboard views (Manage Products, Orders)
│   ├── services/           # localStorage abstraction layer
│   ├── styles/             # Global CSS variables and styling
│   ├── App.jsx             # React Router definitions
│   └── main.jsx            # Entry point & Context wrappers
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/localvibe.git
   cd localvibe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

Enjoy building and exploring LocalVibe!
