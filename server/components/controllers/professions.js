const SkillService = require('../Service/SkillService')
const ErrorHandler = require('../Middleware/error/ErrorHandler')

class ProfessionsFunction {

    async Add(req, res, next) {
        try {
            const { name, role } = req.body
            const SkillAddData = await SkillService.AddSkill(name, role)
            return res.json(SkillAddData)
        }
        catch (e) {
            next(e)
        }

    }

    async GetAll(req, res, next) {
        try {
            const SkillSearch = await SkillService.GetAllSkill()
            return res.json(SkillSearch)
        }
        catch (e) {
            next(e)
        }
    }

    async GetOne(req, res, next) {
        try {
            const id = req.params.id
            const SkillSearch = await SkillService.GetOneSkill(id)
            return res.json(SkillSearch)
        }
        catch (e) {
            next(e)
        }
    }
    async DeleteOne(req, res, next) {

        try {
            const id = req.params.id
            const SkillSearch = await SkillService.DeleteSkill(id)
            return res.json(SkillSearch)
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new ProfessionsFunction()