'use strict';
const express = require('express');
const cors = require("cors");
const logger = require('./middleware/logger')
const err404 = require('./error-handlers/404')
const err500 = require('./error-handlers/500')
const authRoutes = require('./auth/routes/auth');
const dealRouter = require('./routes/deal-api');
const claimedRouter = require('./routes/claimed-api');
const adminRouter = require('./routes/admin-api')
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);



// for test 
app.get('/', (req, res, next) => {
    try {

        res.status(200).json({ message: "Home" })

    } catch (error) {
        next(error)
    }
})


app.use(authRoutes);
app.use(dealRouter);
app.use(claimedRouter);
app.use("/admin/", adminRouter);

app.use(err404);
app.use(err500);

function start(PORT) {
    if (!PORT) { throw new Error('Missing Port'); }
    app.listen(PORT, () => {
        console.log(`listining on port ${PORT}`)
    })
}

module.exports = {
    server: app,
    start
}



