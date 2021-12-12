import React, { useState } from 'react'
import { Form, Col, Button, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap'
import classes from './Complaint.module.css'
import firebase from '../../Fire'
import { DashboardPublic } from '../PublicUser/dashboardPublic'
import { Footer } from './Footer'
export const RegisterComplaint = () => {

     const renderTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
               Click to submit
          </Tooltip>
     );
     const [error, setError] = useState("")
     const [loading, setLoading] = useState(false)
     const [fullname, setFullname] = useState()
     const [address, setAddress] = useState('')
     const [cnic, setCnic] = useState('')
     const [gender, setGender] = useState('')
     const [city, setCity] = useState('')
     const [phoneno, setPhoneno] = useState('')
     const [description, setDescription] = useState('')
     const [email, setEmail] = useState('')
     const [category, setCategory] = useState('')
     const [occupation, setOccupation] = useState('')
     async function handleFormSubmit(e) {
          try {
               const submitRef = firebase.database().ref('Register Complaint')
               const complaint = {
                    fullname,
                    cnic,
                    gender,
                    city,
                    address,
                    phoneno,
                    description,
                    email,
                    category,
                    occupation
               }
               setError("")
               setLoading(true)
               await submitRef.push(complaint)
               alert('Report Successfuly Submitted')

          } catch {
               setError("Failed to Submit")
          }

          setLoading(false)
     }


     return (
          <>
               <div >
                    <DashboardPublic />
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <div className={classes.div4}>
                         <h2 className={classes.form1}><b>Complaint Registration Form</b></h2>
                         <p className={classes.form2}><br />All fields marked with * are mandatory.</p>
                    </div>
                    <div className={classes.complaintform}>
                         {error && <Alert variant='danger'>{error}</Alert>}

                         <Form onSubmit={handleFormSubmit} >
                              <Form.Row>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="fullname">
                                             <Form.Label className={classes.formlabel}>Name*</Form.Label>
                                             <Form.Control required type="text" placeholder="Enter full name"
                                                  value={fullname}
                                                  onChange={(e) => {
                                                       setFullname(e.target.value)
                                                  }} />
                                        </Form.Group>
                                   </Col>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="cnic">
                                             <Form.Label className={classes.formlabel}>CNIC No*</Form.Label>
                                             <Form.Control required type="text" placeholder="Enter CNIC"
                                                  value={cnic}
                                                  onChange={(e) => {
                                                       setCnic(e.target.value)
                                                  }} />
                                        </Form.Group>

                                   </Col>
                                   <Col xs={4}>
                                        <Form.Group as={Col} >
                                             <Form.Label className={classes.formlabel}>Gender*</Form.Label>
                                             <Form.Control required as="select" name="GENDER_TYPE" id="GENDER_TYPE" class="input_fo" custom
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
                              </Form.Row>
                              <Form.Row>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="phoneno" >
                                             <Form.Label className={classes.formlabel}>Phone No*</Form.Label>
                                             <Form.Control required type="text" placeholder="Enter phone no"
                                                  value={phoneno}
                                                  onChange={(e) => {
                                                       setPhoneno(e.target.value)
                                                  }
                                                  } />
                                        </Form.Group>
                                   </Col>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="email" >
                                             <Form.Label className={classes.formlabel}>Email Address*</Form.Label>
                                             <Form.Control required type="email" placeholder="Enter email address"
                                                  value={email}
                                                  onChange={(e) => {
                                                       setEmail(e.target.value)
                                                  }
                                                  } />
                                        </Form.Group>
                                   </Col>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="city">
                                             <Form.Label className={classes.formlabel}>City*</Form.Label>

                                             <Form.Control required as='select' name="DD_CITY" id="DD_CITY" title="Select Your City" class="input_fo " custom
                                                  value={city}
                                                  onChange={(e) => {
                                                       setCity(e.target.value)
                                                  }}>
                                                  <option >Select City</option>
                                                  <option value="Islamabad">Islamabad</option>
                                                  <option value="Rawalpindi">Rawalpindi</option>
                                             </Form.Control>
                                        </Form.Group>
                                   </Col>


                              </Form.Row>
                              <Form.Row>


                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="crimetype" >
                                             <Form.Label className={classes.formlabel}>Crime Category*</Form.Label>
                                             <Form.Control as='select' required name="CRIME_CATEGORY" id="CRIME_CATEGORY" class="input_fo " custom
                                                  value={category}
                                                  onChange={(e) => {
                                                       setCategory(e.target.value)
                                                  }}
                                             >
                                                  <option >Select Crime Category </option>
                                                  <option value='Cybercrime'>Cybercrime</option>
                                                  <option value='Fraud'>Fraud</option>
                                                  <option value='Theft'>Theft</option>
                                                  <option value='Assult'>Assult</option>
                                                  <option value='Terrorist Attack'>Terrorist Attack</option>
                                                  <option value='Drug Trafficking'>Drug Trafficking</option>
                                                  <option value='Ransom'>Ransom</option>

                                             </Form.Control>
                                        </Form.Group>
                                   </Col>
                                   <Col xs={4}>
                                        <Form.Group as={Col} Name="occupation" >
                                             <Form.Label className={classes.formlabel}>Occupation*</Form.Label>
                                             <Form.Control as='select' required name="DD_OCCUPATION" id="DD_OCCUPATION" title="Select Occupation/ Profession" class="input_fo "

                                                  value={occupation}
                                                  onChange={(e) => {
                                                       setOccupation(e.target.value)
                                                  }}
                                             >
                                                  <option >Select Occupation</option>
                                                  <option value='Student'>Student</option>
                                                  <option value='Govt. Employee'>Govt. Employee</option>
                                                  <option value='Army Officer'>Army Officer</option>
                                                  <option value='Judiciary'>Judiciary</option>
                                                  <option value='Embassy '>Embassy</option>
                                                  <option value='Doctor'>Doctor</option>
                                                  <option value='Professor/ Lecturer/ Teacher'>Professor/ Lecturer/ Teacher</option>
                                                  <option value='Lawyer'>Lawyer</option>
                                                  <option value='Banker'>Banker</option>
                                                  <option value='Businessman'>Businessman</option>
                                                  <option value='Politician'>Politician</option>
                                                  <option value='Show Business'>Show Business</option>
                                                  <option value='Housewife'>Housewife</option>
                                                  <option value='Journalist'>Journalist</option>
                                                  <option value='Landlord/ Agriculturist'>Landlord/ Agriculturist</option>
                                                  <option value='NGO'>NGO</option>
                                                  <option value='Retired Officer/ Pensioner'>Retired Officer/ Pensioner</option>
                                                  <option value='Private Job'>Private Job</option>
                                                  <option value='Others'>Others</option>

                                             </Form.Control>
                                        </Form.Group>
                                   </Col>


                              </Form.Row>
                              <Form.Row>
                                   <Col xs={6}>
                                        <Form.Group as={Col} Name="address" >
                                             <Form.Label className={classes.formlabel}>Postal Address*</Form.Label>
                                             <Form.Control as="textarea" required placeholder="Complete Postal Address" rows={3}
                                                  value={address}
                                                  onChange={(e) => {
                                                       setAddress(e.target.value)
                                                  }} />
                                        </Form.Group>
                                   </Col>
                                   <Col xs={6}>
                                        <Form.Group as={Col} Name="description" >
                                             <Form.Label className={classes.formlabel}>Describe in detail*</Form.Label>
                                             <Form.Control as="textarea" required placeholder="Enter Description" rows={3}
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
                                        Register Complaint</Button>

                              </OverlayTrigger>


                         </Form>
                         <div className={classes.foot}>
                              <Footer />
                         </div>

                    </div>



               </div>

          </>

     )


}
// import React, { useState, useEffect } from 'react'
// import { Form, Col, Button, Alert, Table } from 'react-bootstrap'
// import register from './RegisterComplaint.module.css'
// import classes from './Complaint.module.css'
// import firebase from '../../Fire'
// import { db } from '../../Fire'
// import { NavBarPublic } from '../PublicUser/NavBarPublic'
// import classess from '../PublicUser/dashboardPublic.module.css'
// import { useAuth } from '../AuthContext'


