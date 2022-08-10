export const  ASYNC_GET_INTERLOCUTORS = 'ASYNC_GET_INTERLOCUTORS'
const GET_INTERLOCUTORS = 'GET_INTERLOCUTORS'
// const GET_INTERLOCUTORS_ERROR = 'GET_INTERLOCUTORS_ERROR'

export const  ASYNC_GET_ALL_INTERLOCUTORS = 'ASYNC_GET_ALL_INTERLOCUTORS'
const GET_ALL_INTERLOCUTORS = 'GET_ALL_INTERLOCUTORS'

const defaultState = {
    collocuters: [],
    pageNumber: 1,
    pageSize: 10
};

export const collocutorsReducer = (state = defaultState, action) => {
       switch (action.type) {
           case GET_ALL_INTERLOCUTORS:
               return {...state, ...action.payload};
           case GET_INTERLOCUTORS:
               return {...state, ...action.payload};
           // case GET_INTERLOCUTORS_ERROR:
           //     return {...state, massage: 'Совпадений не найдено!'}
        default:
            return state;
    }
};



export const getCollocuters = (payload) => ({type: GET_INTERLOCUTORS, payload})
// export const getCollocutorsError = () => ({type: GET_INTERLOCUTORS_ERROR})
export const AsyncGetCollocutorsAction = (payload) => ({type: ASYNC_GET_INTERLOCUTORS, payload})

export const getAllCollocuters = (payload) => ({type: GET_ALL_INTERLOCUTORS, payload})
export const AsyncGetAllCollocutersAction = (payload) => ({type: ASYNC_GET_ALL_INTERLOCUTORS, payload})


