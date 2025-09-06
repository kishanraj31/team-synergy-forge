const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'synergysphere',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database and create tables if they don't exist
const initializeDatabase = async () => {
  try {
    // First connect without specifying database to create it
    const tempConfig = { ...dbConfig };
    delete tempConfig.database;
    const tempPool = mysql.createPool(tempConfig);
    
    // Create database if it doesn't exist
    await tempPool.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'synergysphere'}`);
    await tempPool.end();
    
    // Now connect to the specific database
    const connection = await pool.getConnection();
    console.log('✅ Database initialized successfully');
    connection.release();
    
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
  initializeDatabase
};
