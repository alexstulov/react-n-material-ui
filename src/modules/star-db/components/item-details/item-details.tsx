import React, { useState, useEffect } from 'react';

const Record = ({item, field, label}: {item?:any; field: string; label: string;}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}: </span>
            <span>{item && item[field]}</span>
        </li>
    )
}

export { Record };

interface ItemDetailsType {
    itemId: number;
    getData: (itemId: number) => any;
    getImageUrl: (itemId: number) => string;
    children: any;
};

const ItemDetails = ({itemId, getData, getImageUrl, children}: ItemDetailsType) => {
    const [item, setItem] = useState<any>(null);
    const [image, setImage] = useState('');

    const updateItem = () => {
        if (!itemId || itemId < 1) {
            return;
        }

        getData(itemId)
        .then((item: any) => {
            setItem(item);
            setImage(getImageUrl(item));
        });
    }

    useEffect(() => {
        updateItem();
    }, [itemId, getData, getImageUrl]);

    if (!item) {
        return <span>Select an item from a list</span>;
    }

    return (
        <div className="item-details card">
            <img className="item-image" src={image} alt="item"/>
            <div className="card-body">
                <h4>{item && item.name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default ItemDetails;