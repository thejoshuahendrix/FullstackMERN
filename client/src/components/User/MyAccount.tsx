import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken';
import UserCard from './UserCard';
import { Table } from 'reactstrap';
import Hero from '../Hero';


let decoded: any = jwt.decode(localStorage.getItem('token') ?? "");

type PropType = {
    isLoggedIn: boolean;
}

const MyAccount = (props: PropType) => {

    const [data, setData] = useState({ _id: "", name: "", email: "", password: "", role: "" });
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL+'/user/' + decoded.username, { method: "GET", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json())
            .then(res => setData(res));


    }, [token]);

    const handleDelete = (id: string) => {
        fetch(process.env.REACT_APP_SERVER_URL + "/" +id, { method: "DELETE", headers: { "Authorization": "Bearer " + token } });
        localStorage.clear();
        window.location.replace('/');




    }

    return (
        <>
        <div style={{ margin: '2rem', padding: '2rem' }}>
            <Hero isLoggedIn={props.isLoggedIn} header="My Account" />

            <UserCard isAdmin={false} name={data.name} password={data.password} email={data.email} id={data._id} username={data.name} role={data.role} onDelete={handleDelete} />
        </div>
        </>
    )
}

export default MyAccount
