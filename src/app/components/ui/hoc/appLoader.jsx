import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getIsLoggedIn,
    getUserLoadingStatus,
    loadUsersList
} from '../../../store/users';
import Loader from '../loader/loader';
import PropTypes from 'prop-types';
import { loadQualitiesList } from '../../../store/qualities';
import { loadProfessionsList } from '../../../store/professions';

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userStatusLoading = useSelector(getUserLoadingStatus());

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);

    if (userStatusLoading) return <Loader />;
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
