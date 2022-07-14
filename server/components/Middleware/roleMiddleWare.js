const jwt = require('jsonwebtoken')
const { Unit, Skill } = require('../../assets/models')
const ErrorHandler = require('./error/ErrorConstructor')
require('dotenv').config()

module.exports = function (setRole) {

    return async function (req, res, next) {

        if (req.method == "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]

            if (!token) {
                return res.status(401).json({ message: "Вы не авторизованы, пройдите процедуру авторизации!" })
            }

            const decoder = jwt.verify(token, process.env.JWT_SECRET)
            const roleNum = await Skill.findOne({ where: { 'id': decoder.professionid } })

            if (roleNum.role < setRole || decoder.professionid == null) {
                return res.status(401).json({ message: "Отказано в доступе!" })
            }

            req.user = decoder
            next()
        }
        catch (e) {
            return res.status(403).json({ message: "Произошла ошибка!" + e })
        }
    }
}
