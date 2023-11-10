'use strict';

//this function, Check if the token  is old or new
// by search in database if the  token exist or not    



const { tokenBlackList } = require('../../models/index');
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');

function checkTokenExpiration() {

    return async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                return _authError(res);
            }

            const token = req.headers.authorization.split(' ').pop();
            const parsedToken = jwt.verify(token, SECRET);


            const userBlackList = await tokenBlackList.findAll({ where: { User_ID: parsedToken.userId } });
            const isExpired = _checkTokenExistence(userBlackList, token);


            if (isExpired) {
                return _authError(res, 'Token is Expired');
            } else {

            }


            // keep going  everything is ok
            next();

        } catch (err) {
            // _authError(res);
        }

        function _authError(res, message = 'Invalid login') {
            if (!res.headersSent) {
                res.status(401).json({ message });
            }
        }
    }
    // if  the token exist  or not 
    function _checkTokenExistence(userBlackList, token) {
        return userBlackList.some((ele) => ele.Token === token);
    }

}

module.exports = checkTokenExpiration;
