import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputclasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputclasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input 
                className={inputclasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />
            break;
        case 'textarea':
            inputElement = <textarea 
                className={inputclasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed} />
            break;
        case 'select':
            inputElement = (
                <select 
                    className={inputclasses.join(' ')}
                    value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option 
                            key={option.value} 
                            value={option.value}
                            onChange={props.changed} >
                                {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
                className={inputclasses.join(' ')} 
                {...props.elemetConfig} 
                value={props.value}
                onChange={props.changed} 
                placeholder={props.placeholder}/>
            break;
    }
    
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p>Please enter a valid value!</p>
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;