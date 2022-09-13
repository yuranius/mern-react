const express = require ('express')
const config = require ('config')

const fileUpload = require ('express-fileupload')
const path = require ('path')
const cors = require("cors");

const app = express()

app.use (express.json ()) //миделвейер(встроенный в express) для коректного парсинга (в json формате) req.body в auth.routes

app.use ('/api/auth', require('./routes/auth.routes'))
app.use ('/api/profile', require('./routes/profile.routes'))
app.use ('/api/find', require('./routes/find.routes'))
app.use ('/api/friend', require('./routes/friends.routes'))
app.use ('/api/massages', require('./routes/messages.routes'))


//app.use(cors()) //для отправки запросов с браузера
//app.use (express.static('./static')) //указываем папку для express где будут храниться аватарки
app.use (express.static(path.resolve(__dirname, 'static'))) //указываем папку для express откуда их можно забирать


app.use (fileUpload({})) //для загрузки файлов на сервер




const PORT = config.get('port') || 5000
app.listen(PORT, () => console.log('📢', `App has been started on port ${PORT}...`));