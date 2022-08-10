import {put, takeEvery} from 'redux-saga/effects'
import {ASYNC_SET_SHOW_MASSAGE, setShowMassageAction} from "../store/overReducer";

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* getMassageWorker({payload}) {
    yield put(setShowMassageAction(payload))
    yield delay(100)
    yield put(setShowMassageAction(''))
}

export function* overWatcher() {
    yield takeEvery(ASYNC_SET_SHOW_MASSAGE, getMassageWorker)
}