// export const RegisterComplaint = () => {
//      const { currentUser } = useAuth()
//      const [error, setError] = useState("")
//      const [loading, setLoading] = useState(false)

//      const [fullname, setFullname] = useState()
//      const [address, setAddress] = useState('')
//      const [cnic, setCnic] = useState('')
//      const [phoneno, setPhoneno] = useState('')
//      const [description, setDescription] = useState('')


//      const [displayComplaint, setDisplayComplaint] = useState(true)
//      const [displayHistory, setDisplayHistory] = useState(false)
//      const [displayEdit, setDisplayEdit] = useState(false)

//      const [complaint, setComplaint] = useState([{
//           data: [],
//           id: [],
//      }])

//      console.log(currentUser.email);

//      async function handleFormSubmit(e) {
//           e.preventDefault()
//           try {
//                const submitRef = firebase.database().ref('Register Complaint')
//                const complaint = {
//                     fullname,
//                     cnic,
//                     address,
//                     phoneno,
//                     description,

//                }
//                setError("")
//                setLoading(true)
//                let registerComplaint = db.collection("complaints").doc();
//                registerComplaint.set({
//                     name: fullname,
//                     cnic: cnic,
//                     address: address,
//                     phoneNumber: phoneno,
//                     description: description,
//                     email: currentUser.email,
//                     status: "pending",
//                })
//                await submitRef.push(complaint)
//                setDisplayHistory(true)
//                setDisplayComplaint(false)
//           } catch {
//                setError("Failed to Submit")
//           }

