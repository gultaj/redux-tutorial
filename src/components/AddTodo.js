import { connect } from 'react-redux';
import { actionAddTodo } from '../actions';
import React, { Component } from 'react';

@connect()
export default class AddTodo extends Component {
	render() {
		let input;
		const {dispatch} = this.props; 
		return (
			<div>
				<input type='text' ref={node => input = node} />
				<button onClick={() => {
					dispatch(actionAddTodo(input.value));
					input.value = '';
				}}>Add</button>
			</div>
		);
	}
}
