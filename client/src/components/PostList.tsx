import React, { useState } from 'react'
import { useEffect } from 'react'

const PostList = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetch('http://localhost:4000/', { method: "GET", headers: { "Authorization": "Bearer " + token } })
            .then(response => response.json())
            .then(data => console.log(data));

    
}, [])



return (
    <div>
        <div>
            Here are the posts
        </div>
    </div>


)
}

export default PostList
