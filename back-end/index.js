'use strict';
require('dotenv').config();
const { db } = require('./src/models');
const PORT = process.env.PORT || 3000
const { start } = require("./src/server");

db.sync().then(() => {
    start(PORT);
});