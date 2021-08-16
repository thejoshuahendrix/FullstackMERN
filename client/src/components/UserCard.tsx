import React from 'react'
import styled from 'styled-components';


export const Container = styled.div`
 width:80%;
 padding:20px;
 text-align:center;
 margin: 20px 40px 20px 40px;
`


type PropType = {
    name: string;
    password: string;
    email: string;
    id: string;
    username: string;
    onDelete: (id: string) => void;
}


const UserCard = (props: PropType) => {
    const deleteItem = () => props.onDelete(props.id)
    return (
        <Container>
            <p>Name: {props.name}<br />
                Password: {props.password} <br />
                Email: {props.email}</p>
            {
                props.name === props.username ? <button onClick={deleteItem}>Delete</button> : ""
            }

        </Container>
    )
}

export default UserCard;
