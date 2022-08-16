const pool = require('../settings/db')
const config = require('config')



class FriendsController {
    async addFriend(req, res) {
        try{
            const {userId, friendId} =  req.body.payload
            

            let stat = '0'

            const result = await pool.query('INSERT INTO friends (id, friend_one, friend_two, status, created) VALUES (NULL, ?, ?, ?, NULL)', [
                userId,
                friendId,
                stat
            ])
            


            const queryUser = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [
                config.get('tableOne'),
                config.get('fieldOneTableOne'),
                friendId] ).then((data) => {
                try {
                    return data[0][0].login;
                } catch (error) {
                    return false
                }
            })

            
            res.status(200).json({massage: `Пользователь ${queryUser}, добавлен в список Ваших собеседников!!!`})
        } catch (e) {
            res.status(404).json({massage: 'Произошла ошибка на сервере...'})
        }

    }

    async deleteFriend(req, res) {

        const {userId, friendId} =  req.body.payload

        try {
            await pool.query('DELETE FROM friends WHERE friends.friend_one = ? AND friends.friend_two = ?', [
                userId,
                friendId,
            ])

            const queryUser = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [
                config.get('tableOne'),
                config.get('fieldOneTableOne'),
                friendId] ).then((data) => {
                try {
                    return data[0][0].login;
                } catch (error) {
                    return false
                }
            })

            res.status(200).json({massage: `Пользователь ${queryUser}, удален из списка Ваших собеседников!!!`})
            //DELETE FROM `friends` WHERE `friends`.`friend_one` = 28 AND `friends`.`friend_two` = 68

        } catch (e) {
            res.status(404).json({massage: 'Произошла ошибка на сервере...'})
        }
    }
}


module.exports = new FriendsController



//INSERT INTO `friends` (`id`, `friend_one`, `friend_two`, `status`, `created`) VALUES (NULL, '67', '68', '0', NULL);
