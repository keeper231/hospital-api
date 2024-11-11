module.exports = (sequelize, DataTypes) => {
    const Medicine = sequelize.define('Medicine', {
      medicine_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto-increment for primary key
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Medicine name is required' },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Add other fields as necessary
    }, {
      tableName: 'medicines', // Specifies custom table name
      timestamps: true, // Adds createdAt and updatedAt fields
    });
  
    Medicine.associate = (models) => {
      // Define a one-to-many relationship with MedicineRequest
      Medicine.hasMany(models.MedicineRequest, {
        foreignKey: 'medicine_id',
        as: 'medicineRequests', // Alias for accessing related MedicineRequests
        onDelete: 'CASCADE', // Optional: cascade delete if Medicine is deleted
        onUpdate: 'CASCADE', // Optional: cascade update if Medicine ID changes
      });
    };
  
    return Medicine;
  };