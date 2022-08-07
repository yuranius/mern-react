import {put, takeEvery} from 'redux-saga/effects'

import {
    ASYNC_AUTH_USER,
    ASYNC_LOGOUT_USER,
    ASYNC_REGISTER_USER,
    logoutUser,
    setAuthUser, setLoadingProcessAction,
    setShowMassageAction
} from "../store/authReducer"
import {loginAPI} from "../api/api";
import {USER_DATA} from "../config";


function* setAuthUserWorker({payload}) {
    yield put(setShowMassageAction(''))
    yield put(setLoadingProcessAction(true))
    const user = yield loginAPI.login(payload.email, payload.password)
    yield put(setLoadingProcessAction(false))
    yield localStorage.setItem (USER_DATA, JSON.stringify({ token:user.token,  userId:user.userId, userLogin: user.userLogin }))
    yield put(setAuthUser(user))
}

function* setRegisterUserWorker({payload}) {
    try {
        yield put(setShowMassageAction(''))
        yield put(setLoadingProcessAction(true))
        const user = yield loginAPI.register(payload.email, payload.password)
        yield put(setLoadingProcessAction(false))
        yield put(setShowMassageAction(user.massage))
        //yield put(setRegisterUser(user))
    } catch (error) {
        yield put(setShowMassageAction(error.response.data.massage))
    }



}

function* logoutUserWorker() {
    yield put(setShowMassageAction(''))
    yield localStorage.removeItem(USER_DATA)
    yield put(logoutUser({userId: null, token:null}))
}

export function* userWatcher() {
    yield takeEvery(ASYNC_AUTH_USER, setAuthUserWorker)
    yield takeEvery(ASYNC_REGISTER_USER, setRegisterUserWorker)
    yield takeEvery(ASYNC_LOGOUT_USER, logoutUserWorker)

}