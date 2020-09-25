import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Form from './Components/Form';
import List from './Components/List';

const App = (props) => {
	const [ inputArray, setInputArray ] = useState([]);
	const [ counter, setCounter ] = useState(0);

	//...addto list handler funkce
	const addToList = (inputData) => {
		setInputArray((prevInput) => [ { ...inputData }, ...prevInput ]);
		setCounter(1 + counter);
		console.log(counter);
	};
	const deleteTodo = (todoIndex) => {
		const todos = [ ...inputArray ]; //kopie array
		todos.splice(todoIndex, 1); //todo index z map()
		setInputArray(todos); //set updated data
		setCounter(counter - 1);
	};

	let listData = inputArray.map((data, idx) => {
		//použít index je nahovno ale id math random hasej chybu při submitu jednoho inputu 2x
		return (
			<List
				key={idx}
				/* i={idx}  */ title={data.title}
				delete={() => {deleteTodo(idx);}}
			/>
		);
	});

	//addTodo bude přidatvat tady item do pole^
	return (
		<div className="App">
			<Header />
			<Form addTodo={addToList} />

			<p>
				{' '}
				Tasks to do: <strong>{counter}</strong>
			</p>
			<ul>{listData}</ul>
		</div>
	);
};

export default App;

//componenta input
//componenta list
