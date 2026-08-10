# Task 6 - Full Stack User Management System with AI Agent

## Purpose
The purpose of this extensive project is to unify a React.js frontend interface with an Express.js backend and MongoDB to form a complete, full-stack application (MERN stack). It manages users efficiently and provides a production-like integration. 

## Flow
1. **Frontend**: The React application runs locally and utilizes Axios (`src/services/api.js`) to seamlessly interact with backend endpoints. The UI maps over state lists generating forms for Adding, Modifying, Tracking, and Interacting with user schemas.
2. **Backend**: Express intercepts React requests and maps them to controllers (`userController.js`).
3. **Database**: Information is modeled using Mongoose schemas and stored natively. For fault tolerance, it uses `mongodb-memory-server` locally!
4. **AI Agent Logic (New Feature)**: A floating React widget calls `/api/ai/ask`. The Express AI controller mathematically interprets the context of your question against the live MongoDB collection to provide real-time dynamic answers!

## Fixes Implemented
- **MongoDB Crash Issue**: The backend was completely broken because the `MongoDB` connection locally was refused if the Mongo Service wasn't running. I fixed this by importing `mongodb-memory-server` and updating `config/db.js` to automatically fall back to an elegant memory DB if your local host crashes.
- **AI Backend Feature Implementation**: Designed and introduced an `AIAssistant.js` UI chatbot component that polls a newly created Express.js AI Route to mathematically answer insightful contextual questions about the registered users.

## How to Run
1. Open a terminal in the `Task-6/backend` directory. Run `npm install` and then `npm run dev`. This starts the Express Server (and memory DB fallback) on port 5000.
2. Open a separate terminal in your `Task-6/frontend` directory. Run `npm install` and then `npm start`.
3. Your browser will spawn the React frontend dashboard at `http://localhost:3000`. Test out the "🤖 AI" button!
