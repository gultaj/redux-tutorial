import { connect } from 'react-redux';
import * as actions from '../actions';
import { getVisibilityTodos, getIsFetching }  from '../utils/functions';
import React, { Component } from 'react';

const Todo = ({onClick, completed, text}) => (
	<li className={completed ? 'todo-completed' : ''}
		data-id={1}
		onClick={onClick}>{text}
	</li>
);

@connect(
	(state, {filter = 'all'}) => ({
		todos: getVisibilityTodos(state, filter),
		isFetching: getIsFetching(state, filter),
		filter
	}),
	actions
)
export default class TodoList extends Component {
	fetchData() {
		const { filter, requestTodos, fetchTodos } = this.props;
		requestTodos(filter);
		fetchTodos(filter);
	}
	componentDidMount() {
		this.fetchData();
	}
	componentDidUpdate(prevProps) {
		if (this.props.filter !== prevProps.filter) {
			this.fetchData();
		}
	}
	render() {
		const {todos, toggleTodo, isFetching} = this.props;
		if (isFetching && !todos.length) {
			return <p>Loading...</p>;
		}
		return (
			<ul className='todo-list'>
				{todos.map(todo => <Todo key={todo.id} onClick={() => toggleTodo(todo.id) } {...todo} />) }
			</ul>
		);
	}
}