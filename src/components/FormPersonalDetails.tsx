import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

type values = {
    occupation: string;
    city: string;
    bio: string;
};

const styles = {
    button: {
        margin: 15
    }
};

export default class FormPersonalDetails extends Component <{ values: values, nextStep: any, prevStep: any, handleChange: any }, {}> {
    continue = (e: any) => {
        e.preventDefault()
        this.props.nextStep()
    }

    back = (e: any) => {
        e.preventDefault()
        this.props.prevStep()
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title='Enter personal details'/>
                    <TextField
                        hintText="Enter Your Occupation"
                        floatingLabelText='Occupation'
                        onChange={handleChange('occupation')}
                        defaultValue={values.occupation}
                    /><br/>
                    <TextField
                        hintText="Enter Your City"
                        floatingLabelText='City'
                        onChange={handleChange('city')}
                        defaultValue={values.city}
                    /><br/>
                    <TextField
                        hintText="Enter Your Bio"
                        floatingLabelText='Bio'
                        onChange={handleChange('bio')}
                        defaultValue={values.bio}
                    /><br/>
                    <RaisedButton
                        label="Back"
                        primary={false}
                        style={styles.button}
                        onClick={this.back}
                    />
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
