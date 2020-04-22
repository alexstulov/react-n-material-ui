import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'

export default class Success extends Component <{}, {}> {
    render() {
        return (
            <React.Fragment>
                <AppBar title='Success'/>
                <h1>Thank you for your submission</h1>
                <p>You will get an email with further instructions</p>
            </React.Fragment>
        );
    };
}
