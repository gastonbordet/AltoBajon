import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import * as actions from '../../store/actions/index';
import FullRecipe from '../../components/FullRecipe/FullRecipe';
import classes from './InfoRecipe.module.css';

class InfoRecipe extends Component {
    
    state= {
        recipe: null
    }

    componentDidMount() {
        if (this.props.recipe) {
            this.setState({
                recipe: this.props.recipe // Set state recipe to the value saved in the global state
            });
        }
    }

    render() {
        let content = <p>Please select a recipe from the showcase</p>;
        
        if (this.state.recipe !== null) {
            content = 
                <FullRecipe 
                    recipe={this.state.recipe} 
                    logged={this.props.logged}
                    savedRecipes={this.props.savedRecipes}
                    save={() => this.props.onSaveRecipe(this.props.recipe, this.props.token, this.props.userId)} />
                    
        }

        return (
            <div className={classes.InfoRecipe}>
                { content }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        savedRecipes: state.recipes.savedRecipes,
        recipe: state.recipes.recipe, // recipe saved 
        token: state.auth.token,
        userId: state.auth.userId,
        logged: state.auth.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveRecipe: (recipe, token, userId) => dispatch(actions.saveRecipe(recipe, token, userId)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoRecipe);