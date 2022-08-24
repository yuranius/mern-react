const pool = require('../settings/db')
const config = require('config')


class MessagesControllers {
    async SearchForUsersWhoHaveMessages(req, res) {
        try {
            // в случае не прохождения проверки на пробелы выводим сообщение
            const userId = req.body.payload

            // получаем все сообщения, которые были отправлены user'ом или получены им же
            let allMassage = await pool.query('SELECT users.id, messages.content, users.login, messages.created_at FROM users, messages WHERE (users.id = messages.user_from_id AND messages.user_to_id=?) OR (users.id = messages.user_to_id AND messages.user_from_id=?)',[userId,userId]).then(data => {
                return data[0].reverse()
            })

            // проверяем есть ли сообщения у user'а
            if(allMassage.length === 0) {
                return res.status(404).json({ massage: 'У Вас пока нет сообщений' })
            }

            //получем user'ов c которыми есть переписка
            let massageUser = Array.from(new Set(allMassage.map( mes => mes.login)))

            // получем по одному последнему сообщеню от каждого user'а с которым есть переписка
            let usersWhoHaveMessageWithFullData =[]
            allMassage.forEach( (mess, ind) => {
                if( massageUser.includes(mess.login)) {
                    usersWhoHaveMessageWithFullData.push(mess)
                    let myIndex = massageUser.indexOf(mess.login);
                    if (myIndex !== -1) {
                        massageUser.splice(myIndex, 1);
                    }
                }
            })

            return  res.status(201).json(usersWhoHaveMessageWithFullData)
        } catch (error) {
            return res.status(418).json({massage: 'Ошибка запроса... Попробуйте в другой раз...'})
        }
    };
}

// INSERT INTO `messages` (`id`, `user_to_id`, `user_from_id`, `content`, `created_at`) VALUES (NULL, '66', '65', 'Привет! Как дел?', current_timestamp()); вставка сообщения


module.exports = new MessagesControllers;