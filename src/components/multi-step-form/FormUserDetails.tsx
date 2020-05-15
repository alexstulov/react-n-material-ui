import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

type values = {
    firstName: string;
    lastName: string;
    email: string;
};

export default class FormUserDetails extends Component <{ values: values, nextStep: any, prevStep: any, handleChange: any }, {}> {
    continue = (e: any) => {
        e.preventDefault()
        this.props.nextStep()
    }

    render() {
        const {values, handleChange} = this.props;
        return (
                <React.Fragment>
                    <AppBar title='Enter user details'/>
                    <TextField
                        label='First name'
                        onChange={handleChange('firstName')}
                        defaultValue={values.firstName}
                    /><br/>
                    <TextField
                        label='Last name'
                        onChange={handleChange('lastName')}
                        defaultValue={values.lastName}
                    /><br/>
                    <TextField
                        label='Email'
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                    /><br/>
                    <Button
                        color="primary"
                        onClick={this.continue}
                    >Continue</Button>
                </React.Fragment>
        );
    };
}
