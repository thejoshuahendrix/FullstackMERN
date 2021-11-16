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
    const [error, setError] = useState('');

    const deleteItem = () => props.onDelete(props.id);
    const editItem = (id: string, title: string, content: string) => {
        fetch('/api/posts/update/' + id, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content, title, date: new Date() }) }).then(res => {
            window.location.replace('/posts');
             
        });



    }




    return (
        <div className="card" style={{ marginBottom: '2rem', border: '1px solid black', width: "60vw", padding: "2rem" }}>
            <tr>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ marginRight: '2rem' }}>{isEdit ? <input type='text' placeholder={props.title} onChange={(e) => { setTitle(e.target.value) }} value={inputtitle} ></input> : props.title}</h3><div>{props.name}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {isEdit ? <Button className="bg-info" onClick={() => { editItem(props.id, inputtitle, inputcontent) }}>Save</Button> : ""}
                    {props.username === props.name ?
                        <div style={{ float: 'right' }}>

                            <Button className="bg-danger" onClick={deleteItem}>Delete</Button>
                            <Button className="bg-secondary" onClick={() => setIsEdit(!isEdit)}>Edit</Button>
                        </div> : props.isAdmin ? <div style={{ float: 'right' }}>
                            <Button className="bg-danger" onClick={deleteItem}>Delete</Button>
                            <Button className="bg-secondary" onClick={() => setIsEdit(!isEdit)}>Edit</Button>
                        </div> : ""
                    }
                </div>
            </tr>

            <div>{isEdit ? <textarea placeholder={props.content} onChange={(e) => { setContent(e.target.value) }} value={inputcontent}></textarea> : props.content}</div>
            <div style={{ color: 'red' }}>{error ? error : ""}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div></div>
                <div style={{ float: 'right' }}>{new Date(Date.parse(props.date)).toLocaleString()}</div>
            </div>
        </div>

    )
}

export default PostCard;
