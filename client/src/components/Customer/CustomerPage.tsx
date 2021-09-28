import React from 'react'
import CustomerForm from './CustomerForm'
import CustomerList from './CustomerList'
import Hero from '../Hero'

type PropType ={ 
    isLoggedIn: boolean;
}

const CustomerPage = (props : PropType) => {
    return (
        <div style={{ margin: '2rem', padding: '2rem' }}>
            <Hero isLoggedIn={props.isLoggedIn}header="Customer Records"/>
            <CustomerForm />
            <CustomerList />
        </div>
    )
}

export default CustomerPage
