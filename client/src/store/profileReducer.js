export const  ASYNC_CHANGE_LOGIN_USER = 'ASYNC_CHANGE_LOGIN_USER'
const CHANGE_LOGIN_USER = 'CHANGE_LOGIN_USER'


const defaultState = {
    userId: null,
    userLogin: '',
};


export const profileReducer = (state = defaultState, action) => {
       switch (action.type) {
           case CHANGE_LOGIN_USER:
               return {...state, ...action.payload};
        default:
            return state;
    }
};


export const changeLoginUser = (payload) => ({type: CHANGE_LOGIN_USER, payload})
export const AsyncChangeLoginUserAction = (payload) => ({type: ASYNC_CHANGE_LOGIN_USER, payload})

