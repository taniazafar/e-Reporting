import React, { useRef, useState } from 'react'
import { Form, Col, Button, Alert } from 'react-bootstrap';
import classes from './SignIn.module.css'
import { Link, useHistory } from 'react-router-dom'
import { db, auth } from "../../Fire"

export function SignInAsPublicUser() {

   const emailRef = useRef()
   const passwordRef = useRef()
   const confirmpasswordRef = useRef()
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const history = useHistory()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')


   async function handleSubmit(e) {
      // var regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      e.preventDefault()

      if (passwordRef.current.value !== confirmpasswordRef.current.value) {
         return setError("Passwords do not match")
      }
      // if (regularExpression.match(passwordRef.current.value)) {
      //    return setError("Password must be alpha numeric")
      // }
      // if (passwordRef.current.value !== regularExpression) {
      // return setError("Password must be alpha numeric")
      // }

      try {
         // const signUpAsPublicUser = {
         //    email,
         //    password,
         //    confirmPassword,
         //    role: "user"

         // }
         auth.createUserWithEmailAndPassword(email, password).then((res) => {
            var user = db.collection("users").doc();
            user.set({
               email: email,
               password: password,
               role: "user",
            });
         });
         setError("")
         setLoading(true)
         history.push('/dashboardPublic')

      } catch {
         setError("Failed to create an account")
      }


      setLoading(false)
   }
   return (
      <div className={classes.bgimg}>
         <div className={classes.signincontainer}>

            <h4 className={classes.header} >Sign Up </h4>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form className={classes.signupform} onSubmit={handleSubmit} >
               <Form.Row>
                  <Col xs={12}>
                     <Form.Group as={Col} id="email">
                        <Form.Label className='float-left'>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email"
                           required
                           ref={emailRef}
                           value={email}
                           onChange={(e) => {
                              setEmail(e.target.value)
                           }} />
                     </Form.Group>
                  </Col>
                  <Col xs={12}>
                     <Form.Group as={Col} id="password">
                        <Form.Label className='float-left'>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Enter password"
                           required
                           ref={passwordRef}
                           value={password}
                           onChange={(e) => {
                              setPassword(e.target.value)
                           }} />
                     </Form.Group>
                  </Col>
                  <Col xs={12}>
                     <Form.Group as={Col} id="confirmpassword">
                        <Form.Label className='float-left'>Confirm Password:</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password"
                           required
                           ref={confirmpasswordRef}
                           value={confirmPassword}
                           onChange={(e) => {
                              setConfirmPassword(e.target.value)
                           }} />
                     </Form.Group>
                  </Col>
               </Form.Row>
               <Button disabled={loading} className={classes.signupbtn} type="submit">
                  Sign Up
               </Button>

            </Form>

            <div className={classes.footer}>
               Already have an account? <Link to='/LogInAsPublicUser'>Sign In</Link>
            </div>
            <br />
         </div>

      </div>
   )
}

