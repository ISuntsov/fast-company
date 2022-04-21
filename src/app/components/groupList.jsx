import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './groupListItem';

const GroupList = ({ items, ...rest }) => {
    const listItems = Array.isArray(items) ? items : Object.values(items);
    return (
        <ul className="list-group">
            {listItems.map((item) => {
                return (
                    <ListItem
                        item={item}
                        key={item[rest.valueProperty]}
                        {...rest}
                    />
                );
            })}
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
