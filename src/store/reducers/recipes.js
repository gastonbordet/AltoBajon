import * as actionTypes from '../actions/actionTypes';

const initialState = {
    recipe: null,
    savedRecipes: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_RECETAFULL:
            return {
                ...state,
                recipe: action.recipe
            }

        case actionTypes.FETCH_RECIPES_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_RECIPES_SUCCESS: {
            return {
                ...state,
                savedRecipes: action.savedRecipes, // add the data retrieved to the redux state 
                loading: false
            }
        }

        case actionTypes.FETCH_RECIPES_FAIL: {
            return {
                ...state,
                loading: false
            }
        }

        case actionTypes.SAVE_RECIPE_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.SAVE_RECIPE_SUCCESS:
            return {
                ...state,
                loading: false,
                savedRecipes: [...state.savedRecipes, action.recipe] // add new recipe to the array.
            }

        case actionTypes.SAVE_RECIPE_FAIL:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}

export default reducer;