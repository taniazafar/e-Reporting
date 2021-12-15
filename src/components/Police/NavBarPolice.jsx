import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import classes from '../Layout/NavBar.module.css';

const navs = [

    {
        path: '/UpdateProfilePolice', name: 'Update Profile'
    },
    {
        path: '/RecievedComplaints', name: 'Recieved Complaints'
    }
]

export function NavBarPolice() {

    return (
        <div className={classes.navbarcontainer} >


            <Navbar className={classes.navbar}>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="left-content-end" style={{ width: "80%" }} >
                        {navs.map((navItem, index) => (
                            <Nav.Link exact href={navItem.path} style={{ color: 'white' }} key={index}>{navItem.name}{' '}</Nav.Link>

                        ))}
                    </Nav>
                </Navbar.Collapse>

            </Navbar>

        </div>
    )

}

