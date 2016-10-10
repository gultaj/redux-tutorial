import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import configureStore from './configureStore';

if (module.hot) module.hot.accept();

const store = configureStore();

render(
	<Root store={store} />,
	document.getElementById('root')
);