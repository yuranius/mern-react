export const  ASYNC_AUTH_USER = 'ASYNC_AUTH_USER'
const AUTH_USER = 'AUTH_USER'
export const  ASYNC_REGISTER_USER = 'ASYNC_REGISTER_USER'
// const REGISTER_USER = 'REGISTER_USER'
export const  ASYNC_LOGOUT_USER = 'ASYNC_LOGOUT_USER'
const LOGOUT_USER = 'LOGOUT_USER'

const LOADING_PROCESS = 'LOADING_PROCESS'

const SHOW_MASSAGE = 'SHOW_MASSAGE'

const defaultState = {
    email: null,
    password: null,
    token: null,
    userId: null,
    avatar: null,
    userLogin: '',
    massage: '',
    loading: false,

};


export const authReducer = (state = defaultState, action) => {
       switch (action.type) {
           case AUTH_USER:
               return {...state, ...action.payload};

           //case REGISTER_USER:
              //return {...state, ...action.payload};

           case LOGOUT_USER:
               return {...state, ...action.payload};

           case SHOW_MASSAGE:
               return {...state, massage: action.payload};

           case LOADING_PROCESS:
               return {...state, loading: action.payload}

        default:
            return state;
    }
};

export const setAuthUser = (payload) => ({type: AUTH_USER, payload})
export const AsyncSetAuthUserAction = (payload) => ({type: ASYNC_AUTH_USER, payload})
// export const setRegisterUser = (payload) => ({ type: REGISTER_USER})
export const AsyncSetRegisterUserAction = (payload) => ({type: ASYNC_REGISTER_USER, payload})



export const setLoadingProcessAction = (payload) => ({type: LOADING_PROCESS, payload})
export const setShowMassageAction = (payload) => ({type: SHOW_MASSAGE, payload})

export const logoutUser = (payload) => ({type: LOGOUT_USER, payload})
export const AsyncLogoutUserAction = (payload) => ({type: ASYNC_LOGOUT_USER, payload})

