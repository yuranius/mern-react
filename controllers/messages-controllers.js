const pool = require('../settings/db')
const config = require('config')
const {validationResult, check} = require("express-validator");

class MessagesControllers {
    async SearchForUsersWhoHaveMessages(req, res) {
        const user_query = req.params.user_query

        try {
            // в случае не прохождения проверки на пробелы выводим сообщение
            const errors = validationResult(user_query)
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
                    config.get('fieldFourTableOne'), '%' + user_query + '%']
            ).then((data) => {

                if (!data[0][0]) {
                    return res.status(405).json({massage: " Совпадений не найдено, попробуйте ввести что-то другое!!! "})
                } else {
                    res.status(200).json({data: data[0], massage: `Найдено ${data[0].length}`})
                }
            })
        } catch (error) {
            return res.status(500).json({massage: 'Ошибка запроса... Попробуйте в другой раз...'})
        }
    };
}

module.exports = new MessagesControllers;