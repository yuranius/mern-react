import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useMassage } from '../../hooks/message.hook'
import { useHttp } from '../../hooks/http.hook'
import { ProfilePage } from './ProfilePage'

let value = ''
let file = null


export const ProfilePageContainer = () => {
  const auth = useContext(AuthContext)

  const [form, setForm] = useState({ userLogin: auth.userLogin })

  const { loading, request, error, clearError } = useHttp()

  const [preview, setPreview] = useState(null)

  const message = useMassage()

  

  const inputHandler = (event) => {
    value = event.target
    setForm({ ...form, [event.target.id]: event.target.value })
  }

  const changeInputFileHandler = (event) => {
    file = event.target.files[0]
    // показ превью
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = ev => {
      setPreview(ev.target.result);
    }
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
    if (!file) { return message('Выберите файл')}
    try {

      
      // проверяем тип файла
      if (!file.type.match('image')) {
        return message('Неправильный тип файла')
      }



      




      let formData = new FormData();
      formData.append("file", file);





      // const data = await request('/api/auth/profile/avatar', 'POST', {
      //   userId: auth.userId,
      //   file: file,
      // })
      // message(data.massage)
    } catch (error) {
      console.log('📢 [ProfilePage.jsx:78]', error);
    }
  }




  return <ProfilePage 
  inputHandler={inputHandler} 
  saveHandler={saveHandler}
  loading={loading}
  changeInputFileHandler={changeInputFileHandler}
  saveAvatarHandler={saveAvatarHandler}
  preview={preview}
  />
}
