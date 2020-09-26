import { createStore, combineReducers, applyMiddleware } from 'redux';
import { IP } from './ClientIP';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            ip: IP
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}