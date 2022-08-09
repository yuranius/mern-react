const pool = require('../settings/db')
const config = require('config')
const Uuid = require('uuid')
const fs = require('fs')


class FileController {
    async uploadAvatar(req, res) {

        try {

            const file = req.files

            console.log('📢 [file-controller.js:13]', file);

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

            const path = '~\\Документ\\ReactJS\\Mern-React\\static'





            fs.readFile(file, function(err, data){
                console.log('📢 [file-controller.js:36]', data, err);
            });



            console.log('📢 [file-controller.js:41]', 'сработало');


            //создаем путь куда будем перемещать файл config.get('staticPath') + '\\' + avatarName
            file.mv(path)

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
            console.log('📢 [profile-controller.js:46]', 'Что-то пошло не так');
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
            console.log('📢 [profile-controller.js:9]', error);
        }
    }
}


module.exports = new FileController