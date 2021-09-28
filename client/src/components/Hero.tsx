import React from 'react'
import { Button, Jumbotron } from 'reactstrap'


type PropType = {
  header:string;
  isLoggedIn:boolean;
}
const Hero = (props: PropType) => {
  return (
    <div style={{margin:'2rem', padding:'2rem'}}>
      <Jumbotron>
        <h1 className="display-3">{props.header}</h1>
        <p className="lead">This is a simple example of a fullstack MERN app styled with Bootstrap</p>
        <hr className="my-2" />
        <p>It uses its own API and Mongo DB to store info on the server and manage user authentication with the help of JSON web token</p>
        <p className="lead">
          {props.isLoggedIn?"":<Button color="secondary" href="/login">Login to Start</Button>}
        </p>
      </Jumbotron>
    </div>
  )
}

export default Hero
