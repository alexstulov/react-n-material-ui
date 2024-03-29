import React, { useState } from "react";
import "./utils/bootstrap.min.css";

import ErrorBoundary from "./components/error-boundary";

import { StarshipsPage, PeoplePage, PlanetsPage } from "./components/pages";
import { SwapiServiceProvider } from "./components/swapi-service-context";
import SwapiService from "./services/swapi-service";
import DummySwapiService from "./services/dummy-swapi-service";
import RandomPlanet from "./components/random-planet";

const basePath = "/star-db";
const peoplePage = {
  path: `${basePath}/`,
  name: "People",
};
const planetsPage = {
  path: `${basePath}/planets`,
  name: "Planets",
};
const starshipsPage = {
  path: `${basePath}/starships`,
  name: "Starships",
};

const starDbWrapper = (Page: React.FunctionComponent) => () => {
  const swService: SwapiService | DummySwapiService = new SwapiService();
  const [swapiService, setSwapiService] = useState<
    SwapiService | DummySwapiService
  >(swService);

  const onServiceChange = () => {
    setSwapiService((swapiService: SwapiService | DummySwapiService) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return new Service();
    });
  };

  return (
    <ErrorBoundary>
      <SwapiServiceProvider value={swapiService}>
        <div className="stardb-app">
          {/* <Header onServiceChange={onServiceChange} routes={[peoplePage, planetsPage, starshipsPage]}/> */}
          <button className="btn btn-primary btn-sm" onClick={onServiceChange}>
            S
          </button>
          <RandomPlanet />
          <Page />
        </div>
      </SwapiServiceProvider>
    </ErrorBoundary>
  );
};

const WrappedPeoplePage = starDbWrapper(PeoplePage)
const WrappedPlanetsPage = starDbWrapper(PlanetsPage)
const WrappedStarshipsPage = starDbWrapper(StarshipsPage)

export default () => {
  return {
    name: "Star DB",
    routes: [
      {
        routeProps: {
          path: peoplePage.path,
          exact: true,
          element: <WrappedPeoplePage />,
        },
        name: peoplePage.name,
      },
      {
        routeProps: {
          path: planetsPage.path,
          exact: true,
          element: <WrappedPlanetsPage />,
        },
        name: planetsPage.name,
      },
      {
        routeProps: {
          path: starshipsPage.path,
          exact: true,
          element: <WrappedStarshipsPage />,
        },
        name: starshipsPage.name,
      },
    ],
  };
};
