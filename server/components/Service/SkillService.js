const ErrorHandler = require('../Middleware/error/ErrorHandler')
const { Skill } = require('../../assets/models')

class SkillService {

    async AddSkill(name, role) {
        if (!name) {
            throw ErrorHandler.badRequest('Укажите название спциальности')
        }

        if (!role) {
            throw ErrorHandler.badRequest('Укажите уровень допуска роли')
        }

        const SkillData = await Skill.create({ name: name, role: role })

        return SkillData;
    }

    async GetAllSkill() {

        const SkillData = await Skill.findAll()

        return SkillData;
    }

    async GetOneSkill(id) {

        const CandidateSkill = await Skill.findOne({ where: { id } })
        if (!CandidateSkill) {
            throw ErrorHandler.badRequest('Роль не найдена')
        }

        return CandidateSkill;
    }

    async DeleteSkill(id) {

        const CandidateSkill = await Skill.findById({ id })
        return CandidateSkill
        if (!CandidateSkill) {
            throw ErrorHandler.badRequest('Роль не найдена')
        }
        const DellSkill = await Skill.Delete({ where: { id } })
        return DellSkill;
    }
}

module.exports = new SkillService()