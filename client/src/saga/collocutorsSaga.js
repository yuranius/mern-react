import {put, takeEvery} from 'redux-saga/effects'
import {collocutorsAPI} from "../api/api";
import {ASYNC_GET_INTERLOCUTORS, getCollocutors, getCollocutorsError} from "../store/collocutorsReducer";



function* getCollocutorsWorker({payload}) {
    try {
        const collocutors = yield collocutorsAPI.getCollocutors(payload)
        yield put(getCollocutors(collocutors))
    } catch (e) {
        yield put(getCollocutorsError())
    }

    // yield console.log(collocutors)

}

export function* collocutorsWatcher() {
    yield takeEvery(ASYNC_GET_INTERLOCUTORS, getCollocutorsWorker)
}