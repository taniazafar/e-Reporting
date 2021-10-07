import React from 'react'
import classes from './SignInForm.module.css'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { HomeNavBar } from '../Layout/NavBar'


export function SignInForm() {

   const history = useHistory()

   function clickHandler1() {
      history.push('/SignInAsAdmin')

   }

   function clickHandler2() {
      history.push('/SignInAsPolice')

   }
   function clickHandler3() {
      history.push('/SignInAsPublicUser')

   }

   return (
      <div className= {classes.div}>
         <HomeNavBar />
         <div className={classes.homecontent}>
            <div className={classes.contentRow}>
               <div className={classes.contentColumn}>
                  <h3><b>Admin</b></h3>
                  <Button className={classes.btn} onClick={clickHandler1}>
                     <b>SignUp as Admin</b>
                  </Button>

               </div>
            </div>
            <div className={classes.contentRow}>
               <div className={classes.contentColumn}>
                  <h3><b>Police</b></h3>
                  <Button className={classes.btn} onClick={clickHandler2}>
                     <b>SignUp as Police</b>
                  </Button>

               </div>
            </div>
            <div className={classes.contentRow}>
               <div className={classes.contentColumn}>
                  <h3><b>Public User</b></h3>
                  <Button className={classes.btn} onClick={clickHandler3}>
                     <b>SignUp as Public User</b>
                  </Button>

               </div>
            </div>

         </div>

      </div>
   )
}

