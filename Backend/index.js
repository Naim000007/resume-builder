const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Sample route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Backend!');
});

// Route to get interview questions by category and number of questions
app.get('/api/interview-questions', (req, res) => {
    const filePath = path.join(__dirname, 'question.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
        } else {
            try {
                const jsonData = JSON.parse(data);
                const category = req.query.category;
                const numberOfQuestions = parseInt(req.query.number) || 10; // Default to 10 if not specified
                
                if (!jsonData[category]) {
                    return res.status(400).send('Invalid category');
                }
                
                const questions = jsonData[category].slice(0, numberOfQuestions); // Limit to specified number
                res.json(questions);
            } catch (parseErr) {
                console.error('Error parsing JSON:', parseErr);
                res.status(500).send('Error parsing JSON');
            }
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
