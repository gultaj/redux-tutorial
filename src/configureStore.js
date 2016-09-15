import todoApp from './reducers/';
import { loadState, saveState } from './utils/localStorage';
import { createStore } from 'redux';

const configureStore = () => {
    const initialState = loadState();

    const store = createStore(todoApp, initialState);

    store.subscribe(() => {
        saveState({
            todos: store.getState().todos
        });
    });
    return store;
};

export default configureStore;