import React, {useState} from 'react'
import { useMassage } from '../../hooks/message.hook'
import { useHttp } from '../../hooks/http.hook'
import { ProfilePage } from './ProfilePage'




let file = null



export const ProfilePageContainer = () => {
  //const auth = useContext(AuthContext)

  //const [form, setForm] = useState({ userLogin: auth.userLogin })

  const { loading, request } = useHttp()

  const [preview, setPreview] = useState(null)

  const message = useMassage()

  

  const inputHandler = (event) => {
    // value = event.target
    // setForm({ ...form, [event.target.id]: event.target.value })
  }

  const changeInputFileHandler = (event) => {
    file = event.target.files[0]
    // показ превью
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = ev => {
      setPreview(ev.target.result);
    }
    // проверка на валидность картинки
    if (!file.type.match('image')) {
      //очищаем поле input
      event.target.value = null
      return message('Неправильный тип файла')
    }

  }

  
  const saveHandler = async (event) => {
    event.preventDefault()
    // if (auth.isAuthenticated && auth.userId) {
    //   if (!value.value) {return message('Поле не может быть пустым')}
    //   try {
    //     const data = await request('/api/auth/profile/login', 'POST', {
    //       userId: auth.userId,
    //       userLogin: form.userLogin,
    //     })
    //     message(data[2].massage)
    //     //auth.isLogin(data[1])
    //     if (value.value) {value.value = ''}
    //     window.M.updateTextFields()
    //   } catch (error) {
    //     value.value = ''
    //     window.M.updateTextFields()
    //     message(error.message)
    //   }
    // } else {
    //   message('Что-то пошло не так')
    // }
  }

  const saveAvatarHandler = async(event) => {
    event.preventDefault()
    if (!file) { return message('Выберите файл')}
    try {

      let formData = new FormData();
      formData.append("file", file);


      // for(const pair of formData.entries()) {
      //   console.log(`${pair[0]}, ${pair[1]}`);
      // }

      console.log('📢 [ProfilePageContainer.jsx:88]', file, formData);


      const data = await request('/api/auth/profile/avatar', 'POST', {
        //userId: auth.userId,
        file: formData
      })
      message(data.massage)
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
