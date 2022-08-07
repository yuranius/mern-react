import { useHttp } from "../../hooks/http.hook"
import React, {useEffect, useState} from "react"
import { useMassage } from "../../hooks/message.hook"
import {AuthPage} from "./AuthPage";
import {useDispatch, useSelector} from "react-redux";
import {AsyncSetAuthUserAction, AsyncSetRegisterUserAction, AsyncSetUserDataAction} from "../../store/authReducer";

export const AuthPageContainer = () => {

    // const auth = useContext(AuthContext)

    //const {loading, error, clearError } = useHttp()

    const [form, setForm] = useState({email:"", password:""})

    //обработка ошибок от сервера
    const message = useMassage()

    // useEffect(() => {
    //     message(error);
    //     clearError()
    // }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields()
    }, []) // делает поля ввода логин и пароля активными (что-бы не налезали поля друг на друга)


    const changeHandler = event => {
        setForm({ ...form, [event.target.id]: event.target.value })
    }






    let user = useSelector((state) => state.user)

    useEffect(() => {
    }, [user])


    const dispatch = useDispatch()



    const registerHandler = () => {
        dispatch(AsyncSetRegisterUserAction(form))
    }


    const loginHandler = () => {
        dispatch(AsyncSetAuthUserAction(form))
    }

    return <AuthPage
        loginHandler={loginHandler}
        registerHandler={registerHandler}
        changeHandler={changeHandler}
        loading={user.loading}
    />


}