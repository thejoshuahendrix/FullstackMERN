import React from 'react'
import { Button } from 'reactstrap';
import Hero from './Hero';

const Logout = () => {

    const removeToken = () => {
        localStorage.clear();
        window.location.replace('http://localhost:3000/')
    }


    return (

        <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>
            <Hero isLoggedIn={true} header="Logout Page" />
            <Button style={{width:'30vw'}} onClick={removeToken}>Logout</Button>
        </div>
    )
}

export default Logout;
