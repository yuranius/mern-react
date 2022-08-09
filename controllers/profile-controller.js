const pool = require('../settings/db')
const config = require('config')

class ProfileController {
    async changeLogin(req, res) {

        try {

            if ((/^([\s%&#@!\s])*$/).test(req.body.userLogin)) {
                return res.status(405).json({ massage: "Некорректные данные"})
            }

            const {userId, userLogin} = req.body
            console.log('📢 [profile-controller.js:10]', userId, userLogin, config.get('tableOne'));

            pool.query(
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