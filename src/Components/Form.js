//input button a handluju data z formu -> jednoduchý string ->use state
import React, { useState } from 'react';
import './Form.css';
import LoadingIndicator from './LoadingIndicator';


const Form = (props) => {
    const [input, setInput] = useState({title: ''});
    
    const submitFrom = (e) => {
        e.preventDefault();
        props.addTodo(input);   //add todo vola funkci z app.js a ma parametr input ze stateu
    }
    return (
        <div className="Form">
            {props.loading ? <LoadingIndicator/> : null } 
            <form onSubmit={submitFrom}>
            <input type="text" name="title"
            value={input.title} 
            onChange={e => setInput({title: e.target.value })}/>
            <button type="submit">Add todo!</button>
            </form>
            
        </div>
    );
} 

export default Form;