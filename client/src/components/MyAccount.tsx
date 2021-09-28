import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken';
import UserCard from './UserCard';
import { Table } from 'reactstrap';
import Hero from './Hero';


let decoded: any = jwt.decode(localStorage.getItem('token') ?? "");

type PropType = {
    isLoggedIn: boolean;
}

const MyAccount = (props: PropType) => {

    const [data, setData] = useState({ _id: "", name: "", email: "", password: "", role: "" });
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:4000/user/' + decoded.username, { method: "GET", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json())
            .then(res => setData(res));


    });

    const handleDelete = (id: string) => {
        fetch('http://localhost:4000/' + id, { method: "DELETE", headers: { "Authorization": "Bearer " + token } });
        localStorage.clear();
        window.location.replace('http://localhost:3000/');




    }

    return (
        <>
            <Hero isLoggedIn={props.isLoggedIn} header="My Accoount" />
            <Table style={{ marginLeft: 40 }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Password</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    <UserCard isAdmin={false} name={data.name} password={data.password} email={data.email} id={data._id} username={data.name} role={data.role} onDelete={handleDelete} />
                </tbody>
            </Table>
        </>
    )
}

export default MyAccount
