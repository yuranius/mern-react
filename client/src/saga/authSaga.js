import {put, takeEvery} from 'redux-saga/effects'

import {
    ASYNC_AUTH_USER,
    ASYNC_LOGOUT_USER,
    ASYNC_REGISTER_USER,
    logoutUser,
    setAuthUser
} from "../store/authReducer"
import {loginAPI} from "../api/api";
import {TOKEN_DATA, USER_DATA} from "../config";
import {AsyncSetShowMassageAction, setLoadingProcessAction, setShowMassageAction} from "../store/overReducer";

const delay = (ms) => new Promise(res => setTimeout(res, ms))


function* setAuthUserWorker({payload}) {
    try{
        yield put(setLoadingProcessAction(true))
        const {token, userId, userLogin, avatar, massage} = yield loginAPI.login(payload.email, payload.password)
        const user = {token, userId, userLogin, avatar}
        yield put(setLoadingProcessAction(false))
        yield localStorage.setItem (TOKEN_DATA, JSON.stringify({ token }))
        yield localStorage.setItem (USER_DATA, JSON.stringify({ userId, userLogin, avatar }))
        yield put(setAuthUser(user))
        yield put(AsyncSetShowMassageAction(massage))
    } catch (error) {
        yield put(setLoadingProcessAction(false))
        yield put (AsyncSetShowMassageAction(error.response.data.massage))
    }

}

function* setRegisterUserWorker({payload}) {
    try {
        yield put(setLoadingProcessAction(true))
        const user = yield loginAPI.register(payload.email, payload.password)
        yield put(setLoadingProcessAction(false))
        yield put (AsyncSetShowMassageAction(user.massage))
    } catch (error) {
        yield put(setLoadingProcessAction(false))
        yield put (AsyncSetShowMassageAction(error.response.data.errors[0].msg))
    }
}

function* logoutUserWorker() {
    yield localStorage.removeItem(USER_DATA)
    yield localStorage.removeItem(TOKEN_DATA)
    yield put(logoutUser({userId: null, token:null}))
}

export function* userWatcher() {
    yield takeEvery(ASYNC_AUTH_USER, setAuthUserWorker)
    yield takeEvery(ASYNC_REGISTER_USER, setRegisterUserWorker)
    yield takeEvery(ASYNC_LOGOUT_USER, logoutUserWorker)

}