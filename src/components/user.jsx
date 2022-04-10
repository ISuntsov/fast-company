import React from 'react';
import Quailitie from './quailitie';
import BookMark from './bookmark';
import PropTypes from 'prop-types';

const User = ({ user, onDelete, onToggleBookMark }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((quailitie) => {
                    return (
                        <Quailitie key={quailitie._id} quailitie={quailitie}/>
                    );
                })}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <BookMark onToggleBookMark={onToggleBookMark} user={user}/>
            </td>
            <td>
                <button
                    className="btn btn-danger btn-sm ms-1"
                    onClick={() => onDelete(user._id)}
                >
                    Удалить
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.object,
        PropTypes.array
    ])).isRequired,
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.arrayOf(PropTypes.string).isRequired,
    profession: PropTypes.objectOf(PropTypes.string).isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;
