import React from 'react';
import PropTypes from 'prop-types';
import BookMark from './bookmark';
import QualitiesList from './qualitiesList';
import Table from './Table';

const UserTable = ({ users, onSort, selectedSort, ...rest }) => {
    const columns = {
        name: { path: 'name', name: 'Имя' },
        qualities: {
            name: 'Качества',
            component: (user) => <QualitiesList user={user} />
        },
        profession: { path: 'profession.name', name: 'Профессия' },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        rate: { path: 'rate', name: 'Оценка' },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <BookMark
                    user={user}
                    onToggleBookMark={rest.onToggleBookMark}
                />
            )
        },
        delete: {
            name: `Удаление`,
            component: (user) => (
                <button
                    className="btn btn-danger btn-sm ms-1"
                    onClick={() => rest.onDelete(user._id)}
                >
                    Удалить
                </button>
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;
