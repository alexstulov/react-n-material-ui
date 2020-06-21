import React from 'react';

import ItemList from '../item-list';
import {withData, withSwapiService} from '../hoc-helpers';

import {compose} from '../../utils';
import SwapiService, { ItemType, PersonType, PlanetType, StarshipType } from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

const withChildFunction = (fn: (item: ItemType) => React.ReactNode) => (Wrapped: React.FunctionComponent) => {
    return (props: any) => {
        return (<Wrapped {...props}>{fn}</Wrapped>);
    }
}

// PEOPLE
const renderPerson = (item: ItemType) => {
    item = item as PersonType;
    return <span>{item.name} ({item.birthYear}, {item.eyeColor})<button>!</button></span>;
};

const mapPersonMethodsToProps = (swapiService: SwapiService | DummySwapiService) => {
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
const renderPlanet = (item: ItemType) => {
    item = item as PlanetType;
    return <span>{item.name} ({item.diameter}, {item.rotationPeriod})</span>;
};

const mapPlanetMethodsToProps = (swapiService: SwapiService | DummySwapiService) => {
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
const renderStarship = (item: ItemType) => {
    item = item as StarshipType;
    return <span>{item.name} ({item.model}, {item.manufacturer})</span>;;
};

const mapStarshipMethodsToProps = (swapiService: SwapiService | DummySwapiService) => {
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