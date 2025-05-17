# MERN Stack CRUD Application

This is a simple MERN stack application that allows users to perform Create, Read, Update, and Delete (CRUD) operations on user data.

## Project Structure

- `/server` - Backend Node.js + Express server with MongoDB (Mongoose)
- `/client` - Frontend React application

## Prerequisites

- Node.js and npm installed
- MongoDB installed locally or use MongoDB Atlas

## Setup Instructions

### Backend

1. Navigate to the `server` directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:

   ```
   npm run dev
   ```

   The server will run on `http://localhost:5000`.

4. (Optional) To use a different MongoDB URI, set the `MONGO_URI` environment variable.

### Frontend

1. Navigate to the `client` directory:
   ```
   cd client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React app:
   ```
   npm start
   ```
   The app will run on `http://localhost:3000`.

## Features

- Add new users with Name, Email, Phone Number, and Address
- View all users in a table
- Edit existing users
- Delete users
- Basic form validation for required fields and email format

## Notes

- The backend uses CORS to allow requests from the frontend.
- The frontend uses React Router for navigation between pages.
- The backend uses Mongoose for MongoDB interaction.

## Deployment

- You can deploy the frontend on Vercel and backend on Render or Heroku (optional).

## License

This project is open source and free to use.
