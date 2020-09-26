import * as ActionTypes from './ActionTypes';
import * as URLs from '../network/baseURL';
import axios from 'axios';

//Login - SplashScreen Redux 
export const ipLoading = () => ({

    type: ActionTypes.IP_LOADING
});

export const ipFailed = (errmessage) => ({

    type:ActionTypes.IP_FAILED,
    payload: errmessage
})

export const ipSuccess = (user) => ({

        type: ActionTypes.IP,
        payload: user
});

async function getIP () {

    let ipresponse = await axios.get(URLs.ipurl)
        .catch(errors => console.log(errors));
    let ip = await ipresponse.data;

    return await ip;
}

export const fetchIP = () => (dispatch) => {

        dispatch(ipLoading(true));

        getIP()
        .then((data) => {

                dispatch(getIP(data));
        })
        .catch(error => {
                dispatch(ipFailed(error.message))
        });
}