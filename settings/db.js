const mysql2 = require ('mysql2/promise')


const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'phone_book',
    password: 'root',
})



async function start () {
    try {
        await pool.getConnection ()
    } catch (e) {
        console.log('👿 Server Error', e.message)
        process.exit( 0 )
    }
}

start()

module.exports = pool

