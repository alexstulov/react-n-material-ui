import React, { useState } from 'react';
import './utils/bootstrap.min.css';

import ErrorBoundary from './components/error-boundary';
import Header from './components/header';

import {StarshipsPage, PeoplePage, PlanetsPage} from './components/pages';
import { SwapiServiceProvider } from './components/swapi-service-context';
import SwapiService from './services/swapi-service';
import DummySwapiService from './services/dummy-swapi-service';
import RandomPlanet from './components/random-planet';

const starDbWrapper = (Page: any) => (props: any) => {
    const swService: SwapiService | DummySwapiService = new SwapiService();
    const [swapiService, setSwapiService] = useState<SwapiService | DummySwapiService>(swService);

    const onServiceChange = () => {
        setSwapiService((swapiService: SwapiService | DummySwapiService) => {
            const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
            return new Service();
        })
    }

    return (
        <ErrorBoundary>
            <SwapiServiceProvider value={swapiService}>
                <div className="stardb-app">
                    <Header onServiceChange={onServiceChange}/>
                    <RandomPlanet/>
                    <Page />
                </div>
            </SwapiServiceProvider>
        </ErrorBoundary>
    )
};

export default (basePath = '/star-db') => ({
    name: 'Star DB',
    routes: [
        {
            routeProps: {
                path: `${basePath}/`,
                exact: true,
                component: starDbWrapper(PeoplePage)
            },
            name: 'People'
        },
        {
            routeProps: {
                path: `${basePath}/planets`,
                exact: true,
                component: starDbWrapper(PlanetsPage)
            },
            name: 'Planets'
        },
        {
            routeProps: {
                path: `${basePath}/starships`,
                exact: true,
                component: starDbWrapper(StarshipsPage)
            },
            name: 'Planets'
        },
    ]
});