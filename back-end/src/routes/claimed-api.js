'use strict';
const express = require('express');
const models = require('../models');
const claimedRouter = express.Router();
const bearerAuth = require('../auth/middleware/bearer');
const generatePaginationUrls = require('../middleware/paginationUrl')

// get one record
claimedRouter.get('/claimed/:id', bearerAuth, async (req, res, next) => {
    let id = req.params.id;
    let claimedRecord = await models.claimedCollection.get(id);
    res.status(200).json(claimedRecord)
})

// get all 
claimedRouter.get('/claimed', bearerAuth, async (req, res, next) => {
    try {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        let userId = req.user.id;
        const deals = await models.claimed.findAll({
            where: { User_ID: userId },
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
            results: deals,
        };
        res.status(200).json(response);
    } catch (e) {
        next(e);
    }
});

// get Claimed record  with Associated deal , for each user
claimedRouter.get('/dealClaimed', bearerAuth, async (req, res, next) => {
    try {
        let userId = req.user.id;
        let claimedRecord = await models.claimed.findAll({ where: { User_ID: userId } });

        const respons = [];

        for (const item of claimedRecord) {

            console.log(item.Deal_ID);
            let dealRecord = await models.deal.findOne({ where: { id: item.Deal_ID } });

            const object = {
                deal: dealRecord,
                claimed: item,
            }
            respons.push(object);
        }
        res.status(200).json(respons);
    } catch (e) {
        next(e)
    }
})


claimedRouter.post('/claimed', bearerAuth, async (req, res, next) => {
    try {
        let newRecord = req.body;
        let userId = req.user.id;
        newRecord.User_ID = userId;
        const respons = await models.claimedCollection.create(newRecord);

        res.status(201).json(respons);
    } catch (e) {
        next(e)
    }
});

claimedRouter.put('/claimed/:id', bearerAuth, async (req, res, next) => {
    try {
        let id = req.params.id;
        let newRecord = req.body;
        const respons = await models.claimedCollection.update(id, newRecord);
        res.status(201).json(respons);
    } catch (e) {
        next(e)
    }
});

claimedRouter.patch('/claimed', bearerAuth, async (req, res, next) => {
    try {
        let newRecord = req.body;
        const respons = await models.claimedCollection.update(newRecord)
        res.status(201).json(respons);
    } catch (e) {
        next(e)
    }
});

// claimedRouter.delete('/claimed/:id', bearerAuth, async (req, res, next) => {
//     try {
//         let userId = req.user.id;
//         let id = req.params.id;

//         let respons = models.claimed.findOne({ where: { id } })
//             .then(record => {
//                 if (record && record.User_ID === userId) {
//                     return models.claimed.destroy({ where: { id } });
//                 } else {
//                     throw new Error('Record not found');
//                 }
//             });
//         res.status(204).json(respons);
//     } catch (e) {
//         next(e)
//     }
// });

module.exports = claimedRouter;
