import React from 'react';
import PropTypes from 'prop-types';

const Quailitie = ({ quailitie }) => {
    return (
        <span className={`badge ms-1 bg-${quailitie.color}`}>
            {quailitie.name}
        </span>
    );
};

Quailitie.propTypes = {
    quailitie: PropTypes.object.isRequired
};

export default Quailitie;
