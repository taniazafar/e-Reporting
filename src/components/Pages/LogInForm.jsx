import React from 'react'
import classes from './SignInForm.module.css'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { HomeNavBar } from '../Layout/NavBar'


export function LogInForm() {

   const history = useHistory()

   function clickHandler1() {
      history.push('/LogInAsAdmin')

   }

   function clickHandler2() {
      history.push('/LogInAsPolice')

   }
   function clickHandler3() {
      history.push('/LogInAsPublicUser')

   }

   return (
      <>
         <HomeNavBar />
         <div className={classes.homecontent}>
         
            <div className={classes.contentRow}>
               <div className={classes.contentColumn}>
                  <h3>Admin</h3>
                  <Button className={classes.btn} onClick={clickHandler1}>
                     LogIn as Admin
                  </Button>

               </div>
               <div className={classes.contentColumn}>
                  <h3>Police</h3>
                  <Button className={classes.btn} onClick={clickHandler2}>
                     LogIn as Police
                  </Button>

               </div>
               <div className={classes.contentColumn}>
                  <h3>Public User</h3>
                  <Button className={classes.btn} onClick={clickHandler3}>
                     LogIn as Public User
                  </Button>

               </div>
            </div>

         </div>

      
      </>
   )
}

