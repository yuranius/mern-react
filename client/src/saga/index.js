import { all } from "redux-saga/effects";
import { userWatcher } from "./authSaga";
import {collocutorsWatcher} from "./collocutorsSaga";
import {profileWatcher} from "./profileSaga";
import {overWatcher} from "./overSaga";


export function* rootWatcher() {
    yield all([
        userWatcher(),
        collocutorsWatcher(),
        profileWatcher(),
        overWatcher(),
    ]);
}