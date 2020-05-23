import { LEADERS_FAILED, LEADERS_LOADING, ADD_LEADERS } from './ActionTypes';

export const Leaders = (state = {
    isLoading: true,
    leaders: [],
    errMsg: null,
}, action) => {
    switch(action.type) {
        case ADD_LEADERS:
            return {...state, isLoading: false, leaders: action.payload, errMsg: null};
        case LEADERS_FAILED:
            return {...state, isLoading: false, leaders: [], errMsg: action.payload};
        case LEADERS_LOADING:
            return {...state, isLoading: true, leaders: [], errMsg: []}
        default:
            return state;
    }
}