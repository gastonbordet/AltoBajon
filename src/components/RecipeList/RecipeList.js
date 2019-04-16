import React from 'react';

import RecipeItem from './RecipeItem/RecipeItem';
import classes from './RecipeList.module.css';

const recipeList = props => {

    const itemList = props.recipes.map((elem, index) => {
        return <RecipeItem  key={index} recipeName={elem.recipe.label} clicked={() => props.wantedRecipe(index)}/>
    });

    return (
        <ul className={classes.RecipeList}>
            {itemList}
        </ul>
    );
}

export default recipeList;