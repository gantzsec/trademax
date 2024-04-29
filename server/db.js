const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'mika',
    password: 'nginx123',
    database: 'tradeMax'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

module.exports = db;