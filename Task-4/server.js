// Basic REST API for User Management
// Created manually for Task 4

// Import Express framework
const express = require('express');

// Create Express application
const app = express();

// Set port number
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory storage for users (no database)
let users = [
    {
        id: 1,
        name: "Pavan",
        email: "pavan@example.com",
        age: 25
    },
    {
        id: 2,
        name: "Tarun",
        email: "tarun@example.com",
        age: 30
    },
    {
        id: 3,
        name: "Rajesh",
        email: "rajesh@example.com",
        age: 26
    },
    {
        id: 4,
        name: "Bhanu",
        email: "bhanu@example.com",
        age: 29
    },
    {
        id: 5,
        name: "Tanuja",
        email: "tanu@example.com",
        age: 25
    },
    {
        id: 6,
        name: "Ramya",
        email: "ramya@example.com",
        age: 22
    }
];

// Helper function to generate new ID
function getNewUserId() {
    if (users.length === 0) {
        return 1;
    }
    const maxId = Math.max(...users.map(user => user.id));
    return maxId + 1;
}

// Helper function to find user by ID
function findUserById(userId) {
    return users.find(user => user.id === userId);
}

// Helper function to validate email format
function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

// =====================
// ROUTES - CRUD Operations
// =====================

// GET / - Welcome message
app.get('/', (request, response) => {
    response.json({
        message: "Welcome to User REST API",
        description: "Basic CRUD API for user management",
        total_users: users.length,
        available_endpoints: {
            "GET /users": "Get all users",
            "GET /users/:id": "Get user by ID",
            "POST /users": "Create new user",
            "PUT /users/:id": "Update user",
            "DELETE /users/:id": "Delete user"
        }
    });
});

// GET /users - Get all users
app.get('/users', (request, response) => {
    try {
        response.json({
            status: "success",
            message: "Users retrieved successfully",
            count: users.length,
            data: users
        });
    } catch (error) {
        response.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});

// GET /users/:id - Get user by ID
app.get('/users/:id', (request, response) => {
    try {
        const userId = parseInt(request.params.id);

        if (isNaN(userId)) {
            return response.status(400).json({
                status: "error",
                message: "Invalid user ID format"
            });
        }

        const user = findUserById(userId);

        if (!user) {
            return response.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        response.json({
            status: "success",
            message: "User found",
            data: user
        });

    } catch (error) {
        response.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});

// POST /users - Create new user
app.post('/users', (request, response) => {
    try {
        const { name, email, age } = request.body;

        // Validate required fields
        if (!name || !email) {
            return response.status(400).json({
                status: "error",
                message: "Name and email are required fields"
            });
        }

        // Validate name length
        if (name.length < 2) {
            return response.status(400).json({
                status: "error",
                message: "Name must be at least 2 characters long"
            });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return response.status(400).json({
                status: "error",
                message: "Invalid email format"
            });
        }

        // Check if email already exists
        const formattedEmail = email.trim().toLowerCase();
        const emailExists = users.some(user => user.email === formattedEmail);
        if (emailExists) {
            return response.status(400).json({
                status: "error",
                message: "Email already exists"
            });
        }

        // Validate age if provided
        if (age && (age < 0 || age > 150)) {
            return response.status(400).json({
                status: "error",
                message: "Age must be between 0 and 150"
            });
        }

        // Create new user
        const newUser = {
            id: getNewUserId(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            age: age ? parseInt(age) : null
        };

        users.push(newUser);

        response.status(201).json({
            status: "success",
            message: "User created successfully",
            data: newUser
        });

    } catch (error) {
        response.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});

// PUT /users/:id - Update user
app.put('/users/:id', (request, response) => {
    try {
        const userId = parseInt(request.params.id);
        const { name, email, age } = request.body;

        if (isNaN(userId)) {
            return response.status(400).json({
                status: "error",
                message: "Invalid user ID format"
            });
        }

        const user = findUserById(userId);

        if (!user) {
            return response.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        // Validate required fields
        if (!name || !email) {
            return response.status(400).json({
                status: "error",
                message: "Name and email are required fields"
            });
        }

        // Validate name length
        if (name.length < 2) {
            return response.status(400).json({
                status: "error",
                message: "Name must be at least 2 characters long"
            });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return response.status(400).json({
                status: "error",
                message: "Invalid email format"
            });
        }

        // Check if email exists for other users
        const formattedEmail = email.trim().toLowerCase();
        const emailExists = users.some(u => u.email === formattedEmail && u.id !== userId);
        if (emailExists) {
            return response.status(400).json({
                status: "error",
                message: "Email already exists for another user"
            });
        }

        // Validate age if provided
        if (age && (age < 0 || age > 150)) {
            return response.status(400).json({
                status: "error",
                message: "Age must be between 0 and 150"
            });
        }

        // Update user
        user.name = name.trim();
        user.email = email.trim().toLowerCase();
        user.age = age ? parseInt(age) : null;

        response.json({
            status: "success",
            message: "User updated successfully",
            data: user
        });

    } catch (error) {
        response.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});

// DELETE /users/:id - Delete user
app.delete('/users/:id', (request, response) => {
    try {
        const userId = parseInt(request.params.id);

        if (isNaN(userId)) {
            return response.status(400).json({
                status: "error",
                message: "Invalid user ID format"
            });
        }

        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex === -1) {
            return response.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        const deletedUser = users.splice(userIndex, 1)[0];

        response.json({
            status: "success",
            message: "User deleted successfully",
            data: deletedUser
        });

    } catch (error) {
        response.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});

// Handle unknown routes
app.use('*', (request, response) => {
    response.status(404).json({
        status: "error",
        message: "Route not found",
        available_routes: [
            "GET /",
            "GET /users",
            "GET /users/:id",
            "POST /users",
            "PUT /users/:id",
            "DELETE /users/:id"
        ]
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('=================================');
    console.log('🚀 User REST API Server Started');
    console.log('=================================');
    console.log(`📍 Server URL: http://localhost:${PORT}`);
    console.log(`📊 Total Users: ${users.length}`);
    console.log('');
    console.log('📋 Available Endpoints:');
    console.log('   GET    /              - API information');
    console.log('   GET    /users         - Get all users');
    console.log('   GET    /users/:id     - Get user by ID');
    console.log('   POST   /users         - Create new user');
    console.log('   PUT    /users/:id     - Update user');
    console.log('   DELETE /users/:id     - Delete user');
    console.log('');
    console.log('🔧 Test using: curl, Postman, or browser');
    console.log('=================================');
});