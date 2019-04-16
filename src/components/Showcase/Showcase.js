import React from 'react';


import RecipePreview from '../RecipePreview/RecipePreview';
import classes from './Showcase.module.css';

const showcase = props => {


    const recipes = props.data.map((elem, index) => {
        if (index >= props.controlPrev && index < props.controlNext) {
            return <RecipePreview 
                key={index} 
                title={elem.recipe.label} 
                url={elem.recipe.image} 
                clicked={() => props.wantedRecipe(index)}/>
        } else {
            return null;
        }
    });

    return (
        <div className={classes.Showcase}>
            {recipes}
        </div>
    );
}

export default showcase;