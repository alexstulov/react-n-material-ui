import React from 'react';

import ItemList from '../item-list';
import {withData, withSwapiService} from '../hoc-helpers';

import {compose} from '../../utils';

const withChildFunction = (fn: (item: any) => any) => (Wrapped: React.FC<any>) => {
    return (props: any) => {
        return (<Wrapped {...props}>{fn}</Wrapped>);
    }
}

const renderPerson = (item: any) => <span>{item.name} ({item.birthYear}, {item.eyeColor})<button>!</button></span>;

const mapPersonMethodsToProps = (swapiService: any) => {
    return {
        getData: swapiService.getAllPeople
    }
}

const PersonList = compose( 
    withSwapiService(mapPersonMethodsToProps),
    withData,
    withChildFunction(renderPerson)
)(ItemList);

export {PersonList};