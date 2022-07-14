const ErrorHandler = require('../Middleware/error/ErrorConstructor')

class ProjectFunction {

    async Add(title, telephone, contact_personal) {
        try {
            return res.json(query)
        }
        catch (e) {
            return next(ErrorHandler.badRequest(e))
        }
    }

    async Delete(id) {
        res.json({ message: "Delete" })
    }
}

module.exports = new ProjectFunction()