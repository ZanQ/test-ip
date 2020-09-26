import * as ActionTypes from './ActionTypes'; 

export const IP = (state = {
        isLoading: true,
        errmessage: null,
        ip: []
    }, action) => {

    switch(action.type) {
        case ActionTypes.IP:
            console.log("IP is " + action.payload);
            return {...state, isLoading: false, errmessage: null, ip: action.payload};
        case ActionTypes.IP_LOADING:
            return {...state, isLoading: true, errmessage: null, ip: []};
        case ActionTypes.IP_FAILED:
             return {...state, isLoading: false, errmessage: action.payload, ip: []};
        default: 
            return state;
    }
}