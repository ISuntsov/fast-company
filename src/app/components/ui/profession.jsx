import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// import { useProfession } from '../../hooks/useProfession';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProfessionById,
    getProfessionsLoadingStatus,
    loadProfessionsList
} from '../../store/professions';

const Profession = ({ id }) => {
    const dispatch = useDispatch();

    // const { isLoading, getProfession } = useProfession();
    // const prof = getProfession(id);
    const isLoading = useSelector(getProfessionsLoadingStatus());
    if (isLoading) return 'Loading...';

    const prof = useSelector(getProfessionById(id));

    useEffect(() => {
        dispatch(loadProfessionsList());
    }, []);

    return <p>{prof.name}</p>;
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
