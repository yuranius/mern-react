import React, {useEffect, useState} from "react"
import { useMassage } from "../../hooks/message.hook"
import {AuthPage} from "./AuthPage";
import {useDispatch, useSelector} from "react-redux";
import {AsyncSetAuthUserAction, AsyncSetRegisterUserAction } from "../../store/authReducer";

export const AuthPageContainer = () => {


    const [form, setForm] = useState({email:"", password:""})

    //вывод сообщений
    const setMassage = useMassage()

    const changeHandler = event => {
        setForm({ ...form, [event.target.id]: event.target.value })
    }

    let state = useSelector((state) => state)

    useEffect(() => {
        window.M.updateTextFields() // для materialize, делает поля ввода логин и пароля активными (что-бы не налезали поля друг на друга)
        setMassage(state.over.massage)
    }, [state])


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
        loading={state.over.loading}
    />


}