import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

type values = {
  firstName: string;
  lastName: string;
  email: string;
  occupation: string;
  city: string;
  bio: string;
};

const styles = {
  button: {
    margin: 15,
  },
};

export default class Confirm extends Component<
  { values: values; nextStep: () => void; prevStep: () => void },
  {}
> {
  continue = (event: React.MouseEvent) => {
    event.preventDefault();
    // TODO: PROCESS FORM //
    this.props.nextStep();
  };

  back = (event: React.MouseEvent) => {
    event.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { firstName, lastName, email, occupation, city, bio },
    } = this.props;
    return (
      <React.Fragment>
        <AppBar title="Confirm" />
        <List>
          <ListItem>
            <ListItemText primary={`First name: ${firstName}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Last name: ${lastName}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Email: ${email}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Occupation: ${occupation}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`City: ${city}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Bio: ${bio}`} />
          </ListItem>
        </List>
        <Button color="secondary" style={styles.button} onClick={this.back}>
          Back
        </Button>
        <Button color="primary" style={styles.button} onClick={this.continue}>
          Confirm
        </Button>
      </React.Fragment>
    );
  }
}
