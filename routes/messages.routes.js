const { Router } = require('express')
const router = Router()
const messagesController = require ('../controllers/messages-controllers')

// /api/messages/

router.get('/collocuters/', messagesController.getUsersWhoHaveMessages) // поиск users у сообщения которых есть у пользователя
router.get('/', messagesController.getMessagesFromUser) // получаем все сообщения с user'ом
router.post('/add', messagesController.addMessages) // добавляем соообщение
router.post('/change', messagesController.changeMessages) // меняем сообщение
router.delete('/', messagesController.deleteMessages) //удаляем сообщение


module.exports = router
