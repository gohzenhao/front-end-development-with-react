import * as actionTypes from './ActionTypes';

export const Comments = (state = {
    errMsg: null,
    comments: [],
}, action) => {
    switch(action.type) {
        case actionTypes.ADD_COMMENT:
            var comment = action.payload;
            return {...state, comments: state.comments.concat(comment)}

        case actionTypes.ADD_COMMENTS:
                return {...state, isLoading: false, errMsg: null, comments: action.payload};

        case actionTypes.COMMENTS_FAILED:
                return {...state, isLoading: false, errMsg: action.payload, comments: []};

        default:
            return state;
    }
}