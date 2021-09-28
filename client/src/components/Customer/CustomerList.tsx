import React, { useEffect, useState } from 'react'
import { Card, CardTitle, Table } from 'reactstrap';
import CustomerCard from './CustomerCard';

const CustomerList = () => {

    const [data, setData] = useState([{
        _id: "",
        fname: "",
        lname: "",
        email: "",
        address: { street: "", city: "", state: "" }
    }]);


    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('http://localhost:4000/customer', { method: "GET", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json())
            .then(res => setData(res));


    }, [token]);

    const handleDelete = (id: string) => {
        fetch('http://localhost:4000/customer/' + id, { method: "DELETE", headers: { "Authorization": "Bearer " + token } });
        window.location.replace('http://localhost:3000/customer');
    }




    return (
        <div style={{ margin: '2rem', padding: '2rem' }}>



            <Table>
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Address
                    </th>
                    <th>
                        Email
                    </th>
                </tr>
            </Table>
            {data.map(d => {
                return (
                    <CustomerCard
                        key={d._id}
                        id={d._id}
                        name={d.fname + " " + d.lname}
                        city={d.address.city}
                        street={d.address.street}
                        state={d.address.state}
                        email={d.email}
                        onDelete={handleDelete} />)
            })}
        </div>
    )
}

export default CustomerList
