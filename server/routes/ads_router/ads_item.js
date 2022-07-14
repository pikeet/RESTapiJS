const Router = require('express')
const ItemFunction = require('../../components/ads_controller/ads_item')
const router = new Router()

router.post('/', ItemFunction.Create)
router.get('/', ItemFunction.GetAll)
router.get('/:id', ItemFunction.GetOne)

module.exports = router