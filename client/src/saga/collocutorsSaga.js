import {put, takeEvery} from 'redux-saga/effects'
import {collocutorsAPI} from "../api/api";
import {
    ASYNC_GET_ALL_INTERLOCUTORS,
    ASYNC_GET_INTERLOCUTORS,
    getAllCollocuters,
    getCollocutors
} from "../store/collocutorsReducer";
import {setLoadingProcessAction, setShowMassageAction} from "../store/overReducer";

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* getCollocutersWorker({payload}) {
    try {
        yield put(setLoadingProcessAction(true))
        const {data,massage} = yield collocutorsAPI.getCollocuters(payload)
        yield put(getCollocutors({collocuters: data}))
        yield put (setLoadingProcessAction(false))
        yield put(setShowMassageAction(massage))
        yield delay(1000)
        yield put(setShowMassageAction(''))
    } catch (error) {
        yield put (setLoadingProcessAction(false))
        yield put(setShowMassageAction(error.response.data.massage))
        yield delay(1000)
        yield put(setShowMassageAction(''))
    }
}

function* getAllCollocutersWorker ({payload}) {
    try {
        const data = yield collocutorsAPI.getAllCollocuters(payload)
        console.log( '📌:',data,'🌴 🏁')


        //yield put(getAllCollocuters(payload))
    } catch (e) {
        console.log( '📌:',e,'🌴 🏁')
    }
}

export function* collocutorsWatcher() {
    yield takeEvery(ASYNC_GET_INTERLOCUTORS, getCollocutersWorker)
    yield takeEvery(ASYNC_GET_ALL_INTERLOCUTORS, getAllCollocutersWorker)
}