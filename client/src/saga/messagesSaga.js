import {put, takeEvery} from 'redux-saga/effects'
import {messagesAPI} from "../api/api";
import {
    addMassageActionCreator,
    ASYNC_ADD_MASSAGE,
    ASYNC_GET_MASSAGES_USER,
    ASYNC_GET_USERS_WHO_HAVE_MESSAGES, AsyncGetMassagesUserAction,
    AsyncGetUsersWhoHaveMassagesAction, getMassagesUserAction,
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
        console.log( '📌:',payload,'🌴 🏁')
        
        //const responce = yield messagesAPI.addMassage(payload)

        //console.log( '📌:',responce,'🌴 🏁')

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

}