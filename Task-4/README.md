# Task 4 - Basic REST API for User Management

## Purpose
The purpose of this task is to create a fully functional backend API utilizing Node.js and Express. It acts as a lightweight server mapping RESTful endpoints (GET, POST, PUT, DELETE) to an in-memory database to manage user profiles securely.

## Flow
1. **Express Server Initialized**: The code uses Express.js parsing JSON payloads globally via middleware.
2. **Endpoints (CRUD)**:
    - `GET /users`: Serves a JSON array of all registered users.
    - `GET /users/:id`: Finds and returns a specific user securely safely parsing the ID.
    - `POST /users`: Performs business-logic validation for missing attributes/emails, creates a dynamic incremented ID, and inserts into memory.
    - `PUT /users/:id`: Edits an already existing user based on the parameterized id. 
    - `DELETE /users/:id`: Safely eliminates the user from memory if they exist.

## Fixes Implemented
- **Email Validation Bypass**: In both the POST and PUT operations, the `emailExists` check previously compared against the raw, unformatted `email` variable provided by the user. However, when the user was actually saved to memory, it explicitly mutated the string to be `trim().toLowerCase()`. This meant an attacker could supply `" email@example.com "` in raw JSON, intentionally bypassing the duplicate email check, and duplicating emails in the DB. I resolved this critical validation lapse!

## How to Run
1. Open your terminal and navigate to the `Task-4` folder.
2. Initialize and run this script via Node:
   ```bash
   node server.js
   ```
3. Use Postman or `curl` to interact with the endpoints. `http://localhost:3000/users`