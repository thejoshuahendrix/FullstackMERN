import React from 'react'
import { Button, Card } from 'reactstrap'




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
        <Card>
            <div style={{ padding:20, display: 'flex', flexDirection: "row", justifyContent: 'space-between' }}>
                <div> {props.name}</div>
                <div> {`${props.street} ${props.city}, ${props.state}`}  </div>
                <div> {props.email}</div>
                <Button className="bg-danger" onClick={deleteItem}>Delete</Button>

            </div>
        </Card>
    )
}

export default CustomerCard
