require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
    console.log("🔍 Testing connection with credentials:");
    console.log("- Host:", process.env.DB_HOST);
    console.log("- User:", process.env.DB_USER);
    console.log("- Database:", process.env.DB_NAME);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        console.log("✅ SUCCESS: The backend can talk to MySQL Workbench!");
        
        // Run a simple query to see if the server responds
        const [rows] = await connection.execute('SELECT 1 + 1 AS result');
        console.log("🔢 Database Math Test (1+1):", rows[0].result);

        await connection.end();
    } catch (err) {
        console.error("❌ CONNECTION FAILED:");
        console.error("Error Code:", err.code);
        console.error("Message:", err.message);
        
        if (err.code === 'ECONNREFUSED') {
            console.log("💡 TIP: Your MySQL Service isn't running. Start 'MySQL80' in Services.");
        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log("💡 TIP: Check your password in the .env file.");
        } else if (err.code === 'ER_BAD_DB_ERROR') {
            console.log("💡 TIP: The database 'FARMLINK' doesn't exist. Create it in Workbench.");
        }
    }
}

testConnection();