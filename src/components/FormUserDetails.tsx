import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

type values = {
    firstName: string;
    lastName: string;
    email: string;
};

const styles = {
    button: {
        margin: 15
    }
};

export default class FormUserDetails extends Component <{ values: values, nextStep: any, prevStep: any, handleChange: any }, {}> {
    continue = (e: any) => {
        e.preventDefault()
        this.props.nextStep()
    }

    render() {
        const {values, handleChange} = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title='Enter user details'/>
                    <TextField
                        hintText="Enter Your First Name"
                        floatingLabelText='Firstname'
                        onChange={handleChange('firstName')}
                        defaultValue={values.firstName}
                    /><br/>
                    <TextField
                        hintText="Enter Your Last Name"
                        floatingLabelText='Lastname'
                        onChange={handleChange('lastName')}
                        defaultValue={values.lastName}
                    /><br/>
                    <TextField
                        hintText="Enter Your Email"
                        floatingLabelText='Email'
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                    /><br/>
                    <RaisedButton
                        label="Continue"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                    />
                </React.Fragment>
            </MuiThemeProvider>
        );
    };
}
