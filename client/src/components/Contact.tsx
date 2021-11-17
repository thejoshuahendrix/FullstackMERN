import React, { useState } from 'react'
import {Input, Form, Label} from 'reactstrap';
type PropTypes = { 
    username:string,
    isLoggedIn:boolean
}
const Contact = ({username, isLoggedIn}:PropTypes) => {
    const [name, setName] = useState(username?username:"")
    return (
        <div style={{margin: '2rem', padding: '2rem'}} >
            <Form>
                <Label>Name</Label>
            <Input type="text" name="name" placeholder={isLoggedIn?name:""} />
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Please enter email..." />
            <Label>Message</Label>
            <Input type="text" name="message" placeholder="Enter a message..." />
            </Form>
        </div>
    )
}

export default Contact
