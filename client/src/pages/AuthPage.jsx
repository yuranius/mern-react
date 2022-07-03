import { useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import React from "react"
import { useMassage } from "../hooks/message.hook"

export const AuthPage = () => {

    const {loading, request, error, clearError } = useHttp()

    const [form, setForm] = useState({email:"", password:""})

    //обработка ошибок от сервера
    const message = useMassage()
    useEffect(() => {
        console.log('📢 [AuthPage.jsx:15]', error);
        message(error);
        clearError()
    }, [error, message, clearError]);
    

    const changeHandler = event => {
        setForm({ ...form, [event.target.id]: event.target.value })
    }

    const registerHeandler = async () => {
        try {

            const data = await request ('/api/auth/register', 'POST', {...form})

        } catch (error) {
            
        }
    }








    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>


                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>

                        <div className="input-field">
                            <input type="text" className="yellow-input" id="email" placeholder="Введите email" onChange={ changeHandler } />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field">
                            <input type="password" className="yellow-input" id="password" placeholder="Введите пароль" onChange={ changeHandler }/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>

                    <div className="card-action">
                        <button 
                        className="btn yellow darken-4" 
                        style={{marginRight:10}}
                        onClick={registerHeandler}
                        disabled={loading} 
                        >Войти</button>
                        <button 
                        className="btn grey lighten-1 black-text"
                        onClick={registerHeandler}
                        disabled={loading} 
                        >Регистрация</button>
                    </div>

                </div>


            </div>
        </div>
    )
}