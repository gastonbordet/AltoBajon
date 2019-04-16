import React from 'react';

//import classes from './Input.module.css';

const input = props => {
    return (
        <input 
            type="text" 
            id="query" 
            name="query" 
            placeholder="Enter search" 
            onChange={props.changed}/>
    );
}

export default input;