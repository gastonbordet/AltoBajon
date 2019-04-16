import * as actionTypes from './actionTypes';
import axios from '../../axiosRoute';

export const getFullRecipe = (recipe) => {
    return {
        type: actionTypes.GET_RECETAFULL,
        recipe: recipe
    }
}

export const fetchRecipeStart = () => {
    return {
        type: actionTypes.FETCH_RECIPES_START
    }
}

export const fetchRecipeSuccess = (recipes) => {
    return {
        type: actionTypes.FETCH_RECIPES_SUCCESS,
        savedRecipes: recipes
    }
}

export const fetchOrdersFail = error => {
    return {
        type: actionTypes.FETCH_RECIPES_FAIL,
        error: error
    }
}
export const fetchRecipes = (token, userId) => {
    return async dispatch => {
        dispatch(fetchRecipeStart());
        try {
            const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;  // Retrieve only data saved by that specific user 
            let result = await axios.get('/recipes.json' + queryParams);
            let fetchedRecipes = [];    // This is where I will put the data 
            
            for (let key in result.data) {  // Loop over all the keys in the object
                fetchedRecipes.push({       // Push value of that key and add the id that firebase attach to it  
                    ...result.data[key],
                    id: key
                });
            }

            dispatch(fetchRecipeSuccess(fetchedRecipes)); // Send the array with data to the reducer
        } catch (err) {
            dispatch(fetchOrdersFail(err));
        }
    }
}

export const saveRecipeStart = () => {
    return {
        type: actionTypes.SAVE_RECIPE_START
    }
}

export const saveRecipeSuccess = (content) => {
    return {
        type: actionTypes.SAVE_RECIPE_SUCCESS,
        recipe: content
    }
}

export const saveRecipeFail = error => {
    return {
        type: actionTypes.SAVE_RECIPE_FAIL,
        error: error
    }
}

export const saveRecipe = (recipe, token, userId) => {
    return async dispatch => {
        dispatch(saveRecipeStart());
        const content = {recipe: recipe, userId: userId}
        try {
            const result = await axios.post('/recipes.json?auth=' + token, content);
            //await axios.post('/recipes.json', content);
            dispatch(saveRecipeSuccess(content));

        } catch (error) {
            dispatch(saveRecipeFail(error));
        }   
    }
}
