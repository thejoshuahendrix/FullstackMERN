import React, { useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Hero from './Hero';

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
            window.location.replace('/posts')

        })
    }

    return (
        <div style={{ margin: '2rem', padding: '2rem' }}>

            <Hero isLoggedIn={true} header="Login Page" />

            <Form>
            <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input style={{width:'30vw'}} type ="text" name="name" id="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
            <Label for="exampleEmail">Password</Label>
            <Input style={{width:'30vw'}} type ="password" name="password" id="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            <Button onClick={handleSubmit}>Submit</Button>
            </Form>
            Need an account? Click <a href="/register" >Here</a> to Register
        </div>
    )
}

export default Login
