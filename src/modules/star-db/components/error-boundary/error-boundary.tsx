import React, {Component, PropsWithChildren} from 'react';
import ErrorIndicator from '../error-indicator';
import './error-boundary.css';


export default class ErrorBoundary extends Component<PropsWithChildren> {
    state={
        hasError: false
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        });
    }

    render() {
        if(this.state.hasError) {
            return <ErrorIndicator />;
        }

        return this.props.children;
    }
};
