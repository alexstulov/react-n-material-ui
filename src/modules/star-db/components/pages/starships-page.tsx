import React, { useState } from 'react';
import Row from '../row';
import { StarshipsList } from '../similar-components-united/item-lists';
import StarshipDetails from '../similar-components-united/starship-details';

const StarshipsPage = () => {
    const [selectedItem, setSelectedItem] = useState(-1);

  const onItemSelected = (selectedItem: number) => {
    setSelectedItem(selectedItem);
  };

  return (
    <Row
      left={<StarshipsList onItemSelected={onItemSelected} />}
      right={<StarshipDetails itemId={selectedItem} />}
    />
  );
};

export default StarshipsPage;