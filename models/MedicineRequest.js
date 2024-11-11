// models/MedicineRequest.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import the Sequelize instance

class MedicineRequest extends Model {}

// Initialize the MedicineRequest model
MedicineRequest.init({
    medicine_request_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-increment the id field
    },
    request_status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Not Approved'),
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Request status is required' },
        },
    },
    medicine_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'medicines', // Replace with the actual Medicine table name
            key: 'medicine_id', // Ensure this matches the primary key in your Medicine table
        },
        validate: {
            isInt: { msg: 'Medicine ID must be an integer' },
            notNull: { msg: 'Medicine ID is required' },
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Quantity must be an integer' },
            min: {
                args: [1],
                msg: 'Quantity must be at least 1',
            },
            notNull: { msg: 'Quantity is required' },
        },
    },
}, {
    sequelize,
    modelName: 'MedicineRequest',
    tableName: 'medicine_requests', // Custom table name
    timestamps: false, // Disables createdAt and updatedAt fields
});

module.exports = MedicineRequest;