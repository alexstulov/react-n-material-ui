import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';

const logMiddleware = ({getState}: any) => (next: any) => (action: any) => {
    console.log(action.type, getState());
    return next(action);
}

const stringMiddleware = () => (next: any) => (action: any) => {
    if (typeof action === 'string') {
        return next({
            type: action
        });
    }
    return next(action);
}

const store = createStore(reducer, applyMiddleware(
    thunkMiddleware,
    stringMiddleware,
    logMiddleware
));

// This is the way you may pass action with stringMiddleware
// store.dispatch('HELLO_WORLD');

const delayedActionCreator = (timeout: number) => (dispatch: any) => {
    console.log('delayedActionCreator executed');
    setTimeout(() => dispatch({
        type: 'DELAYED_ACTION'
    }), timeout);
};

// store.dispatch(delayedActionCreator(3000));

export default store;