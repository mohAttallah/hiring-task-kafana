'use strict';

const dealModel = (newSequlize, DataTypes) => newSequlize.define('Deal', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Status: {
        type: DataTypes.ENUM('Active', ' In Active', 'Deleted', 'Expired'),
        allowNull: false,
        defaultValue: 'Active'

    },
    Amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    DateTime_UTC: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Set a default value to use the current UTC time
    },
})


module.exports = dealModel