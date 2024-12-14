
# Welcome to Buy Nest - Backend

Buy Nest is a feature-rich e-commerce platform designed for seamless shopping experiences. This repository contains the backend services that power the platform, enabling robust functionality for Admins, Vendors, and Customers.

## Features

### Admin
- Full control over the platform.
- Manage users: suspend or delete accounts.
- Blacklist vendors and manage product categories.
- Monitor transactions and platform activities.

### Vendor
- Create and manage shops with personalized branding.
- Add, edit, and delete products.
- View and respond to customer reviews.
- Manage inventory and view shop-specific order history.

### Customer
- Browse products from various vendors.
- Use advanced filters and search functionalities.
- Add products to the cart, purchase items, and apply coupons.
- Compare products and leave reviews.
- View order history and follow favorite vendors.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **TypeScript**: For type-safe development.
- **Prisma**: ORM for database management.

### Database
- **PostgreSQL**: Relational database for structured data.

### Authentication
- **JWT (JSON Web Token)**: For secure authentication and authorization.

### Payment Integration
- **Stripe/PayPal**: Seamless and secure payment gateways.

## Getting Started

Follow the steps below to set up the backend locally.

### Prerequisites
- **Node.js** (v16.x or later)
- **PostgreSQL** (installed locally or accessible via a cloud provider)
- **Prisma CLI**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kamrulthedev/Buy-Nest-Backend.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd Buy-Nest-Backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   PAYPAL_CLIENT_ID=your_paypal_client_id
   ```

5. **Initialize the database**:
   ```bash
   npx prisma migrate dev
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

7. **Access the API**:
   The server will start on `http://localhost:5000` by default.

## API Endpoints

### User Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive a token.

### Admin
- `GET /api/admin/users`: View all users.
- `DELETE /api/admin/user/:id`: Delete a user account.
- `POST /api/admin/blacklist`: Blacklist a vendor.

### Vendor
- `POST /api/vendor/products`: Add a new product.
- `GET /api/vendor/orders`: View shop-specific order history.

### Customer
- `GET /api/products`: Browse products.
- `POST /api/orders`: Place an order.
- `POST /api/reviews`: Leave a review.

For more detailed documentation, refer to the [API Docs](#).

## Testing

Run the test suite using:
```bash
npm test
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy Coding! 🚀
