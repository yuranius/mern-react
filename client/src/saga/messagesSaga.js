import {put, takeEvery} from 'redux-saga/effects'
import {messagesAPI} from "../api/api";
import {
    ASYNC_GET_USERS_WHO_HAVE_MESSAGES,
    AsyncGetUsersWhoHaveMassagesAction,
    getUsersWhoHaveMassagesAction
} from "../store/messageReducer";
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



export function* messagesWatcher() {
    yield takeEvery(ASYNC_GET_USERS_WHO_HAVE_MESSAGES, setUsersWhoHaveMassagesWorker)

}