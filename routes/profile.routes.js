const { Router } = require('express')
const router = Router()

const profileController = require ('../controllers/profile-controller')
const pool = require("../settings/db");
//const fileController = require('../controllers/file-controller')


// /api/profile/

router.post('/login', profileController.changeLogin) // корректровка логина
// router.post('/avatar', fileController.uploadAvatar) // корректровка аватара
// router.delete('/avatar', fileController.deleteAvatar) // удаление аватара




module.exports = router
