const pool = require('../settings/db')
const config = require('config')
const {check, validationResult} = require("express-validator");

class FindControllers {
    async findCollocuters(req, res) {
        const user_query = req.params.user_query
        console.log('Запрос1:',user_query)

        try {
        // в случае не прохождения проверки на пробеллы выводим сообщение
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
                console.log('📢 [auth.routes.js:85]', data[0]);
                res.status(200).json( {data: data[0], massage: `Найдено ${data[0].length}`})}
        })
    } catch (error) {
        console.log('📢', error, 'Запрос не удался')
    }
    };

    async findAllCollocuters(req, res) {
        const user = req.query
        console.log('Запрос2:', user)

        try {
            // в случае не прохождения проверки на пробеллы выводим сообщение


        } catch (error) {
            console.log('📢', error, 'Запрос не удался')
        }
    }

}




module.exports = new FindControllers