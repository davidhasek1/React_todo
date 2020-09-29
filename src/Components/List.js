import React from 'react';
import './List.css';
import DeleteBtn from './DeleteItemBtn';

const List = (props) => {

	const deleteAction = (id) => {
		console.log(id);
		props.deleteItem(id);
	}
	return (
		<li className="listItem">
			{props.title}
			{props.id}
			<DeleteBtn deleteTodo={deleteAction} />
		</li>
	);
};

export default List;
