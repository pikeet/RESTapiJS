const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function (req, res, next) {

    if (req.method == "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: "Вы не авторизованы, пройдите процедуру авторизации!" })
        }

        const decoder = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoder
        next()
    }
    catch (e) {
        return res.status(401).json({ message: "Вы не авторизованы, пройдите процедуру авторизации!" })
    }
};