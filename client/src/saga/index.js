import { all } from "redux-saga/effects";
import { userWatcher } from "./authSaga";
import {collocutorsWatcher} from "./collocutorsSaga";


export function* rootWatcher() {
    yield all([userWatcher(), collocutorsWatcher()]);
}