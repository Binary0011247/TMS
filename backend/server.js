// server.js - Backend for the Task Management Board

// Import necessary modules
const express = require('express'); // Express.js for building the API
const cors = require('cors');       // CORS middleware to allow cross-origin requests
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs for tasks

// Initialize the Express application
const app = express();
const port = process.env.PORT || 3001; // Port for the backend server

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable parsing JSON request bodies

// In-memory "database" for tasks
// In a real application, you would connect to a persistent database (e.g., MongoDB, PostgreSQL)
let tasks = [
    {
        id: uuidv4(),
        title: 'Plan project kickoff',
        description: 'Organize the first meeting for the new project.',
        status: 'To Do',
    },
    {
        id: uuidv4(),
        title: 'Develop authentication module',
        description: 'Implement user login, registration, and session management.',
        status: 'In Progress',
    },
    {
        id: uuidv4(),
        title: 'Design database schema',
        description: 'Create the ER diagram and define tables for the application.',
        status: 'In Progress',
    },
    {
        id: uuidv4(),
        title: 'Set up development environment',
        description: 'Install all necessary tools and configure IDE.',
        status: 'Done',
    },
    {
        id: uuidv4(),
        title: 'Write user stories',
        description: 'Document key features from a user perspective.',
        status: 'To Do',
    },
];

// API Routes

// GET all tasks
// Returns an array of all current tasks.
app.get('/api/tasks', (req, res) => {
    console.log('GET /api/tasks received');
    res.json(tasks); // Send the tasks array as a JSON response
});

// POST a new task
// Expects a task object in the request body (title, description, status).
// Generates a unique ID and adds the task to the tasks array.
app.post('/api/tasks', (req, res) => {
    const { title, description, status } = req.body; // Destructure properties from request body
    if (!title || !status) {
        return res.status(400).json({ message: 'Title and status are required.' });
    }
    const newTask = {
        id: uuidv4(),      // Generate a unique ID for the new task
        title,
        description: description || '', // Default to empty string if no description
        status,
    };
    tasks.push(newTask); // Add the new task to the array
    console.log('POST /api/tasks: New task added', newTask);
    res.status(201).json(newTask); // Respond with the newly created task and 201 Created status
});

// PUT update an existing task
// Expects the task ID in the URL parameter and updated task data in the body.
// Finds the task by ID and updates its properties.
app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;     // Get task ID from URL parameters
    const updatedTaskData = req.body; // Get updated task data from request body

    const taskIndex = tasks.findIndex(task => task.id === id); // Find the index of the task to update

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found.' }); // If task not found, return 404
    }

    // Update the task with new data, ensuring ID remains the same
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTaskData, id };
    console.log(`PUT /api/tasks/${id}: Task updated`, tasks[taskIndex]);
    res.json(tasks[taskIndex]); // Respond with the updated task
});

// DELETE a task
// Expects the task ID in the URL parameter.
// Removes the task from the tasks array.
app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params; // Get task ID from URL parameters

    const initialLength = tasks.length; // Store initial length to check if a task was removed
    tasks = tasks.filter(task => task.id !== id); // Filter out the task with the given ID

    if (tasks.length === initialLength) {
        return res.status(404).json({ message: 'Task not found.' }); // If no task was removed, return 404
    }
    console.log(`DELETE /api/tasks/${id}: Task deleted`);
    res.status(204).send(); // Respond with 204 No Content status for successful deletion
});

// PUT update task status (for drag-and-drop)
// This is a specific endpoint for updating only the status of a task.
app.put('/api/tasks/:id/status', (req, res) => {
    const { id } = req.params;      // Get task ID from URL parameters
    const { status } = req.body;    // Get new status from request body

    if (!status) {
        return res.status(400).json({ message: 'New status is required.' });
    }

    const taskIndex = tasks.findIndex(task => task.id === id); // Find the index of the task

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found.' }); // If task not found, return 404
    }

    tasks[taskIndex].status = status; // Update the status of the found task
    console.log(`PUT /api/tasks/${id}/status: Status updated to ${status}`);
    res.json(tasks[taskIndex]); // Respond with the updated task
});


// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`Task board backend server listening at http://localhost:${port}`);
    console.log('API Endpoints:');
    console.log(`  GET    /api/tasks          - Get all tasks`);
    console.log(`  POST   /api/tasks          - Create a new task { title, description, status }`);
    console.log(`  PUT    /api/tasks/:id      - Update task { id, title, description, status }`);
    console.log(`  DELETE /api/tasks/:id      - Delete task`);
    console.log(`  PUT    /api/tasks/:id/status - Update task status { status }`);
});

