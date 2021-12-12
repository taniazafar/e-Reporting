import React from 'react'
import classes from './SignInForm.module.css'
import { useHistory } from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap';
import Slider from '../Slider/Slider'


export function LogInForm() {
   const navs = [


      {
         path: '/EmergencyReporting', name: 'Emergency Reporting'
      },
      {
         path: '/WantedCriminals', name: 'Wanted Criminals'
      }

   ]

   const history = useHistory()

   function clickHandler1() {
      history.push('/LogInAsPublicUser')

   }

   function clickHandler2() {
      history.push('/SignInAsPublicUser')

   }

   function clickHandler3() {
      history.push('/LogInAsPolice')

   }
   function clickHandler4() {
      history.push('/LogInAsAdmin')

   }

   return (
      <div className={classes.bgimg}>



         <div className={classes.l}>
            <h3 className="float-left text-white"><b>e-Reporting</b></h3>
         </div>
         <div className={classes.c}>
            <Navbar className={classes.navbar}>


               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="left-content-end" style={{ width: "100%" }} >
                     {navs.map((navItem, index) => (
                        <Nav.Link exact href={navItem.path} style={{ color: 'white' }} key={index}>{navItem.name}{' '}</Nav.Link>

                     ))}
                  </Nav>
               </Navbar.Collapse>

            </Navbar>

         </div>
         <div className={classes.r}>
            <button onClick={clickHandler2} className={classes.btnn1}>Sign Up</button>
            <button onClick={clickHandler1} className={classes.btnn}>Sign In</button>
         </div>
         <div >
            <Slider />

         </div>

         <div className={classes.others}>
            <p onClick={clickHandler3} >Police Console</p>
            <p onClick={clickHandler4} >Admin Console</p>

         </div>


      </div>
   )
}



