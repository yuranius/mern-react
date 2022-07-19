import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useMassage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'



export const ProfilePage = () => {

    const auth = useContext(AuthContext)

    const [form, setForm] = useState({userLogin: auth.userLogin})

    const {loading, request, error, clearError } = useHttp();

    console.log('📢 [ProfilePage.jsx:15]', form, auth.userId);

    const message = useMassage();


    const inputHandler = (event) => {
        setForm({ ...form, [event.target.id]: event.target.value })
        
    }


    const saveHandler = async(event) => {
        event.preventDefault()
        try {
            const data = await request (`/api/auth/profile/:${auth.userId}`, 'PUT', {...form})
            message(data.massage)
        } catch (error) {
            
        }
    }
    


  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input id="userLogin" type="text" className="validate" data-length="50" onChange={inputHandler} />
            <label htmlFor="userLogin">{auth.userLogin ? auth.userLogin : 'Введи логин для сохранения'}</label>
          </div>
        </div>

        <div className="row">
          <div className="card-action">
            <button className="btn yellow darken-4" style={{ marginRight: 10 }} onClick={saveHandler} >
              Сохранить
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
