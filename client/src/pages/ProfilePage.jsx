import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useMassage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'

let value = ''
let file = null

export const ProfilePage = () => {
  const auth = useContext(AuthContext)

  const [form, setForm] = useState({ userLogin: auth.userLogin })

  const { loading, request, error, clearError } = useHttp()

  const message = useMassage()

  

  const inputHandler = (event) => {
    value = event.target
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  const changeInputFileHandler = (event) => {
    file = event.target.files[0]

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
        if (value.value) {value.value = ''}
       window.M.updateTextFields()
      } catch (error) {
        value.value = ''
        window.M.updateTextFields()
        message(error.message)
      }
    } else {
      message('Что-то пошло не так')
    }
  }

  const saveAvatarHandler = async(event) => {
    event.preventDefault()
    if (!file) { message('Выберите файл')}
    try {

      console.log('📢 [ProfilePage.jsx:59]', file);

      let formData = new FormData();
      formData.append("file", file);


      console.log('📢 [ProfilePage.jsx:63]', formData, file); 
      const data = await request('/api/auth/profile/avatar', 'POST', {
        userId: auth.userId,
        file: file,
      })
      message(data.massage)
    } catch (error) {
      console.log('📢 [ProfilePage.jsx:60]', error);
    }
  }



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
            <input type="file" onChange={changeInputFileHandler} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
              className="btn yellow darken-4"
              onClick={saveAvatarHandler}
              disabled={loading}
            >
              Загрузить
            </button>
      </form>
    </div>
  )
}
