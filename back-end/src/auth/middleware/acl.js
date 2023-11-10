'use strict';

module.exports = (capability) => {

    return (req, res, next) => {

        try {
            console.log("hhhhhyyyy", req.user.Role)
            if (req.user.Role === capability) {
                next();
            }
            else {
                next('Access Denied');
            }
        } catch (e) {
            next('Invalid Login');
        }

    }

}