//           setLoading(false)

//      }

//      useEffect(() => {
//           db.collection("complaints").where("email", "==", `${currentUser.email}`).get().then((querySnapshot) => {
//                querySnapshot.forEach((doc) => {
//                     console.log(doc.data());
//                     setComplaint([{ ...complaint, data: doc.data(), id: doc.id }]);
//                });
//           });
//           console.log(complaint);
//      })

//      const [editfullname, seteditFullname] = useState()
//      const [editcnic, seteditCnic] = useState('')
//      const [editaddress, seteditAddress] = useState('')
//      const [editphoneno, seteditPhoneno] = useState('')
//      const [editdescription, seteditDescription] = useState('')

//      const [userId, setUserId] = useState('')

//      const handleUpdateClick = (complaint) => {

//           seteditAddress(complaint.address)
//           seteditCnic(complaint.cnic)
//           seteditFullname(complaint.fullname)
//           seteditPhoneno(complaint.phoneno)
//           seteditDescription(complaint.description)

//           setUserId(complaint.id)

//           setDisplayEdit(true)
//           setDisplayHistory(false)
//      }
//      async function handleEditFormSubmit(e) {
//           e.preventDefault()
//           try {

//                const editRef = firebase.database().ref('Register Complaint').child(userId)
//                setError("")
//                setLoading(true)

//                await editRef.update({
//                     fullname: editfullname,
//                     cnic: editcnic,
//                     address: editaddress,
//                     phoneno: editphoneno,
//                     description: editdescription
//                })
//                setDisplayEdit(false)
//                setDisplayHistory(true)

//           } catch {
//                setError("Failed to Edit")
//           }

//           setLoading(false)


//      }

//      // const deleteComplaint = (id) => {
//      //      const deleteRef = firebase.database().ref('Register Complaint').child(id)
//      //      deleteRef.remove()
//      // }

//      const deleteComplaint = (id) => {
//           console.log(id)
//           db.collection("complaints").doc(id).delete()
//      }

//      // const deleteComplaint = (id) => {

//      //      db.collection("complaints").doc(id).delete().then(() => {
//      //           console.log("Document successfully deleted!");
//      //      }).catch((error) => {
//      //           console.error("Error removing document: ", error);
//      //      });
//      // }

