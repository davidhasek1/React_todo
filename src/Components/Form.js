//input button a handluju data z formu -> jednoduchý string ->use state
import React, { useState } from 'react';

const Form = (props) => {

    const [input, setInput] = useState('');

    const submitFrom = (e) => {
        e.preventDefault();
        props.addTodo(input);   //add todo vola funkci z app.js a ma parametr input ze stateu
    }
    return (
        <div>
            <form onSubmit={submitFrom}>
            <input type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)}/>
            <button type="submit">Send</button>
            </form>
        </div>
    );
} 

export default Form;