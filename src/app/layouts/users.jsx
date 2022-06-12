import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/userListPage';
import EditUserPage from '../components/page/EditUserPage';
import UserProvider from '../hooks/useUsers';

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <EditUserPage />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
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
