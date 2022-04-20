import React from 'react';
import PropTypes from 'prop-types';

const listItem = (itemElement, valueProperty, contentProperty, onItemSelect, selectedItem) => {
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

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    return (
        <ul className="list-group">
            {Array.isArray(items)
                ? items.map((item) => listItem(item, valueProperty, contentProperty, onItemSelect, selectedItem))
                : Object.keys(items).map((item) => listItem(items[item], valueProperty, contentProperty, onItemSelect, selectedItem))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    contentProperty: PropTypes.string.isRequired,
    valueProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;