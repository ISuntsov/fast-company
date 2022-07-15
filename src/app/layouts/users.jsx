import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/userListPage';
import EditUserPage from '../components/page/EditUserPage';
import UserProvider from '../hooks/useUsers';
import { useAuth } from '../hooks/useAuth';

const Users = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        userId === currentUser._id ? (
                            <EditUserPage />
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`} />
                        )
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
