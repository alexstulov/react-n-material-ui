import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
                <React.Fragment>
                    <AppBar title='Enter personal details'/>
                    <TextField
                        label='Occupation'
                        onChange={handleChange('occupation')}
                        defaultValue={values.occupation}
                    /><br/>
                    <TextField
                        label='City'
                        onChange={handleChange('city')}
                        defaultValue={values.city}
                    /><br/>
                    <TextField
                        label='Bio'
                        onChange={handleChange('bio')}
                        defaultValue={values.bio}
                    /><br/>
                    <Button
                        color="secondary"
                        style={styles.button}
                        onClick={this.back}
                    >Back</Button>
                    <Button
                        color="primary"
                        style={styles.button}
                        onClick={this.continue}
                    >Continue</Button>
                </React.Fragment>
        );
    };
}
