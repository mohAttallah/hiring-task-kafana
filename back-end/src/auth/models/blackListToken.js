'use strict';

const TokenBlackListModel = (newSequlize, DataTypes) => newSequlize.define('TokenBlackList', {
    User_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    Token: {
        type: DataTypes.STRING,
        allowNull: false,
    }

})

module.exports = TokenBlackListModel;