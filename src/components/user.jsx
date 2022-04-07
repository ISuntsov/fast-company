import React from "react";
import Quailitie from "./quailitie";
import BookMark from "./bookmark";

const User = (props) => {
    const {user} = props
    //const renderUserTableLine = () => {
//     return users.length !== 0 && users.map((user) => {
//     })
//     console.log(props)
//     const handleDelete = (id) => {
//         setUsers((prevState) => prevState.filter((user) => user._id !== id));
//     }
//
    return (
        <tr>
            <td>{user.name}</td>
            <td><Quailitie
                key={user._id}
                qualitie={user.quailitie}
            />
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <button
                    className='btn btn-danger btn-sm m-2'
                    // onClick={() => handleDelete(user._id)}
                >
                    Удалить
                </button>
            </td>
        </tr>
    )
}


export default User