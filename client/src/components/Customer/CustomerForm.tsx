import React from 'react'
import { useState } from 'react'
import { Button, Form, Input, Label } from 'reactstrap'

export const CustomerForm = () => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const token = localStorage.getItem('token');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const customer = { fname, lname, email, address: { street, city, state } }
        fetch('/api/customer', {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
            body: JSON.stringify(customer)
        })
        window.location.replace('/customer')
    }

    return (
        <div style={{margin:'2rem', padding:'2rem'}}>
        
            <Form > 
                <Label>First Name:</Label>
                <Input type='text' name='fname' onChange={(e) => setFname(e.target.value)}></Input>
                <Label>Last Name:</Label>
                <Input type='text' name='lname' onChange={(e) => setLname(e.target.value)}></Input>
                <Label>Email:</Label>
                <Input type='email' name='email' onChange={(e) => setEmail(e.target.value)}></Input>
                <Label>Street Address:</Label>
                <Input type='text' name='street' onChange={(e) => setStreet(e.target.value)}></Input>
                <Label>City:</Label>
                <Input type='text' name='city' onChange={(e) => setCity(e.target.value)}></Input>
                <Label>State:</Label>
                <Input type='text' name='state' onChange={(e) => setState(e.target.value)}></Input>
                <Button style={{margin:'2rem'}} type='submit' onClick={handleSubmit}>Add Customer</Button>
            </Form>
        </div>
    )
}

export default CustomerForm
