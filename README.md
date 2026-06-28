# PahadiKart

## A responsive Direct-to-Consumer (D2C) web application developed for HimShakti Food Processing Unit, enabling customers to browse authentic Himalayan food products, manage a shopping cart, receive AI-based product recommendations, and place orders through WhatsApp. The project also includes a RESTful backend API for product management.

### Prerequisites

Before running the backend, make sure you have:

- Node.js (v16 or later recommended)
- npm (comes with Node.js)
- Git (optional, for cloning the repository)

## Tech Stack

### Frontend

- React.js (Vite)
- React Router DOM
- JavaScript (ES6+)
- HTML5
- CSS3 (Custom CSS)
- Tailwind CSS (Selective UI Utilities)

### Backend

- Node.js
- Express.js
- CORS
- Dotenv
- Nodemon

### Tools & Design

- Figma
- Git
- GitHub
- WhatsApp API

---

## How to Run Backend Locally

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file using the values from `.env.example`.

Example:

```env
PORT=5000
```

### 4. Start the backend server

```bash
npm run dev
```

### 5. Server URL

```
http://localhost:5000
```

## API Endpoints

| Method | Endpoint                         | Description                |
| ------ | -------------------------------- | -------------------------- |
| GET    | `/api/products`                  | Retrieve all products      |
| GET    | `/api/products/:id`              | Retrieve a product by ID   |
| POST   | `/api/products`                  | Create a new product       |
| PUT    | `/api/products/:id`              | Update an existing product |
| DELETE | `/api/products/:id`              | Delete a product           |
| GET    | `/api/products/search?q=keyword` | Search products by keyword |
