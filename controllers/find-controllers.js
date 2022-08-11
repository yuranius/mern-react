const pool = require('../settings/db')
const config = require('config')
const {check, validationResult} = require("express-validator");

class FindControllers {
    async findCollocuters(req, res) {
        const user_query = req.params.user_query
        try {
        // в случае не прохождения проверки на пробелы выводим сообщение
        const errors = validationResult(req)
            console.log(errors)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                massage: 'Некорректный ввод',
            })
        }

        pool.query(
            `SELECT ??, ?? FROM ?? WHERE ??.?? LIKE ?`,
            [config.get('fieldOneTableOne'),
                config.get('fieldFourTableOne'),
                config.get('tableOne'),
                config.get('tableOne'),
                config.get('fieldFourTableOne'), '%'+ user_query + '%']
        ).then((data) => {

            if (!data[0][0]) {
                return res.status(405).json({ massage: " Совпадений не найдено, попробуйте ввести что-то другое!!! "})
            } else {
                res.status(200).json( {data: data[0], massage: `Найдено ${data[0].length}`})}
        })
    } catch (error) {
        return res.status(500).json({ massage: 'Ошибка запроса... Попробуйте в другой раз...'})
    }
    };

    async findAllCollocuters(req, res) {
        const {page:pageNumber, limit: pageSize} = req.query
        console.log('Запрос2:', pageNumber, pageSize)

        try {
            const numberOfResults = await pool.query('SELECT users.id, users.login FROM users WHERE 1', [
            ]).then((data) => {
                return data[0].length
            })

            console.log( '📌:',numberOfResults,'🌴 🏁')

            const pageLimit = pageNumber * pageSize - pageSize

            console.log( '📌:',pageLimit,'🌴 🏁')


            const collocutersOfResults = await pool.query('SELECT users.id, users.login FROM users WHERE id LIMIT ?,?', [ pageLimit, +pageSize ]).then((data) => {
                return data[0]
            })
            
            console.log( '📌:',collocutersOfResults,'🌴 🏁')
            
            
            let numberOfPages = Math.ceil(numberOfResults / pageSize) // всего страниц


            res.status(200).json({collocuters:collocutersOfResults, totalUsers: numberOfResults, totalPages: numberOfPages})

        } catch (error) {
            console.log('📢', error, 'Запрос не удался')
        }
    }

}




module.exports = new FindControllers