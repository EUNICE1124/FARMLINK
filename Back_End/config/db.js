const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Your MySQL username
    password: '',      // Your MySQL password
    database: 'FARMLINK'
});

module.exports = pool.promise(); // Using promises for cleaner async/await code