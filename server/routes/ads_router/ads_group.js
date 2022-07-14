const Router = require('express')
const GroupFunction = require('../../components/ads_controller/ads_group')
const router = new Router()

router.post('/', GroupFunction.Create)
router.get('/', GroupFunction.GetAll)
router.get('/:id', GroupFunction.GetOne)

module.exports = router