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
            
            console.log( '📌:',result,'🌴 🏁')
            
            
            
            res.status(200).json({massage: 'Пользователь ,добавлен в список собеседников!!!'})
        } catch (e) {
            console.log( '📌:',e,'🌴 🏁')
            
        }

    }

    async deleteFriend(req, res) {

        const {userId, friendId} =  req.body.payload

        await pool.query('DELETE FROM friends WHERE friends.friend_one = ? AND friends.friend_two = ?', [
            userId,
            friendId,
        ])

        const deleteUser = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [
            config.get('tableOne'), 
            config.get('fieldOneTableOne'), 
            friendId] ).then((data) => {
            try {
                console.log( '📌:',data[0][0],'🌴 🏁')
                
                return data[0][0].login;
            } catch (error) {
                return false
            }
        })

        res.status(200).json({massage: `Пользователь ${deleteUser}, удален из списка собеседников!!!`})
        //DELETE FROM `friends` WHERE `friends`.`friend_one` = 28 AND `friends`.`friend_two` = 68

    }
}


module.exports = new FriendsController



//INSERT INTO `friends` (`id`, `friend_one`, `friend_two`, `status`, `created`) VALUES (NULL, '67', '68', '0', NULL);
