import React from 'react';

import classes from './RecipePreview.module.css';

const recipePreview = props => {
    return (
        <div className={classes.RecipePreview}>
            <img src={props.url} alt="recipe" onClick={props.clicked}></img>
            
            {/*<div className={classes.Title}>
                <h3>{props.title}</h3>
            </div>*/}
        </div>
    );
}

export default recipePreview;