import React, { useState } from 'react'
import { useEffect } from 'react'
import Post from './Post';

const PostList = () => {
    const [data, setData] = useState([{_id:"",name:"",email:"",password:""}]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch('http://localhost:4000/', { method: "GET", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json())
            .then(res => setData(res));

    
}, [])



return (
    <div>
        <div>
            here
            {data.map(d=>{return(<Post key={d._id} name={d.name} password={d.password} email={d.email} />)})}
        </div>
    </div>


)
}

export default PostList
