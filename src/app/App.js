import React, { useState, useEffect } from 'react';
import Users from './components/users';
import api from './api';

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers((data)));
    }, []);

    const handleDelete = (userId) => {
        const newUserList = users.filter((user) => user._id !== userId);
        setUsers(newUserList);
    };

    const handleToggleBookMark = (userId) => {
        const newUserList = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newUserList);
    };

    return (
        <div>
            {users && (<Users
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
                users={users}
            />)}
        </div>
    );
}

export default App;
