import React from 'react';
import Quailitie from './quailitie';
import PropTypes from 'prop-types';

const QualitiesList = ({ user }) => {
    return (
        <>
            {user.qualities.map((quailitie) => {
                return <Quailitie key={quailitie._id} quailitie={quailitie} />;
            })}
        </>
    );
};

QualitiesList.propTypes = {
    user: PropTypes.object.isRequired
};

export default QualitiesList;
