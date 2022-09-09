const pool = require('../settings/db')
const config = require('config')



class MessagesControllers {
// GET /api/messages/collocuters
    async getUsersWhoHaveMessages(req, res) {
        try {
            // в случае не прохождения проверки на пробелы выводим сообщение
            const {userId} = req.query
            
            // получаем все сообщения, которые были отправлены user'ом или получены им же
            let allMassage = await pool.query('SELECT users.id, messages.content, users.login, messages.created_at FROM users, messages WHERE (users.id = messages.user_from_id AND messages.user_to_id = ?) OR (users.id = messages.user_to_id AND messages.user_from_id = ?)',[userId,userId]).then(data => {
                return data[0].reverse()
            })

            // проверяем есть ли сообщения у user'а
            if(allMassage.length === 0) {
                return res.status(404).json({ massage: 'У Вас пока нет сообщений' })
            }

            //получем user'ов c которыми есть переписка
            let massageUser = Array.from(new Set(allMassage.map( mes => mes.login)))

            // получем по одному последнему сообщеню от каждого user'а с которым есть переписка, тем самым полчаем список user'ов с которыми есть переписка и время воследнего сообщения
            let usersWhoHaveMessageWithFullData =[]
            allMassage.forEach( mess => {
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

    // GET /api/messages/
    async getMessagesFromUser (req, res) {
       
        try {
            // в случае не прохождения проверки на пробелы выводим сообщение
            const {userId,friendsId} = req.query

            // получаем все сообщения, которые были отправлены user'ом или получены им же
            let allMassage = await pool.query(`
                    SELECT messages.id, messages.content, users.login, messages.created_at, messages.user_from_id 
                    FROM users, messages 
                    WHERE (users.id = messages.user_from_id AND messages.user_to_id=? AND messages.user_from_id=?) 
                    OR (users.id = messages.user_to_id AND messages.user_from_id=? AND messages.user_to_id=?)`,
                [userId, friendsId, userId, friendsId]).then(data => {
                return data[0]
            })

            // проверяем есть ли сообщения у user'а
            if (allMassage.length === 0) {
                return res.status(404).json({massage: 'У Вас пока нет сообщений'})
            }


            return res.status(201).json(allMassage)
        } catch (error) {
            return res.status(418).json({massage: 'Ошибка запроса... Попробуйте в другой раз...'})
        }
    }

    // POST /api/messages/add
    async addMessages (req, res) {
        try {
            const {message, userToId, userFromId, created_at } = req.body.payload

            if (!userToId || !userFromId) {
                return res.status(418).json({massage: 'Ошибка запроса... Попробуйте в другой раз...'})
            }

            if (!message) {
                return res.status(411).json({massage: 'Сообщение не может быть пустым'})
            }

            // проверяеи существует ли аббонент
            const user = await pool.query(`SELECT ?? FROM ?? WHERE ?? = ?`,
                [config.get('fieldOneTableOne'),
                    config.get('tableOne'),
                    config.get('fieldOneTableOne'),
                    userToId,
                    userFromId
                ]).then((data) => {
                try {
                    return data[0][0];
                } catch (error) {
                    return false
                }
            })
            
            if (!user) {
                return res.status(404).json({massage: 'Адресат не найден...'})
            }

            // добавляем сообщение в БД
            await pool.query('INSERT INTO messages (id, user_to_id, user_from_id, content, created_at) VALUES (NULL, ?, ?, ?, ?)',[
                userToId,
                userFromId,
                message,
                created_at,
            ])

            return res.status(200).json({message:'Сообщение добавлено!'})

        }catch (error) {
            return res.status(418).json({massage: 'Ошибка запроса12... Попробуйте в другой раз...'})
        }
    }

    // POST /api/messages/change

    async changeMessages (req, res) {
        try {
            const {messageId, message, userId} = req.body

            const requestMessage = await pool.query('SELECT * FROM messages WHERE id = ? AND user_to_id = ? ',[
                messageId,
                userId
            ])

            // проверяем, что это сообщение отправленно именно user'ом
            if (!requestMessage[0][0]) {
                return res.status(418).json({massage: 'У Вас нет прав на изменение данного сообщения...'})
            }

            const mess = await pool.query(`UPDATE messages SET content = ? WHERE messages.id = ?`,[
                message,
                +messageId
                ]
            )
            return  res.status(201).json(mess)
        } catch (error) {
            return res.status(418).json({massage: 'Ошибка запроса... Попробуйте в другой раз...'})
        }

    }


    // DELETE /api/messages/
    async deleteMessages (req, res) {
        try {
            const {messageId, userId} = req.body

            const requestMessage = await pool.query('SELECT * FROM messages WHERE id = ? AND user_to_id = ? ',[
                messageId,
                userId
            ])

            if (!requestMessage[0][0]) {
                return res.status(418).json({massage: 'Сообщение не найдено'})
            }

           await pool.query('DELETE FROM messages WHERE messages.id = ? AND messages.user_to_id = ? ',[
                messageId,
                userId
            ])


            return  res.status(201).json({message:'Удалено!'})
        } catch (error) {
            return res.status(418).json({massage: 'Ошибка запроса... Попробуйте в другой раз...'})
        }
    }
}

// SELECT messages.id, messages.content, users.login, messages.created_at, messages.user_from_id FROM users, messages WHERE (users.id = messages.user_from_id AND messages.user_to_id=66 AND messages.user_from_id=65) OR (users.id = messages.user_to_id AND messages.user_from_id=66 AND messages.user_to_id=65)
// UPDATE `messages` SET `content` = 'Привет, как дела?12444' WHERE `messages`.`id` = 41;
// INSERT INTO `messages` (`id`, `user_to_id`, `user_from_id`, `content`, `created_at`) VALUES (NULL, '66', '65', 'Привет! Как дел?', current_timestamp()); вставка сообщения


module.exports = new MessagesControllers;