import Footer from './Footer';
import AddTodo from './AddTodo';
import VisibleTodoList from './TodoList';
import React from 'react';

const App = ({ params }) => (
	<div>
		<h1>To-Do</h1>
		<AddTodo />
		<VisibleTodoList filter={params.filter || 'all'} />
		<Footer />
	</div>
);
export default App;