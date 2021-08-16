import React from 'react'

const Logout = () => {

    const removeToken= () => {
        localStorage.clear();
        window.location.replace('http://localhost:3000/')
    }


    return (

        <div>
            <h2>Logout</h2>
            <button onClick={removeToken}>Logout</button>
        </div>
    )
}

export default Logout;
