import {put, takeEvery} from 'redux-saga/effects'

import {profileAPI} from "../api/api";
import {USER_DATA} from "../config";
import {setLoadingProcessAction, setShowMassageAction} from "../store/overReducer";
import {ASYNC_CHANGE_LOGIN_USER, changeLoginUser} from "../store/profileReducer";
import {setAuthUser} from "../store/authReducer";

const delay = (ms) => new Promise(res => setTimeout(res, ms))


function* setChangeLoginUserWorker({payload}) {
    try {
        yield put(setLoadingProcessAction(true))
        const {userId, userLogin, massage} = yield profileAPI.changeLogin(payload.userId, payload.userLogin)
        yield put(setLoadingProcessAction(false))
        const userData = JSON.parse(localStorage.getItem(USER_DATA))
        yield localStorage.setItem (USER_DATA, JSON.stringify({ userId: userData.userId, userLogin, avatar:userData.avatar }))
        yield put(setAuthUser({userLogin}))
        yield put(setShowMassageAction(massage))
        yield delay(1000)
        yield put(setShowMassageAction(''))
    } catch (error) {
        yield put(setLoadingProcessAction(false))
        console.log(error)
    }






    // yield put(setLoadingProcessAction(false))
    // yield localStorage.setItem (USER_DATA, JSON.stringify({ userLogin }))
    // yield put(setShowMassageAction(massage))
    // yield put(setAuthUser(user))
    // yield delay(1000)
    // yield put(setShowMassageAction(''))
}



export function* profileWatcher() {
    yield takeEvery(ASYNC_CHANGE_LOGIN_USER, setChangeLoginUserWorker)

}