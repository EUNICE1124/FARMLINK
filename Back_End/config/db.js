require('dotenv').config(); // Loads variables from your .env file
const mysql = require('mysql2');

// Create a connection pool (better for group projects/multiple users)
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'FARMLINK',
    port: process.env.DB_PORT || 3000, 
    waitForConnections: true,
    connectionLimit: 10
});

// Export the promise-based pool for use with async/await
const promisePool = pool.promise();

// Simple test to verify connection when the server starts
promisePool.getConnection()
    .then(connection => {
        console.log('✅ Successfully connected to FARMLINK Database');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err.message);
        console.log('TIP: Check if your MySQL Service is running and your .env password is correct.');
    });

module.exports = promisePool;