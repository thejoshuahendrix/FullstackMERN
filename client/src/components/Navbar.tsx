import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge,
} from 'reactstrap';

type PropTypes = {
    user: string;
    isAdmin: boolean;
    isLoggedIn: boolean;
}
const NavbarHeader = (props: PropTypes) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">Fullstack Project</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {
                            props.isAdmin ? <NavItem>
                                <NavLink href="/users">Users</NavLink>
                            </NavItem> : ""
                        }

                        <NavItem>
                            <NavLink href="/posts">Posts</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/customer">Customers</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Account:{props.isLoggedIn ? <Badge >{props.user} Logged In</Badge> : <Badge>Logged Out</Badge>}
                            </DropdownToggle>
                            <DropdownMenu right>
                                {
                                    props.isLoggedIn ? "" :
                                        <DropdownItem >
                                            <NavLink style={{ color: 'black' }} href="/register">Register</NavLink>
                                        </DropdownItem>
                                }

                                {
                                    props.isLoggedIn ?

                                        <DropdownItem >
                                            <NavLink style={{ color: 'black' }} href="/account">My Account</NavLink>
                                        </DropdownItem>
                                        : ""
                                }

                                <DropdownItem divider />
                                {
                                    props.isLoggedIn ? "" :
                                        <DropdownItem >
                                            <NavLink style={{ color: 'black' }} href="/login">Login</NavLink>
                                        </DropdownItem>
                                }

                                {
                                    props.isLoggedIn ?

                                        <DropdownItem >
                                            <NavLink style={{ color: 'black' }} href="/logout">Logout</NavLink>
                                        </DropdownItem>
                                        : ""
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </Nav>
                </Collapse>
            </Navbar>

        </div>
    );
}

export default NavbarHeader;
