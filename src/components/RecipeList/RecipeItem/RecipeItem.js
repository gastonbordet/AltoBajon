import React from 'react';

import classes from './RecipeItem.module.css';

const recipeItem = props => {

    return (
        <li className={classes.RecipeItem} onClick={props.clicked}>
            {props.recipeName}
        </li>
    );
}

export default recipeItem;