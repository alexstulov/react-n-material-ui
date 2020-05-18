import React from 'react';
import ItemDetails, { Record } from '../item-details';
import {withSwapiService} from '../hoc-helpers';

const StarshipDetails = (props:any) => {
    return (
        <ItemDetails {...props}>
            <Record field="model" label="Model"/>
            <Record field="manufacturer" label="Manufacturer"/>
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService: any) => {
    return {
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipImage
    }
}

export default withSwapiService(mapMethodsToProps)(StarshipDetails);