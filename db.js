// db.js
require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize with PostgreSQL settings for Render
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Set to true if you want to verify the server's certificate
        },
    },
    logging: false, // Set to console.log to see SQL queries, or false to disable
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the HospitalDB PostgreSQL database on Render.');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

module.exports = sequelize; // Export the Sequelize instance