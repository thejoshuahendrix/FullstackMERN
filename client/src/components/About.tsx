import React from 'react'
import Hero from './Hero'
type PropTypes = {
    isLoggedIn: boolean
}
const About = ({ isLoggedIn }: PropTypes) => {
    return (

        <div>
            <Hero isLoggedIn={isLoggedIn} header="About Page" />
            <div style={{ margin: "30%", display: "flex", flexDirection: 'column' }}>This project was created as a part of my portfolio.
                <p>I am Joshua Hendrix, full-stack developer.
                    I love to create and engineer full-stack applications.
                    I appreciate you taking the time to read this about me.</p>
            </div>
        </div>
    )
}

export default About
