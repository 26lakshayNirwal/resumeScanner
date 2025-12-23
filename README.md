# Resume Scanner

A full-stack web application for scanning and managing resumes. This application allows users to upload resumes, view details, and manage their resume portfolio.

## Features

- **User Authentication**: Secure signup and login functionality using JWT.
- **Resume Upload**: Upload resume files (PDF/Image support depending on implementation).
- **Dashboard**: View a list of uploaded resumes.
- **Resume Details**: Detailed view of parsed resume information.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive UI.

## Tech Stack

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **MongoDB**: Database for storing user and resume data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **Multer**: Middleware for handling file uploads.

### Frontend
- **React**: UI library.
- **Vite**: Build tool.
- **Tailwind CSS**: Utility-first CSS framework.
- **Axios**: HTTP client.
- **React Router**: Navigation.
- **React Toastify**: Notifications.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Atlas connection string)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd resumeScanner
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

## Running the Application

### Start the Backend

In the `backend` directory:

```bash
npm run dev
```
The server will start on `http://localhost:3000` (or the port specified in your .env).

### Start the Frontend

In the `frontend` directory:

```bash
npm run dev
```
The application will be available at `http://localhost:5173` (default Vite port).

## API Endpoints

### Auth
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Login user.

### Resumes
- `POST /api/resumes`: Upload a resume.
- `GET /api/resumes`: Get all resumes for the logged-in user.
- `GET /api/resumes/:id`: Get a specific resume by ID.

## Project Structure

```
resumeScanner/
├── backend/         # Node.js/Express backend
│   ├── src/
│   │   ├── config/      # Database and other configs
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Auth and upload middleware
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   └── server.js    # Entry point
│   └── ...
├── frontend/        # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Context API (Auth)
│   │   ├── pages/       # Application pages
│   │   └── ...
│   └── ...
└── ...
```
