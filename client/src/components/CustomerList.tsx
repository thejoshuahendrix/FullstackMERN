import React, { useEffect, useState } from 'react'
import CustomerCard from './CustomerCard';

const CustomerList = () => {
    const [data, setData] = useState([{ _id: "", fname: "", lname: "", email: "", address:{ street: "", city:"", state:""}}]);
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch('http://localhost:4000/customer', { method: "GET" })
            .then(response => response.json())
            .then(res => setData(res));


    }, [message])

    const handleDelete = (id: string) => {
        fetch('http://localhost:4000/customer/' + id, { method: "DELETE" })
            .then(response => response.json()).then(data =>
                setMessage(data));




    }




    return (
        <>
            {data.map(d => { return (<CustomerCard key={d._id} id={d._id} name={d.fname + " " + d.lname} city={d.address.city} street={d.address.street} state={d.address.state}email={d.email} onDelete={handleDelete} />) })}
        </>
    )
}

export default CustomerList
