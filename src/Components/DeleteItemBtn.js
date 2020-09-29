import React, { useState } from 'react';


const DeleteBtn = (props) => {

    const [id, setId] = useState('');
    
    const submitDelete = (e) => {
        //e.preventDefault();
        props.deleteTodo(id);
    } 
    return (
        <form onSubmit={submitDelete}>
            <input 
            type="hidden" 
            name="deleteID"
            value={id} 
            onChange={(e) => setId(e.target.value)}/>
            <button type="submit" >Delete</button>
        </form>
        
    );
}


export default DeleteBtn;