//      const handleViewHistory = () => {
//           setDisplayHistory(true)
//           setDisplayComplaint(false)
//      }

//      const handleNewClick = () => {

//           setDisplayHistory(false)
//           setDisplayComplaint(true)
//      }

//      return (
//           <>
//                <NavBarPublic />
//                <div className={classess.container}>
//                     {error && <Alert variant='danger'>{error}</Alert>}
//                </div>
//                {displayComplaint ?
//                     <>

//                          <div>
//                               <Button onClick={handleViewHistory} className={register.viewbtn} type="submit" value='save'>
//                                    <b>View Registered Complaints</b></Button>
//                          </div>
//                          <div className={register.registercontainer}>
//                               <h2 className='text-center mb-4'>Register Complaint</h2>
//                               {error && <Alert variant='danger'>{error}</Alert>}

//                               <Form className={register.complaintform} onSubmit={handleFormSubmit} >
//                                    <Form.Row>
//                                         <Col xs={4}>
//                                              <Form.Group as={Col} Name="fullname">
//                                                   <Form.Label className='float-left'>Name:</Form.Label>
//                                                   <Form.Control type="text" placeholder="Enter full name"
//                                                        value={fullname}
//                                                        onChange={(e) => {
//                                                             setFullname(e.target.value)
//                                                        }} />
//                                              </Form.Group>
//                                         </Col>
//                                         <Col xs={4}>
//                                              <Form.Group as={Col} Name="phoneno">
//                                                   <Form.Label className='float-left'>Phone No:</Form.Label>
//                                                   <Form.Control type="text" placeholder="Enter phone no"
//                                                        value={phoneno}
//                                                        onChange={(e) => {
//                                                             setPhoneno(e.target.value)
//                                                        }} />
//                                              </Form.Group>
//                                         </Col>
//                                         <Col xs={4}>
//                                              <Form.Group as={Col} Name="cnic">
//                                                   <Form.Label className='float-left'>CNIC:</Form.Label>
//                                                   <Form.Control type="text" placeholder="Enter CNIC"
//                                                        value={cnic}
//                                                        onChange={(e) => {
//                                                             setCnic(e.target.value)
//                                                        }} />
//                                              </Form.Group>
//                                         </Col>


//                                    </Form.Row>
//                                    <Form.Row>

//                                         <Col xs={4}>
//                                              <Form.Group as={Col} Name="address">
//                                                   <Form.Label className='float-left'>Address:</Form.Label>
//                                                   <Form.Control type="text" placeholder="Enter your address"
//                                                        value={address}
//                                                        onChange={(e) => {
//                                                             setAddress(e.target.value)
//                                                        }} />
//                                              </Form.Group>
//                                         </Col>
//                                         <Col xs={4}>
//                                              <Form.Group as={Col} Name="description">
//                                                   <Form.Label className='float-left'>Describe in detail:</Form.Label>
//                                                   <Form.Control type="text" placeholder="Enter Description"
//                                                        value={description}
//                                                        onChange={(e) => {
//                                                             setDescription(e.target.value)
//                                                        }} />
//                                              </Form.Group>
//                                         </Col>

//                                    </Form.Row>

//                                    <Button disabled={loading} className={register.registerbtn} type="submit" value='save'>
//                                         Register Complaint</Button>

//                               </Form>


//                          </div>
//                     </>
//                     : null}
//                {displayHistory ?
//                     <div >
//                          <br />
//                          <h2 className='text-center mb-4'>Registered Complaints</h2>
//                          <div className={classes.contentRow}>
//                               <div className={classes.contentColumn} key={complaint.id} >
//                                    {complaint && complaint.map((complaint) => {
//                                         return (
//                                              <Table responsive borderless >
//                                                   <tr className={classes.table}>
//                                                        <td ><b>Name:</b></td>
//                                                        <td>{complaint.data.name}</td>
//                                                   </tr>

