import React from 'react';

import classes from './ResultsButton.module.css';

const resultButton = props => {
    return (
        <button 
            className={classes.ResultsButton} 
            name="ResultButton" 
            onClick={()=>props.clicked(props.value)}
            disabled={!props.enable}>{props.children}</button>
        /*<input 
            type="button" 
            name="resultsButton" value={props.value} onClick={() => props.clicked(props.value)}/>*/
    );
} 

export default resultButton;
