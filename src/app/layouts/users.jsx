import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/userListPage';
import EditUserPage from '../components/page/EditUserPage';

// import UserProvider from '../hooks/useUsers';
// import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';
import UsersLoader from '../components/ui/hoc/usersLoader';

const Users = () => {
    const { userId, edit } = useParams();

    // const { currentUser } = useAuth();
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {/* <UserProvider> */}
                {userId ? (
                    edit ? (
                        userId === currentUserId ? (
                            <EditUserPage />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
                {/* </UserProvider> */}
            </UsersLoader>
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
