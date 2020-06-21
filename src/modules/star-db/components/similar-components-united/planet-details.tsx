import React from 'react';
import ItemDetails, { Record } from '../item-details';
import {withSwapiService} from '../hoc-helpers';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

const PlanetDetails = (props:any) => {
    return (
        <ItemDetails {...props}>
            <Record field="diameter" label="Diameter"/>
            <Record field="rotationPeriod" label="Rotation Period"/>
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService: SwapiService | DummySwapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage
    }
}

export default withSwapiService(mapMethodsToProps)(PlanetDetails);