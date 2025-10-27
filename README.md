# User Registration System - Backend

A RESTful API backend for user registration and authentication built with NestJS, MongoDB, and JWT.


## Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Installation

1. Navigate to the backend directory:
```bash
cd user-registration-system-be
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The application uses MongoDB for data storage. Make sure you have MongoDB running locally or configure a connection string.

Default MongoDB connection: `mongodb://localhost:27017`

To change the database connection, update the configuration in `src/main.ts` or set the `MONGODB_URI` environment variable.

## Running the Application

### Development Mode

Start the application in development mode with hot-reload:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Standard Mode

Start without watch mode:

```bash
npm run start
```


## Environment Variables

Create a `.env` file (optional) to configure the application:

```env
MONGODB_URI=mongodb://localhost:27017/User-Registration-System
PORT=3000
JWT_SECRET=your-secret-key-here
```

## Docker (Optional)

To run MongoDB using Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```


