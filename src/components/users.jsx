import React, {useState} from "react";
import api from '../api'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }
    
    const renderPhrase = (number) => {
        let phrase
        let classes = "badge m-2 bg-primary"
        switch (number) {
            case 0:
                phrase = 'Никто с тобой не тусанет';
                classes = "badge m-2 bg-danger";
                break;
            case 2:
            case 3:
            case 4:
                phrase = number + ' человека тусанут с тобой сегодня';
                break;
            default:
                phrase = number + ' человек тусанет с тобой сегодня';
                break;
        }
        
        return (
            <h3 className="text-center">
                <span className={classes}>
                {phrase}
                </span>
            </h3>)
    }
    
    const renderUserTableLine = () => {
        return users.length !== 0 && users.map((user) => {
            let classes = "badge m-2 bg-"
            return (
                <tr key={user._id}>
                    <th>{user.name}</th>
                    <td>
                        {user.qualities.map(quality => {
                            return (<span
                                key={quality._id}
                                className={classes + quality.color}>
                                {quality.name}
                            </span>)
                        })}
                    </td>
                    <th>{user.profession.name}</th>
                    <th>{user.completedMeetings}</th>
                    <th>{user.rate}/5</th>
                    <th>
                        <button
                            className='btn btn-danger btn-sm m-2'
                            onClick={() => handleDelete(user._id)}>
                            Удалить
                        </button>
                    </th>
                </tr>
            )
        })
    }
    
    const renderTable = () => {
        return (
            <table className="table table-striped table-hover">
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
                {renderUserTableLine()}
                </tbody>
            </table>)
    }
    
    if (users.length === 0) {
        return (
            <>
                {renderPhrase(users.length)}
            </>)
    }
    
    return (
        <>
            {renderPhrase(users.length)}
            {renderTable()}
        </>)
    
    
};

export default Users;