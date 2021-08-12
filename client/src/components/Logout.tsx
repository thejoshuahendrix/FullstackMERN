import React from 'react'

const Logout = () => {

    const removeToken= () => {
        localStorage.setItem('token' , '');
    }


    return (

        <div>
            <button onClick={removeToken}>Logout</button>
        </div>
    )
}

export default Logout;
