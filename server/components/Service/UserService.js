const ErrorHandler = require('../Middleware/error/ErrorHandler')
const { User, Skill } = require('../../assets/models')
const uuid = require('uuid')
//const path = require('path');
const bcrypt = require('bcrypt')
const TokenGenerated = require('./TokenService');
const UserDtos = require('../controllers/dtos/UserDtos')
const MailService = require('./MailService')


class UserService {
    // Функция регистрации 
    async RegNewUser(nickname, name, suname, email, password) {



        if (!name || !suname) {
            return ErrorHandler.badRequest('Укажите ФИО!')
        }

        if (!email || !password) {
            return ErrorHandler.badRequest('Укажите почту или пароль!')
        }
        if (!nickname) {
            return ErrorHandler.badRequest('Придумайте nickname!')
        }

        const check_email = await User.findOne({ where: { email: email } })

        if (check_email) {
            return ErrorHandler.badRequest('Адрес электронной почты уже зарегистрирован!')
        }

        const check_nick = await User.findOne({ where: { nickname: nickname } })

        if (check_nick) {
            return ErrorHandler.badRequest(`Никнейм ${nickname} уже занят!`)
        }
        //  let FileName = uuid.v4() + ".jpg"
        // Image.mv(path.relative(__dirname, '..', 'static', FileName))
        // const query = await User.create({ nickname, name, suname, email, passsword: hashPassword, photo: FileName })

        const hashPassword = await bcrypt.hash(password, 5)
        const activateHash = uuid.v4()

        const NewUser = await User.create({
            nickname,
            name,
            suname,
            email,
            password: hashPassword,
            ActivateHash: activateHash
        })

        //const userDto = new UserDtos(query)
        const tokens = TokenGenerated.ganarated(NewUser.email, NewUser.id, NewUser.isActivated)
        await TokenGenerated.SaveRefreshToken(NewUser.id, (await tokens).refreshToken)
        return {
            ...(await tokens)
        }
    }

    // Функция авторизации клиента
    async LoginUser(email, password) {
        if (!email) {
            throw ErrorHandler.badRequest("Укажите электронную почту'!")
        }

        if (!password) {
            throw ErrorHandler.badRequest("Укажите пароль!")
        }
        const account = User.findOne({
            where: { email: email },
            include: [{
                model: Skill,
                as: 'Skills'
                // where: { id: sid },
                //  required: true
            }]
        })



        account.then(value => {
            return console.log(value)
        })



        if (!account) {
            throw ErrorHandler.badRequest("Проверьте правильность электронной почты!")
        }

        // let comparePassword = await bcrypt.compare(password, account.password)

        // if (!comparePassword) {
        //     throw ErrorHandler.Internal("Пароли не совпадают!")
        // }

        // const tokens = TokenGenerated.ganarated(account.email, account.id, account.isActivated)
        // await TokenGenerated.SaveRefreshToken(account.id, (await tokens).refreshToken)

        return {
            //   ...(await tokens),
            ... (await account)
        }
    }

    async LogoutUser(refreshToken) {
        try {
            const refreshDB = await TokenGenerated.removeRefreshToken(refreshToken)
            return refreshDB
        }
        catch (e) {
            return ErrorHandler.badRequest(e)
        }
    }

    async RefreshToken(token) {

        try {
            if (!token) {
                return ErrorHandler.forbiden("Вы не авторизованы!")
            }

            const userData = TokenGenerated.ValidateRefreshToken(token)
            const tokenFindBase = await TokenGenerated.FindTokenBase(token)

            if (!userData || !tokenFindBase) {
                return ErrorHandler.forbiden("Авторизуйтесь занова!")
            }

            const user = await User.findById(userData.id)
            const userDto = new UserDtos(account)
            const tokens = TokenGenerated.ganarated({ ...userDto })
            await TokenGenerated.SaveRefreshToken(userDto.id, (await tokens).refresh)

            return {
                ...tokens, user: userDto
            }

        } catch (e) {
            return ErrorHandler.badRequest(e)
        }
    }

    async Activated(activateHash) {

        if (!activateHash) throw ErrorHandler.badRequest('Отсутствует идентификатор активации');

        const findHashAccount = await User.findOne({ where: { ActivateHash: activateHash } })

        if (!findHashAccount) throw ErrorHandler.badRequest('Не удалость активировать аккаунт, повторите попытку!');

        findHashAccount.ActivateHash = 'Disable';
        findHashAccount.isActivated = true
        await findHashAccount.save()
        return true;
    }

    async ResetPassword(email) { }
}

module.exports = new UserService()