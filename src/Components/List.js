import React from 'react';
import './List.css';
import DeleteBtn from './DeleteItemBtn';

const List = (props) => {

	const deleteAction = () => {
		props.deleteItem();
	}
	return (
		<li className="listItem">
			{props.title}
			<DeleteBtn delete={deleteAction} />
		</li>
	);
};

export default List;
