const pool = require('../settings/db')
const config = require('config')


class MessagesControllers {
    async SearchForUsersWhoHaveMessages(req, res) {
        

        try {
            // в случае не прохождения проверки на пробелы выводим сообщение
            console.log( '📌:',req.body,'🌴 🏁')
            
            

            // pool.query(
            //     `SELECT ??, ?? FROM ?? WHERE ??.?? LIKE ?`,
            //     [config.get('fieldOneTableOne'),
            //         config.get('fieldFourTableOne'),
            //         config.get('tableOne'),
            //         config.get('tableOne'),
            //         config.get('fieldFourTableOne'), '%' + user_query + '%']
            // ).then((data) => {
            //
            //     if (!data[0][0]) {
            //         return res.status(405).json({massage: " Совпадений не найдено, попробуйте ввести что-то другое!!! "})
            //     } else {
            //         res.status(200).json({data: data[0], massage: `Найдено ${data[0].length}`})
            //     }
            // })
            return  res.json('OK!!!')
        } catch (error) {
            return res.status(500).json({massage: 'Ошибка запроса... Попробуйте в другой раз...'})
        }
    };
}

module.exports = new MessagesControllers;