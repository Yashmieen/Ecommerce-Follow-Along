# E-commerce-follow-along

# Project Overview: E-Commerce Application (MERN Stack )

This project will guide you through building  full-stack E-commerce website  using the MERN stack (MongoDB, Express, React, Node.js). It allows users to browse products, add them to the cart, and proceed to checkout. Admin users can manage products, view orders, and update inventory.

## Tech Stack

- **Frontend:** React.js, Redux, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens), bcryptjs
- **Payment Gateway:** Stripe
- **State Management:** Redux for managing app state
- **Deployment:** Heroku (or any cloud provider like AWS)

## Key Features

- **User Authentication:** 
  - Register, login, and logout functionality with secure password storage using bcryptjs.
  - JWT-based authentication to manage sessions.
  
- **Product Management:**
  - Display products with sorting and filtering options based on categories, price, ratings, etc.
  - Admin panel to add, update, or delete products.

- **Shopping Cart:**
  - Add products to the cart, view cart details, and update item quantities.
  - Display total prices and calculate shipping fees.

- **Checkout Process:**
  - Integration with Stripe for secure payment processing.
  - Users can review their order and proceed with payment.

- **Order Management:**
  - Users can view their order history and track current orders.
  - Admin can update order status (Pending, Shipped, Delivered).

- **Responsive Design:**
  - Fully responsive UI to support different screen sizes (desktop, tablet, and mobile).

- **Search and Filter:**
  - Search products by name and filter by categories, price range, and ratings.

- **Security Features:**
  - Input validation and data sanitization.
  - HTTPS support for secure data transmission.



# Milestone 1: 

In a MERN stack application, login and sign-up (authentication) typically involve a process where users can register (sign-up) with their credentials, and later log in using those credentials. The login and sign-up process can be divided into several steps, with separate client-side (React) and server-side (Node.js/Express) handling.

### Project Setup
- Initialized the project with a README file.
- Set up the project structure and created the necessary folders and files.

## Milestone 2: Project Setup and Login Page
In this milestone, we completed the setup of the Node.js project and created the Login Page.

### What Was Achieved
- Created a new Node.js project.
- Initialized a Git repository and connected it to GitHub.
- Set up the project with npm init and created a package.json file.
- Installed necessary packages including Express, Nodemon, Dotenv, and Mongoose.
- Created a .gitignore file to avoid committing node_modules and package-lock.json.
- Developed the Login Page for the application.

### Steps Taken
1. Project Setup: Set up the project structure and initialized it with npm init.
2. Package Installation: Installed Express, Nodemon, Dotenv, and Mongoose.
3. Login Page Development: Created the Login Page with form validation and authentication logic.