import {put, takeEvery} from 'redux-saga/effects'

// put - dispatch, который предназначен для синхронных action

import { ASYNC_DECREMENT_CASH, ASYNC_INCREMENT_CASH, decrementCashAction, incrementCashAction } from "../store/cashReducer"

const delay = (ms) => new Promise(res => setTimeout(res, ms))


function* incrementWorker() {
    //перед асихронным действием пишем yield , т.е. следующий кусок кода не выполниться, пока не выполниться асинхронная функция (предыдущий)
    yield delay(1000)
    yield put(incrementCashAction())

}

function* decrementWorker() {
    yield delay(1000)
    yield put(decrementCashAction())
}

export function* cashWatcher() {
    yield takeEvery(ASYNC_INCREMENT_CASH, incrementWorker)
    yield takeEvery(ASYNC_DECREMENT_CASH, decrementWorker)
}