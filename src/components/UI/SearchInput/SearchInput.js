import React, { Component } from 'react';

import Input from '../Input/Input';
import Button from '../Buttons/Button/Button';
import classes from './SearchInput.module.css';


class searchInput extends Component {

    state = {
        query: this.props.query
    }

    changeQuery(event) {
        this.setState({
            query: event.target.value
        });
    };

    render() {
        return (
            <div className={classes.SearchInput}>
                <Input type="text" changed={(event) => this.changeQuery(event)} placeholder="Search recipe ..." />
                <Button btnType="Search" clicked={() => this.props.queryHandler(this.state.query)}> Search </Button>
            </div>
        );
    }    
}

export default searchInput;