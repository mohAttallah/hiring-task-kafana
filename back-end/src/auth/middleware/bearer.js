'use strict';

const { user } = require('../../models/index');
const SECRET = process.env.SECRET;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkTokenExpiration = require('./checkTokenExpiration'); // Import the checkTokenExpiration middleware

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            _authError();
        }

        const token = req.headers.authorization.split(' ').pop();
        const parsedToken = jwt.verify(token, SECRET);

        // Check if the token  is old or new  


        const validUser = await user.findOne({ where: { id: parsedToken.userId } });

        if (validUser) {
            checkTokenExpiration()(req, res, (error) => {
                if (error) {
                    return _authError(res, error.message);
                }
                
                // Continue with the middleware
                req.user = validUser;
                req.token = validUser.token;
                next();
            });

        } else {
            return _authError(res, 'User not found');
        }
    } catch (e) {
        _authError(res);
    }

    function _authError(res, message = 'Invalid login') {
        res.status(401).json({ message });
    }
}
