import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import classes from '../Layout/NavBar.module.css';

const navs = [

    {
        path: '/dashboardAdmin', name: 'Dashboard'
    },
    {
        path: '/UpdateProfileAdmin', name: 'Update Profile'
    },
    {
        path: '/CriminalRecord', name: 'Criminal Record'
    }

]
const navss = [
    {
        path: '/', name: 'LogOut'
    }


]

export function NavBarAdmin() {

    return (
        <div className={classes.navbarcontainer} >


            <Navbar className={classes.navbar}>

                <Navbar.Brand className={classes.brand} exact href='/dashboardAdmin' style={{ color: 'white' }}> e-Reporting {' '}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="left-content-end" style={{ width: "80%" }} >
                        {navs.map((navItem, index) => (
                            <Nav.Link exact href={navItem.path} style={{ color: 'white' }} key={index}>{navItem.name}{' '}</Nav.Link>

                        ))}
                    </Nav>

                    <Nav className="justify-content-end" style={{ width: "20%" }}>

                        {navss.map((navItem, index) => (
                            <Nav.Link exact href={navItem.path} style={{ color: 'white' }} key={index}>{navItem.name}{' '}</Nav.Link>

                        ))}

                    </Nav>

                </Navbar.Collapse>

            </Navbar>
           
        </div>
    )

}

