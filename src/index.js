import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import todoApp from './reducers';
import { loadState, saveState } from './utils/localStorage';

if (module.hot) module.hot.accept();

const initialState = loadState();

const store = createStore(todoApp, initialState);

store.subscribe(() => {
	saveState({
		todos: store.getState().todos
	});
});

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);