import React from "react";
import User from './user'

const Users = (props) => {
    const {users, onDelete, onToggleBookMark} = props
    
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
                    <th>Кнопка</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    <User
                        key={user._id}
                        user={user}
                        onDelete={onDelete}
                        onToogleBookMark={onToggleBookMark}
                    />
                })}
                </tbody>
            </table>)}
        </>)
}

export default Users