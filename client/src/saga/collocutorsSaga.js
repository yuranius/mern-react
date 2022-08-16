import {put, takeEvery} from 'redux-saga/effects'
import {collocutorsAPI, friendsAPI} from "../api/api";
import {
    addFriend,
    ASYNC_ADD_FRIEND, ASYNC_DELETE_FRIEND,
    ASYNC_GET_ALL_INTERLOCUTORS,
    ASYNC_GET_INTERLOCUTORS, deleteFriend,
    getAllCollocuters,
    getCollocuters
} from "../store/collocutorsReducer";
import {AsyncSetShowMassageAction, setLoadingProcessAction, setShowMassageAction} from "../store/overReducer";

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* getCollocutersWorker({payload}) {
    try {
        yield put(setLoadingProcessAction(true))
        const {data,massage} = yield collocutorsAPI.getApiCollocuters(payload)
        yield put(getCollocuters({collocuters: data}))
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
        const {pageNumber} = payload
        const { collocuters, totalPages, totalUsers } = yield collocutorsAPI.getApiAllCollocuters(payload)
        yield put(getAllCollocuters({collocuters, totalUsers, totalPages, pageNumber }))
    } catch (e) {
        yield put(AsyncSetShowMassageAction('Что-то пошло не так... Попробуйте позже...'))
    }
}

function* addFriendWorker ({payload}) {
    try {
        const response = yield friendsAPI.addFriend(payload)
        yield put (addFriend(payload))
        yield put(AsyncSetShowMassageAction(response.massage))
    } catch (error) {
        yield put(AsyncSetShowMassageAction(error.response.data.massage))
    }
}

function* deleteFriendWorker ({payload}) {
    console.log( '📌:',payload,'🌴 🏁')
    
    try {
        const response = yield friendsAPI.deleteFriend(payload)
        yield put (deleteFriend(payload))
        yield put (AsyncSetShowMassageAction(response.massage))
    } catch (error) {
        yield put(AsyncSetShowMassageAction(error.response.data.massage))
    }
}

export function* collocutorsWatcher() {
    yield takeEvery(ASYNC_GET_INTERLOCUTORS, getCollocutersWorker)
    yield takeEvery(ASYNC_GET_ALL_INTERLOCUTORS, getAllCollocutersWorker)
    yield takeEvery(ASYNC_ADD_FRIEND, addFriendWorker)
    yield takeEvery(ASYNC_DELETE_FRIEND, deleteFriendWorker)
}