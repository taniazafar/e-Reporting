import React, { useState, useEffect } from 'react'
import { Form, Col, Button, Alert, Table } from 'react-bootstrap'
import register from './CriminalRecord.module.css'
import classes from '../Pages/Complaint.module.css'
import firebase from '../../Fire'
import { NavBarAdmin } from './NavBarAdmin'

import defaultprofile from './defaultprofile.png'
import classess from '../PublicUser/dashboardPublic.module.css'
import { useAuth } from '../AuthContext'
import { useHistory } from 'react-router-dom'

export const CriminalRecord = () => {

     const { currentUser } = useAuth()
     const history = useHistory()
     const [error, setError] = useState("")
     const [loading, setLoading] = useState(false)

     const [fullname, setFullname] = useState()
     const [fathername, setFathername] = useState('')
     const [age, setAge] = useState('')
     const [cnic, setCnic] = useState('')
     const [address, setAddress] = useState('')
     const [phoneno, setPhoneno] = useState('')
     const [crimehistory, setCrimehistory] = useState('')
     const [description, setDescription] = useState('')
     const [physicalappearance, setPhysicalappearance] = useState('')
     



     const [displayComplaint, setDisplayComplaint] = useState(true)
     const [displayHistory, setDisplayHistory] = useState(false)
     const [displayEdit, setDisplayEdit] = useState(false)


     async function handleFormSubmit(e) {
          e.preventDefault()
          try {
               const addRef = firebase.database().ref('Criminal Record')
               const criminals = {
                    fullname,
                    fathername,
                    age,
                    physicalappearance,
                    cnic,
                    address,
                    phoneno,
                    description,
                    crimehistory
               }

               setError("")
               setLoading(true)
               await addRef.push(criminals)
               setDisplayHistory(true)
               setDisplayComplaint(false)
          } catch {
               setError("Failed to Submit")
          }

          setLoading(false)

     }

     const [userData, setUserdata] = useState()

     useEffect(() => {
          const submitRef = firebase.database().ref('Criminal Record')
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
     const [editfathername, seteditFathername] = useState('')
     const [editage, seteditAge] = useState('')
     const [editdescription, seteditDescription] = useState('')
     const [editcnic, seteditCnic] = useState('')
     const [editaddress, seteditAddress] = useState('')
     const [editphoneno, seteditPhoneno] = useState('')
     const [editphysicalappearance, seteditPhysicalappearance] = useState('')
     const [editcrimehistory, seteditCrimehistory] = useState('')
     const [userId, setUserId] = useState('')

     const handleUpdateClick = (criminals) => {

          seteditAddress(criminals.address)
          seteditCnic(criminals.cnic)
          seteditPhysicalappearance(criminals.physicalappearance)
          seteditFullname(criminals.fullname)
          seteditFathername(criminals.fathername)
          seteditDescription(criminals.description)
          seteditPhoneno(criminals.phoneno)
          seteditCrimehistory(criminals.crimehistory)
          seteditAge(criminals.age)
          setUserId(criminals.id)

          setDisplayEdit(true)
          setDisplayHistory(false)



     }



     async function handleEditFormSubmit(e) {
          e.preventDefault()
          try {

               const editRef = firebase.database().ref('Criminal Record').child(userId)
               setError("")
               setLoading(true)

               await editRef.update({
                    fullname: editfullname,
                    fathername: editfathername,
                    description: editdescription,
                    physicalappearance: editphysicalappearance,
                    cnic: editcnic,
                    address: editaddress,
                    phoneno: editphoneno,
                    crimehistory: editcrimehistory,
                    age:editage
               })
               setDisplayEdit(false)
               setDisplayHistory(true)

          } catch {
               setError("Failed to Edit")
          }

          setLoading(false)


     }

     const deleteComplaint = (id) => {
          const deleteRef = firebase.database().ref('Criminal Record').child(id)
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
               history.push('/UpdateProfileAdmin')

          } catch {
               setError("Error")
          }

     }

     return (
          <>
               <NavBarAdmin />
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
                                   <b>Criminal Record</b></Button>
                         </div>
                         <div className={register.registercontainer}>
                              <h2 className='text-center mb-4'>Add Criminal Record</h2>
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
                                             <Form.Group as={Col} Name="fathername">
                                                  <Form.Label className='float-left'>Father's Name:</Form.Label>
                                                  <Form.Control type="text" placeholder="Enter father's name"
                                                       value={fathername}
                                                       onChange={(e) => {
                                                            setFathername(e.target.value)
                                                       }} />
                                             </Form.Group>
                                        </Col>

                                        <Col xs={4}>
                                             <Form.Group as={Col} Name="age">
                                                  <Form.Label className='float-left'>Age:</Form.Label>
                                                  <Form.Control type="text" placeholder="Enter age"
                                                       value={age}
                                                       onChange={(e) => {
                                                            setAge(e.target.value)
                                                       }} />
                                             </Form.Group>
                                        </Col>

                                   </Form.Row>
                                   <Form.Row>
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

                                   </Form.Row>

                                   <Form.Row>
                                        <Col xs={4}>
                                             <Form.Group as={Col} Name="description">
                                                  <Form.Label className='float-left'>Description:</Form.Label>
                                                  <Form.Control type="text" placeholder="Enter description"
                                                       value={description}
                                                       onChange={(e) => {
                                                            setDescription(e.target.value)
                                                       }} />
                                             </Form.Group>
                                        </Col>
                                        <Col xs={4}>
                                             <Form.Group as={Col} Name="physicalappearance">
                                                  <Form.Label className='float-left'>Physical Appearance:</Form.Label>
                                                  <Form.Control type="text" placeholder="Enter physicalappearance"
                                                       value={physicalappearance}
                                                       onChange={(e) => {
                                                            setPhysicalappearance(e.target.value)
                                                       }} />
                                             </Form.Group>
                                        </Col>
                                        <Col xs={4}>
                                             <Form.Group as={Col} Name="crimehistory">
                                                  <Form.Label className='float-left'>Crime History:</Form.Label>
                                                  <Form.Control type="text" placeholder="Enter crimehistory"
                                                       value={crimehistory}
                                                       onChange={(e) => {
                                                            setCrimehistory(e.target.value)
                                                       }} />
                                             </Form.Group>
                                        </Col>


                                   </Form.Row>

                                   <Button disabled={loading} className={register.registerbtn} type="submit" value='save'>
                                        Add Record</Button>

                              </Form>


                         </div>
                    </>
                    : null}
               {displayHistory ?
                    <div >
                         <br />
                         <h2 className='text-center mb-4'>Criminal Record</h2>
                         {userData ? userData.map((criminals, index) => {
                              return (
                                   <>
                                        <div className={classes.contentRow}>
                                             <div className={classes.contentColumn}>
                                                  <Table responsive borderless >

                                                       <tr className={classes.table}>
                                                            <td ><b>Name:</b></td>
                                                            <td>{criminals.fullname}</td>
                                                       </tr>
                                                       <tr>
                                                            <td><b>Father Name:</b></td>
                                                            <td>{criminals.fathername}</td>
                                                       </tr>

                                                       <tr>
                                                            <td><b>CNIC:</b></td>
                                                            <td>{criminals.cnic}</td>
                                                       </tr>
                                                       <tr>
                                                            <td><b>Appearance:</b></td>
                                                            <td>{criminals.physicalappearance}</td>
                                                       </tr>
                                                       <tr>
                                                            <td><b>Address:</b></td>
                                                            <td> {criminals.address}</td>
                                                       </tr>
                                                       <tr>
                                                            <td><b>Phone No:</b></td>
                                                            <td>{criminals.phoneno}</td>
                                                       </tr>
                                                       <tr>
                                                            <td><b>Age:</b></td>
                                                            <td>{criminals.age}</td>
                                                       </tr>
                                                       <tr>
                                                            <td><b>Crime History:</b></td>
                                                            <td>{criminals.crimehistory}</td>
                                                       </tr>
                                                       <tr>
                                                            <td><b>Description:</b></td>
                                                            <td>{criminals.description}</td>
                                                       </tr>

                                                       <tr>
                                                            <td>
                                                                 <Button onClick={() => { deleteComplaint(criminals.id) }} className={classes.btn}>Delete</Button>
                                                                 {' '}
                                                                 <Button onClick={() => { handleUpdateClick(criminals) }} className={classes.btn}>Edit</Button>     
                                                                 {' '}
                                 <Button onClick={handleNewClick} className={classes.btn}>New Record</Button>
</td>
                                                            

                                                       </tr>
                                                           

                                                  </Table>
                                             </div>

                                        </div >
                                   </>
                              )
                         }) : <h3> Oops! No Record Added</h3>

                         }
                    </div>
                    : null}

               {displayEdit ?
                    <div className={register.registercontainer}>
                         <h2 className='text-center mb-4'>Edit Record</h2>
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
                                        <Form.Group as={Col} Name="fathername">
                                             <Form.Label className='float-left'>Father's Name:</Form.Label>
                                             <Form.Control type="text" placeholder="Enter father's name"
                                                  value={editfathername}
                                                  onChange={(e) => {
                                                       seteditFathername(e.target.value)
                                                  }
                                                  } />
                                        </Form.Group>
                                   </Col>

                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="age">
                                             <Form.Label className='float-left'>Age:</Form.Label>
                                             <Form.Control type="text" placeholder="Enter Age"
                                                  value={editage}
                                                  onChange={(e) => {
                                                       seteditAge(e.target.value)
                                                  }
                                                  } />
                                        </Form.Group>
                                   </Col>

                              </Form.Row>
                              <Form.Row>
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

                              </Form.Row>

                              <Form.Row>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="description">
                                             <Form.Label className='float-left'>Description:</Form.Label>
                                             <Form.Control type="text" placeholder="Enter description"
                                                  value={editdescription}
                                                  onChange={(e) => {
                                                       seteditDescription(e.target.value)
                                                  }
                                                  } />
                                        </Form.Group>
                                   </Col>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="physicalappearance">
                                             <Form.Label className='float-left'>physicalappearance:</Form.Label>
                                             <Form.Control type="text" placeholder="Enter physicalappearance"
                                                  value={editphysicalappearance}
                                                  onChange={(e) => {
                                                       seteditPhysicalappearance(e.target.value)
                                                  }
                                                  } />
                                        </Form.Group>
                                   </Col>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="crimehistory">
                                             <Form.Label className='float-left'>Crime History:</Form.Label>
                                             <Form.Control type="text" placeholder="Enter crimehistory"
                                                  value={editcrimehistory}
                                                  onChange={(e) => {
                                                       seteditCrimehistory(e.target.value)
                                                  }} />
                                        </Form.Group>
                                   </Col>


                              </Form.Row>


                              <Button disabled={loading} className={register.registerbtn} type="submit" value='save'>
                                   Edit Record</Button>

                         </Form>


                    </div>
                    : null}
          </>
     )

}
