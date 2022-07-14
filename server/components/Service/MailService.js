//const TemplateSystem = require('./_MailTemplate/MailTemplate.system')
const mailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = mailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async SendMailSystem(to, subject, object) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: subject,
            html: object
            // <TemplateSystem title={subject} object={object} />
        })
    }
}

module.exports = new MailService()