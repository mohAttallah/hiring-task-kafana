'use strict';

module.exports = function (req, res, next) {
    const errorObject = {
        status: 404,
        message: 'the Route not Found !!'
    };
    res.status(404).json(errorObject);
}
