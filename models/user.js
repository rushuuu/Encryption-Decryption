const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { encryptData, decryptData } = require('../utils/encryption');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Editor', 'Viewer'),
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Hook to encrypt fields before saving to the database
User.addHook('beforeCreate', (user) => {
    user.name = encryptData(user.name);
    user.email = encryptData(user.email);
    user.role = encryptData(user.role);
});

User.addHook('beforeUpdate', (user) => {
    user.name = encryptData(user.name);
    user.email = encryptData(user.email);
    user.role = encryptData(user.role);
});

// Hook to decrypt fields after retrieving from the database
User.addHook('afterFind', (result) => {
    if (!result) return;

    // Handle single object
    if (!Array.isArray(result)) {
        result.name = decryptData(result.name);
        result.email = decryptData(result.email);
        result.role = decryptData(result.role);
        return;
    }

    // Handle array of objects
    result.forEach(user => {
        user.name = decryptData(user.name);
        user.email = decryptData(user.email);
        user.role = decryptData(user.role);
    });
});

module.exports = User;
