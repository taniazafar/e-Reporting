import React, { useState } from 'react'
import { Form, Col, Button, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap'
import classes from './CriminalRecord.module.css'
import firebase from '../../Fire'
import { Header } from './Header'
import { Footer } from './Footer'

export const CriminalRecord = () => {
     const renderTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
               Click to Add
          </Tooltip>
     );

     const [error, setError] = useState("")
     const [loading, setLoading] = useState(false)

     const [firstname, setFirstname] = useState()
     const [lastname, setLastname] = useState()
     const [gender, setGender] = useState('')
     const [dob, setDob] = useState('')
     const [residence, setResidence] = useState()
     const [arrests, setArrests] = useState()
     const [height, setHeight] = useState('')
     const [eyecolor, setEyecolor] = useState('')
     const [physicalappearance, setPhysicalappearance] = useState('')
     const [description, setDescription] = useState('')

     async function handleFormSubmit() {
          try {
               const addRef = firebase.database().ref('Criminal Record')
               const criminals = {
                    firstname,
                    lastname,
                    gender,
                    dob,
                    residence,
                    arrests,
                    height,
                    eyecolor,
                    physicalappearance,
                    description,

               }
               setError("")
               setLoading(true)
               await addRef.push(criminals)
               alert('Record Added Successfuly!!')
          } catch {
               setError("Failed to Submit")
          }

          setLoading(false)

     }

     return (
          <>
               <Header />
               {error && <Alert variant='danger'>{error}</Alert>}
               <div className={classes.div4}>
                    <h2 className={classes.form1}><b>Criminal Record Form</b></h2>
                    <p className={classes.form2}><br />All fields marked with * are mandatory.</p>
               </div>
               <div className={classes.complaintform}>
                    {error && <Alert variant='danger'>{error}</Alert>}

                    <Form onSubmit={handleFormSubmit} >
                         <Form.Row>

                              <Col xs={4}>
                                   <Form.Group as={Col} Name="firstname">
                                        <Form.Label className={classes.formlabel}>First Name*</Form.Label>
                                        <Form.Control required type="text" placeholder="Enter first name"
                                             value={firstname}
                                             onChange={(e) => {
                                                  setFirstname(e.target.value)
                                             }} />
                                   </Form.Group>
                              </Col>

                              <Col xs={4}>
                                   <Form.Group as={Col} Name="lastname">
                                        <Form.Label className={classes.formlabel}>Last Name*</Form.Label>
                                        <Form.Control required type="text" placeholder="Enter last name"
                                             value={lastname}
                                             onChange={(e) => {
                                                  setLastname(e.target.value)
                                             }} />
                                   </Form.Group>
                              </Col>
                              <Col xs={4}>
                                   <Form.Group as={Col} >
                                        <Form.Label className={classes.formlabel}>Gender*</Form.Label>
                                        <Form.Control required as="select" name="GENDER_TYPE" id="GENDER_TYPE" class="input_fo"
                                             value={gender}
                                             onChange={(e) => {
                                                  setGender(e.target.value)
                                             }
                                             }>
                                             <option >Select Gender</option>
                                             <option value='Male'>Male</option>
                                             <option value='Female'>Female</option>
                                             <option value='Transgender'>Transgender</option>

                                        </Form.Control>
                                   </Form.Group>
                              </Col>
                         </Form.Row>
                         <Form.Row>
                              <Col xs={4}>
                                   <Form.Group as={Col} Name="dob">
                                        <Form.Label className={classes.formlabel}>DOB*</Form.Label>
                                        <Form.Control required type="date" placeholder="Enter last name"
                                             value={dob}
                                             onChange={(e) => {
                                                  setDob(e.target.value)
                                             }} />
                                   </Form.Group>
                              </Col>
                              <Col xs={4}>
                                   <Form.Group as={Col} Name="residence">
                                        <Form.Label className={classes.formlabel}>Residence State*</Form.Label>
                                        <Form.Control required as="select" placeholder="Enter residence"
                                             value={residence}
                                             onChange={(e) => {
                                                  setResidence(e.target.value)
                                             }}>
                                             <option >Select State</option>
                                             <option value='Azad Jammu and Kashmir'>Azad Jammu and Kashmir</option>
                                             <option value='Balochistan'>Balochistan</option>
                                             <option value='Gilgit-Baltistan'>Gilgit-Baltistan</option>
                                             <option value='Islamabad Capital Territory'>Islamabad Capital Territory</option>
                                             <option value='Khyber Pakhtunkhwa'>Khyber Pakhtunkhwa</option>
                                             <option value='Punjab'>Punjab</option>
                                             <option value='Sindh'>Sindh</option>
                                        </Form.Control>
                                   </Form.Group>
                              </Col>
                              <Col xs={4}>
                                   <Form.Group as={Col} Name="arrests">
                                        <Form.Label className={classes.formlabel}>No of Arrests*</Form.Label>
                                        <Form.Control required type="text" placeholder="Enter no of arrests"
                                             value={arrests}
                                             onChange={(e) => {
                                                  setArrests(e.target.value)
                                             }} />
                                   </Form.Group>
                              </Col>


                         </Form.Row>
                         <Form.Row>

                              <Col xs={4}>
                                   <Form.Group as={Col} Name="eyecolor">
                                        <Form.Label className={classes.formlabel}>Eye Color*</Form.Label>
                                        <Form.Control required type="text" placeholder="Enter eye color"
                                             value={eyecolor}
                                             onChange={(e) => {
                                                  setEyecolor(e.target.value)
                                             }} />
                                   </Form.Group>
                              </Col>

                              <Col xs={4}>
                                   <Form.Group as={Col} Name="height">
                                        <Form.Label className={classes.formlabel}>Height*</Form.Label>
                                        <Form.Control required type="text" placeholder="Enter height"
                                             value={height}
                                             onChange={(e) => {
                                                  setHeight(e.target.value)
                                             }} />
                                   </Form.Group>
                              </Col>
                              <Col xs={4}>
                                   <Form.Group as={Col} Name="physicalappearance">
                                        <Form.Label className={classes.formlabel}>Physical Appearance*</Form.Label>
                                        <Form.Control required as="textarea" placeholder="Enter physical appearance" rows={1}
                                             value={physicalappearance}
                                             onChange={(e) => {
                                                  setPhysicalappearance(e.target.value)
                                             }} />
                                   </Form.Group>
                              </Col>

                         </Form.Row>

                         <Form.Row>
                              <Col xs={8}>
                                   <Form.Group as={Col} Name="description">
                                        <Form.Label className={classes.formlabel}>Description*</Form.Label>
                                        <Form.Control required as="textarea" placeholder="Enter description" rows={3}
                                             value={description}
                                             onChange={(e) => {
                                                  setDescription(e.target.value)
                                             }} />
                                   </Form.Group>
                              </Col>
                         </Form.Row>


                         <OverlayTrigger
                              placement="right"
                              delay={{ show: 250, hide: 400 }}
                              overlay={renderTooltip}
                         >
                              <Button disabled={loading} className={classes.registerbtn} type="submit" value='save'>
                                   Add Record</Button>
                         </OverlayTrigger>
                    </Form>

               </div>

               <Footer className = {classes.foot}/>



          </>
     )

}