import React from 'react';

import classes from './Hero.module.css';

const hero = () => {
    return (
        <div className={classes.Hero}>
            <img src="/images/heroimg.jpg" alt="Tasty burguer"/>
            <h1>Search any food you want and create an account to save the recipe.</h1>
        </div>
    );
}

export default hero;