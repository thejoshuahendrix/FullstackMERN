import React, { useState } from 'react'
import { useEffect } from 'react'
import UserCard from './UserCard';
import { Table } from 'reactstrap';
import Hero from './Hero';


type PropType = {
    username: string;
    isAdmin: boolean;
    isLoggedIn: boolean;
}
const UserList = (props: PropType) => {
    const [data, setData] = useState([{ _id: "", name: "", email: "", password: "", role: "" }]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch('http://localhost:4000/', { method: "GET", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json())
            .then(res => setData(res));
    },[token]);

    const handleDelete = (id: string) => {
        fetch('http://localhost:4000/' + id, { method: "DELETE", headers: { "Authorization": "Bearer " + token } });
    }


    return (
        <div style={{ margin: '2rem', padding: '2rem' }}>
            <>
                <Hero isLoggedIn={props.isLoggedIn} header="User List" />

                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Password</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(d => { return (<UserCard isAdmin={props.isAdmin} key={d._id} id={d._id} username={props.username} name={d.name} password={d.password} email={d.email} role={d.role} onDelete={handleDelete} />) })}
                    </tbody>
                </Table>
            </>
        </div>


    )
}

export default UserList
