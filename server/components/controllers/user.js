const ErrorHandler = require('../Middleware/error/ErrorHandler')
const UserService = require("../Service/UserService")
const { validationResult } = require('express-validator')

class UserFunction {

    async reg(req, res, next) {
        const { nickname, name, suname, email, password } = req.body
        try {
            const val_err = validationResult(req)

            if (!val_err.isEmpty()) {
                return ErrorHandler.badRequest("Ошибка при валидации!")
            }


            const UserReg = await UserService.RegNewUser(nickname, name, suname, email, password)
            res.cookie('refreshToken', UserReg.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(UserReg)
        }
        catch (e) {
            //console.log(e)
            return next(ErrorHandler.badRequest(e))
        }
    }


    async login(req, res, next) {
        try {
            const { email, password } = req.body


            const userData = UserService.LoginUser(email, password);

            //res.cookie('userNickname', userData.nickname, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            //res.cookie('userSkillName', userData.skill, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            //res.cookie('refreshToken', UserReg.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json((await userData).User)

        }
        catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refresh } = req.cookie
            const token = await UserService.LogoutUser(refresh)
            res.clearCookie('refresh')
        }
        catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {

        try {
            const { refresh } = req.cookie
            const userData = UserService.RefreshToken(refresh)
            res.cookie('refresh', userData.refresh, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return console.log(userData)
        }
        catch (e) {
            next(e)
        }
    }

    async getProfile(req, res, next) {

        const { nickname } = req.params
        try {
            return res.json()
        } catch (e) {
            next(e)
        }


    }

    async Activated(req, res, next) {
        try {
            const activateHash = req.params.activateHash

            const ActivateData = await UserService.Activated(activateHash)

            return res.json(ActivateData)
        }
        catch (e) {
            return next(ErrorHandler.badRequest('Ошибка системы. повторите попытку позже!'))
        }

    }

    async ResetPassword(req, res, next) { }
}

module.exports = new UserFunction()