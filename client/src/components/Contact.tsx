import React, { useState } from 'react'
import {Input, Form} from 'reactstrap';
type PropTypes = { 
    username:string,
    isLoggedIn:boolean
}
const Contact = ({username, isLoggedIn}:PropTypes) => {
    const [name, setName] = useState(username?username:"")
    return (
        <div>
            <Form>
            <Input type="text" placeholder={isLoggedIn?name:""} />
            </Form>
        </div>
    )
}

export default Contact
