import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then( response => {
        if(response.ok) {
            return response;
        } else {
            var error = new Error('Error: '+response.status+" , "+response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('Post comments ', error.message);
alert('Your comment could not be posted');})
    
}

export const fetchDishes = () => (dispatch)  => {
    dispatch(dishesLoading(true));

    fetch(baseUrl+'dishes')
    .then( response => {
        if(response.ok) {
            return response;
        } else {
            var error = new Error('Error: '+response.status+" , "+response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then( response => response.json())
    .then( dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmsg) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmsg,
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchComments = () => (dispatch)  => {

    fetch(baseUrl+'comments')
    .then( response => {
        if(response.ok) {
            return response;
        } else {
            var error = new Error('Error: '+response.status+" , "+response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then( response => response.json())
    .then( comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
}

export const commentsFailed = (errmsg) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmsg,
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
})

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const fetchPromos = () => (dispatch)  => {
    dispatch(promosLoading(true));

    fetch(baseUrl+'promotions')
    .then( response => {
        if(response.ok) {
            return response;
        } else {
            var error = new Error('Error: '+response.status+" , "+response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then( response => response.json())
    .then( promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

export const promosFailed = (errmsg) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmsg,
})

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos,
})

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
})

export const fetchLeaders = () => (dispatch) => {
    fetch(baseUrl + 'leaders')
    .then( response => {
        if(response.ok) {
            return response;
        } else {
            var error = new Error('Error: '+response.status+" , "+response.statusText);
            error.response = response;
            throw error;          
        }
    },
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then( response => response.json())
    .then( leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders,
})

export const leadersFailed = (errMsg) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMsg,
})

export const postFeedback = (values) => (dispatch) => {

    const newFeedback = {
        firstname: values['firstname'],
        lastname: values.lastname,
        telnum: values.telnum,
        email: values.email,
        agree: values.agree,
        contactType: values.contactType,
        message: values.message
    };
    newFeedback.date = new Date().toISOString();

    console.log(newFeedback);

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then( response => {
        if(response.ok) {
            return response;
        } else {
            var error = new Error('Error: '+response.status+" , "+response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMsg = new Error(error.message);
        throw errMsg;
    })
    .then(response => response.json())
    .then(response => alert('Thanks for feedback!'+JSON.stringify(response)))
    .catch(error => { console.log('Post feedback ', error.message);
alert('Your feedback could not be posted');})
}