import { applyMiddleware, combineReducers,  createStore } from "redux";
import { authReducer } from "./authReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga";
import {collocutorsReducer} from "./collocutorsReducer";

const saga = createSagaMiddleware()

const rootReducer = combineReducers({
    user: authReducer,
    collocuters: collocutorsReducer,
})

const middleWares = [saga, thunk]

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)))

saga.run(rootWatcher)


window.store_info = store.getState(); // напиши в консоли "store_info" и получи текущее состояние store