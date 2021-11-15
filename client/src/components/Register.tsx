import { useState } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import Hero from "./Hero";

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user = { name, password, email };
        fetch(process.env.REACT_APP_SERVER_URL+'/api/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(async (res) => {
            let response = await res.json();
            console.log(response);
            setPassword('');
            window.location.replace('/')
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
                </Form>
            </div>
        </div >
    )
}

export default Register