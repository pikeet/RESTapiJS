const Router = require('express')
const router = new Router()

// Подключаем файлы в наш общий роутер для связки

//const canban = require('../components/layer.json')
const user = require('./users')
const professions = require('./professions')

//router.use('/canban/', canban)
router.use('/user', user)
router.use('/professions', professions)

module.exports = router