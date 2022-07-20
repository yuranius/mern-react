import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useMassage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'

let value = ''

export const ProfilePage = () => {
  const auth = useContext(AuthContext)

  const [form, setForm] = useState({ userLogin: auth.userLogin })

  const { loading, request, error, clearError } = useHttp()

  const message = useMassage()

  

  const inputHandler = (event) => {
    value = event.target
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  
  const saveHandler = async (event) => {
    event.preventDefault()
    
    
    

    if (auth.isAuthenticated && auth.userId) {
      if (!value.value) {return message('Поле не может быть пустым')}
      try {
        const data = await request('/api/auth/profile/login', 'POST', {
          userId: auth.userId,
          userLogin: form.userLogin,
        })
        message(data[2].massage)
        auth.isLogin(data[1]) 

       value.value = ''

       window.M.updateTextFields()
       console.log('📢 [ProfilePage.jsx:43]', value.value);


      } catch (error) {
        value.value = ''
        window.M.updateTextFields()
        message(error.message)
      }
    } else {
      message('Что-то пошло не так')
    }
  }

  // useEffect(() => {
  //   window.M.updateTextFields()
  // }, [value]) // делает поля ввода логин и пароля активными (что-бы не налезали поля друг на друга)

  console.log('📢 [ProfilePage.jsx:50]', value);

  return (
    <div className="row profile-block">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="userLogin"
              type="text"
              className="validate"
              data-length="50"
              onChange={inputHandler}
            />
            <label htmlFor="userLogin">
              {/* {auth.userLogin ? auth.userLogin : 'Введи логин для сохранения'} */}
              Введите логин и нажмите кнопку "Сохранить" для редактирования
            </label>
          </div>
        </div>

        <div className="row">
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              onClick={saveHandler}
              disabled={loading}
            >
              Сохранить
            </button>
          </div>
        </div>


        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </form>
    </div>
  )
}
