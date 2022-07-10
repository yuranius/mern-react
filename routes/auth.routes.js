const { Router } = require('express')

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
const c = require('config')

// переменные для запросов к БД
let tableOne = 'users'
let fieldOneTableOne = 'id'
let fieldTwoTableOne = 'email'
let fieldThreeTableOne = 'password'
let fieldFourTableOne = 'login'
let fieldFiveTableOne = 'registration'
let fieldTableOne = [ 
  fieldOneTableOne,
  fieldTwoTableOne,
  fieldThreeTableOne,
  fieldFourTableOne,
  fieldFiveTableOne
]

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


// UPDATE `users` SET `login` = 'Mуся' WHERE `users`.`id` = 28; - //?обновить логин 

// INSERT INTO `messages` (`id`, `user_to_id`, `user_from_id`, `content`, `created_at`) VALUES (NULL, '28', '29', 'Привет! Как дела?', current_timestamp()); //?вставить сообщение

// /users?age=32&name=Tom

router.get('/search/:user_query', async (req, res) => {
  const user_query = req.params.user_query

  try {
    pool.query(
    // `SELECT users.login, messages.content_id 
    // FROM users 
    // JOIN messages 
    // ON messages.user_to_id 
    // WHERE users.login LIKE ?`, '%'+user_query+'%'


    `SELECT users.login, messages.content, messages.user_from_id
    FROM users 
    JOIN messages 
    ON messages.user_from_id
    WHERE users.login = 'Буся'`


    
    ).then((data) => {
      res.status(200).json(data[0])
    })
  } catch (error) {
    console.log('📢', error, 'Запрос не удался')
  }
})

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
      const candidate = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [tableOne, fieldTwoTableOne, email] ).then((data) => {
        try {
          return data[0][0].email;
        } catch (error) {
          return false
        }
      })

      if (candidate) {
        return res.status(405).json({ massage: " Такой пользователь существует"})
      }

      // логин оставляем пока пустым, для последующего редактирования самим пользователем
      login = ''
      
      // хешируем полученный пароль
      const hashedPassword = await bcrypt.hash(password, 12)
      // когда пароль готов создаем пользователя

      await pool.query(`INSERT INTO ?? (${new Array(fieldTableOne.length).fill('??')}) VALUES (NULL, ?, ?, ?, current_timestamp() )`, [
        tableOne, 
        fieldOneTableOne,
        fieldTwoTableOne, 
        fieldThreeTableOne,
        fieldFourTableOne,
        fieldFiveTableOne,
        email, 
        hashedPassword,
        login
      ]).then((data) => {
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
    check('email', 'Введите корректный email').normalizeEmail({ gmail_remove_dots:false } ).isEmail(),
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

      // const foundUser = "SELECT * FROM `users` WHERE `email` = '" + email + "'"
      const user = await pool.query(`SELECT * FROM ?? WHERE ?? = ?`, [
        tableOne,
        fieldTwoTableOne,
        email
      ]).then((data) => {
        try {
          return data[0][0];
          
        } catch (error) {
          return false
        }
      })


      if (!user) {
        return res.status(400).json({ massage: "Пользователь не найден"})
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
      res.status(200).json({ token, userId: user.id, massage:'Успешно' })
    } catch (error) {
      res.status(500).json({ massage: 'Что-то пошло не так, попробуйте снова' })
    }
  },
)

module.exports = router
