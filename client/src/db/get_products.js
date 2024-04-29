import mysql2 from 'mysql2';
import { products } from "./stores.js";

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'mika',
    password: 'nginx123',
    database: 'tradeMax'
});

export async function fetchProducts() {
    try {
        await db.connect(); // Connect to the database
        db.query('SELECT * FROM produkte', (error, results) => {
            if (error) {
                console.error('Error fetching products:', error);
                return;
            }
            products.set(results); // Update the products store with fetched data
        });
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}

fetchProducts();