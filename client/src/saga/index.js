// для создания функции глобального WATCHER, которая следит за всеми watcher'ами

import { all } from "redux-saga/effects";
import { cashWatcher } from "./authSaga";


export function* rootWatcher() {
    yield all([cashWatcher()]);
}