import React from "react"


export const AuthPage = ({changeHandler, loginHandler, registerHandler, loading }) => {
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
                        onClick={loginHandler}
                        disabled={loading} 
                        >Войти</button>
                        <button 
                        className="btn grey lighten-1 black-text"
                        onClick={registerHandler}
                        disabled={loading} 
                        >Регистрация</button>
                    </div>

                </div>


            </div>
        </div>
    )
}