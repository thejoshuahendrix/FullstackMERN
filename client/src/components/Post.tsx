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
}


const Post = (props: PropType) => {
    return (
        <Container>
            <p>Name: {props.name}<br/>
                Password: {props.password} <br/>
                Email: {props.email}</p>
        </Container>
    )
}

export default Post
