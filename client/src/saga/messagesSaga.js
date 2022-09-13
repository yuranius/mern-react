import {put, takeEvery} from 'redux-saga/effects'
import {messagesAPI} from "../api/api";
import {
    addMassageActionCreator,
    ASYNC_ADD_MASSAGE, ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES,
    ASYNC_GET_MASSAGES_USER,
    ASYNC_GET_USERS_WHO_HAVE_MESSAGES,
    getMassagesUserAction,
    getUsersWhoHaveMassagesAction, changeUsersWhoHaveMassagesAction} from "../store/messageReducer";
import {AsyncSetShowMassageAction} from "../store/overReducer";




function* setUsersWhoHaveMassagesWorker({payload}) {
    try {
        const responce = yield messagesAPI.getUsersWhoHaveMassages(payload)
        yield put (getUsersWhoHaveMassagesAction(responce))
    } catch (error) {
        const massageError = error.response.data.massage
        yield  put(AsyncSetShowMassageAction(massageError))
    }
}

function* changeUsersWhoHaveMassagesWorker({payload}) {
    try {
        yield put (changeUsersWhoHaveMassagesAction(payload))
    } catch (error) {
        const massageError = error.response.data.massage
        yield  put(AsyncSetShowMassageAction(massageError))
    }
}

function* getMassagesUserWorker({payload}) {
    try {
        const responce = yield messagesAPI.getMassages(payload)
        yield put (getMassagesUserAction(responce))
    } catch (error) {
        const massageError = error.response.data.massage
        yield  put(AsyncSetShowMassageAction(massageError))
    }
}

function* addMassageWorker({payload}) {
    try {
        const responce = yield messagesAPI.addMassage(payload)
        yield put (addMassageActionCreator(payload))
    } catch (error) {
        const massageError = error.response.data.massage
        yield  put(AsyncSetShowMassageAction(massageError))
    }
}



export function* messagesWatcher() {
    yield takeEvery(ASYNC_GET_USERS_WHO_HAVE_MESSAGES, setUsersWhoHaveMassagesWorker)
    yield takeEvery(ASYNC_GET_MASSAGES_USER, getMassagesUserWorker)
    yield takeEvery(ASYNC_ADD_MASSAGE, addMassageWorker)
    yield takeEvery(ASYNC_CHANGE_USERS_WHO_HAVE_MESSAGES, changeUsersWhoHaveMassagesWorker)

}