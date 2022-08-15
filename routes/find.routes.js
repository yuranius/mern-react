const { Router } = require('express')
const router = Router()
const findController = require ('../controllers/find-controllers')




// /api/find/

router.get('/collocuter/:user_query', findController.findCollocuters)
router.get('/collocuter', findController.findPageAllCollocuters)
router.get('/friends', findController.findAllFriends)


module.exports = router
