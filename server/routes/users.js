const Router = require('express')
const router = new Router()
const UserFunction = require('../components/controllers/user')
//const authmiddleware = require('../components/Middleware/UserMiddleWare')
const { body } = require('express-validator')

router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 32 }),
    UserFunction.login)
router.post('/reg',
    body('email').isEmail(),
    body('password').isLength({ min: 8, max: 32 }),
    UserFunction.reg)
//router.get('/auth', authmiddleware, UserFunction.auth)
router.get('/activate/:activateHash', UserFunction.Activated)
router.get('/profile/:nickname', UserFunction.getProfile)
router.post('/refresh/', UserFunction.refresh)

module.exports = router