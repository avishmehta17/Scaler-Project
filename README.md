Google Calendar Clone

A high-fidelity, full-stack clone of Google Calendar built with React, Node.js, Express, and MongoDB. This project focuses on replicating the core UI, user interactions, and event management functionality of the original application.

(Replace this with a screenshot of your running application)

✨ Features

Full-Stack Architecture: A complete MERN stack application with a React frontend and a Node.js/Express backend.

Event CRUD: Full Create, Read, Update, and Delete functionality for calendar events.

Database Persistence: Events are saved and retrieved from a MongoDB database, allowing for persistent user data.

Interactive Event Modal: A smooth, high-fidelity modal for creating and editing event details (title, time, description, color).

Multi-View Interface: Seamlessly switch between:

Month View: A 6-week grid displaying all days and event snippets.

Week View: A 7-day grid showing events for the selected week.

Day View: A clean, list-based view of all events for a single day.

Responsive Design: The UI is built with Tailwind CSS and is usable on various screen sizes.

Date Navigation: Easily navigate between months/weeks/days and jump back to "Today" with a single click.

🛠 Tech Stack

Frontend

React (Vite): A fast, modern frontend library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid, custom UI development.

Axios: A promise-based HTTP client for making requests to the backend API.

date-fns: A powerful and modern library for all date parsing, formatting, and manipulation.

Lucide React: A clean and beautiful icon set.

Backend

Node.js: A JavaScript runtime for building the server.

Express: A minimal and flexible web framework for creating the API.

MongoDB: A NoSQL database used to store event data.

Mongoose: An Object Data Modeling (ODM) library for MongoDB, used to create schemas and models.

CORS: Middleware to enable Cross-Origin Resource Sharing (allowing the frontend and backend to communicate).

Dotenv: For managing environment variables (like database connection strings).

Nodemon: For automatic server restarts during development.

📁 Project Structure

google-calendar-clone/
├── 📁 backend/
│   ├── 📁 config/
│   │   └── db.js         # MongoDB connection logic
│   ├── 📁 controllers/
│   │   └── eventController.js  # API logic (get, create, etc.)
│   ├── 📁 models/
│   │   └── eventModel.js     # Mongoose schema for events
│   ├── 📁 routes/
│   │   └── eventRoutes.js    # API route definitions
│   ├── .env              # Environment variables (MUST create)
│   ├── package.json
│   └── server.js         # Express server entry point
└── 📁 frontend/
    ├── 📁 src/
    │   ├── 📁 components/
    │   │   ├── 📁 Calendar/   # (DayView, WeekView, MonthView)
    │   │   ├── 📁 Event/      # (EventModal)
    │   │   └── 📁 Layout/     # (Header, Sidebar, MiniCalendar)
    │   ├── 📁 services/
    │   │   └── api.js        # Centralized Axios functions
    │   ├── 📁 utils/
    │   │   └── dateHelpers.js # Date logic (getMonthGrid)
    │   ├── App.jsx           # Main component & state management
    │   ├── main.jsx          # React app entry point
    │   └── index.css         # Global styles & Tailwind imports
    ├── package.json
    └── tailwind.config.js


🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites

Node.js & npm: Download Node.js (npm is included)

Git: Download Git

MongoDB Atlas Account: A free MongoDB Atlas account is required to get a database connection string.

1. Backend Setup

First, let's get the backend server running.

Clone the repository:

git clone [https://github.com/your-username/google-calendar-clone.git](https://github.com/your-username/google-calendar-clone.git)
cd google-calendar-clone


Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Create your environment file:
Create a new file named .env in the backend folder and add your MongoDB connection string.

PORT=5000
MONGO_URI=your_mongodb_connection_string_here


(Get your MONGO_URI from your MongoDB Atlas dashboard.)

Run the backend server:

npm run dev


Your backend server should now be running on http://localhost:5000 and connected to your database.

2. Frontend Setup

Now, in a new, separate terminal, let's run the frontend.

Navigate to the frontend folder:
(From the root google-calendar-clone directory)

cd frontend


Install dependencies:

npm install


Run the frontend server:

npm run dev


Your React development server will start, typically on http://localhost:5173. Open this URL in your browser.

That's it! Your full-stack application is now running. The frontend (on port 5173) will be making API calls to your backend (on port 5000), which is connected to your database.

🔌 API Endpoints

The backend provides the following RESTful API endpoints:

Method

Endpoint

Description

GET

/api/events

Get all calendar events.

POST

/api/events

Create a new event.

PUT

/api/events/:id

Update an existing event by its ID.

DELETE

/api/events/:id

Delete an event by its ID.
