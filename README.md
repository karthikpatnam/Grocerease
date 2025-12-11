# 🛒 Grocery App

A modern, full-stack e-commerce application for browsing and purchasing grocery items online. Built with React and Vite on the frontend, with a JSON Server backend for managing products and user data.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Pages & Components](#pages--components)
- [Authentication](#authentication)

## ✨ Features

- **Product Browsing**: Browse grocery items across multiple categories:
  - 🍎 Fruits
  - 🥬 Vegetables
  - 🥛 Dairy Products

- **Shopping Cart**: Add/remove items to cart with quantity management
- **User Authentication**: Login system with persistent sessions using localStorage
- **Admin Dashboard**: Admin page for managing products and orders
- **Billing & Checkout**: Complete checkout process with order summary
- **Responsive Design**: Mobile-friendly interface with Banner and Footer sections
- **Product Filtering**: Organized product categories with descriptions and pricing
- **Discount Display**: Show original and discounted prices for products

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **React Router DOM 6.28.0** - Client-side routing
- **Vite 5.4.11** - Build tool and dev server
- **ESLint** - Code quality and linting

### Backend
- **JSON Server 1.0.0-beta.3** - RESTful mock API
- **Node.js** - Runtime environment

## 📁 Project Structure

```
grocery-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation header
│   │   ├── Banner.jsx           # Homepage banner
│   │   ├── ProductSection.jsx   # Product display section
│   │   ├── Fruits.jsx           # Fruits category page
│   │   ├── Vegetables.jsx       # Vegetables category page
│   │   ├── Dairy.jsx            # Dairy category page
│   │   ├── Cart.jsx             # Shopping cart page
│   │   ├── Billing.jsx          # Checkout/billing page
│   │   ├── Login.jsx            # Login page
│   │   ├── AdminPage.jsx        # Admin dashboard
│   │   ├── Terms.jsx            # Terms & conditions page
│   │   └── Footer.jsx           # Footer section
│   ├── styles/
│   │   ├── App.css              # Main app styles
│   │   ├── [Component].css      # Individual component styles
│   │   └── index.css            # Global styles
│   ├── assets/                  # Static assets
│   ├── App.jsx                  # Main app component with routing
│   ├── main.jsx                 # React entry point
│   └── index.html               # HTML template
│
├── fake-server/
│   ├── db.json                  # JSON database with products and users
│   └── package.json             # Server dependencies
│
├── public/
│   ├── Banner-2.avif            # Banner image
│   └── index.html               # Public HTML
│
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # This file
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone or extract the project**
   ```bash
   cd grocery-app
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend (fake-server) dependencies**
   ```bash
   cd fake-server
   npm install
   cd ..
   ```

## 📖 Usage

### Running the Development Server

**Terminal 1 - Start the JSON Server (Backend)**
```bash
cd fake-server
npm start
```
The API server will run on `http://localhost:5000`

**Terminal 2 - Start the React Development Server (Frontend)**
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (or the port shown in terminal)

### Building for Production
```bash
npm run build
```
The optimized build will be created in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 📝 Available Scripts

### Frontend Scripts (in root directory)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

### Backend Scripts (in fake-server directory)
| Command | Description |
|---------|-------------|
| `npm start` | Start JSON Server on port 5000 |

## 🔌 API Documentation

The fake-server provides the following endpoints:

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get specific product
- `POST /products` - Create new product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### Users
- `GET /users` - Get all users
- `POST /users` - Create new user (registration)
- `GET /users/:id` - Get specific user

### Orders
- `POST /orders` - Create new order
- `GET /orders` - Get all orders

### Database Structure (db.json)
The database includes:
- **products**: Array of grocery items with id, name, category, prices, descriptions, discounts, and images
- **users**: User accounts with credentials (if configured)
- **orders**: Order history and transactions

## 📄 Pages & Components

### Public Pages
1. **Home Page** - Banner, featured products, product sections
2. **Fruits** - Browse and filter fruits
3. **Vegetables** - Browse and filter vegetables
4. **Dairy** - Browse and filter dairy products
5. **Cart** - View and manage shopping cart items
6. **Billing** - Checkout and order confirmation
7. **Login** - User authentication page
8. **Terms** - Terms and conditions page

### Admin Pages
1. **AdminPage** - Dashboard for managing products and orders (admin only)

### Components
- **Navbar** - Navigation menu and search
- **Banner** - Hero banner section
- **ProductSection** - Reusable product display component
- **Footer** - Footer with links and information

## 🔐 Authentication

The app uses a simple authentication system:

- **Login**: Users can log in with credentials
- **Session Management**: Auth state is stored in `localStorage` under the key `authUser`
- **Persistent Sessions**: User remains logged in after page refresh
- **Admin Access**: AdminPage is protected and accessible only to authenticated admins

### Local Storage Structure
```javascript
{
  "authUser": {
    "id": "user_id",
    "username": "username",
    "email": "email@example.com",
    // ... other user data
  }
}
```

## 🎨 Styling

The app uses CSS modules for component styling:
- Individual CSS files for each component
- Global styles in `index.css`
- Main app styles in `App.css`
- Responsive design patterns for mobile and desktop

## 📱 Features to Explore

- **Add to Cart**: Click the add button on any product to add it to your cart
- **Cart Management**: Increase/decrease quantities or remove items
- **Checkout**: Complete the billing process
- **Filter by Category**: Navigate through Fruits, Vegetables, and Dairy sections
- **User Profile**: View and manage your account information (if admin)
- **Admin Dashboard**: Manage products, view orders, and user data

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 or 5173 is already in use:
- Backend: Modify the port in `fake-server/package.json`
- Frontend: Vite will automatically use the next available port

### CORS Issues
The fake-server is configured to handle CORS. Ensure it's running before the frontend makes requests.

### Module Not Found
Make sure to run `npm install` in both the root directory and `fake-server/` folder.

## 📄 License

This project is open source and available for educational and personal use.

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit pull requests.
