import React from 'react';
import useMockData from '../utils/mockData';

const Main = () => {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        initialize();
    };

    return (
        <div className="container md-5">
            <h1>Main page</h1>
            <h3>Инициализация данных FireBase</h3>
            <ul>
                <li>Статус: {status}</li>
                <li>Прогресс: {progress}%</li>
                {error && <li>Ошибка: {error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Инициализировать
            </button>
        </div>
    );
};

export default Main;
