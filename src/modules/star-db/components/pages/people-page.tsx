import React, { useState } from 'react';
import Row from '../row';
import { PersonList } from '../similar-components-united';
import PersonDetails from '../similar-components-united/person-details';

const PeoplePage = () => {
    const [selectedItem, setSelectedItem] = useState(-1);

    const onItemSelected = (selectedItem: number) => {
        setSelectedItem(selectedItem);
    }

    return (
        <Row
                left={<PersonList onItemSelected={onItemSelected}/>}
                right={<PersonDetails itemId={selectedItem}/>} />
    );
}

export default PeoplePage;
