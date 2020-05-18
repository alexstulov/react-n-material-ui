import React, { useState } from 'react';
import './utils/bootstrap.min.css';

import ErrorBoundary from './components/error-boundary';
import Header from './components/header';

import {StarshipsPage, PeoplePage, PlanetsPage} from './components/pages';
import { SwapiServiceProvider } from './components/swapi-service-context';
import SwapiService from './services/swapi-service';
import DummySwapiService from './services/dummy-swapi-service';
import RandomPlanet from './components/random-planet';

const basePath = '/star-db';
const peoplePage = {
    path: `${basePath}/`,
    name: 'People'
};
const planetsPage = {
    path: `${basePath}/planets`,
    name: 'Planets'
};
const starshipsPage = {
    path: `${basePath}/starships`,
    name: 'Starships'
};

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
                    <Header onServiceChange={onServiceChange} routes={[peoplePage, planetsPage, starshipsPage]}/>
                    <RandomPlanet/>
                    <Page />
                </div>
            </SwapiServiceProvider>
        </ErrorBoundary>
    )
};

export default () => {

    return {
        name: 'Star DB',
        routes: [
            {
                routeProps: {
                    path: peoplePage.path,
                    exact: true,
                    component: starDbWrapper(PeoplePage)
                },
                name: peoplePage.name
            },
            {
                routeProps: {
                    path: planetsPage.path,
                    exact: true,
                    component: starDbWrapper(PlanetsPage)
                },
                name: planetsPage.name
            },
            {
                routeProps: {
                    path: starshipsPage.path,
                    exact: true,
                    component: starDbWrapper(StarshipsPage)
                },
                name: starshipsPage.name
            },
        ]
    };
};