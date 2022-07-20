const pool = require('../settings/db')
const config = require('config')
const Uuid = require('uuid')

class FileController {
    async uploadAvatar(req, res) {

        try {

            const file = req.body.file

            console.log('📢 [file-controller.js:12]', file);

            const user = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [
                config.get('tableOne'),
                config.get('fieldOneTableOne'),
                req.body.userId
            ]).then((data) => {
                return data[0][0]
            })

            //генерируем рандомное название для файла что-бы он был уникальным для этого нужен модуль UUID 
            const avatarName = Uuid.v4() + '.jpg'

            console.log('📢 [file-controller.js:25]', user);

            //создаем путь куда будем перемещать файл
            file.mv(config.get('staticPath') + '\\' + avatarName)

            await pool.query(
                `UPDATE ?? SET ?? = ? WHERE ??.?? = ?`,
                [
                    config.get('tableOne'),
                    config.get('fieldSixTableOne'),
                    avatarName, 
                    config.get('tableOne'),
                    config.get('fieldOneTableOne'),
                    user.id
                ]
            ).then((data) => {
                res.status(201).json({massage:"Аватар изменен успешно!"})
            })

            
        } catch (error) {
            console.log('📢 [user-controller.js:9]', 'Что-то пошло не так');
        }
    }

    async deleteAvatar(req, res) {
        try {


            const user = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [
                config.get('tableOne'),
                config.get('fieldOneTableOne'),
                req.body.userId
            ])

            await pool.query(
                `UPDATE ?? SET ?? = ? WHERE ??.?? = ?`,
                [
                    config.get('tableOne'),
                    config.get('fieldSixTableOne'),
                    null, 
                    config.get('tableOne'),
                    config.get('fieldOneTableOne'),
                    user.userId
                ]
            )
            fs.unlinkSync(config.get('staticPath') + '\\' + user.avatar)

            return res.json(user, {massage:"Аватар удален!"})
        } catch (error) {
            console.log('📢 [user-controller.js:9]', error);
        }
    }
}


module.exports = new FileController