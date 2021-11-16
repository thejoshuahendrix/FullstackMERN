import React from 'react'
import { useState } from 'react'
import { Button, Form, Input, Label } from 'reactstrap';

type PropType = {
    username: string;
}

const AddPost = (props: PropType) => {
    const [name] = useState(props.username);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const token = localStorage.getItem('token');
    const [error, setError] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const post = { name, title, content };
        fetch('/api/posts', {
            method: "POST",
            headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
            body: JSON.stringify(post)
        }).then(async (res) => {
            if (res.status === 200) {
                window.location.replace('/posts')

            } else {
                setError("Enter all fields")
            }
        })
    }


    return (
        <div>
            <h2>Add a Post</h2>
            <Form style={{ marginBottom: '2rem' }}>
                <Label>Title</Label>
                <Input type='text'
                    name='title'

                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>

                </Input>
                <Label>Content</Label>
                <Input type='textarea'
                    name='content'

                    value={content}
                    onChange={(e) => setContent(e.target.value)}>

                </Input>
                <Button type='submit' onClick={handleSubmit}>Add Post</Button>
                <div style={{ color: 'red' }}>{error ? error : ""}</div>
            </Form >

        </div>
    )
}

export default AddPost
