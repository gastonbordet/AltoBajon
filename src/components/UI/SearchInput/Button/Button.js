import React from 'react';

import classes from './Button.module.css';

const button = props => {
    return (
        <input 
            type="button"
            name="search" 
            className={classes.Button} 
            value={props.children}
            onClick={props.clicked}></input>
    )
}

export default button;