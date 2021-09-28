import React from 'react'
import { Button } from 'reactstrap';
import Hero from './Hero';

const Logout = () => {

    const removeToken = () => {
        localStorage.clear();
        window.location.replace('http://localhost:3000/')
    }


    return (

        <div style={{ margin: '2rem', padding: '2rem' }} >
            <Hero isLoggedIn={true} header="Logout Page" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                <Button style={{ width: '30vw' }} onClick={removeToken}>Logout</Button>
            </div>
        </div>
    )
}

export default Logout;
