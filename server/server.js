const express = require('express');
const db = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// API endpoint to fetch data from the database
app.get('/api/data', (req, res) => {
    db.query('SELECT * FROM produkte', (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.post('/api/products', (req, res) => {
    // Extract product data from request body
    const { Bezeichnung, Preis } = req.body;

    // Validate incoming data
    if (!Bezeichnung || !Preis) {
        return res.status(400).json({ error: 'Bezeichnung and Preis are required' });
    }

    // Insert new product into the database
    const sql = 'INSERT INTO produkte (Bezeichnung, Preis) VALUES (?, ?)';
    db.query(sql, [Bezeichnung, Preis], (error, result) => {
        if (error) {
            console.error('Error adding product:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Send success response
        res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});