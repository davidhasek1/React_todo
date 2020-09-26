//input button a handluju data z formu -> jednoduchý string ->use state
import React, { useState } from 'react';
import './Form.css';

const Form = (props) => {
    const [input, setInput] = useState({id: '', title: ''});

    const submitFrom = (e) => {
        //e.preventDefault();
        props.addTodo(input);   //add todo vola funkci z app.js a ma parametr input ze stateu
    }
    return (
        <div className="Form">
            <form onSubmit={submitFrom}>
            <input type="text" name="title"
            value={input.title} 
            onChange={e => setInput({id: Math.random(), title: e.target.value })}/>
            <button type="submit">Send</button>
            </form>
        </div>
    );
} 

export default Form;