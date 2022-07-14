module.exports = class UserDtos {
    email;
    id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }
}
