import React, { useEffect, useState } from 'react'
import AddPost from './AddPost';
import PostCard from './PostCard';

type PropType = {
    username:string;
}
const PostList = (props:PropType) => {
    const [data, setData] = useState([{ _id: "", name: "", title: "", content: "" }]);
    const[message, setMessage] =  useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch('http://localhost:4000/posts', { method: "GET", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json())
            .then(res => setData(res));


    }, [message])

    const handleDelete = (id: string) => {
        fetch('http://localhost:4000/posts/' + id, { method: "DELETE", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json()).then(data => setMessage(data));



    }



    return (
        <div>
            <AddPost username={props.username} />
            <h1>Posts</h1>
            {data.map(d => { return (<PostCard key={d._id} id={d._id} username={props.username} name={d.name} title={d.title} content={d.content} onDelete={handleDelete} />) })}
        </div>
    )
}

export default PostList
