import React, { useState } from 'react'
import { Redirect } from 'react-router';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const user = {name,password};
        fetch('http://localhost:4000/login', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(user)
        }).then(async (res) => {
            let response = await res.json();
            localStorage.setItem("token",response);
            setPassword('');
            
        })
    }
    
    return (
        <div>
            <form>
                <input 
                type='text'
                name='name'
                value={name}
                onChange={(e)=> setName(e.target.value)}
                >

                </input>
                <input type='password'
                name='password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}>

                </input>
                <input type='submit' onClick={handleSubmit}></input>
            </form>
        </div>
    )
}

export default Login
