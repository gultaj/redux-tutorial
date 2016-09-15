import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import App from './components/App';
import todoApp from './reducers';

if (module.hot) module.hot.accept();

const initialState = {
	todos: [{
		id: '0',
		text: 'Learn Redux',
		completed: false
	}],
	visibilityFilter: undefined
};

const store = createStore(todoApp, initialState);

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);