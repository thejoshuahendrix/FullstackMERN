import React, { useState } from 'react'
import { Redirect } from 'react-router';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user = { name, password };
        fetch('http://localhost:4000/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(async (res) => {
            let response = await res.json();
            localStorage.setItem("token", response);
            setPassword('');
            localStorage.setItem('auth', 'true');
            window.location.replace('/users')

        })
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <label>Name:</label>
                <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >

                </input>
                <label>Password:</label>
                <input type='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>

                </input>
                <input type='submit' onClick={handleSubmit} placeholder="Login"></input>
            </form>
        </div>
    )
}

export default Login
