import React, { useState, useEffect } from 'react'
import { Form, Col, Button, Alert, Table } from 'react-bootstrap'
import register from './RegisterComplaint.module.css'
import classes from './Complaint.module.css'
import firebase from '../../Fire'
import { NavBarPublic } from '../PublicUser/NavBarPublic'

import defaultprofile from './defaultprofile.png'
import classess from '../PublicUser/dashboardPublic.module.css'
import { useAuth } from '../AuthContext'
import { useHistory } from 'react-router-dom'

export const RegisterComplaint = () => {
     const { currentUser } = useAuth()
     const history = useHistory()
     const [error, setError] = useState("")
     const [loading, setLoading] = useState(false)

     const [fullname, setFullname] = useState()
     const [address, setAddress] = useState('')
     const [cnic, setCnic] = useState('')
     const [phoneno, setPhoneno] = useState('')
     const [description, setDescription] = useState('')



     const [displayComplaint, setDisplayComplaint] = useState(true)
     const [displayHistory, setDisplayHistory] = useState(false)
     const [displayEdit, setDisplayEdit] = useState(false)

     async function handleFormSubmit(e) {
          e.preventDefault()
          try {
               const submitRef = firebase.database().ref('Register Complaint')
               const complaint = {
                    fullname,
                    cnic,
                    address,
                    phoneno,
                    description
               }

               setError("")
               setLoading(true)
               await submitRef.push(complaint)
               setDisplayHistory(true)
               setDisplayComplaint(false)
          } catch {
               setError("Failed to Submit")
          }

          setLoading(false)

     }

     const [userData, setUserdata] = useState()

     useEffect(() => {
          const submitRef = firebase.database().ref('Register Complaint')
          submitRef.on('value', (snapshot) => {

               const complaints = snapshot.val()
               const registeredComplaints = []
               for (let id in complaints) {
                    registeredComplaints.push({ id, ...complaints[id] })
               }
               //   console.log(registeredComplaints)
               setUserdata(registeredComplaints)

          })
     }, [])

     const [editfullname, seteditFullname] = useState()
     const [editcnic, seteditCnic] = useState('')
     const [editaddress, seteditAddress] = useState('')
     const [editphoneno, seteditPhoneno] = useState('')
     const [editdescription, seteditDescription] = useState('')

     const [userId, setUserId] = useState('')

     const handleUpdateClick = (complaint) => {

          seteditAddress(complaint.address)
          seteditCnic(complaint.cnic)
          seteditFullname(complaint.fullname)
          seteditPhoneno(complaint.phoneno)
          seteditDescription(complaint.description)


          setUserId(complaint.id)

          setDisplayEdit(true)
          setDisplayHistory(false)



     }



     async function handleEditFormSubmit(e) {
          e.preventDefault()
          try {

               const editRef = firebase.database().ref('Register Complaint').child(userId)
               setError("")
               setLoading(true)

               await editRef.update({
                    fullname: editfullname,
                    cnic: editcnic,
                    address: editaddress,
                    phoneno: editphoneno,
                    description: editdescription
               })
               setDisplayEdit(false)
               setDisplayHistory(true)

          } catch {
               setError("Failed to Edit")
          }

          setLoading(false)


     }

     const deleteComplaint = (id) => {
          const deleteRef = firebase.database().ref('Register Complaint').child(id)
          deleteRef.remove()
     }

     const handleViewHistory = () => {


          setDisplayHistory(true)
          setDisplayComplaint(false)
     }

     const handleNewClick = () => {

          setDisplayHistory(false)
          setDisplayComplaint(true)
     }

     async function handleImage() {
          setError("")
          try {
               history.push('/UpdateProfilePublic')

          } catch {
               setError("Error")
          }

     }

     return (
          <>
               <NavBarPublic />
               <div className={classess.container}>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <div className={classess.user}>
                         <img onClick={handleImage} src={defaultprofile} width="70" height="70" alt='' />
                         <br />
                         {currentUser.email}
                    </div>
               </div>
               {displayComplaint ?
                    <>

                         <div>
                              <Button onClick={handleViewHistory} className={register.viewbtn} type="submit" value='save'>
                                   <b>View Registered Complaints</b></Button>
                         </div>
                         <div className={register.registercontainer}>
                              <h2 className='text-center mb-4'>Register Complaint</h2>
                              {error && <Alert variant='danger'>{error}</Alert>}

                              <Form className={register.complaintform} onSubmit={handleFormSubmit} >
                                   <Form.Row>
                                        <Col xs={4}>
                                             <Form.Group as={Col} Name="fullname">
                                                  <Form.Label className='float-left'>Name:</Form.Label>
                                                  <Form.Control type="text" placeholder="Enter full name"
                                                       value={fullname}
                                                       onChange={(e) => {
                                                            setFullname(e.target.value)
                                                       }} />
                                             </Form.Group>
                                        </Col>
                                        <Col xs={4}>
                                             <Form.Group as={Col} Name="phoneno">
                                                  <Form.Label className='float-left'>Phone No:</Form.Label>
                                                  <Form.Control type="text" placeholder="Enter phone no"
                                                       value={phoneno}
                                                       onChange={(e) => {
                                                            setPhoneno(e.target.value)
                                                       }} />
                                             </Form.Group>
                                        </Col>
                                        <Col xs={4}>
                                             <Form.Group as={Col} Name="cnic">
                                                  <Form.Label className='float-left'>CNIC:</Form.Label>
                                                  <Form.Control type="text" placeholder="Enter CNIC"
                                                       value={cnic}
                                                       onChange={(e) => {
                                                            setCnic(e.target.value)
                                                       }} />
                                             </Form.Group>
                                        </Col>


                                   </Form.Row>
                                   <Form.Row>

                                        <Col xs={4}>
                                             <Form.Group as={Col} Name="address">
                                                  <Form.Label className='float-left'>Address:</Form.Label>
                                                  <Form.Control type="text" placeholder="Enter your address"
                                                       value={address}
                                                       onChange={(e) => {
                                                            setAddress(e.target.value)
                                                       }} />
                                             </Form.Group>
                                        </Col>
                                        <Col xs={4}>
                                             <Form.Group as={Col} Name="description">
                                                  <Form.Label className='float-left'>Describe in detail:</Form.Label>
                                                  <Form.Control type="text" placeholder="Enter Description"
                                                       value={description}
                                                       onChange={(e) => {
                                                            setDescription(e.target.value)
                                                       }} />
                                             </Form.Group>
                                        </Col>

                                   </Form.Row>

                                   <Button disabled={loading} className={register.registerbtn} type="submit" value='save'>
                                        Register Complaint</Button>

                              </Form>


                         </div>
                    </>
                    : null}
               {displayHistory ?
                    <div >
                         <br />
                         <h2 className='text-center mb-4'>Registered Complaints</h2>
                         {userData ? userData.map((complaint, index) => {
                              return (
                                   <>
                                        <div className={classes.contentRow}>
                                             <div className={classes.contentColumn}>
                                                  <Table responsive borderless >

                                                       <tr className={classes.table}>
                                                            <td ><b>Name:</b></td>
                                                            <td>{complaint.fullname}</td>
                                                       </tr>

                                                       <tr>
                                                            <td><b>CNIC:</b></td>
                                                            <td>{complaint.cnic}</td>
                                                       </tr>
                                                       <tr>
                                                            <td><b>Address:</b></td>
                                                            <td> {complaint.address}</td>
                                                       </tr>
                                                       <tr>
                                                            <td><b>Phone No:</b></td>
                                                            <td>{complaint.phoneno}</td>
                                                       </tr>
                                                       <tr>
                                                            <td><b>Description:</b></td>
                                                            <td>{complaint.description}</td>
                                                       </tr>


                                                       <tr>
                                                            <td>
                                                                 <Button onClick={() => { deleteComplaint(complaint.id) }} className={classes.btn}>Delete</Button>
                                                                 {' '}
                                                                 <Button onClick={() => { handleUpdateClick(complaint) }} className={classes.btn}>Edit</Button>
                                                                 {' '}
                                                                 <Button onClick={handleNewClick} className={classes.btn}>New Complaint</Button>

                                                            </td>
                                                       </tr>

                                                  </Table>
                                             </div>

                                        </div >
                                   </>
                              )
                         }) : <h3> Oops! No Registered Complaint</h3>

                         }
                    </div>
                    : null}

               {displayEdit ?
                    <div className={register.registercontainer}>
                         <h2 className='text-center mb-4'>Edit Complaint</h2>
                         {error && <Alert variant='danger'>{error}</Alert>}

                         <Form className={register.complaintform} onSubmit={handleEditFormSubmit}>
                              <Form.Row>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="fullname">
                                             <Form.Label className='float-left'>Name:</Form.Label>
                                             <Form.Control type="text" placeholder="Enter full name"
                                                  value={editfullname}
                                                  onChange={(e) => {
                                                       seteditFullname(e.target.value)
                                                  }
                                                  } />
                                        </Form.Group>
                                   </Col>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="phoneno">
                                             <Form.Label className='float-left'>Phone No:</Form.Label>
                                             <Form.Control type="text" placeholder="Enter phone no"
                                                  value={editphoneno}
                                                  onChange={(e) => {
                                                       seteditPhoneno(e.target.value)
                                                  }} />
                                        </Form.Group>
                                   </Col>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="cnic">
                                             <Form.Label className='float-left'>CNIC:</Form.Label>
                                             <Form.Control type="text" placeholder="Enter CNIC"
                                                  value={editcnic}
                                                  onChange={(e) => {
                                                       seteditCnic(e.target.value)
                                                  }} />
                                        </Form.Group>
                                   </Col>


                              </Form.Row>
                              <Form.Row>

                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="address">
                                             <Form.Label className='float-left'>Address:</Form.Label>
                                             <Form.Control type="text" placeholder="Enter your address"
                                                  value={editaddress}
                                                  onChange={(e) => {
                                                       seteditAddress(e.target.value)
                                                  }} />
                                        </Form.Group>
                                   </Col>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="description">
                                             <Form.Label className='float-left'>Describe in detail:</Form.Label>
                                             <Form.Control type="text" placeholder="Enter age"
                                                  value={editdescription}
                                                  onChange={(e) => {
                                                       seteditDescription(e.target.value)
                                                  }
                                                  } />
                                        </Form.Group>
                                   </Col>



                              </Form.Row>


                              <Button disabled={loading} className={register.registerbtn} type="submit" value='save'>
                                   Edit Complaint</Button>

                         </Form>


                    </div>
                    : null}
          </>
     )

}
