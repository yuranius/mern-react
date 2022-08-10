const { Router } = require('express')
const router = Router()
const findController = require ('../controllers/find-controllers')




// /api/findcollocuter/

router.get('/:user_query', findController.findCollocuters)
router.get('/', findController.findAllCollocuters)


module.exports = router
