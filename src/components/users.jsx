import React from "react";
import User from './user'

const Users = ({users, onDelete, onToggleBookMark}) => {
    return (
        <>
            {users.length !== 0 && (<table className="table table-striped table-hover">
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
                {users.map((user) => {
                    return (
                        <User
                            key={user._id}
                            onDelete={onDelete}
                            onToggleBookMark={onToggleBookMark}
                            user={user}
                        />)
                })}
                </tbody>
            </table>)}
        </>)
}

export default Users