import { useState } from "react";

const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email,setEmail ] = useState('');
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const user = {name,password,email};
        fetch('http://localhost:4000/register', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(user)
        }).then(async (res) => {
            let response = await res.json();
            console.log(response);
            setPassword('');
            window.location.replace('http://localhost:3000/')
        })
    }
    
    return (
        <div>
            <form>
                <label>Name</label>
                <input 
                type='text'
                name='name'
                value={name}
                onChange={(e)=> setName(e.target.value)}
                >

                </input>

                <label>Password</label>
                <input type='password'
                name='password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}>

                </input>
                <label>Email</label>
                <input type='email'
                name='email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}>

                </input>
                <input type='submit' onClick={handleSubmit}></input>
            </form>
        </div>
    )
}

export default Register