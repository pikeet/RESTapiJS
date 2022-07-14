require('dotenv').config();
const express = require('express');
const sequelize = require('./assets/db')
//const models = require('./assets/models')
const router = require('./routes/index')
const fileupload = require('express-fileupload')
const Error = require('./components/Middleware/error/Error')
const Cors = require('cors')
const path = require('path')
const compression = require('compression');
const cookieParser = require('cookie-parser');
// compression - install

const PORT = process.env.DB_PORT;
const app = express();
app.use(Cors({
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(compression())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload({}))
app.use('/api', router)

app.use(Error)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(7000, () =>
            console.log(`Подключение к базе установленно по порту: ${PORT}`)
        );
    }
    catch (e) {
        return console.log(`Возникла ошибка: ${e}`)
    }
}

start()