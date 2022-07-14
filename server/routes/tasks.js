const Router = require('express')
const TasksFunction = require('../components/controllers/tasks')
const roleMiddleware = require('../components/Middleware/roleMiddleWare')
const router = new Router()
// roleMiddleware(2),
router.post('/', TasksFunction.Add)
router.get('/', TasksFunction.GetAll)

module.exports = router