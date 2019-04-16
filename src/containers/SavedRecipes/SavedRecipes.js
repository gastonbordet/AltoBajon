import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index'; 
import RecipeList from '../../components/RecipeList/RecipeList';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './SavedRecipes.module.css';


class SavedRecipes extends Component {

    selectedRecipe = index => {
        //console.log('recipe: ', this.props.savedRecipes[index]);
        this.props.wantedRecipe(this.props.savedRecipes[index].recipe); // Save selected recipe in the global state 
        this.props.history.push('/inforecipe'); // Redirect to inforecipe where InfoRecipe is executed with the selected recipe
    }

    render() {

        return (
            <section className={classes.SavedRecipes}>
                {this.props.loading ? <Spinner /> : <RecipeList recipes={[...this.props.savedRecipes]} wantedRecipe={this.selectedRecipe} />}
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        savedRecipes: state.recipes.savedRecipes,
        loading: state.recipes.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchRecetas: (token, userId) => dispatch(actions.fetchRecipes(token, userId)),
        wantedRecipe: (recipe) => dispatch(actions.getFullRecipe(recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedRecipes);

