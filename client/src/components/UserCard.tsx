import React from 'react'
import { Button } from 'reactstrap';
import styled from 'styled-components';


export const Container = styled.div`
 width:50vw;
 padding:20px;
 text-align:center;
 margin: 20px 40px 20px 40px;
 box-shadow: 20px 20px 20px rgba(0,0,0,.2);
 border: 1px solid rgba(0,0,0,.1);
 background-color: rgb(30,30,30);
 font-size:12px;
`


type PropType = {
    name: string;
    password: string;
    email: string;
    id: string;
    username: string;
    role: string;
    isAdmin: boolean;
    onDelete: (id: string) => void;
}


const UserCard = (props: PropType) => {
    const deleteItem = () => props.onDelete(props.id)
    return (
        <>
            <tr><th>{props.id}</th><td>{props.name}</td><td>{props.password}</td><td>{props.email}</td>
                {
                    props.name === props.username ? <Button className="bg-danger" onClick={deleteItem}>Delete</Button> : props.isAdmin ? <Button className="bg-danger" onClick={deleteItem}>Delete</Button> : ""
                }
            </tr>
        </>
    )
}

export default UserCard;
