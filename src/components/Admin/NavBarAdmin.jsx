import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import classes from '../Layout/NavBar.module.css';

const navs = [

    {
        path: '/UpdateProfileAdmin', name: 'Update Profile'
    },
    {
        path: '/CriminalRecord', name: 'Add Criminal Record'
    },
    {
        path: '/CriminalRecordHistory', name: 'Criminal Records'
    },
    {
        path: '/ComplaintsHistory', name: 'Registered Complaints'
    },
    {
        path: '/AddWantedCriminals', name: 'Wanted Criminals'
    }

]

export function NavBarAdmin() {

    return (
        <div className={classes.navbarcontainer} >


            <Navbar className={classes.navbar}>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="left-content-end" style={{ width: "100%" }} >
                        {navs.map((navItem, index) => (
                            <Nav.Link exact href={navItem.path} style={{ color: 'white' }} key={index}>{navItem.name}{''}</Nav.Link>

                        ))}
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        </div>

    )
}

