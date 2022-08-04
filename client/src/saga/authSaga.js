import {put, takeEvery} from 'redux-saga/effects'

// put - dispatch, который предназначен для синхронных action

//import { ASYNC_DECREMENT_CASH, ASYNC_INCREMENT_CASH, decrementCashAction, incrementCashAction } from "../store/authReducer"

import { ASYNC_SET_USER_DATA, setUserData } from "../store/authReducer"
import {loginAPI} from "../api/api";

//
// const delay = (ms) => new Promise(res => setTimeout(res, ms))


// function* incrementWorker() {
//     //перед асинхронным действием пишем yield , т.е. следующий кусок кода не выполниться, пока не выполниться асинхронная функция (предыдущий)
//     yield delay(1000)
//     yield put(incrementCashAction())
//
// }

function* setUserDataWorker({payload}) {
    const user = yield loginAPI.login(payload.email, payload.password)
    yield put(setUserData(user))
}

export function* cashWatcher() {
    yield takeEvery(ASYNC_SET_USER_DATA, setUserDataWorker)
    // yield takeEvery(ASYNC_INCREMENT_CASH, incrementWorker)
    // yield takeEvery(ASYNC_DECREMENT_CASH, decrementWorker)
}