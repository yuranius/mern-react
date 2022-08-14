export const  ASYNC_GET_INTERLOCUTORS = 'ASYNC_GET_INTERLOCUTORS'
const GET_INTERLOCUTORS = 'GET_INTERLOCUTORS'
// const GET_INTERLOCUTORS_ERROR = 'GET_INTERLOCUTORS_ERROR'

export const  ASYNC_GET_ALL_INTERLOCUTORS = 'ASYNC_GET_ALL_INTERLOCUTORS'
const GET_ALL_INTERLOCUTORS = 'GET_ALL_INTERLOCUTORS'

export const ASYNC_ADD_FRIEND = 'ASYNC_ADD_FRIEND'
const ADD_FRIEND = 'ADD_FRIEND'

export const ASYNC_DELETE_FRIEND = 'ASYNC_DELETE_FRIEND'
const DELETE_FRIEND = 'DELETE_FRIEND'



const defaultState = {
    collocuters: [],
    userId: null,
    pageNumber: 1,
    pageSize: 10,
    totalUsers: 0,
    totalPages: 0,
};

export const collocutorsReducer = (state = defaultState, action) => {
       switch (action.type) {
           case GET_ALL_INTERLOCUTORS:
               return {...state, ...action.payload};
           case GET_INTERLOCUTORS:
               return {...state, ...action.payload};
           case ADD_FRIEND:
               return {...state,
                   collocuters: state.collocuters.map( c => {
                       if (c.id === action.payload.friendId) {
                           return {...c, friend: true}
                       }
                       return c;
                   })
               }
           case DELETE_FRIEND:

               return {...state,
                   collocuters: state.collocuters.map( c => {
                       if (c.id === action.payload.friendId) {
                           return {...c, friend: false}
                       }
                       return c;
                   })}
        default:
            return state;
    }
};



export const getCollocuters = (payload) => ({type: GET_INTERLOCUTORS, payload})
// export const getCollocutorsError = () => ({type: GET_INTERLOCUTORS_ERROR})
export const AsyncGetCollocutorsAction = (payload) => ({type: ASYNC_GET_INTERLOCUTORS, payload})

export const getAllCollocuters = (payload) => ({type: GET_ALL_INTERLOCUTORS, payload})
export const AsyncGetAllCollocutersAction = (payload) => ({type: ASYNC_GET_ALL_INTERLOCUTORS, payload})

export const addFriend = (payload) => ({type:ADD_FRIEND, payload})
export const AsyncAddFriendAction = (payload) => ({type: ASYNC_ADD_FRIEND,payload})

export const deleteFriend = (payload) => ({type:DELETE_FRIEND, payload})
export const AsyncDeleteFriendAction = (payload) => ({type: ASYNC_DELETE_FRIEND,payload})

