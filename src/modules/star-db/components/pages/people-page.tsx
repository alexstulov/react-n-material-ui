import React, { useState } from 'react';
import Row from '../row';
import { PersonList } from '../similar-components-united';

const PeoplePage = () => {
    const [selectedItem, setSelectedItem] = useState(-1);

    const onItemSelected = (selectedItem: number) => {
        setSelectedItem(selectedItem);
    }

    return (
        <>
            <h1>People Page</h1>
            <Row
                // left={<>
                //     <button onClick={() => onItemSelected(1)}>1</button>
                //     <button onClick={() => onItemSelected(2)}>2</button>
                //     <button onClick={() => onItemSelected(3)}>3</button>
                // </>}
                left={<PersonList onItemSelected={onItemSelected}/>}
                right={<span>world: {selectedItem}</span>} />
        </>
    );
}

export default PeoplePage;
