const Router = require('express')
const ProfessionsFunction = require('../components/controllers/professions')
//const roleMiddleware = require('../components/Middleware/roleMiddleWare')
const router = new Router()
// roleMiddleware(3),
router.post('/add/', ProfessionsFunction.Add)
router.get('/get/', ProfessionsFunction.GetAll)
router.get('/get/:id', ProfessionsFunction.GetOne)
router.get('/delete/:id', ProfessionsFunction.DeleteOne)

module.exports = router