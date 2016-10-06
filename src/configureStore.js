import todoApp from './reducers/';
import { loadState, saveState } from './utils/localStorage';
import { createStore } from 'redux';

const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    return (action) => {
       
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    }
};

const configureStore = () => {
    const initialState = loadState();

    const store = createStore(todoApp, initialState);
    
    if (process.env.NODE_ENV !== 'production') { 
        store.dispatch = addLoggingToDispatch(store);
    }

    store.subscribe(() => {
        saveState({
            todos: store.getState().todos
        });
    });
    return store;
};

export default configureStore;