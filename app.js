const express = require ('express')
const config = require ('config')

const app = express()

app.use (express.json ({ extended: true })) //миделвейер(встроенный в express) для коректного парсинга (в json формате) req.body в auth.routes

app.use ('/api/auth', require('./routes/auth.routes'))


const PORT = config.get('port') || 5000
app.listen(PORT, () => console.log('📢', `App has been stasrted on port ${PORT}...`));