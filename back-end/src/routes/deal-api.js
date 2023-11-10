'use strict';
const express = require('express');
const models = require('../models');
const dealRouter = express.Router();
const bearerAuth = require('../auth/middleware/bearer');
const generatePaginationUrls = require('../middleware/paginationUrl')


dealRouter.get('/deal', bearerAuth, async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const deals = await models.deal.findAll({
            limit: limit,
            offset: offset,
        });
        const totalCount = await models.deal.count();

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


// get one record
dealRouter.get('/deal/:id', bearerAuth, async (req, res, next) => {
    let id = req.params.id;
    let dealRecord = await models.dealCollection.get(id);
    res.status(200).json(dealRecord);
})



dealRouter.post('/deal', bearerAuth, async (req, res, next) => {
    try {
        let userId = req.user.id;
        let newRecord = req.body;
        newRecord.User_ID = userId;
        const respons = await models.dealCollection.create(newRecord)
        res.status(201).json(respons);
    } catch (e) {
        next(e)
    }
});

dealRouter.put('/deal/:id', bearerAuth, async (req, res, next) => {
    try {
        let id = req.params.id;
        let newRecord = req.body;
        const respons = await models.dealCollection.update(id, newRecord)
        res.status(201).json(respons);
    } catch (e) {
        next(e)
    }
});

dealRouter.patch('/deal', bearerAuth, async (req, res, next) => {
    try {
        let newRecord = req.body;
        const respons = await models.dealCollection.update(newRecord);
        res.status(201).json(respons);
    } catch (e) {
        next(e)
    }
});

dealRouter.delete('/deal/:id', bearerAuth, async (req, res, next) => {
    try {

        let id = req.params.id;
        console.log(id);
        const respons = await models.dealCollection.delete(id)
        res.status(204).json(respons);
    } catch (e) {
        next(e)
    }
});

dealRouter.delete('/deal/:id', bearerAuth, async (req, res, next) => {
    try {
        let userId = req.user.id;
        let id = req.params.id;

        let respons = models.deal.findOne({ where: { id } })
            .then(record => {
                if (record && record.User_ID === userId) {
                    return models.deal.destroy({ where: { id } });
                } else {
                    throw new Error('Record not found');
                }
            });
        res.status(204).json(respons);
    } catch (e) {
        next(e)
    }
});




module.exports = dealRouter;