//                                                   <tr>
//                                                        <td><b>CNIC:</b></td>
//                                                        <td>{complaint.data.cnic}</td>
//                                                   </tr>
//                                                   <tr>
//                                                        <td><b>Address:</b></td>
//                                                        <td> {complaint.data.address}</td>
//                                                   </tr>
//                                                   <tr>
//                                                        <td><b>Phone No:</b></td>
//                                                        <td>{complaint.data.phoneNumber}</td>
//                                                   </tr>
//                                                   <tr>
//                                                        <td><b>Description:</b></td>
//                                                        <td>{complaint.data.description}</td>
//                                                   </tr>


//                                                   <tr>
//                                                        <td>
//                                                             <Button onClick={() => { deleteComplaint(complaint.id) }} className={classes.btn}>Delete</Button>
//                                                             {' '}
//                                                             <Button onClick={() => { handleUpdateClick(complaint) }} className={classes.btn}>Edit</Button>
//                                                             {' '}
//                                                             <Button onClick={handleNewClick} className={classes.btn}>New Complaint</Button>

//                                                        </td>
//                                                   </tr>

//                                              </Table>


//                                         )
//                                    })

//                                    }
//                               </div>
//                          </div >
//                     </div>
//                     : null}

//                {displayEdit ?
//                     <div className={register.registercontainer}>
//                          <h2 className='text-center mb-4'>Edit Complaint</h2>
//                          {error && <Alert variant='danger'>{error}</Alert>}

//                          <Form className={register.complaintform} onSubmit={handleEditFormSubmit}>
//                               <Form.Row>
//                                    <Col xs={4}>
//                                         <Form.Group as={Col} Name="fullname">
//                                              <Form.Label className='float-left'>Name:</Form.Label>
//                                              <Form.Control type="text" placeholder="Enter full name"
//                                                   value={editfullname}
//                                                   onChange={(e) => {
//                                                        seteditFullname(e.target.value)
//                                                   }
//                                                   } />
//                                         </Form.Group>
//                                    </Col>
//                                    <Col xs={4}>
//                                         <Form.Group as={Col} Name="phoneno">
//                                              <Form.Label className='float-left'>Phone No:</Form.Label>
//                                              <Form.Control type="text" placeholder="Enter phone no"
//                                                   value={editphoneno}
//                                                   onChange={(e) => {
//                                                        seteditPhoneno(e.target.value)
//                                                   }} />
//                                         </Form.Group>
//                                    </Col>
//                                    <Col xs={4}>
//                                         <Form.Group as={Col} Name="cnic">
//                                              <Form.Label className='float-left'>CNIC:</Form.Label>
//                                              <Form.Control type="text" placeholder="Enter CNIC"
//                                                   value={editcnic}
//                                                   onChange={(e) => {
//                                                        seteditCnic(e.target.value)
//                                                   }} />
//                                         </Form.Group>
//                                    </Col>


//                               </Form.Row>
//                               <Form.Row>

//                                    <Col xs={4}>
//                                         <Form.Group as={Col} Name="address">
//                                              <Form.Label className='float-left'>Address:</Form.Label>
//                                              <Form.Control type="text" placeholder="Enter your address"
//                                                   value={editaddress}
//                                                   onChange={(e) => {
//                                                        seteditAddress(e.target.value)
//                                                   }} />
//                                         </Form.Group>
//                                    </Col>
//                                    <Col xs={4}>
//                                         <Form.Group as={Col} Name="description">
//                                              <Form.Label className='float-left'>Describe in detail:</Form.Label>
//                                              <Form.Control type="text" placeholder="Enter age"
//                                                   value={editdescription}
//                                                   onChange={(e) => {
//                                                        seteditDescription(e.target.value)
//                                                   }
//                                                   } />
//                                         </Form.Group>
//                                    </Col>



//                               </Form.Row>


//                               <Button disabled={loading} className={register.registerbtn} type="submit" value='save'>
//                                    Edit Complaint</Button>

//                          </Form>


//                     </div>
//                     : null}
//           </>
//      )

// }
