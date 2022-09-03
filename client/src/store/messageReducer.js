
let initialState = {
    collocuters: [],
    messages:[],
}

const ADD_MASSAGE = 'ADD_MASSAGE'
export const ASYNC_ADD_MASSAGE = 'ASYNC_ADD_MASSAGE'

const GET_USERS_WHO_HAVE_MESSAGES = 'GET_USERS_WHO_HAVE_MESSAGES'
export const ASYNC_GET_USERS_WHO_HAVE_MESSAGES = 'ASYNC_GET_USERS_WHO_HAVE_MESSAGES'

const GET_MASSAGES_USER = 'GET_MASSAGES_USER'
export const ASYNC_GET_MASSAGES_USER = 'ASYNC_GET_MASSAGES_USER'


export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MASSAGE:{
            let lastMassageId = state.messages.slice(-1)[0].id; // получем ID последнего сообщения
            let newMassage = {
                id: lastMassageId + 1,
                content: action.payload.message,
                login: action.payload.login,
                created_at: action.payload.created_at,
                user_from_id: action.payload.userFromId
            };
            return {
                ...state,
                messages:[...state.messages, newMassage],
            };
        }

        case GET_USERS_WHO_HAVE_MESSAGES:
            return {
                ...state,
                collocuters: action.payload
            }
        case GET_MASSAGES_USER:
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
    }
};



export let addMassageActionCreator = (payload) => ({type: ADD_MASSAGE, payload});
export const AsyncAddMassageActionCreator = (payload) => ({type: ASYNC_ADD_MASSAGE, payload})

export const getUsersWhoHaveMassagesAction = (payload) => ({type:GET_USERS_WHO_HAVE_MESSAGES, payload});
export const AsyncGetUsersWhoHaveMassagesAction = (payload) => ({type:ASYNC_GET_USERS_WHO_HAVE_MESSAGES, payload});

export const getMassagesUserAction = (payload) => ({type:GET_MASSAGES_USER, payload});
export const AsyncGetMassagesUserAction = (payload) => ({type:ASYNC_GET_MASSAGES_USER, payload});


