const { Router } = require('express')
const router = Router()

const friendsController = require ('../controllers/friends-controller')




// /api/friend/

router.post('/add', friendsController.addFriend) //добавить в друзья
router.post('/delete', friendsController.deleteFriend) //удалить из друзей





module.exports = router
