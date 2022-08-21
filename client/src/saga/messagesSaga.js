import {put, takeEvery} from 'redux-saga/effects'
import {messagesAPI} from "../api/api";
import {ASYNC_GET_USERS_WHO_HAVE_MESSAGES, getUsersWhoHaveMassagesAction} from "../store/messageReducer";




function* setUsersWhoHaveMassagesWorker({payload}) {
    try {
        console.log( '📌:','sdfsf','🌴 🏁')

        const responce = yield messagesAPI.getUsersWhoHaveMassages(payload)
        console.log( '📌:',responce,'🌴 🏁')


    } catch (error) {
        const massageError = error.response.data.massage


    }

}



export function* messagesWatcher() {
    yield takeEvery(ASYNC_GET_USERS_WHO_HAVE_MESSAGES, setUsersWhoHaveMassagesWorker)

}