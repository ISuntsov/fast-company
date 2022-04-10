import React, { useState } from 'react';
import User from './user';
import Pajination from './pajination';
import { paginate } from '../utils/paginate';
import PropTypes from 'prop-types';

const Users = ({ users, onDelete, onToggleBookMark }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            {count !== 0 && (
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Качества</th>
                            <th>Профессия</th>
                            <th>Встретился, раз</th>
                            <th>Оценка</th>
                            <th>Закладки</th>
                            <th>Кнопка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => {
                            return (
                                <User
                                    key={user._id}
                                    onDelete={onDelete}
                                    onToggleBookMark={onToggleBookMark}
                                    user={user}
                                />
                            );
                        })}
                    </tbody>
                </table>
            )}
            <Pajination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
            PropTypes.object,
            PropTypes.array
        ])
    ).isRequired,
    onDelete: PropTypes.func,
    onToggleBookMark: PropTypes.func
};

export default Users;
