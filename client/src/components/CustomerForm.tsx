import React from 'react'
import { useState } from 'react'

export const CustomerForm = () => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const customer = { fname, lname, email, address: { street, city, state } }
        fetch('http://localhost:4000/customer', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer)
        }).then(async (res) => {
            let response = await res.json();
            
        })
        window.location.replace('/customerlist')
    }



    return (
        <>
            <form>
                <label>First Name:</label>
                <input type='text' name='fname' onChange={(e) => setFname(e.target.value)}></input>
                <label>Last Name:</label>
                <input type='text' name='lname' onChange={(e) => setLname(e.target.value)}></input>
                <label>Email:</label>
                <input type='email' name='email' onChange={(e) => setEmail(e.target.value)}></input>
                <label>Street Address:</label>
                <input type='text' name='street' onChange={(e) => setStreet(e.target.value)}></input>
                <label>City:</label>
                <input type='text' name='city' onChange={(e) => setCity(e.target.value)}></input>
                <label>State:</label>
                <input type='text' name='state' onChange={(e) => setState(e.target.value)}></input>
                <input type='submit' onClick={handleSubmit} placeholder="Login"></input>
            </form>
        </>
    )
}

export default CustomerForm
