import React from 'react';

import classes from './FullRecipe.module.css';
import Button from '../UI/Buttons/Button/Button';

const fullRecipe = props => {

    const ingredients = props.recipe.ingredientLines.map((ing, index) => {
        return <li key={index}>{ing}</li>
    });

    // Check if that recipe is saved on the account 
    const recipeIsSaved = () => {
        let flag = false;
        props.savedRecipes.forEach(saved => {
            if (saved.recipe === props.recipe) {
                flag = true;
            }
        })
        return flag;
    }

    const button = recipeIsSaved() ? 
        <Button 
            btnType="Danger"
            disabled={true}> SAVED </Button> : 
        <Button 
            btnType="Save" 
            clicked={props.save}> SAVE</Button>

            
    return (
        <article className={classes.FullRecipe}>
            <section className={classes.TitleRecipe}>
                <h1>{props.recipe.label}</h1>
                
            </section>
            <section className={classes.ContentRecipe}>
                <figure>
                    <img src={props.recipe.image} alt="food"/>
                </figure>
                <section>
                    <h3>URL: </h3>
                    <a href={props.recipe.url}>{props.recipe.url}</a>
                </section>
                <section>
                    <h3>Ingredients: </h3>
                    <ul>
                        {ingredients}
                    </ul>
                </section>
                <section>
                    <h3>Calories: </h3>
                    <p>{props.recipe.calories}</p>
                </section>

                {props.logged && recipeIsSaved ? button : null}
                
            </section>
        </article>
    );
}

export default fullRecipe;