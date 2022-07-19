import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useMassage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'



export const ProfilePage = () => {

    const auth = useContext(AuthContext)

    const [form, setForm] = useState({userLogin: auth.userLogin})

    const {loading, request, error, clearError } = useHttp();


    const message = useMassage();


    const inputHandler = (event) => {
        setForm({ ...form, [event.target.id]: event.target.value })
        
    }


    const saveHandler = async(event) => {
        event.preventDefault()
        if (auth.isAuthenticated && auth.userId) {
        try {
            const data = await request ('/api/auth/profile', 'POST', { userId:auth.userId, userLogin:form.userLogin})
            message(data[2].massage)
            auth.isLogin(data[1])
        } catch (error) {
          message(error.message)
        }} else {
          message("Что-то пошло не так")
        }
    }
    


  return (
    <div className="row profile-block">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input id="userLogin" type="text" className="validate" data-length="50" onChange={inputHandler} />
            <label htmlFor="userLogin">{auth.userLogin ? auth.userLogin : 'Введи логин для сохранения'}</label>
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
      </form>
    </div>
  )
}
