const { TokenDB } = require('../../assets/models')

const jwt = require("jsonwebtoken")

class TokenGenerated {

    async ganarated(email, id, isActivated) {

        const accessToken = jwt.sign({ email, id, isActivated }, process.env.JWT_SECRET_ACCESS, { expiresIn: '15m' })

        const refreshToken = jwt.sign({ email, id, isActivated }, process.env.JWT_SECRET_REFRESH, { expiresIn: '30d' })

        return {
            accessToken,
            refreshToken
        }
    }

    async SaveRefreshToken(id, token) {

        const tokenDate = await TokenDB.findOne({
            where:
                { userId: id }
        })

        console.log("Find Token in DB: ", tokenDate)

        if (tokenDate) {
            tokenDate.refresh = token
            return tokenDate.save()
        }
        const date = await TokenDB.create({ uid: id, refresh: token })
        console.log("Add token in DB: ", date)
        return date
    }

    async removeRefreshToken(refreshToken) {
        const token = await TokenDB.deleteOne({ where: { refresh: refreshToken } })
        return token
    }

    ValidateAccessToken(token) {

        try {
            const userToken = jwt.verify(token, process.env.JWT_SECRET_ACCESS)
            return userToken
        }
        catch (e) {
            return null;
        }
    }
    ValidateRefreshToken(token) {

        try {
            const userToken = jwt.verify(token, process.env.JWT_SECRET_REFRESH)
            return userToken
        }
        catch (e) {
            return null;
        }
    }

    async FindTokenBase(token) {
        try {
            const findToken = await TokenDB.findOne({ token })
            return findToken
        }
        catch (e) {
            return null;
        }
    }
}

module.exports = new TokenGenerated()