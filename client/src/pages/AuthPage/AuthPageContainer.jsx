import { useHttp } from "../../hooks/http.hook"
import React, {useEffect, useState} from "react"
import { useMassage } from "../../hooks/message.hook"
import {AuthPage} from "./AuthPage";
import {useDispatch, useSelector} from "react-redux";
import {AsyncSetUserDataAction} from "../../store/authReducer";

export const AuthPageContainer = () => {

    // const auth = useContext(AuthContext)

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

    // const loginHandler = async () => {
    //     try {
    //         const data = await request ('/api/auth/login', 'POST', {...form})
    //         message(data.massage)
    //
    //         auth.login(data.token, data.userId, data.userLogin)
    //     } catch (error) {
    //
    //     }
    // }

    let user = useSelector((state) => state.user)

    useEffect(() => {
        console.log('📢---user---📢',user)
    }, [user])

    console.log('📢---user---📢',user)

    const dispatch = useDispatch()
    const loginHandler = () => {
        try {
            dispatch(AsyncSetUserDataAction(form))
        } catch (e) {
            console.log('📢---Error---📢',e)
        }
    }

    return <AuthPage
        loginHandler={loginHandler}
        registerHeandler={registerHandler}
        changeHandler={changeHandler}
        loading={loading}
    />


}