import { useContext, useEffect, useState } from "react"
import { useHttp } from "../../hooks/http.hook"
import React from "react"
import { useMassage } from "../../hooks/message.hook"
import { AuthContext } from "../../context/AuthContext"
import {AuthPage} from "./AuthPage";

export const AuthPageContainer = () => {

    const auth = useContext(AuthContext)

    const {loading, request, error, clearError } = useHttp()

    const [form, setForm] = useState({email:"", password:""})

    //обработка ошибок от сервера
    const message = useMassage()

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []) // делает поля ввода логин и пароля активными (что-бы не налезали поля друг на друга)


    const changeHandler = event => {
        setForm({ ...form, [event.target.id]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request ('/api/auth/register', 'POST', {...form})
            message(data.massage)
        } catch (error) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request ('/api/auth/login', 'POST', {...form})
            message(data.massage)

            auth.login(data.token, data.userId, data.userLogin)
        } catch (error) {

        }
    }

    return <AuthPage
        loginHandler={loginHandler}
        registerHeandler={registerHandler}
        changeHandler={changeHandler}
        loading={loading}
    />


}