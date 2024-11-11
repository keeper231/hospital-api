// models/Medicine.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import the Sequelize instance

class Medicine extends Model {}

Medicine.init({
    medicine_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dosage_form: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Medicine',
    tableName: 'medicine', // Set to match the actual table name
    timestamps: false, // Since no createdAt or updatedAt fields are defined in the table schema
});

// Define associations if necessary
Medicine.associate = (models) => {
    // Define associations here if needed, like with a Supplier model
};

module.exports = Medicine;