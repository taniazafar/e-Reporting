import React, { useRef, useState } from 'react'
import { Form, Col, Button, Alert } from 'react-bootstrap';
import classes from './SignIn.module.css'
import { useAuth } from '../AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { HomeNavBar } from '../Layout/NavBar'
import firebase from '../../Fire'
export function SignInAsPolice() {


   const emailRef = useRef()
   const passwordRef = useRef()
   const confirmpasswordRef = useRef()
   const fullnameRef = useRef()
   const designationRef = useRef()
   const addressRef = useRef()
   const rankRef = useRef()
   const cnicRef = useRef()
   const phonenoRef = useRef()

   const { signup } = useAuth()
   const [error, setError] = useState("")
   const [loading, setLoading] = useState(false)
   const history = useHistory()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [cnic, setCnic] = useState('')
   const [address, setAddress] = useState('')
   const [fullname, setFullname] = useState('')
   const [designation, setDesignation] = useState('')
   const [rank, setRank] = useState('')
   const [phoneno, setPhoneno] = useState('')
   

   async function handleSubmit(e) {
      e.preventDefault()

      if (passwordRef.current.value !== confirmpasswordRef.current.value) {
         return setError("Passwords do not match")
      }

      try {
         const policeRef = firebase.database().ref('SignIn Police')
         const signInPolice = {
            email,
            password,
            confirmPassword,
            fullname,
            designation,
            rank,
            cnic,
            address,
            phoneno
         }
         setError("")
         setLoading(true)
         await signup(emailRef.current.value, passwordRef.current.value)
         history.push('/dashboardPolice')
         policeRef.push(signInPolice)
      } catch {
         setError("Failed to create an account")
      }

      setLoading(false)
   }

   return (
      <>
         <HomeNavBar />
         <div className={classes.signincontainer}>

            <h4 className='text-center mb-4'>Sign Up As Police</h4>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form className={classes.signinform} onSubmit={handleSubmit} >
               <Form.Row>
                  <Col xs={4}>
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
                  <Col xs={4}>
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
                  <Col xs={4}>
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


               <Form.Row>
                  <Col xs={4}>
                     <Form.Group as={Col} id="fullname">
                        <Form.Label className='float-left'>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name"
                           required
                           ref={fullnameRef}
                           value={fullname}
                           onChange={(e) => {
                              setFullname(e.target.value)
                           }} />
                     </Form.Group>
                  </Col>

                  <Col xs={4}>
                     <Form.Group as={Col} id="designation">
                        <Form.Label className='float-left'>Designation:</Form.Label>
                        <Form.Control type="text" placeholder="Enter designation"
                           required
                           ref={designationRef}
                           value={designation}
                           onChange={(e) => {
                              setDesignation(e.target.value)
                           }} />
                     </Form.Group>
                  </Col>

                  <Col xs={4}>
                     <Form.Group as={Col} id="rank">
                        <Form.Label className='float-left'>Rank:</Form.Label>
                        <Form.Control type="text" placeholder="Enter rank"
                           required
                           ref={rankRef}
                           value={rank}
                           onChange={(e) => {
                              setRank(e.target.value)
                           }} />
                     </Form.Group>
                  </Col>
                  

               </Form.Row>


               <Form.Row>
                  <Col xs={4}>
                     <Form.Group as={Col} id="phoneno">
                        <Form.Label className='float-left'>Phone No:</Form.Label>
                        <Form.Control type="text" placeholder="Enter phone no"
                           required
                           ref={phonenoRef}
                           value={phoneno}
                           onChange={(e) => {
                              setPhoneno(e.target.value)
                           }} />
                     </Form.Group>
                  </Col>
                  <Col xs={4}>
                     <Form.Group as={Col} id="cnic">
                        <Form.Label className='float-left'>CNIC:</Form.Label>
                        <Form.Control type="text" placeholder="Enter CNIC"
                           required
                           ref={cnicRef}
                           value={cnic}
                           onChange={(e) => {
                              setCnic(e.target.value)
                           }} />
                     </Form.Group>
                  </Col>

                 
                  <Col xs={4}>
                     <Form.Group as={Col} id="address">
                        <Form.Label className='float-left'>Address:</Form.Label>
                        <Form.Control type="text" placeholder="Enter your address"
                           required
                           ref={addressRef}
                           value={address}
                           onChange={(e) => {
                              setAddress(e.target.value)
                           }} />
                     </Form.Group>
                  </Col>
               </Form.Row>
              




               <Button disabled={loading} className={classes.signinbtn} type="submit">
                  Sign Up
               </Button>

            </Form>
            <div className='w=100 text-center mt-2'>
               Already have an account? <Link to='/LogInAsPolice'>Log In</Link>

            </div>
         </div>

      </>
   )
}

