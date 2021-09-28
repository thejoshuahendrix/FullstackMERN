import React from 'react'
import { Button } from 'reactstrap'




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
        <>
            <tr>


                <td> {props.name}</td>
                <td> {`${props.street} ${props.city}, ${props.state}`}  </td>
                <td> {props.email}</td>

                <Button className="bg-danger" onClick={deleteItem}>Delete</Button>

            </tr>
        </>
    )
}

export default CustomerCard
