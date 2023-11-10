'use strict';
// when signout need to revoke the old token 

const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const { tokenBlackList } = require('../../models/index');

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return _handleNoAuthorization(res);
        }
        const token = req.headers.authorization.split(' ').pop();
        const parsedToken = jwt.verify(token, SECRET);
        const object = {
            Token: token,
            User_ID: parsedToken.userId
        };
        const userBlackList = await tokenBlackList.findAll({ where: { User_ID: parsedToken.userId } });
        const isExist = _checkTokenExistence(userBlackList, token);

        if (!isExist) {
            res.status(201).json(_createBlackToken(res, next, object))

        } else {
            return _revokeError(res, 'Token already exists');
        }
    } catch (e) {
        _revokeError(res);
    }
};


function _handleNoAuthorization(res) {
    _revokeError(res, 'No token provided');
}

function _checkTokenExistence(userBlackList, token) {
    return userBlackList.some(ele => ele.Token === token);
}

async function _createBlackToken(res, next, object) {
    try {
        const createdToken = await tokenBlackList.create(object);
        return (createdToken);
    } catch (error) {
        _revokeError(res, error);
    }
}

function _revokeError(res, message = 'Invalid Token') {
    res.status(401).json({ message });
}
