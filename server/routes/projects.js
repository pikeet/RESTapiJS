const Router = require('express')
const ProjectFunction = require('../components/controllers/projects')
const roleMiddleware = require('../components/Middleware/roleMiddleWare')
const router = new Router()

router.post('/', ProjectFunction.Add)
router.post('/', ProjectFunction.Delete)
router.get('/', ProjectFunction.GetAll)
router.get('/:id', ProjectFunction.GetOne)

module.exports = router