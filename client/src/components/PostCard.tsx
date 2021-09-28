import React from 'react'
import { useState } from 'react'
import { Button } from 'reactstrap'




type PropType = {
    name: string;
    title: string;
    content: string;
    id: string;
    onDelete: (id: string) => void;
    username: string;
    date: string;
    isAdmin: boolean;
}

const PostCard = (props: PropType) => {
    const [isEdit, setIsEdit] = useState(false);
    const [inputtitle, setTitle] = useState(props.title);
    const [inputcontent, setContent] = useState(props.content);

    const deleteItem = () => props.onDelete(props.id);
    const editItem = (id: string, title: string, content: string) => {
        fetch('http://localhost:4000/posts/update/' + id, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content, title, date: new Date() }) });

        window.location.replace('http://localhost:3000/posts');

    }




    return (
        <div className="card" style={{ marginBottom: '2rem', border: '1px solid black', width: "80vw", height: "30vh", padding: "2rem" }}>
            <tr>
                <h2 style={{marginRight:'2rem'}}><strong>Title: </strong>{isEdit ? <input type='text' placeholder={props.title} onChange={(e) => { setTitle(e.target.value) }} value={inputtitle} ></input> : props.title}</h2>

                <th><strong>ID: </strong>{props.id}</th>

                {isEdit ? <Button className="bg-info" onClick={() => { editItem(props.id, inputtitle, inputcontent) }}>Save</Button> : ""}
                {props.username === props.name ?
                    <div style={{float:'right'}}>
                        <Button className="bg-danger" onClick={deleteItem}>Delete</Button>
                        <Button className="bg-secondary" onClick={() => setIsEdit(!isEdit)}>Edit</Button>
                    </div> : props.isAdmin?<div style={{float:'right'}}>
                        <Button className="bg-danger" onClick={deleteItem}>Delete</Button>
                        <Button className="bg-secondary" onClick={() => setIsEdit(!isEdit)}>Edit</Button>
                    </div>:""
                }
            </tr>
            <div><strong>Name: </strong>{props.name}</div>

            <div style={{ height: '15vh' }}><strong>Content: </strong>{isEdit ? <textarea placeholder={props.content} onChange={(e) => { setContent(e.target.value) }} value={inputcontent}></textarea> : props.content}</div>
            <td><strong>Date: </strong>{new Date(Date.parse(props.date)).toLocaleString()}</td>

        </div>

    )
}

export default PostCard;
