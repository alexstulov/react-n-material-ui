import React from 'react';
import { SwapiServiceConsumer } from '../swapi-service-context';

const withSwapiService = (mapMethodsToProps: (swapiService: any) => { getData: () => any[] }) => (Wrapped: React.FC<any>) => {
    return (props: any) => {
        return (
            <SwapiServiceConsumer>
                {
                    (swapiService) => {
                        const serviceProps = mapMethodsToProps(swapiService);

                        return (<Wrapped {...props} {...serviceProps} />);
                    }
                }
            </SwapiServiceConsumer>
        );
    }
};

export default withSwapiService;