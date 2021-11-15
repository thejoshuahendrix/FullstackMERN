import React, { useState } from 'react'
import { useEffect } from 'react'
import UserCard from './UserCard';
import { Card, Table } from 'reactstrap';
import Hero from '../Hero';


type PropType = {
    username: string;
    isAdmin: boolean;
    isLoggedIn: boolean;
}
const UserList = (props: PropType) => {
    const [data, setData] = useState([{ _id: "", name: "", email: "", password: "", role: "" }]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch('/api/', { method: "GET", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json())
            .then(res => setData(res));
    }, [token]);

    const handleDelete = (id: string) => {
        fetch('/api/' + id, { method: "DELETE", headers: { "Authorization": "Bearer " + token } });
        window.location.replace('/users');
    }

    return (
        <div style={{ margin: '2rem', padding: '2rem' }}>
            <>
                <Hero isLoggedIn={props.isLoggedIn} header="User List" />
                
                {data.map(d => { return (<UserCard isAdmin={props.isAdmin} key={d._id} id={d._id} username={props.username} name={d.name} password={d.password} email={d.email} role={d.role} onDelete={handleDelete} />) })}


            </>
        </div>


    )
}

export default UserList
