'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../../models/index')

module.exports = async (req, res, next) => {

    if (!req.headers.authorization) { return _authError(); }
    let basic = req.headers.authorization.split(' ').pop();

    let [username, password] = base64.decode(basic).split(':');
    try {

        const userData = await user.findOne({ where: { Username: username } });
        console.log(userData)
        const valid = await bcrypt.compare(password, userData.Password);
        if (valid) {
            req.user = userData;
            next();
            return userData;
        };
        throw new Error('Invlid User');
    } catch (e) {
        _authError()
    }
    function _authError() {
        res.status(403).send('Invalid Login');
        next();
    }


}

