import React, {Component} from 'react'
import AppBar from '@mui/material/AppBar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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

export default class FormPersonalDetails extends Component<
                 {
                   values: values;
                   nextStep: () => void;
                   prevStep: () => void;
                   handleChange: (input: string | number) => (event: React.SyntheticEvent) => void;
                 },
                 {}
               > {
                 continue = (event: React.MouseEvent) => {
                   event.preventDefault();
                   this.props.nextStep();
                 };

                 back = (event: React.MouseEvent) => {
                   event.preventDefault();
                   this.props.prevStep();
                 };

                 render() {
                   const { values, handleChange } = this.props;
                   return (
                     <React.Fragment>
                       <AppBar title="Enter personal details" />
                       <TextField
                         label="Occupation"
                         onChange={handleChange("occupation")}
                         defaultValue={values.occupation}
                       />
                       <br />
                       <TextField
                         label="City"
                         onChange={handleChange("city")}
                         defaultValue={values.city}
                       />
                       <br />
                       <TextField
                         label="Bio"
                         onChange={handleChange("bio")}
                         defaultValue={values.bio}
                       />
                       <br />
                       <Button
                         color="secondary"
                         style={styles.button}
                         onClick={this.back}
                       >
                         Back
                       </Button>
                       <Button
                         color="primary"
                         style={styles.button}
                         onClick={this.continue}
                       >
                         Continue
                       </Button>
                     </React.Fragment>
                   );
                 }
               }
