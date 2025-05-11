# Contact Request API

A Node.js API for handling contact requests with Express.js and Prisma ORM.

## Requirements

- Node.js 16 or higher
- MySQL database

## Setup Instructions

1. Install dependencies:
```
npm install
```

2. Configure environment variables:
- Copy `.env.example` to `.env` and update with your MySQL database credentials.

3. Initialize the database:
```
npx prisma migrate dev --name init
```

4. Start the server:
```
npm run dev
```

## API Endpoints

### Submit Contact Request

```
POST /api/digsol/contact-request
```

Request body:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "country": "United States",
  "message": "I would like more information about your services."
}
```

## Project Structure

```
/
├── prisma/
│   └── schema.prisma    # Database schema
├── src/
│   ├── app.js           # Express application setup
│   ├── server.js        # Server entry point
│   ├── config/          # Application configuration
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Custom middleware
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── validators/      # Request validation
└── .env                 # Environment variables
```