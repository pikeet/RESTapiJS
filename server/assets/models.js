const Sequelize = require('./db')
const { DataTypes } = require('sequelize')

const User = Sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nickname: { type: DataTypes.STRING, primaryKey: true },
    name: { type: DataTypes.STRING },
    suname: { type: DataTypes.STRING },
    photo: { type: DataTypes.STRING, AllowNull: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    online: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    ActivateHash: { type: DataTypes.STRING },
    SecureMode: { type: DataTypes.BOOLEAN, defaultValue: false },
    sid: { type: DataTypes.INTEGER, defaultValue: 1 },
})

const Contact = Sequelize.define('Contacts', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ProjectId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    suname: { type: DataTypes.STRING, AllowNull: true },
    telephone: { type: DataTypes.INTEGER, AllowNull: true },
    email: { type: DataTypes.STRING, AllowNull: true },
    description: { type: DataTypes.STRING, AllowNull: true },
})

const Lead = Sequelize.define('Leads', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    contactId: { type: DataTypes.INTEGER },
    projectId: { type: DataTypes.INTEGER },
    source: { type: DataTypes.STRING, AllowNull: true },
    company: { type: DataTypes.STRING, AllowNull: true },
    telephone: { type: DataTypes.INTEGER, AllowNull: true },
    email: { type: DataTypes.STRING, AllowNull: true },
    description: { type: DataTypes.STRING, AllowNull: true },

})

const EGRUL = Sequelize.define('Egrul', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ProjectId: { type: DataTypes.INTEGER },
    country: { type: DataTypes.STRING, AllowNull: true },
    company: { type: DataTypes.STRING, AllowNull: true },
    id_nalog: { type: DataTypes.INTEGER, AllowNull: true },
    score: { type: DataTypes.INTEGER, AllowNull: true }
})

const Project = Sequelize.define('Projects', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    contactId: { type: DataTypes.INTEGER, AllowNull: true },
    uid: { type: DataTypes.INTEGER, AllowNull: true },
    title: { type: DataTypes.STRING },
    company: { type: DataTypes.STRING, AllowNull: true },
    telephone: { type: DataTypes.INTEGER, AllowNull: true },
    email: { type: DataTypes.STRING, AllowNull: true },
    description: { type: DataTypes.STRING, AllowNull: true },
    price: { type: DataTypes.INTEGER, AllowNull: true },
    status: { type: DataTypes.INTEGER },
    type_project: { type: DataTypes.INTEGER, defaultValue: 1 }
})

const SocialMedia = Sequelize.define('SocialMedia', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    projectId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING }
})

const Task = Sequelize.define('Tasks', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uid: { type: DataTypes.INTEGER },
    projectId: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    date_start: { type: DataTypes.STRING, AllowNull: true },
    date_stop: { type: DataTypes.STRING },
    status: { type: DataTypes.BOOLEAN, defaultValue: true }
})

const Ads_Company = Sequelize.define('AdsCompany', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    uid: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    social_media: { type: DataTypes.STRING, AllowNull: true },
    websity: { type: DataTypes.STRING, AllowNull: true },
    description: { type: DataTypes.STRING, AllowNull: true },
    price_ads: { type: DataTypes.INTEGER, AllowNull: true },
})

const Ads_Group = Sequelize.define('AdsGroupCompany', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    companyId: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    type_platform: { type: DataTypes.STRING, AllowNull: true },
    target_audencity: { type: DataTypes.STRING, AllowNull: true },
    description: { type: DataTypes.STRING, AllowNull: true },
    price_group: { type: DataTypes.INTEGER, AllowNull: true },
})

const Ads_item = Sequelize.define('AdsGroupItems', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    groupId: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING, AllowNull: true },
    target_audencity: { type: DataTypes.STRING, AllowNull: true },
    description: { type: DataTypes.STRING, AllowNull: true },
    price_item: { type: DataTypes.INTEGER, AllowNull: true }
})

const Skill = Sequelize.define('Skills', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, defaultValue: "Сотрудник" },
    role: { type: DataTypes.INTEGER, defaultValue: 1 },
})

const TokenDB = Sequelize.define('Tokens', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    refresh: { type: DataTypes.STRING },
    uid: { type: DataTypes.INTEGER },
    IPAddress: { type: DataTypes.STRING }
})

// Устанавливаем связи один-к-одному или один-ко-многим.

User.hasOne(Skill, { as: "Skills", foreignKey: 'uid' })
//Skill.hasOne(User, { as: "UsersSkill", foreignKey: 'sid' })

Task.hasMany(User, { as: "Users", foreignKey: 'uid' })

User.hasMany(Project, { as: "Projects", foreignKey: 'uid' })

Contact.hasMany(Project, { as: "Projects", foreignKey: 'projectId' })

Lead.hasMany(Contact, { as: "Contacts", foreignKey: 'contactId' })

Lead.hasOne(Project, { as: "Projects", foreignKey: 'projectId' })

EGRUL.hasOne(Project, { as: "Projects", foreignKey: 'projectId' })

Project.hasMany(Task, { as: "Tasks", foreignKey: 'projectId' })

Project.hasMany(SocialMedia, { as: "SocialMedia", foreignKey: 'projectId' })

Project.hasMany(Ads_Company, { as: "AdsCompany", foreignKey: 'projectId' })

Ads_Company.hasMany(Ads_Group, { as: "AdsGroupCompany", foreignKey: 'companyId' })

Ads_Group.hasMany(Ads_item, { as: "AdsGroupItems", foreignKey: 'groupId' })


module.exports = {
    User, Project, Ads_Company,
    Ads_Group, Ads_item, Skill,
    Task, SocialMedia, TokenDB,
    EGRUL, Lead, Contact
}