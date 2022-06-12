import React from 'react';
import PropTypes from 'prop-types';
// import { useItems } from '../../../hooks/useQualProf';
import { useQualities } from '../../../hooks/useQualities';

const Quality = ({ id }) => {
    const { getQuality } = useQualities();
    const { name, color } = getQuality(id);
    // const { getQuality } = useItems();
    // const { name, color } = getItems(qual.id);

    return <span className={'badge m-1 bg-' + color}>{name}</span>;
};

Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
