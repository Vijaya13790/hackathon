
# 🚀 E-commerce Hackathon MVP

## Problem Statement

Building the solution end-to-end, focusing on **usability**, **data persistence**, and **security** in both frontend and backend.

***

## Scope: 5-Hour MVP

Focus on delivering a **Minimum Viable Product (MVP)** that demonstrates key features:

- Security
- Usability
- Data persistence[1]

***

## Key Features to Implement

1. **User Registration and Authentication**
   - Signup/login using email and password
   - Profile management

2. **Product Catalog**
   - List, search, and filter products by name and category

3. **Shopping Cart and Checkout**
   - Add/remove items from cart
   - Customer details (addresses, payment info)
   - Checkout flow

4. **Business User Controls**
   - Editable content in CMS with preview
   - Manage products & inventory via e-commerce portal

***

## Project Structure

### Users

- Seller
- Buyer

### Components

- Product list
- Product details
- Checkout
- Cart
- Filter
- Alert modals

### Pages

- Register
- Login
- Product Page
- ProductDetails
- Cart 

***

## Seller (CMS)

Built with **Strapi**; Product management fields:
- Title
- Description
- Price
- Quantity
- Discount
- Active

***

## MVP Deliverables

- Signup and login using email address
- Product listing
- Cart functionality
- Checkout flow

***

## Technical Requirements

- Modern React framework
- TypeScript and hooks
- UI Component library (Material UI)
- Routing (React Router v7)
- Authentication (Auth0 or similar)
- CMS (Strapi or any recommended)
- E-commerce/Inventory engine (optional)
- SASS for styling


## Frontend Development Packages

The following packages are required (already installed, see terminal log):

| Package           | Purpose                                |
|-------------------|----------------------------------------|
| `react`           | Core frontend framework                |
| `react-router-dom`| Client-side routing                    |
| `auth0 SDK`       | Authentication                         |
| `bcrypt`          | Password hashing (useful for auth)     |
| `@mui/material`   | Material UI component library          |
| `SASS`            | Advanced CSS styling                   |
| Others as needed  | (e.g., axios for API calls, etc.)      |

***

## Getting Started

1. Clone repository
2. `cd hackathon`
3. Install packages: `npm i`
4. Start development: `npm start`

***

## Project Demo

> All key flows implemented: **Signup/Login**, **Product search/filter**, **Cart**, **Checkout**, and seller portal for product management.

