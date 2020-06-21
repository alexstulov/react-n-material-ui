import React from 'react';
import { SwapiServiceConsumer } from '../swapi-service-context';
import DummySwapiService from '../../services/dummy-swapi-service';
import SwapiService from '../../services/swapi-service';

export type withSwapiServiceArgsType = (swapiService: SwapiService | DummySwapiService) => ({ getData: (id?: any) => Promise<any> });

const withSwapiService = (mapMethodsToProps: withSwapiServiceArgsType) => (Wrapped: React.FunctionComponent) => {
    return (props: any) => {
        return (
            <SwapiServiceConsumer>
                {
                    (swapiService: any) => {
                        const serviceProps = mapMethodsToProps(swapiService);

                        return (<Wrapped {...props} {...serviceProps} />);
                    }
                }
            </SwapiServiceConsumer>
        );
    }
};

export default withSwapiService;