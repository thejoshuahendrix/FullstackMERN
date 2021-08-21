import styled from 'styled-components';



const NavWrapper = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #363636;
    top:0;
    width:100vw;
`

const Logo = styled.div`
    margin: auto;
    margin-left: 10vw;
    text-align: center;
    font-size: large;
    font-family: monospace;
    a{
        color: white;
        text-decoration: none;
    }
  `

const NavLinks = styled.div`
    width: 30vw;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    ul{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        list-style: none;
      }
    a{
        color: white;
        text-decoration: none;
    }
`

const NavBar = () => {
    return (
        <div>
            <NavWrapper>
                <Logo><a href="/">Hendrix Software</a></Logo>
                <NavLinks>
                    {localStorage.getItem('auth')==="true"?
                        <ul>
                            <li><a href="/users">Users</a></li>
                            <li><a href="/logout">Logout</a></li>
                            <li><a href="/posts">PostList</a></li>
                            <li><a href="/customer">Customer Form</a></li>
                            <li><a href="/customerlist">Customer List</a></li>

                        </ul>
                        : <ul>
                            <li><a href="/">Login</a></li>
                            <li><a href="/register">Register</a></li>
                        </ul>}
                </NavLinks>
            </NavWrapper>
        </div>
    )
}

export default NavBar