import React from 'react';
import Row from '../row';

export default class PeoplePage extends React.Component {
    render() {
        return (
            <>
            <h1>People Page</h1>
            <Row 
            left={<span>hello</span>} 
            right={<span>world</span>}/>
            </>
        );
    }
}