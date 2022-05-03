import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../utils/loader/loader";

const UserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });

    const handleClick = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}/5</h2>
                <button onClick={handleClick}> Все Пользователи</button>
            </div>
        );
    } else {
        return <Loader />;
    }
};

UserPage.propTypes = {
    match: PropTypes.object.isRequired
};

export default UserPage;
