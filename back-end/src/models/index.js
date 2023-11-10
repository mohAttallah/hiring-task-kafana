'use strict';
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');

const userModle = require('../auth/models/user.model');
const dealModle = require('./deal/deal.model');
const claimedModle = require('./claimed/claimed.model')
const tokenBlackListModel = require('../auth/models/blackListToken');
const DataCollection = require('./data-collection');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URI;
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

const newSequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);


const user = userModle(newSequelize, DataTypes);
const deal = dealModle(newSequelize, DataTypes);
const claimed = claimedModle(newSequelize, DataTypes);
const tokenBlackList = tokenBlackListModel(newSequelize, DataTypes);

// relationship  (|user| 1 -> M  |claimed|)
user.hasMany(claimed, { foreignKey: 'User_ID', sourceKey: 'id' });
claimed.belongsTo(user, { foreignKey: 'User_ID', sourceKey: 'id' });

// relationship  (|deal| 1 -> M  |claimed|)
deal.hasMany(claimed, { foreignKey: 'Deal_ID', sourceKey: 'id' });
claimed.belongsTo(deal, { foreignKey: 'Deal_ID', sourceKey: 'id' });

// relationship  (|user| 1 -> M  |TokenBlackList|)
user.hasMany(tokenBlackList, { foreignKey: 'User_ID', sourceKey: 'id' });
tokenBlackList.belongsTo(user, { foreignKey: 'User_ID', sourceKey: 'id' });


// Link the module with the Collection class
const userCollection = new DataCollection(user);
const dealCollection = new DataCollection(deal);
const claimedCollection = new DataCollection(claimed);

module.exports = {
    db: newSequelize,
    user,
    deal,
    claimed,
    tokenBlackList,
    userCollection,
    dealCollection,
    claimedCollection
}
