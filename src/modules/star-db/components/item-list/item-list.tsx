import React from 'react';
import './item-list.css';
import { ItemType } from '../../services/swapi-service';

interface ItemListType {
    data: ItemType[],
    onItemSelected: (itemId: string) => void;
    children: (item: ItemType) => React.ReactNode;
}

const ItemList = ({data, onItemSelected = () => {console.log('onItemSelected is not provided');}, children}: ItemListType) => { 
    return (
        <ul className="item-list">{
            data.map((item) => (<li key={item.id} className="list-group-item" onClick={() => onItemSelected(item.id)}>
                {children(item)}
            </li>))
        }</ul>
    );
};

export default ItemList;