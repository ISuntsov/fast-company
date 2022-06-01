import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useQualities } from '../../../hooks/useQualities';

const QualitiesList = ({ qualities }) => {
    const { isLoading /*, getQuality */ } = useQualities();
    // const qual = getQuality(qualities)

    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => (
                    <Quality key={qual} id={qual} />
                ))}
            </>
        );
    }

    return 'Loading...';
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
