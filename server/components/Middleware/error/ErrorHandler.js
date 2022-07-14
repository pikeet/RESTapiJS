class ErrorHandler extends Error {
    status;
    message;

    constructor(status, message) {
        super(status);
        this.message = message
    }
    static Unauthorization() {
        return new ErrorHandler(401, 'Пользователь не авторизован')
    }

    static badRequest(message) {
        return new ErrorHandler(400, message)
    }

    static NotFound(message) {
        return new ErrorHandler(404, message)
    }

    static Blocked(message) {
        return new ErrorHandler(423, message)
    }

    static Internal(message) {
        return new ErrorHandler(500, message)
    }

    static forbiden(message) {
        return new ErrorHandler(403, message)
    }

}

module.exports = ErrorHandler