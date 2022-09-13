const pool = require('../settings/db')
const config = require('config')

class ProfileController {
    async changeLogin(req, res) {

        try {

            if ((/^([\s%&#@!\s])*$/).test(req.body.userLogin)) {
                return res.status(405).json({ massage: "Некорректные данные"})
            }

            const {userId, userLogin} = req.body

            console.log(userLogin)

            // проверка на существующего логина
            const candidateLogin = await pool.query(`SELECT ??, ?? FROM ?? WHERE ??.?? = ?`,
                [config.get('fieldOneTableOne'),
                    config.get('fieldFourTableOne'),
                    config.get('tableOne'),
                    config.get('tableOne'),
                    config.get('fieldFourTableOne'),
                    userLogin]).then((data) => {
                try {
                    return data[0][0];
                } catch (error) {
                    return false
                }
            })

            console.log(candidateLogin)

            if (candidateLogin) {
                return res.status(405).json({ massage: " Такое имя занято! Придумайте другое..."})
            }

            await pool.query(
                `UPDATE ?? SET ?? = ? WHERE ??.?? = ?`,
                [
                    config.get('tableOne'),
                    config.get('fieldFourTableOne'),
                    userLogin,
                    config.get('tableOne'),
                    config.get('fieldOneTableOne'),
                    userId
                ]
            )

            res.json({ userId, userLogin, massage:"Данные изменены успешно!"})
        } catch (error) {
            console.log('📢 [profile-controller.js:9]', error);
        }
    }

}


module.exports = new ProfileController