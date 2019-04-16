import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Toolbar from './components/Navigation/Toolbar/Toolbar';
import Footer from './components/Footer/Footer';
import Layout from './hoc/Layout/Layout';
import Recipes from './containers/Recipes/Recipes';
import InfoRecipe from './containers/InfoRecipe/InfoRecipe';
import SavedRecipes from './containers/SavedRecipes/SavedRecipes'
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import './App.css';

class App extends Component {

  
  render() {

    const routes = (
      <Switch>
        <Route path="/" exact component={Recipes} />
        <Route path="/inforecipe" exact component={InfoRecipe} />
        <Route path="/saved-recipes" exact component={SavedRecipes} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/logout" exact component={Logout} />
      </Switch>
    );

    return (
      <Layout>
        <Toolbar />
        {routes}
        <Footer />
      </Layout>
    );
  }
}



export default withRouter(App);
