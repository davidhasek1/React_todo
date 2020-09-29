import React, {useEffect, useState} from 'react';


const Search = (props) => {

    const {onLoadTodos} = props;
    const [enteredFilter, setEnteredFilter] = useState('');

    

    useEffect(() => {
        const query = enteredFilter.length === 0 ? '' : `?filter=${enteredFilter}`
        console.log('jedem');
        console.log(enteredFilter);
        const apiData = async () => {
            try {
                const res = await fetch('http://localhost:8080/todos'+query);
                const resData = await res.json();
                const data=[];
                for(const key in resData){
                    data.push({
                        id: resData[key]._id,
                        title: resData[key].todo
                    });
                }
                onLoadTodos(data, data.length); //props

            } catch (error) {
               console.log(error); 
            }
        }
        apiData();       
    }, [enteredFilter, onLoadTodos])
    return (
        <div className="Search">
            <label>Search in todos</label>
            <input type="text" value={enteredFilter} onChange={(e) => setEnteredFilter(e.target.value)} />
        </div>
    );
}

export default Search;
 /* fetch('http://localhost:8080/todos'+query)
			.then((res) => {
                console.log('fetched search!');
                //console.log(res);
				return res.json();
			})
			.then((resData) => {
                //console.log(resData);
                const data = [];
                for(const key in resData) {
                    data.push({
                        id: resData[key]._id,
                        title: resData[key].todo
                    });
                }
                console.log(data);
                onLoadTodos(data,data.length);
                
				//setInputArray(resData);
				//setCounter(resData.length); 
			})
			.catch((err) => console.log(err)); */