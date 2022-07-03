const { Router, response } = require('express')

// бибилиотека для шифрования:
const bcrypt = require('bcryptjs')

// бибилиотека валидации email и password
const { check, validationResult } = require('express-validator')

// библиотека для авторизации пользователя по jwt tocken
const jwt = require('jsonwebtoken')

// подключаем config для получения jwsSecret
const config = require('config')

const router = Router()

const pool = require('../settings/db')















// /api/auth/

router.get('/user', async (req, res) => {
  try {
    pool.query('SELECT * FROM users').then((data) => {
      res.status(200).json(data[0])
    })
  } catch (error) {
    console.log('📢', error, 'Запрос не удался')
  }
})

// INSERT INTO `abonents` (`id`, `name`, `password`) VALUES (NULL, 'Вася', '123');



//api/auth/register

router.post(
  '/register',
  // массив миделвейров, которые будут делать валидацию:
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      //обработка валидации
      const errors = validationResult(req)

      //проверка на прохождении валидации
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          massage: 'Некорректные данные при регистрации',
        })
      }
      const { email, password } = req.body

      // проверка на существующего юзера
      const foundUser = "SELECT * FROM `users` WHERE `email` = '" + email + "'"
      const candidate = await pool.query(foundUser).then((data) => {
        try {
          return data[0][0].email;
        } catch (error) {
          return false
        }
      })
      if (candidate) {
        return res.status(405).json({ massage: " такой пользователь существует"})
      }

      
      // хешируем полученный пароль
      const hashedPassword = await bcrypt.hash(password, 12)
      // когда пароль готов создаем пользователя
      const postUser = "INSERT INTO `users` (`id`, `email`, `password`) VALUES (NULL, '" + email + "', '" + hashedPassword + "')"

        
      await pool.query(postUser).then((data) => {
        // отвечаем фронтэнду
        res.status(201).json({massage: 'Пользоваетль создан'})
      })
      } catch (error) {
        res.status(500).json({ massage: 'Что-то пошло не так, попробуйте снова' })
      }
  },
)





// /api/auth/login
router.post(
  '/login',

  // массив миделвейров, которые будут делать валидацию:
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(), //пароль должен существовать
  ],

  async (req, res) => {
    try {
      //обработка валидации
      const errors = validationResult(req)

      //проверка на прохождении валидации
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          massage: 'Некорректные данные при входе в систему',
        })
      }

      // получаем из request поля
      const { email, password } = req.body

      // ищем пользователя, если его нет, то залогинеться уже не можем
      const user = await User.findOne({ email: email })
      if (!user) {
        return res.status(400).json({ massage: 'Пользователь не найден' })
      }

      //? если пользователь найден, то необходимо проверить совпадают ли его пароли
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ massage: 'Неверный пароль' })
      }

      //создаем токен
      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.get('jwtSecret'),
        {
          expiresIn: '1h',
        }, // через сколько прекратит токен свое существование
      )

      // ОТВЕЧАЕМ НА ФРОНДЭНД
      res.json({ token, userId: user.id })
    } catch (error) {
      res.status(500).json({ massage: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)

module.exports = router
