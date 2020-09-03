import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import Rapido from "./Rapido";

const basePath = "/rapido";

const RapidoC = () => {
  return (
    <React.StrictMode>
      <Rapido />
    </React.StrictMode>
  );
};

export default () => {
  return {
    name: "Rapido",
    routes: [
      {
        routeProps: {
          path: `${basePath}`,
          exact: true,
          component: RapidoC,
        },
        name: "Rapido",
      },
    ],
  };
};
