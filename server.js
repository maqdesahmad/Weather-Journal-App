// Define an empty object to store project data
let projectData = {};

// Import Express and other necessary modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// Create an instance of Express
const app = express();
const port = 5500;

// Use middleware for CORS and parsing JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'website' directory
app.use(express.static('website'));

// Define the root route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'website', 'index.html'));
});

// Define a route to get all project data
app.get('/all', (req, res) => {
    res.json(projectData);
});

// Define a route to add new data to the project
app.post('/add', (req, res) => {
    const { temperature, date, userResponse } = req.body;
    projectData = {
        temperature,
        date,
        userResponse
    };
    res.json(projectData);
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is up and running on localhost:${port}`);
});
