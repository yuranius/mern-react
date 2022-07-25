const express = require ('express')
const config = require ('config')

const fileUpload = require ('express-fileupload')

const app = express()

app.use (express.json ({ extended: true })) //миделвейер(встроенный в express) для коректного парсинга (в json формате) req.body в auth.routes

app.use ('/api/auth', require('./routes/auth.routes'))

app.use (express.static('./static')) //указываем папку для express где будут храниться аватарки

app.use (fileUpload({})) //для загрузки файлов на сервер


const PORT = config.get('port') || 5000
app.listen(PORT, () => console.log('📢', `App has been stasrted on port ${PORT}...`));