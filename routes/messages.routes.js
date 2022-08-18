const { Router } = require('express')
const router = Router()
const messagesController = require ('../controllers/messages-controllers')

// /api/messages/

router.post('/collocuters', messagesController.SearchForUsersWhoHaveMessages) // поиск users у сообщения которых есть у пользователя



module.exports = router
