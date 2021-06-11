import React, { useState, useEffect, useCallback } from "react";
import { ItemType } from "../../services/swapi-service";

const Record = ({
  item,
  field,
  label,
}: {
  item?: ItemType;
  field: string;
  label: string;
}) => {
  // @ts-ignore
  const value = item && item.hasOwnProperty(field) ? item[field] : "";
  return (
    <li className="list-group-item">
      <span className="term">{label}: </span>
      <span>{value}</span>
    </li>
  );
};

export { Record };

interface ItemDetailsType {
  itemId: number;
  getData: (itemId: number) => Promise<ItemType>;
  getImageUrl: (item: ItemType) => string;
  children: any;
}

const ItemDetails = ({
  itemId,
  getData,
  getImageUrl,
  children,
}: ItemDetailsType) => {
  const [item, setItem] = useState<ItemType | null>(null);
  const [image, setImage] = useState("");

  const updateItem = useCallback(() => {
    if (!itemId || itemId < 1) {
      return;
    }

    getData(itemId).then((item: ItemType) => {
      setItem(item);
      setImage(getImageUrl(item));
    });
  }, [getImageUrl, itemId, getData]);

  useEffect(() => {
    updateItem();
  }, [itemId, updateItem, getData, getImageUrl]);

  if (!item) {
    return <span>Select an item from a list</span>;
  }

  return (
    <div className="item-details card">
      <img className="item-image" src={image} alt="item" />
      <div className="card-body">
        <h4>{item && item.name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </div>
    </div>
  );
};

export default ItemDetails;
