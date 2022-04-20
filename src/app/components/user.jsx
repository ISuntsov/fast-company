import React from 'react';
import Quailitie from './quailitie';
import BookMark from './bookmark';
import PropTypes from 'prop-types';

const User = ({ user, ...rest }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((quailitie) => {
                    return (
                        <Quailitie key={quailitie._id} quailitie={quailitie} />
                    );
                })}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <BookMark
                    onToggleBookMark={rest.onToggleBookMark}
                    user={user}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger btn-sm ms-1"
                    onClick={() => rest.onDelete(user._id)}
                >
                    Удалить
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
            PropTypes.object,
            PropTypes.array
        ])
    ).isRequired
};

export default User;
