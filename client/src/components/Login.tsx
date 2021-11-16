import React, { useState } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import Hero from './Hero';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user = { name, password };
        fetch('/api/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(async (res) => {
            let response = await res.json();
            if (res.status === 200) {
                localStorage.setItem("token", response);
                setPassword('');
                localStorage.setItem('auth', 'true');
                window.location.replace('/posts')
            }else{
                setError('Invalid Credentials');
            }

        })
    }

    return (
        <div style={{ margin: '2rem', padding: '2rem' }}>

            <Hero isLoggedIn={true} header="Login Page" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Name</Label>
                        <Input style={{ width: '30vw' }} type="text" name="name" id="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Password</Label>
                        <Input style={{ width: '30vw' }} type="password" name="password" id="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                    </FormGroup>
                    <Button style={{ marginTop: 20 }} onClick={handleSubmit}>Submit</Button>
                </Form>
                <div style={{color:'red'}}>{error?error:""}</div>
                <div style={{ marginTop: 20 }}>
                    Need an account? Click <a href="/register" >Here</a> to Register
                </div>
            </div>
        </div>
    )
}

export default Login
