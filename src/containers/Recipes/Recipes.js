import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
//import { compose } from 'redux';

import axios from 'axios';
import Showcase from '../../components/Showcase/Showcase';
import SearchInput from '../../components/UI/SearchInput/SearchInput';
import ResultsButton from '../../components/UI/Buttons/ResultsButton/ResultsButton';
import Spinner from '../../components/UI/Spinner/Spinner';
import Hero from '../../components/Hero/Hero';
import classes from './Recipes.module.css';
import * as actions from '../../store/actions/index';

class Recipes extends Component {
    state = {
        loading: false,     // For showing spinner
        data: [],           // Recipes from edaman
        maxResult: 12,      // Control for showing results
        minResult: 0,       // Control for showing results 
        query: 'burger',    // Default search
        appId: 'c9940c8d',  // Api config
        appKey: 'c1d1c46d68c02ac78cae732fa7c5b0aa'  // Api config
    }
    
    componentWillMount() {
        this.fetchData();
    }

    async fetchData() {
        this.setState({loading: true}); // Turn on spinner
        console.log('fetching ...');
        try {
            const request = `https://api.edamam.com/search?q=${this.state.query}&app_id=${this.state.appId}&app_key=${this.state.appKey}&from=0&to=36`;
            const result = await axios(request);
            this.setState({ data: result.data.hits, loading: false }); // Add data to state and turn of spinner
            
        } catch (error) {
            console.log(error);
        }
    }

    controlsHandler = (value) => {
        switch(value) {
            case 'next':    // Next results 
                this.setState(prevState => {
                    return {
                        minResult: prevState.maxResult,
                        maxResult: prevState.maxResult + 12
                    }
                });
                
                break;
            case 'prev':    // Prev results
                this.setState(prevState => {
                    return {
                        maxResult: prevState.minResult,
                        minResult: prevState.minResult - 12
                    }
                });
                
                break;
            default:
                break;
        }
    }

    queryHandler = value => {
        this.setState({
            query: value    // Update search
        });
        
        setTimeout(()=>{
            this.setState({loading: true}); // Turn on spinner
            this.fetchData();   // Fetch data with the new query
        }, 100);
    }

    selectedRecipe = index => {
        this.props.wantedRecipe(this.state.data[index].recipe); // Save selected recipe in the global state 
        this.props.history.push('/inforecipe'); // Redirect to inforecipe where InfoRecipe is executed with the selected recipe
    }

    render() {

        const loading = this.state.loading;
        const data = [...this.state.data];
        const hero = this.props.isLogged ? null : <Hero />; // If user isn't logged show hero with info.
        return (
            
            <div className={classes.Recetas}>
                {hero}
                <SearchInput 
                    query={this.state.query} 
                    queryHandler={(value) => this.queryHandler(value)}/>

                {loading ? 
                    <Spinner /> : 
                    <Showcase 
                        data={data} 
                        controlPrev={this.state.minResult}
                        controlNext={this.state.maxResult}
                        wantedRecipe={this.selectedRecipe}
                        />}
                
                <div className={classes.Controls}>
                    <ResultsButton 
                        value="prev"
                        clicked={(value) => this.controlsHandler(value)}
                        enable={this.state.minResult >= 12}>Back</ResultsButton>
                    <ResultsButton 
                        value="next"
                        clicked={(value) => this.controlsHandler(value)} 
                        enable={this.state.maxResult <= 24}>Next</ResultsButton>
                </div>
                
            </div>
        ); 
    }
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes.recipes,
        isLogged: state.auth.userId !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        wantedRecipe: (recipe) => dispatch(actions.getFullRecipe(recipe))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Recipes));
