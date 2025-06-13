# Saffron Spice Restaurant Web Application

A full-stack web application for Saffron Spice Restaurant featuring authentication, menu browsing, and booking capabilities.

## Table of Contents

- Overview
- Project Structure
- Features
- Technologies Used
- Setup and Installation
  - Backend Setup
  - Frontend Setup
- Running the Application
  - Development Mode
  - Production Build
- Deployment
- API Documentation
- Contributing

## Overview

Saffron Spice Restaurant Web Application is a comprehensive platform that allows customers to view menus, make reservations, and create user accounts. The application features a React-based frontend and Node.js/Express backend with authentication functionality.

## Project Structure

.
├── backend/                # Node.js/Express backend
│   ├── Logincontrollers/   # Authentication controllers
│   ├── Loginmiddleware/    # Authentication middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   ├── utils/              # Helper functions
│   ├── .env                # Environment variables (not tracked by git)
│   └── loginserver.js      # Main server file
│
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   ├── src/                # React source code
│   ├── build/              # Production build
│   └── .env                # Frontend environment variables
│
├── trial/                  # HTML prototypes
│   ├── booking.html
│   ├── confirmation.html
│   ├── loginnew.html
│   ├── menu.html
│   └── signup.html
│
├── vercel.json             # Vercel deployment configuration
└── package.json            # Root package.json

## Features

- User Authentication: Secure login and signup functionality
- Menu Display: Browse restaurant menu items
- Booking System: Make and manage restaurant reservations
- Responsive Design: Mobile-friendly user interface
- Progressive Web App: Enhanced mobile experience

## Technologies Used

Frontend:
- React.js
- HTML5/CSS3
- Progressive Web App (PWA) capabilities

Backend:
- Node.js
- Express.js
- Authentication middleware
- RESTful API design

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Backend Setup

1. Clone the repository:
   git clone <repository-url>
   cd SaffronSpice

2. Install backend dependencies:
   cd backend
   npm install

3. Create a .env file in the backend directory:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

### Frontend Setup

1. Install frontend dependencies:
   cd frontend
   npm install

2. Create a .env file in the frontend directory:
   REACT_APP_API_URL=http://localhost:5000/api

## Running the Application

### Development Mode

Start the backend server:
cd backend
npm start

The server will run on http://localhost:5000 by default.

In a separate terminal, start the frontend:
cd frontend
npm start

The React app will run on http://localhost:3000.

### Production Build

Build the frontend:
cd frontend
npm run build

To serve the production build:
- Configure the backend to serve static files from the frontend build directory
- Or deploy separately using a service like Vercel

## Deployment

The application is configured for deployment on Vercel.

Install the Vercel CLI:
npm install -g vercel

Deploy using Vercel:
vercel

The vercel.json file contains the deployment configuration for routing API requests to the backend and serving the frontend.

## API Documentation

### Authentication
POST /api/auth/register - Register a new user
POST /api/auth/login - Authenticate a user
GET /api/auth/profile - Get user profile (requires authentication)

### Menu
GET /api/menu - Retrieve menu items
GET /api/menu/:id - Get specific menu item

### Bookings
POST /api/bookings - Make a reservation (requires authentication)
GET /api/bookings - Get user's bookings (requires authentication)
DELETE /api/bookings/:id - Cancel a booking (requires authentication)

## Contributing

1. Fork the repository
2. Create a feature branch: git checkout -b feature-name
3. Commit your changes: git commit -m 'Add some feature'
4. Push to the branch: git push origin feature-name
5. Submit a pull request
