import React, { useState } from "react";
import Row from "../row";
import { PlanetsList } from "../similar-components-united/item-lists";
import PlanetDetails from "../similar-components-united/planet-details";

const PlanetsPage = () => {
  const [selectedItem, setSelectedItem] = useState(-1);

  const onItemSelected = (selectedItem: number) => {
    setSelectedItem(selectedItem);
  };

  return (
    <Row
      left={<PlanetsList onItemSelected={onItemSelected} />}
      right={<PlanetDetails itemId={selectedItem} />}
    />
  );
};

export default PlanetsPage;
