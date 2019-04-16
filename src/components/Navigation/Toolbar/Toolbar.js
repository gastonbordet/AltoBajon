import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './Toolbar.module.css'

class Toolbar extends Component {
    
    render() {
        return (
            <nav className={classes.Toolbar}>
                <ul>
                    <NavigationItem link="/">Home</NavigationItem>
                    {this.props.logged ? <NavigationItem link="/saved-recipes">Recipes</NavigationItem> : null}
                    {this.props.logged ? <NavigationItem link="/logout">Logout</NavigationItem> : <NavigationItem link="/auth">Login</NavigationItem>}
                    
                </ul>    
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        logged: state.auth.token != null
    }
}

export default connect(mapStateToProps)(Toolbar);