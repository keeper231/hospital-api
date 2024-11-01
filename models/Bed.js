// Bed.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import the Sequelize instance

class Bed extends Model {}

// Initialize the Bed model
Bed.init({
    bed_no: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Setting bed_no as primary key
        allowNull: false,
    },
    occupancy_status: {
        type: DataTypes.ENUM('Occupied', 'Vacant', 'Housekeeping'),
        allowNull: false,
    },
    bed_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rate_per_day: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true, // Allow NULL for rate_per_day
    },
    room_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Bed',
    tableName: 'beds',
    timestamps: false, // Set to true if you want createdAt and updatedAt fields
});

module.exports = Bed;
