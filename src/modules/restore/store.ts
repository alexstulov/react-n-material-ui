import { createStore, applyMiddleware, Action, Dispatch } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';
// import { Dispatch } from 'react';

const logMiddleware = () => (next: Dispatch<Action>) => (action: Action) => {
    return next(action);
}

const stringMiddleware = () => (next: Dispatch<Action>) => (action: Action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        });
    }
    return next(action);
}

//@ts-ignore
const store = createStore(reducer, applyMiddleware(
    thunkMiddleware,
    stringMiddleware,
    logMiddleware
));

// This is the way you may pass action with stringMiddleware
// store.dispatch('HELLO_WORLD');

const delayedActionCreator = (timeout: number) => (dispatch: Dispatch<Action>) => {
    // console.log('delayedActionCreator executed');
    setTimeout(() => dispatch({
        type: 'DELAYED_ACTION'
    }), timeout);
};

// store.dispatch(delayedActionCreator(3000));

export default store;