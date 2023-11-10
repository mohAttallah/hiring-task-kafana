'use strict';

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userModel = (newSequlize, DataTypes) => newSequlize.define('User', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(password) {

            const hashPass = bcrypt.hashSync(password, 5);
            this.setDataValue('Password', hashPass)
        }
    },
    Role: {
        type: DataTypes.ENUM("admin", "user"),
        required: true,
        defaultValue: 'user'
    },
    Capabilities: {
        type: DataTypes.VIRTUAL,
        get() {
            const acl = {
                user: ['user'],
                admin: ['admin']
            };
            return acl[this.role];
        }
    },
    Token: {
        type: DataTypes.VIRTUAL,
        get() {
            return jwt.sign({ userId: this.id, role: this.role }, process.env.SECRET)
        }
    },
    Birthday: {
        type: DataTypes.STRING
    },
    Img: {
        type: DataTypes.STRING
    },
    Gender: {
        type: DataTypes.ENUM('male', 'female')
    },
    email: {
        type: DataTypes.STRING,
        validate: { isEmail: true },
        allowNull: false
    },
    Status: {
        type: DataTypes.ENUM('Active', ' In Active', 'Deleted', 'Expired'),
        allowNull: false,
        defaultValue: 'Active'

    },
    DateTime_UTC: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Set a default value to use the current UTC time
    },
})


module.exports = userModel