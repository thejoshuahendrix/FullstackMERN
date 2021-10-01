import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import { Table } from 'reactstrap';
import Hero from '../Hero';
import AddPostModal from './AddPostModal';

type PropType = {
    username: string;
    isAdmin: boolean;
    isLoggedIn: boolean;
}
const PostList = (props: PropType) => {
    const [data, setData] = useState([{ _id: "", name: "", title: "", content: "", date: "" }]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL+'/posts', { method: "GET", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json())
            .then(res => setData(res));
    }, [token])

    const handleDelete = (id: string) => {
        fetch(process.env.REACT_APP_SERVER_URL+'/posts/' + id, { method: "DELETE", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json());
        window.location.replace('http://localhost:3000/posts')


    }




    return (
        <div style={{ margin: '2rem', padding: '2rem' }}>
            <Hero isLoggedIn={props.isLoggedIn} header="Post's Page" />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <AddPostModal username={props.username} />

                {data.map(d => { return (<PostCard isAdmin={props.isAdmin} key={d._id} id={d._id} date={d.date} username={props.username} name={d.name} title={d.title} content={d.content} onDelete={handleDelete} />) })}
            </div>
        </div>
    )
}

export default PostList
