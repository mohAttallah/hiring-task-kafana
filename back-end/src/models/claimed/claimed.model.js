'use strict';

const claimedModel = (newSequlize, DataTypes) => newSequlize.define('Claimed', {
    User_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Deal_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
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


module.exports = claimedModel