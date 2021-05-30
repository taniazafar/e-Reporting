import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import classes from './NavBar.module.css';

const navs = [
    {
        path: '/', name: 'LogIn'
    },
    {
        path: '/signInForm', name: 'Register'
    }
    ,
    {
        path: '/EmergencyReporting', name: 'Emergency Reporting'
    }
]

export function HomeNavBar (){

return(
    <div className={classes.navbarcontainer} >

        <Navbar className={classes.navbar}>

            <Navbar.Brand className={classes.brand} exact href='/' style={{ color: 'white' }}> e-Reporting {' '}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="left-content-end" style={{ width: "100%" }} >
                    {navs.map((navItem, index) => (
                        <Nav.Link exact href={navItem.path} style={{ color: 'white' }} key = {index}>{navItem.name}{' '}</Nav.Link>

                    ))}
                </Nav>


            </Navbar.Collapse>
     
        </Navbar>

    </div>

            )
}

