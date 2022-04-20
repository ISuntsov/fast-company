import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { paginate } from '../utils/paginate';
import Pajination from './pajination';
import User from './user';
import api from '../api';
import GroupList from './groupList';
import SearchStatus from './searchStatus';

const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const filtefedUsers = selectedProf
        ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        : users;

    const count = filtefedUsers.length;
    const userCrop = paginate(filtefedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить фильтр
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
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
                                        user={user}
                                        {...rest}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pajination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(
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
