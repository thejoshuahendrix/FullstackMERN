import React from 'react'
import { useState } from 'react'
type PropType = {
    username: string;
}
const AddPost = (props: PropType) => {
    const [name, setName] = useState(props.username);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const token = localStorage.getItem('token');
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const post = { name, title, content };

        fetch('http://localhost:4000/posts', {
            method: "POST",
            headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
            body: JSON.stringify(post)
        }).then(async (res) => {
            let response = await res.json();


        }).then(res =>
            window.location.replace('http://localhost:3000/posts')
        )
    }


    return (
        <div>
            <form>

                <input type='text'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>

                </input>
                <input type='text'
                    name='content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}>

                </input>
                <input type='submit' onClick={handleSubmit}></input>
            </form>
        </div>
    )
}

export default AddPost
