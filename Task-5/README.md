# Task 5 - Node.js User API with SQLite

## Purpose
The purpose of this project is to implement a backend REST API applying the MVC (Model-View-Controller) architecture using Node.js, Express, and a persistent SQLite database.

## Flow
1. **Config & DB Connection**: The application establishes a connection to a local `users.db` SQLite database file via the `sqlite3` driver. It auto-generates the necessary tables upon start.
2. **Controller Logic**: `userController.js` acts as the middle layer, accepting HTTP requests, triggering business interactions, and responding cleanly with JSON data.
3. **Model Layer**: `userModel.js` holds raw SQL queries wrapped in JavaScript methods to interface directly with the database, fully decoupling queries from the Controller routes.
4. **Error Handling**: The server catches all internal errors globally, preventing crash loops, and intercepts unregistered endpoints explicitly with an HTTP 404 block identifying existing paths.

## Fixes Implemented
- Improved the robustness of error handling safely checking for `err.message` uniqueness when adding multiple identical data records, eliminating a potential callback exception if `err.message` didn't exist over standard constraints.

## How to Run
1. Navigate to the `Task-5` folder via your terminal.
2. Ensure you have installed the modules: `npm install`.
3. Launch the environment using Node or Nodemon: `npm run dev` or `node server.js`.
4. Send your web requests (from a frontend or Postman) to `http://localhost:3000/api/users`.
