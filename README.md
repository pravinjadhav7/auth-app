

# NestJS Authentication App

This project is a NestJS-based authentication API with MongoDB integration. It provides endpoints for user registration and login, implementing security best practices, logging, and input validation.

## Features

- **User Registration**: Sign up users with email, name, and password.
- **User Authentication**: Log in users and generate JWT tokens for authentication.
- **Security Best Practices**: Password hashing, JWT authentication, input validation, and rate limiting.
- **Logging**: Application logs important events and errors using NestJS's built-in logger.
- **TypeScript**: The project is built entirely in TypeScript.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (>= 14.x)
- **npm** (>= 6.x) or **Yarn**
- **MongoDB** (either local or hosted, e.g., MongoDB Atlas)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pravinjadhav7/auth-app.git
cd auth-app
```
### 2. Install Dependencies
Using npm
```bash
npm install
```
Or using yarn
```bash
yarn install
```

### 3. Configure Environment Variables
Create a .env file in the root directory and add the following environment variables:

```bash
MONGODB_URI=mongodb://localhost:27017/nestjs-auth-app
JWT_SECRET=your_secret_key
PORT=3001
```

replace `your_secret_key` with a strong, random string. You can use openssl command
```bash 
openssl rand -base64 64
```

If using a hosted MongoDB service like `MongoDB Atlas`, replace the `MONGODB_URI` with the appropriate connection string.



### 4. Run the Application
Using npm:

```bash 
npm run start:dev
```
Or using yarn:
```bash 
yarn start:dev
```

This will start the application on http://localhost:3001.

### 5. API Endpoints

Sign Up: `POST /auth/signup`
Payload: `{ "email": "test@example.com", "name": "Test User", "password": "YourPassword123!" }`

Sign In: `POST /auth/signin`
Payload: `{ "email": "test@example.com", "password": "YourPassword123!" }`


### 6. Run Tests
Using npm:

```bash
npm run test:e2e
```

Or using Yarn:

```bash
yarn test:e2e
```

## Security Considerations

* **Environment Variables:** Ensure that your .env file is not committed to version control. Use tools like dotenv or environment variable management services in production.
* **JWT Secret:** Use a strong, unique secret for JWT signing. Rotate this key periodically.
* **Password Hashing:** Passwords are hashed using bcrypt before being stored in the database. Ensure that the number of salt rounds is appropriate for your application's security requirements.
* **Rate Limiting:** Basic rate limiting is implemented to prevent abuse of the API.


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).