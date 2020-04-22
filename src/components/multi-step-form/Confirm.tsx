import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'

type values = {
    firstName: string;
    lastName: string;
    email: string;
    occupation: string;
    city: string;
    bio: string;
}

const styles = {
    button: {
        margin: 15
    }
};

export default class Confirm extends Component <{ values: values, nextStep: any, prevStep: any }, {}> {
    continue = (e: any) => {
        e.preventDefault()
        // TODO: PROCESS FORM //
        this.props.nextStep()
    }

    back = (e: any) => {
        e.preventDefault()
        this.props.prevStep()
    }

    render() {
        const { values: { firstName, lastName, email, occupation, city, bio } } = this.props;
        return (
                <React.Fragment>
                    <AppBar title='Confirm'/>
                    <List>
                        <ListItem><ListItemText primary={`First name: ${firstName}`} /></ListItem>
                        <ListItem><ListItemText primary={`Last name: ${lastName}`} /></ListItem>
                        <ListItem><ListItemText primary={`Email: ${email}`} /></ListItem>
                        <ListItem><ListItemText primary={`Occupation: ${occupation}`} /></ListItem>
                        <ListItem><ListItemText primary={`City: ${city}`} /></ListItem>
                        <ListItem><ListItemText primary={`Bio: ${bio}`} /></ListItem>
                    </List>

                    <Button
                        color="secondary"
                        style={styles.button}
                        onClick={this.back}
                    >Back</Button>
                    <Button
                        color="primary"
                        style={styles.button}
                        onClick={this.continue}
                    >Confirm</Button>
                </React.Fragment>
        );
    };
}
