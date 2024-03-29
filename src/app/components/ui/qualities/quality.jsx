import React from 'react';
import PropTypes from 'prop-types';

const Quality = ({ _id, name, color }) => {
    return (
        <span className={'badge m-1 bg-' + color} key={_id}>
            {name}
        </span>
    );
};

Quality.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string,
    name: PropTypes.string
};

export default Quality;
