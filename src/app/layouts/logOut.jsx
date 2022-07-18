import React, { useEffect } from 'react';
import Loader from '../components/ui/loader/loader';

// import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from '../store/users';

const LogOut = () => {
    // const { logOut } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        // logOut();
        dispatch(logOut());
    }, []);

    return <Loader />;
};

export default LogOut;
