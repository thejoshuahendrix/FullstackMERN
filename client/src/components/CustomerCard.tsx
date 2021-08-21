import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
 width:80%;
 padding:20px;
 text-align:center;
 margin: 20px 40px 20px 40px;
 box-shadow: 20px 20px 20px rgba(0,0,0,.2);
 border: 1px solid rgba(0,0,0,.1);
 background-color: rgb(30,30,30);
`


type PropType = {
    name: string;
    email: string;
    id: string;
    street: string;
    city: string;
    state: string;
    onDelete: (id: string) => void;
}


const CustomerCard = (props: PropType) => {
    const deleteItem = () => props.onDelete(props.id)
    return (
        <Container>
            <p>Name: {props.name}<br />
                Address: {`${props.street} ${props.city}, ${props.state}`}  <br />
                Email: {props.email}</p>

            <button onClick={deleteItem}>Delete</button>


        </Container>
    )
}

export default CustomerCard
