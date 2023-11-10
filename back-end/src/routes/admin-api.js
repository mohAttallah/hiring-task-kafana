'use strict';
const express = require('express');
const models = require('../models');
const adminRouter = express.Router();
const bearerAuth = require('../auth/middleware/bearer');
const generatePaginationUrls = require('../middleware/paginationUrl')
const acl = require('../auth/middleware/acl')


adminRouter.get('/users', bearerAuth, acl('admin'), async (req, res, next) => {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        const users = await models.user.findAll({
            limit: limit,
            offset: offset,
        });

        // total records 
        const totalCount = await models.user.count();

        // calculate next and previous URL
        const { nextUrl, previousUrl } = generatePaginationUrls(req, offset, limit, totalCount);

        const response = {
            totalRecord: totalCount,
            next: nextUrl,
            previous: previousUrl,
            results: users,
        };

        res.json(response);
    } catch (e) {
        next(e);
    }
});

adminRouter.get('/claimeds', bearerAuth, acl('admin'), async (req, res, next) => {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        const claimeds = await models.claimed.findAll({
            limit: limit,
            offset: offset,
        });

        // total records 
        const totalCount = await models.claimed.count();

        // calculate next and previous URL
        const { nextUrl, previousUrl } = generatePaginationUrls(req, offset, limit, totalCount);

        const response = {
            totalRecord: totalCount,
            next: nextUrl,
            previous: previousUrl,
            results: claimeds,
        };

        res.json(response);
    } catch (e) {
        next(e);
    }
});


adminRouter.get('/deals', bearerAuth, acl('admin'), async (req, res, next) => {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        const deals = await models.deal.findAll({
            limit: limit,
            offset: offset,
        });

        // total records 
        const totalCount = await models.deal.count();

        // calculate next and previous URL
        const { nextUrl, previousUrl } = generatePaginationUrls(req, offset, limit, totalCount);

        const response = {
            totalRecord: totalCount,
            next: nextUrl,
            previous: previousUrl,
            results: deals,
        };

        res.json(response);
    } catch (e) {
        next(e);
    }
});



adminRouter.delete('/deal/:id', bearerAuth, acl('admin'), async (req, res, next) => {
    try {
        let id = req.params.id;
        console.log(id);
        const respons = await models.dealCollection.delete(id)
        res.status(204).json(respons);
    } catch (e) {
        next(e)
    }
});

adminRouter.put('/user/:id', bearerAuth, async (req, res, next) => {
    try {
        let id = req.params.id;
        let newRecord = req.body;
        const respons = await models.userCollection.update(id, newRecord)
        res.status(201).json(respons);
    } catch (e) {
        next(e)
    }
});


adminRouter.delete('/user/:id', bearerAuth, acl('admin'), async (req, res, next) => {
    try {
        let id = req.params.id;

        const respons = await models.userCollection.delete(id)
        res.status(204).json(respons);
    } catch (e) {
        next(e)
    }
});
adminRouter.delete('/claimeds/:id', bearerAuth, acl('admin'), async (req, res, next) => {
    try {
        let id = req.params.id;
        const respons = await models.claimedCollection.delete(id)
        res.status(204).json(respons);
    } catch (e) {
        next(e)
    }
});


module.exports = adminRouter;