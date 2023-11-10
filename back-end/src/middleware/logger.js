'use strict';
let num = 0;
const logger = (req, res, next) => {
    num++;
    console.log("---------------------------------")
    console.log(`${num}- Request method: ${req.method}`);
    console.log(`   Requested URL: ${req.url}`);
    console.log(`${new Date().toISOString().split('T')[0]}-${new Date().toISOString().split('T')[1]}`);
    console.log("---------------------------------")
    next();
}

module.exports = logger;