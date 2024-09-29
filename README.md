# NestJS Multi-Tenant SaaS Starter

A scalable and easy-to-use starter project for building **multi-tenant SaaS applications** using **NestJS** and **MongoDB** with a **database-per-tenant** architecture.

## Features

- 🏢 **Multi-Tenancy**: Database-per-tenant model for complete tenant data isolation.
- 👤 **Tenant Owners & Users**: Tenant owner can create or invite users within their organization.
- 🔐 **Authentication**: Login for both tenant owners and regular users.
- 🔀 **Dynamic Tenant Database Connection**: Switches to the appropriate tenant database based on user credentials.
- 🛡 **Per-Tenant Secret Keys**: A unique secret key is generated and stored in each tenant's database, ensuring isolated security measures for token signing and sensitive operations.
- 💻 **NestJS Framework**: A robust and modular architecture based on NestJS.
- 🌿 **MongoDB & Mongoose**: MongoDB as the database and Mongoose as the ORM for tenant management.

## Technologies Used

- **NestJS**: The core framework used to build the server-side application.
- **MongoDB**: Each tenant has its own isolated MongoDB database.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT Authentication**: Secure authentication using JSON Web Tokens (JWT).

## Upcoming Features

I am actively working on adding the following features to this starter project:

- **Role-Based Access Control (RBAC)**:
  Implementing user roles such as `Owner`, `Admin`, and `User` with fine-grained permission management.
  Owners will have full access to manage tenants and users, while admins and users will have restricted access based on their role.
- **Customizable Roles**:
  Allow tenant owners to define and manage custom roles for more flexible access control.

- **Audit Logs**:
  Implementing audit logs to track important actions like user logins, data changes, and admin actions for better security and transparency.

- **Email Notifications**:
  Integrating email notifications for events like user invitations, password resets, and important tenant actions.

- **Improved User Management**:
  Enhancing the user management module with features like bulk user import, detailed user activity tracking, and advanced search and filtering.

Stay tuned for updates! Feel free to open an issue if you have any feature requests or suggestions.

## Getting Started

### Prerequisites

- **Node.js** v14 or later
- **MongoDB** server instance

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software. Please credit the original author.
