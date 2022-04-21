import React from 'react';

const listItem = ({
    item: itemElement,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    return (
        <li
            key={itemElement[valueProperty]}
            className={
                'list-group-item' +
                (itemElement === selectedItem ? ' active' : '')
            }
            onClick={() => onItemSelect(itemElement)}
            role={'button'}
        >
            {itemElement[contentProperty]}
        </li>
    );
};

export default listItem;
