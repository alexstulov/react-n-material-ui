import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

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
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title='Confirm'/>
                    <List>
                        <ListItem
                            primaryText='First Name'
                            secondaryText={ firstName }
                        />
                        <ListItem
                            primaryText='First Name'
                            secondaryText={ firstName }
                        />
                        <ListItem
                            primaryText='Last Name'
                            secondaryText={ lastName }
                        />
                        <ListItem
                            primaryText='Email'
                            secondaryText={ email }
                        />
                        <ListItem
                            primaryText='Occupation'
                            secondaryText={ occupation }
                        />
                        <ListItem
                            primaryText='City'
                            secondaryText={ city }
                        />
                        <ListItem
                            primaryText='Bio'
                            secondaryText={ bio }
                        />
                    </List>

                    <RaisedButton
                        label="Back"
                        primary={false}
                        style={styles.button}
                        onClick={this.back}
                    />
                    <RaisedButton
                        label="Confirm"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                    />
                </React.Fragment>
            </MuiThemeProvider>
        );
    };
}
