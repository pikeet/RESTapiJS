const Router = require('express')
const CompanyFunction = require('../../components/ads_controller/ads_company')
const router = new Router()

router.post('/', CompanyFunction.Create)
router.get('/', CompanyFunction.GetAll)
router.get('/:id', CompanyFunction.GetOne)

module.exports = router