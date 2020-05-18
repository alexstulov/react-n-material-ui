import React from 'react';

import ItemList from '../item-list';
import {withData, withSwapiService} from '../hoc-helpers';

import {compose} from '../../utils';

const withChildFunction = (fn: (item: any) => any) => (Wrapped: React.FC<any>) => {
    return (props: any) => {
        return (<Wrapped {...props}>{fn}</Wrapped>);
    }
}

// PEOPLE
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

// PLANETS
const renderPlanet = (item: any) => <span>{item.name} ({item.diameter}, {item.rotationPeriod})</span>;

const mapPlanetMethodsToProps = (swapiService: any) => {
    return {
        getData: swapiService.getAllPlanets
    }
}

const PlanetsList = compose( 
    withSwapiService(mapPlanetMethodsToProps),
    withData,
    withChildFunction(renderPlanet)
)(ItemList);

// STARSHIPS
const renderStarship = (item: any) => <span>{item.name} ({item.model}, {item.manufacturer})</span>;

const mapStarshipMethodsToProps = (swapiService: any) => {
    return {
        getData: swapiService.getAllStarships
    }
}

const StarshipsList = compose( 
    withSwapiService(mapStarshipMethodsToProps),
    withData,
    withChildFunction(renderStarship)
)(ItemList);

export {PersonList, PlanetsList, StarshipsList};