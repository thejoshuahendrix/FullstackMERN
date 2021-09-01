import React from 'react'
import { useState } from 'react'
import { Container } from './UserCard'




type PropType = {
    name: string;
    title: string;
    content: string;
    id: string;
    onDelete: (id: string) => void;
    username: string;
}

const PostCard = (props: PropType) => {
    const deleteItem = () => props.onDelete(props.id)
    return (
        <Container>
            <p>Name: {props.name}<br />
                Title: {props.title} <br />
                Content: {props.content}</p>
            {props.username === props.name ?
                <button onClick={deleteItem}>Delete</button> : ""
            }
        </Container>
    )
}

export default PostCard;
