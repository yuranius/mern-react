const { Router } = require('express')
const router = Router()
const findController = require ('../controllers/find-controllers')




// /api/findcollocuter/

router.get('/test/:user_query', findController.findCollocuters)
router.get('/all', findController.findAllCollocuters)


module.exports = router
