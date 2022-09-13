const { Router } = require('express')
const router = Router()

const profileController = require ('../controllers/profile-controller')
const fileController = require('../controllers/file-controller')

const upload = require('../middleware/BodyParserAndSaveFile')

// /api/profile/

router.post('/login', profileController.changeLogin) // корректровка логина
router.post('/avatar', upload.single('img'), fileController.uploadAvatar) // корректровка аватара
// router.delete('/avatar', fileController.deleteAvatar) // удаление аватара




module.exports = router
