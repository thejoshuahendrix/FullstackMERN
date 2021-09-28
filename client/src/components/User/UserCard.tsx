import React from 'react'
import { Button, Card, Table } from 'reactstrap';
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
            <Card style={{ margin: 20 }}>

                <Table>


                    <tr>
                        <th style={{ borderRight: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                            <div>ID:</div>
                        </th>
                        <th style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>{props.id}{
                                props.name === props.username ? <Button className="bg-danger" onClick={deleteItem}>Delete</Button> : props.isAdmin ? <Button className="bg-danger" onClick={deleteItem}>Delete</Button> : ""
                            }</div>
                        </th>
                    </tr>

                    <tr>
                        <th style={{ borderRight: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                            <div>Name:</div>
                        </th>
                        <th style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                            <div>{props.name}</div>
                        </th>
                    </tr>
                    <tr>
                        <th style={{ borderRight: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                            <div>Password:</div>
                        </th>
                        <th style={{ borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                            <div>{props.password}</div>
                        </th>
                    </tr>
                    <tr>
                        <th style={{ borderRight: '1px solid rgba(0,0,0,.1)' }}>
                            <div>Email:</div>
                        </th>
                        <th>
                            <div>{props.email}</div>
                        </th>
                    </tr>


                </Table>
            </Card>
        </>
    )
}

export default UserCard;
