import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import { useHistory } from 'react-router-dom';
import Loader from '../../ui/loader/loader';
import Qualities from '../../ui/qualities';

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleClick = () => {
        history.push(history.location.pathname + '/edit');
    };

    if (user) {
        return (
            <div className="container m-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h1>{user.name}</h1>
                        <h2>Профессия: {user.profession.name}</h2>
                        <Qualities qualities={user.qualities} />
                        <p>completedMeetings: {user.completedMeetings}</p>
                        <h2>Rate: {user.rate}/5</h2>
                        <button onClick={handleClick}>Изменить данные</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader />;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
