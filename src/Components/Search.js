import React, { useEffect, useState, useRef } from 'react';

const Search = (props) => {
	const { onLoadTodos, errorMsg } = props;
	const [ enteredFilter, setEnteredFilter ] = useState('');
	const inputRef = useRef();

	useEffect(
		() => {
			const timer = setTimeout(() => {
				if (enteredFilter === inputRef.current.value) {
					const query = enteredFilter.length === 0 ? '' : `?filter=${enteredFilter}`;
					console.log('jedem');
					console.log(enteredFilter);
					const apiData = async () => {
						try {
							const res = await fetch('http://localhost:8080/todos' + query);
							const resData = await res.json();
							//setIsLoading(false);
							const data = [];
							for (const key in resData) {
								data.push({
									id: resData[key]._id,
									title: resData[key].todo
								});
							}
							onLoadTodos(data, data.length); //props
						} catch (error) {
							errorMsg('Fail to load data');
							
						}
					};
					apiData();
				}
			}, 500);
			return () => {
				clearTimeout(timer); //clean up funkce- nejprve vyčistí předchozí timer ještě před tím než se provede set timeout nový - snižuje to zahlcenost paměti timery - Dobrý to dělat!
			};
		},
		[ enteredFilter, onLoadTodos, inputRef, errorMsg ]
	);
	return (
		<div className="Search">
			<label>Search in todos</label>
			<input
				type="text"
				value={enteredFilter}
				onChange={(e) => setEnteredFilter(e.target.value)}
				ref={inputRef}
			/>
		</div>
	);
};

export default Search;
