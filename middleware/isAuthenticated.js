const jwt = require('jsonwebtoken');
const User = require('../models/user')

exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('jwt-token');
        console.log(token);
        if (!token) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Did not receive a token'
                })
        }
        const verified = jwt.verify(token, process.env.JWT_PASSWORD)
        if (!verified) {
            return res
                .status(401)
                .json({
                    success: false,
                    message: 'Not verified'
                })
        }

        req.user = verified.id;
        next()
    } catch (err) {
        res
            .status(500)
            .json({
                success: false,
                message: err.message
            })
    }
}