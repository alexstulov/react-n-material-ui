import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type values = {
  firstName: string;
  lastName: string;
  email: string;
};

export default class FormUserDetails extends Component<
  { values: values; nextStep: () => void; prevStep: () => void; handleChange: (input: string | number) => (event: React.SyntheticEvent) => void; },
  {}
> {
  continue = (event: React.MouseEvent) => {
    event.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <React.Fragment>
        <AppBar title="Enter user details" />
        <TextField
          label="First name"
          onChange={handleChange("firstName")}
          defaultValue={values.firstName}
        />
        <br />
        <TextField
          label="Last name"
          onChange={handleChange("lastName")}
          defaultValue={values.lastName}
        />
        <br />
        <TextField
          label="Email"
          onChange={handleChange("email")}
          defaultValue={values.email}
        />
        <br />
        <Button color="primary" onClick={this.continue}>
          Continue
        </Button>
      </React.Fragment>
    );
  }
}
