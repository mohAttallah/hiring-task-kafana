'use strict';
const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basic');
const bearerAuth = require('../middleware/bearer');
const { user } = require('../../models');
const revokeToken = require('../middleware/revokeToken');

authRouter.post('/signup', async (req, res, next) => {
    try {
        let userRecord = await user.create(req.body);
        const output = {
            user: userRecord,
            token: userRecord.token
        };
        res.status(201).json(output);
    } catch (e) {
        console.log(e);
        next(e)
    }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
    try {
        const user = {
            user: req.user,
            token: req.user.Token
        };
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }

});

authRouter.post('/signout', revokeToken, (req, res, next) => {
    try {
        let token = req.user;
        token = null
        res.status(200).json('Signed out');
    } catch (err) {
        next(err);
    }
})

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
    res.status(200).send('Welcome to the secret area')
});

module.exports = authRouter;