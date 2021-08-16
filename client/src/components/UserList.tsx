import React, { useState } from 'react'
import { useEffect } from 'react'
import UserCard from './UserCard';


type PropType = {
    username: string;
}
const UserList = (props: PropType) => {
    const [data, setData] = useState([{ _id: "", name: "", email: "", password: "" }]);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch('http://localhost:4000/', { method: "GET", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json())
            .then(res => setData(res));


    }, [message])

    const handleDelete = (id: string) => {
        fetch('http://localhost:4000/' + id, { method: "DELETE", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json()).then(data => setMessage(data));



    }


    return (
        <div>
            <div>
                here
                {data.map(d => { return (<UserCard key={d._id} id={d._id} username={props.username} name={d.name} password={d.password} email={d.email} onDelete={handleDelete} />) })}
            </div>
        </div>


    )
}

export default UserList
