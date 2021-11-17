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
            <Input type="text" name="name" placeholder={isLoggedIn?name:""} />
            <Input type="email" name="email" placeholder="Please enter email..." />
            <Input type="text" name="message" placeholder="Enter a message..." />
            </Form>
        </div>
    )
}

export default Contact
