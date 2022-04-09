import React from "react";
import Quailitie from "./quailitie";
import BookMark from "./bookmark";

const User = ({user, onDelete, onToggleBookMark}) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((quailitie) => {
                    return <Quailitie
                        key={quailitie._id}
                        quailitie={quailitie}/>
                })}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <BookMark
                    onToggleBookMark={onToggleBookMark}
                    user={user}
                />
            </td>
            <td>
                <button
                    className='btn btn-danger btn-sm ms-1'
                    onClick={() => onDelete(user._id)}>
                    Удалить
                </button>
            </td>
        </tr>
    )
}


export default User