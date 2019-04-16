import React from 'react';

import classes from './Layout.module.css';

const layout = (props) => {

    return (
        <main className={classes.Layout}>
            {props.children}
        </main>
    );
}

export default layout;