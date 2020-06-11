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
        let content = null;

        switch(step) {
            case 1:
                content = (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
                break;
            case 2:
                content = <FormPersonalDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={values}
                />;
                break;
            case 3:
                content = <Confirm
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    values={values}
                />;
                break;
            case 4:
                content = <Success />;
                break;
            default:
                content = <p>Something went wrong</p>;
                break;
        }

        return (
            <div style={{textAlign: 'center'}}>
                {content}
            </div>
        );
    }
}

export default UserForm;