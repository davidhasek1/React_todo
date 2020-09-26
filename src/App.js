import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Form from './Components/Form';
import List from './Components/List';

const App = (props) => {
	const [ inputArray, setInputArray ] = useState([]);
	const [ counter, setCounter ] = useState(0);

	//...addto list handler funkce
	const addToList = async (inputData) => {
		try {
			const api = await fetch('http://localhost:8080/post-todo', {
				method: 'POST',
				body: JSON.stringify(inputData), //parametr fce -  to co jde z form.js tedy input určen k uložení do ple resp. do DB
				headers: {
					'Content-Type': 'application/json'
				}
			});
			await api.json();
			setInputArray((prevInput) => [ { ...inputData }, ...prevInput ]);
			setCounter(1 + counter);
			console.log(counter);
		} catch (error) {
			console.warn('fail to fetch backend');
		}
	};
	const deleteTodo = (todoIndex) => {
		//
		const todos = [ ...inputArray ]; //kopie array
		todos.splice(todoIndex, 1); //todo index z map()
		setInputArray(todos); //set updated data
		setCounter(counter - 1);
	};

	// JAk použít async await , když use affect nemuže pobrat async postfix????
	useEffect(() => {
		fetch('http://localhost:8080/todos')
			.then((res) => {
				console.log('fetched !');
				return res.json();
			})
			.then((resData) => {
				setInputArray(resData);
				setCounter(resData.length);
			})
			.catch((err) => console.log(err));
	}, []);

	let listData = inputArray.map((data, idx) => {
		//použít index je nahovno ale id math random hazej chybu při submitu jednoho inputu 2x
		return (
			<List
				key={data._id}
				/* i={idx}  */
				//id={data._id}
				title={data.todo}
				deleteItem={() => {
					deleteTodo(idx);
				}}
			/>
		);
	});

	
	//addTodo bude přidatvat tady item do pole^
	return (
		<div className="App">
			<Header />
			<Form addTodo={addToList} />

			<p>
				Tasks to do: <strong>{counter}</strong>
			</p>
			<ul>{listData}</ul>
		</div>
	);
};

export default App;
