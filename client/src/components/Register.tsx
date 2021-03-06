import { useState } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import Hero from "./Hero";

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user = { name, password, email };
        fetch('/api/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(async (res) => {
            if (res.status === 200) {

                let response = await res.json();
                setPassword('');
                window.location.replace('/')
            }
            else {
                setError('Please enter all fields with valid input');
            }
        })
    }

    return (
        <div style={{ margin: '2rem', padding: '2rem' }}>
            <Hero isLoggedIn={false} header="Register Page" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Form>
                    <Label>Name</Label>
                    <Input
                        style={{ width: '30vw' }}
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Input>

                    <Label>Password</Label>
                    <Input
                        style={{ width: '30vw' }}
                        type='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>

                    </Input>
                    <Label>Email</Label>
                    <Input
                        style={{ width: '30vw' }}
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>

                    </Input>
                    <Button style={{ marginTop: 20 }} type='submit' onClick={handleSubmit}>Register</Button>
                    <div style={{ color: 'red' }}>{error ? error : ""}</div>
                </Form>
            </div>
        </div >
    )
}

export default Register