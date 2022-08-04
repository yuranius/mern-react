const ADD_CASH = "ADD_CASH";
const GET_CASH = "GET_CASH";
const INCREMENT_CASH = "INCREMENT_CASH"
const DECREMENT_CASH = "DECREMENT_CASH"
export const ASYNC_INCREMENT_CASH = 'ASYNC_INCREMENT_CASH'
export const ASYNC_DECREMENT_CASH = 'ASYNC_DECREMENT_CASH'

export const  ASYNC_SET_USER_DATA = 'ASYNC_SET_USER_DATA'
const SET_USER_DATA = 'SET_USER_DATA'

function noop () {}

const defaultState = {
    token: null,
    userId: null,
    avatar: null,
    login: noop,
    logout: noop,
    isLogin: noop,
    isAuthenticated: false,
    userLogin: ''// null
};


export const authReducer = (state = defaultState, action) => {
       switch (action.type) {
           case SET_USER_DATA:
               return {...state, ...action.payload};
        default:
            return state;
    }
};

export const setUserData = (payload) => ({type: SET_USER_DATA, payload})
export const AsyncSetUserDataAction = (payload) => ({type: ASYNC_SET_USER_DATA, payload})



export const addCashAction = (payload) => ({type: ADD_CASH, payload})
export const getCashAction = (payload) => ({type: GET_CASH, payload})
export const incrementCashAction = () => ({type: INCREMENT_CASH})
export const AsyncIncrementCashAction = () => ({type: ASYNC_INCREMENT_CASH})
export const decrementCashAction = () => ({type: DECREMENT_CASH})
export const AsyncDecrementCashAction = () => ({type: ASYNC_DECREMENT_CASH})