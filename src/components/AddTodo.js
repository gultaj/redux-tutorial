import { connect } from 'react-redux';
import { addTodo } from '../actions';
import React, { Component } from 'react';

@connect()
export default class AddTodo extends Component {
	_handleActionAddTodo() {
		const { dispatch } = this.props;
		const text = this.refs.text.value.trim();
		if (text.length) {
			dispatch(addTodo(text));
		}
		this.refs.text.value = '';
	}

	render() {
		let input;
		const {dispatch} = this.props; 
		return (
			<div>
				<input type='text' ref='text' />
				<button onClick={::this._handleActionAddTodo}>Add</button>
			</div>
		);
	}
}
