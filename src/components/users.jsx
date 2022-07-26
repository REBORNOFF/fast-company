import React, {useState} from "react";
import API from "../api";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());
    const [numberOfPeople, setNumberOfPeople] = useState(users.length);

    const createWord = (value) => {
        const wordsArray = ['Человек', 'Человека'];
        value = Math.abs(value) % 100;
        const num = value % 10;
        if(value > 10 && value < 20) return `${value} ${wordsArray[0]} тусанет с тобой сегодня`;
        if(num > 1 && num < 5) return `${value} ${wordsArray[1]} тусанет с тобой сегодня`;
        if(num === 1) return `${value} ${wordsArray[0]} тусанет с тобой сегодня`;
        return `${value} ${wordsArray[0]} тусанет с тобой сегодня`;
    }

    const deleteUser = (userId) => {
        setUsers((prevState) => prevState.filter(user => user._id !== userId));
        setNumberOfPeople((prevState) => prevState - 1)
    }

    if (users.length === 0) {
        return <span className={'badge bg-danger fs-3'}>Никто с тобой не тусанет</span>
    }

    return (
        <>
            <h1 className={'badge bg-primary fs-3'}>{createWord(numberOfPeople)}</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.qualities.map((test) => {
                                        return <span key={Math.random() * 10} className = {'badge me-2 bg-' + test.color}> {test.name + ' '}</span>;
                                    })}</td>
                                    <td>{user.profession.name}</td>
                                    <td>{user.completedMeetings}</td>
                                    <td>{user.rate + '/5'}</td>
                                    <td>
                                        <button
                                            type={'button'}
                                            className={'btn btn-danger'}
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Users;