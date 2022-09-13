const pool = require('../settings/db')
const config = require('config')
const fs = require('fs')
const path = require ('path')


class FileController {
    async uploadAvatar(req, res) {

        try {

            const {userId} = req.body

            const file = req.file
            console.log('📢 [file-controller.js:13]', file.filename, userId);

            const user = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [
                config.get('tableOne'),
                config.get('fieldOneTableOne'),
                userId
            ]).then((data) => {
                return data[0][0]
            })

            console.log( '📌:',user,'🌴 🏁')


            //генерируем рандомное название для файла что-бы он был уникальным для этого нужен модуль UUID 
            //const avatarName = Uuid.v4() + '.jpg'
            //
            // console.log('📢 [file-controller.js:25]', user);

            //const path = '~\\Документ\\ReactJS\\Mern-React\\static'





            // fs.readFile(file, function(err, data){
            //     console.log('📢 [file-controller.js:36]', data, err);
            // });



            console.log('📢 [file-controller.js:41]', 'сработало');


            //создаем путь куда будем перемещать файл config.get('staticPath') + '\\' + avatarName
            //await file.mv(path.resolve(__dirname, 'static', avatarName)) //resolve - адапитирует указанный путь к операционной системе

            await pool.query(
                `UPDATE ?? SET ?? = ? WHERE ??.?? = ?`,
                [
                    config.get('tableOne'),
                    config.get('fieldSixTableOne'),
                    file.filename,
                    config.get('tableOne'),
                    config.get('fieldOneTableOne'),
                    user.id
                ]
            )

            res.status(201).json({avatar: file.filename, message:'Аватар изменен...'})
            
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