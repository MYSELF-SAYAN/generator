// db.js
import mysql from 'mysql2';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Sayan@1234', 
  database: 'generator',
});

export default db;
