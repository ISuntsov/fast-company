import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/userListPage';
import EditUserPage from '../components/page/EditUserPage';

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <>
            {userId ? (
                edit ? (
                    <EditUserPage />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );

    // if (userId) {
    //     return location.pathname === `/users/${userId}/edit` ? (
    //         <EditUserPage userId={userId} />
    //     ) : (
    //         <UserPage userId={userId} />
    //     );
    // } else {
    //     return <UsersListPage />;
    // }
};

export default Users;
