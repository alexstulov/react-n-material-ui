import React, { useState, useEffect, useCallback } from "react";
import "./random-planet.css";

import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import SwapiService, { PlanetType } from "../../services/swapi-service";

const PlanetView = ({ planet }: { planet: PlanetType }) => {
  return (
    <>
      <img
        className="planet-image"
        src={`https://starwars-visualguide.com/assets/img/planets/${planet.id}.jpg`}
        alt={`planet ${planet.name}`}
      />
      <div>
        <h4>{planet.name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{planet.population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{planet.rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{planet.diameter}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

const RandomPlanet = ({
  updateInterval = 10000,
}: {
  updateInterval?: number;
}) => {
  const swapiService = new SwapiService();
  const [fetched, setFetched] = useState(true);
  const [error, setError] = useState(false);
  const [planet, setPlanet] = useState<PlanetType>({
    id: "",
    name: "",
    population: "",
    rotationPeriod: "",
    diameter: "",
  });

  const onPlanetLoaded = useCallback((planet: PlanetType) => {
    setFetched(false);
    setPlanet({ ...planet });
  }, []);

  const onError = useCallback(() => {
    setError(true);
    setFetched(false);
  }, []);

  const updatePlanet = useCallback(() => {
    const id = Math.floor(Math.random() * 17) + 2;
    swapiService.getPlanet(id).then(onPlanetLoaded).catch(onError);
  }, [swapiService, onPlanetLoaded, onError]);

  useEffect(() => {
    let interval = window.setInterval(updatePlanet, updateInterval);
    return () => {
      clearInterval(interval);
    };
  }, [updatePlanet, updateInterval]);

  return (
    <div className="random-planet jumbotron rounded">
      {error ? (
        <ErrorIndicator />
      ) : fetched ? (
        <Spinner />
      ) : (
        <PlanetView planet={planet} />
      )}
    </div>
  );
};

export default RandomPlanet;
