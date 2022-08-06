export const  ASYNC_GET_INTERLOCUTORS = 'ASYNC_GET_INTERLOCUTORS'
const GET_INTERLOCUTORS = 'GET_INTERLOCUTORS'
const GET_INTERLOCUTORS_ERROR = 'GET_INTERLOCUTORS_ERROR'

const defaultState = {
    collocutors: [],
};

export const collocutorsReducer = (state = defaultState, action) => {
       switch (action.type) {
           case GET_INTERLOCUTORS:
               return {...state, ...action.payload, massage: action.payload.massage};
           case GET_INTERLOCUTORS_ERROR:
               return {...state, massage: 'Совпадений не найдено!'}
        default:
            return state;
    }
};



export const getCollocutors = (payload) => ({type: GET_INTERLOCUTORS, payload})
export const getCollocutorsError = () => ({type: GET_INTERLOCUTORS_ERROR})
export const AsyncGetCollocutorsAction = (payload) => ({type: ASYNC_GET_INTERLOCUTORS, payload})

