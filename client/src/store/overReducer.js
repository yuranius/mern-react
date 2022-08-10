const LOADING_PROCESS = 'LOADING_PROCESS'
const SHOW_MASSAGE = 'SHOW_MASSAGE'
export const ASYNC_SET_SHOW_MASSAGE = 'ASYNC_SET_SHOW_MASSAGE'

const defaultState = {
    massage: '',
    loading: false,
};

export const overReducer = (state = defaultState, action) => {
       switch (action.type) {
           case SHOW_MASSAGE:
               return {...state, massage: action.payload};
           case LOADING_PROCESS:
               return {...state, loading: action.payload}
       default:
           return state;
    }
};


export const setLoadingProcessAction = (payload) => ({type: LOADING_PROCESS, payload})
export const setShowMassageAction = (payload) => ({type: SHOW_MASSAGE, payload})
export const AsyncSetShowMassageAction = (payload) => ({type: ASYNC_SET_SHOW_MASSAGE, payload})



