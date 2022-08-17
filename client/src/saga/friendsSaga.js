import {put,takeEvery} from 'redux-saga/effects'
import {friendsAPI} from "../api/api";
import {
    ASYNC_DEL_FRIEND,
    ASYNC_GET_FRIENDS,
    delFriendAction,
    getFriendsAction
} from "../store/friendsReducer";
import {AsyncSetShowMassageAction, setLoadingProcessAction} from "../store/overReducer";



function* getFriendsWorker({payload}) {
    try {
        yield put(setLoadingProcessAction(true))
        const {friends} = yield friendsAPI.getFriends(payload)
        yield put(getFriendsAction(friends))
        yield put(setLoadingProcessAction(false))
    } catch (error) {
        yield put(setLoadingProcessAction(false))
        yield put(AsyncSetShowMassageAction(error.response.data.massage))
    }
}

function* delFriendWorker({payload}){
    try {
        const response = yield friendsAPI.deleteFriend(payload)
        yield put (delFriendAction(payload.friendId))
        yield put (AsyncSetShowMassageAction(response.massage))
    } catch (error) {
        yield put(AsyncSetShowMassageAction(error.response.data.massage))
    }
}



export function* friendsWatcher() {
    yield takeEvery(ASYNC_GET_FRIENDS, getFriendsWorker)
    yield takeEvery(ASYNC_DEL_FRIEND, delFriendWorker)
}