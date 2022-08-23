const pool = require('../settings/db')
const config = require('config')
const {validationResult, check} = require("express-validator");

class FindControllers {
    async findCollocuters(req, res) {
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

    async findPageAllCollocuters(req, res) {
        const {page:pageNumber, limit: pageSize, userId} = req.query
        try {
            const numberOfResults = await pool.query('SELECT users.id, users.login FROM users WHERE 1', [
            ]).then((data) => {
                return data[0].length
            })

            const pageLimit = pageNumber * pageSize - pageSize // вычисляем номер диапазона для sql-запроса

            const collocutersOfResults = await pool.query('SELECT ??.??, ??.?? FROM ?? WHERE ?? LIMIT ?,?', [
                config.get('tableOne'),
                config.get('fieldOneTableOne'),
                config.get('tableOne'),
                config.get('fieldFourTableOne'),
                config.get('tableOne'),
                config.get('fieldOneTableOne'),
                pageLimit, 
                +pageSize 
            ]).then((data) => {
                return data[0]
            })


          



            // let checkFriend = async (friendId) => {await pool.query('SELECT friends.friend_one, friends.friend_two FROM friends WHERE friend_one = ? AND friend_two = ?',[
            //     userId,
            //     friendId
            // ]).then((data) => {
            //     if (data[0][0]) { return true } else { return  false }
            // })}

            let newCollocutersOfResults =  []

            await Promise.all(collocutersOfResults.map(async (col) => {

                try {
                    let checkFriend = await pool.query('SELECT friends.friend_one, friends.friend_two FROM friends WHERE friend_one = ? AND friend_two = ?',[
                    userId,
                    col.id
                    ]).then((data) => {
                    if (data[0][0]) { return true } else { return  false }
                    })
                    newCollocutersOfResults.push({...col, friend:checkFriend})
                    return newCollocutersOfResults;
                } catch(err) {
                    throw err;
                }
            }));


            // SELECT 'friend_one','friend_two' FROM friends WHERE friend_one =28 AND friend_two=29; находим друзей пользователя

            let numberOfPages = Math.ceil(numberOfResults / pageSize) // всего страниц

            res.status(200).json({collocuters:newCollocutersOfResults, totalUsers: numberOfResults, totalPages: numberOfPages})

        } catch (error) {
            console.log('📢', error, 'Запрос не удался')
        }
    }

    async findAllFriends(req, res) {
        const { userId } = req.query

        try {
            const numberOfResults = await pool.query('SELECT users.id, users.login FROM users WHERE 1', [
            ]).then((data) => {
                return data[0].length
            })


            const collocutersOfResults = await pool.query('SELECT ??.??, ??.?? FROM ?? WHERE ??', [
                config.get('tableOne'),
                config.get('fieldOneTableOne'),
                config.get('tableOne'),
                config.get('fieldFourTableOne'),
                config.get('tableOne'),
                config.get('fieldOneTableOne'),
            ]).then((data) => {
                return data[0]
            })


            let newCollocutersOfResults =  []

            await Promise.all(collocutersOfResults.map(async (col) => {

                try {
                    let checkFriend = await pool.query('SELECT friends.friend_one, friends.friend_two FROM friends WHERE friend_one = ? AND friend_two = ?',[
                        userId,
                        col.id
                    ]).then((data) => {
                        if (data[0][0]) { return true } else { return  false }
                    })

                    newCollocutersOfResults.push({...col, friend:checkFriend})
                    return newCollocutersOfResults;
                } catch(err) {
                    throw err;
                }
            }));

            let friends = newCollocutersOfResults.filter( col => col.friend == true)

            res.status(200).json({friends})

        } catch (error) {
            res.status(404).json({massage: 'Ошибка запроса... Попробуйте в другой раз...'})
        }
    }
}




module.exports = new FindControllers