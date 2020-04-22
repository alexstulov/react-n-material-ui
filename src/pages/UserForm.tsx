import React, { PureComponent } from 'react';

import FormUserDetails from '../components/multi-step-form/FormUserDetails';
import FormPersonalDetails from "../components/multi-step-form/FormPersonalDetails";
import Confirm from "../components/multi-step-form/Confirm";
import Success from "../components/multi-step-form/Success";

interface IProps {

}

interface IState {
    step: number;
    firstName: string;
    lastName: string;
    email: string;
    occupation: string;
    city: string;
    bio: string;
}

export class UserForm extends PureComponent<IProps, any> {
    state: any;
    constructor(props: IProps) {
        super(props);
        this.state = {
            step: 1,
            firstName: '',
            lastName: '',
            email: '',
            occupation: '',
            city: '',
            bio: '',
        };
    }

    // Proceed to next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    // Go back to previous step
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }

    handleChange = (input: string | number) => (e: any) => {
        this.setState({[input]: e.target.value});
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, email, occupation, city, bio } = this.state;
        const values = { firstName, lastName, email, occupation, city, bio };

        switch(step) {
            case 1:
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 2:
                return <FormPersonalDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                />;
            case 3:

                return <Confirm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values={values}
                />;
            case 4:
                return <Success />;
        }

        return (
            <div>
                <p>Something went wrong</p>
            </div>
        );
    }
}

export default UserForm;