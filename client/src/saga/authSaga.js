import {put, takeEvery} from 'redux-saga/effects'

import {
    ASYNC_AUTH_USER,
    ASYNC_LOGOUT_USER,
    ASYNC_REGISTER_USER,
    logoutUser,
    setAuthUser,
    setRegisterUser, setShowMassage
} from "../store/authReducer"
import {loginAPI} from "../api/api";
import {USER_DATA} from "../config";


function* setAuthUserWorker({payload}) {
    const user = yield loginAPI.login(payload.email, payload.password)
    yield localStorage.setItem (USER_DATA, JSON.stringify({ token:user.token,  userId:user.userId, userLogin: user.userLogin }))
    yield put(setAuthUser(user))
}

function* setRegisterUserWorker({payload}) {
    try {
        const user = yield loginAPI.register(payload.email, payload.password)
    } catch (error) {
        console.log(error.response.data.massage)
        yield put(setShowMassage(error.response.data.massage))
    }


    //yield put(setRegisterUser(user))
}

function* logoutUserWorker() {
    yield localStorage.removeItem(USER_DATA)
    yield put(logoutUser({userId: null}))
}

export function* userWatcher() {
    yield takeEvery(ASYNC_AUTH_USER, setAuthUserWorker)
    yield takeEvery(ASYNC_REGISTER_USER, setRegisterUserWorker)
    yield takeEvery(ASYNC_LOGOUT_USER, logoutUserWorker)

}