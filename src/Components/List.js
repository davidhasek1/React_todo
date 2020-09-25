import React from 'react';
import './List.css';

const List = (props) => {
	return (
		<li className="listItem" onClick={props.delete}>
			
			{props.title}
		</li>
	);
};

export default List;
