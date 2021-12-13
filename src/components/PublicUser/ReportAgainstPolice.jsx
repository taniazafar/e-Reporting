import React, { useState} from 'react'
import { Form, Col, Button, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap'
import firebase from '../../Fire'
import classes from './ReportAgainstPolice.module.css'
import { Header } from '../PublicUser/Header'
import { Footer } from '../Pages/Footer'
import randomInteger from 'random-int';

export const ReportAgainstPolice = () => {
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
    const [phoneno, setPhoneno] = useState('')
    const [description, setDescription] = useState('')
    const [badge, setBadge] = useState('')
    const [officername, setOfficerName] = useState('')
    const [city, setCity] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [status] = useState('Pending')
    const tokenno = randomInteger(1, 100000);

    async function handleFormSubmit(e) {
        try {
            const submitRef = firebase.database().ref('Report Against Police')
            const complaint = {
                fullname,
                cnic,
                city,
                phoneno,
                description,
                badge,
                officername,
                email,
                gender,
                status,
                tokenno
            }
            setError("")
            setLoading(true)
            await submitRef.push(complaint)
            alert('Report Successfuly Submitted!!')
        } catch {
            setError("Failed to Submit")
        }

        setLoading(false)

    }

    return (
        <div>
            <Header />
            {error && <Alert variant='danger'>{error}</Alert>}
            <div className={classes.div4}>
                <h2 className={classes.form1}><b>Complaint Form</b></h2>
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
                            <Form.Group as={Col} Name="officername">
                                <Form.Label className={classes.formlabel}>Officer Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter full name"
                                    value={officername}
                                    onChange={(e) => {
                                        setOfficerName(e.target.value)
                                    }} />
                            </Form.Group>
                        </Col>

                        <Col xs={4}>
                            <Form.Group as={Col} Name="badge" >
                                <Form.Label className={classes.formlabel}>Badge*</Form.Label>
                                <Form.Control as='select' required name="BADGE" id="BADGE" class="input_fo " custom
                                    value={badge}
                                    onChange={(e) => {
                                        setBadge(e.target.value)
                                    }}
                                >
                                    <option >Select Badge</option>
                                    <option value='IGP'>IGP</option>
                                    <option value='AIG'>AIG</option>
                                    <option value='DIG'>DIG</option>
                                    <option value='SSP'>SSP</option>
                                    <option value='SP'>SP</option>
                                    <option value='ASP/DSP'>ASP/DSP</option>
                                    <option value='IP'>IP</option>
                                    <option value='SI'> SI</option>
                                    <option value='ASI'>ASI</option>
                                    <option value='HC'>HC</option>
                                    <option value='PC'>PC</option>

                                </Form.Control>
                            </Form.Group>
                        </Col>



                    </Form.Row>
                    <Form.Row>
                        <Col xs={8}>
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

                    </OverlayTrigger>,





                </Form>
                <div className = {classes.foot}>
                    <Footer />
                    </div>


            </div>

        </div>

    )


}

// {
//     displayHistory ?
//         <div className={register.comp}>
//             <br />
//             <h2 className='text-center mb-4'>Registered Complaints</h2>
//             {userData ? userData.map((complaint, index) => {
//                 return (
//                     <>
//                         <div className={register.contentRow}>
//                             <div className={register.contentColumn}>
//                                 <Table responsive borderless >

//                                     <tr className={register.table}>
//                                         <td ><b>Name:</b></td>
//                                         <td>{complaint.fullname}</td>
//                                     </tr>

//                                     <tr className={register.table}>
//                                         <td><b>CNIC:</b></td>
//                                         <td>{complaint.cnic}</td>
//                                     </tr>
//                                     <tr className={register.table}>
//                                         <td><b>Address:</b></td>
//                                         <td> {complaint.address}</td>
//                                     </tr>
//                                     <tr className={register.table}>
//                                         <td><b>Phone No:</b></td>
//                                         <td>{complaint.phoneno}</td>
//                                     </tr>
//                                     <tr className={register.table}>
//                                         <td><b>Description:</b></td>
//                                         <td>{complaint.description}</td>
//                                     </tr>


//                                     <tr>
//                                         <td>
//                                             <Button onClick={() => { deleteComplaint(complaint.id) }} className={register.btn}>Delete</Button>
//                                             {' '}
//                                             <Button onClick={() => { handleUpdateClick(complaint) }} className={register.btn}>Edit</Button>

//                                         </td>
//                                     </tr>

//                                 </Table>
//                             </div>

//                         </div >
//                     </>
//                 )
//             }) : <h3> Oops! No Registered Complaint</h3>

//             }
//         </div>
//         : null
// }

// {
//     displayEdit ?
//         <div className={register.registercontainer}>
//             <h2 className='text-center mb-4 text-white'>Edit Complaint</h2>
//             {error && <Alert variant='danger'>{error}</Alert>}

//             <Form className={register.complaintform} onSubmit={handleEditFormSubmit}>
//                 <Form.Row>
//                     <Col xs={12}>
//                         <Form.Group as={Col} Name="fullname">
//                             <Form.Label className='float-left text-white'>Name:</Form.Label>
//                             <Form.Control type="text" placeholder="Enter full name"
//                                 value={editfullname}
//                                 onChange={(e) => {
//                                     seteditFullname(e.target.value)
//                                 }
//                                 } />
//                         </Form.Group>
//                     </Col>
//                 </Form.Row>
//                 <Form.Row>
//                     <Col xs={12}>
//                         <Form.Group as={Col} Name="phoneno">
//                             <Form.Label className='float-left text-white'>Phone No:</Form.Label>
//                             <Form.Control type="text" placeholder="Enter phone no"
//                                 value={editphoneno}
//                                 onChange={(e) => {
//                                     seteditPhoneno(e.target.value)
//                                 }} />
//                         </Form.Group>
//                     </Col>
//                 </Form.Row>
//                 <Form.Row>
//                     <Col xs={12}>
//                         <Form.Group as={Col} Name="cnic">
//                             <Form.Label className='float-left text-white'>CNIC:</Form.Label>
//                             <Form.Control type="text" placeholder="Enter CNIC"
//                                 value={editcnic}
//                                 onChange={(e) => {
//                                     seteditCnic(e.target.value)
//                                 }} />
//                         </Form.Group>
//                     </Col>


//                 </Form.Row>
//                 <Form.Row>

//                     <Col xs={12}>
//                         <Form.Group as={Col} Name="address">
//                             <Form.Label className='float-left text-white'>Address:</Form.Label>
//                             <Form.Control type="text" placeholder="Enter your address"
//                                 value={editaddress}
//                                 onChange={(e) => {
//                                     seteditAddress(e.target.value)
//                                 }} />
//                         </Form.Group>
//                     </Col>
//                 </Form.Row>
//                 <Form.Row>
//                     <Col xs={12}>
//                         <Form.Group as={Col} Name="description">
//                             <Form.Label className='float-left text-white'>Describe in detail:</Form.Label>
//                             <Form.Control type="text" placeholder="Enter age"
//                                 value={editdescription}
//                                 onChange={(e) => {
//                                     seteditDescription(e.target.value)
//                                 }
//                                 } />
//                         </Form.Group>
//                     </Col>



//                 </Form.Row>
//                 <Button disabled={loading} className={register.registerbtn} type="submit" value='save'>
//                     Edit Complaint</Button>

//             </Form>


//         </div>
//         : null
// }

        // <>
        //     <NavBarPublic />
        //     <div className={classes.container}>
        //         {error && <Alert variant='danger'>{error}</Alert>}
        //     </div>
        //     {displayComplaint ?
        //         <>
        //             <div>
        //                 <Button onClick={handleViewHistory} className={register.viewbtn} type="submit" value='save'>
        //                     <b>View Registered Complaints</b></Button>
        //             </div>
        //             <div className={register.registercontainer}>
        //                 <h2 className='text-center mb-4'>Report Against Police</h2>
        //                 {error && <Alert variant='danger'>{error}</Alert>}

        //                 <Form className={register.complaintform} onSubmit={handleFormSubmit} >
        //                     <Form.Row>
        //                         <Col xs={12}>
        //                             <Form.Group as={Col} Name="fullname">
        //                                 <Form.Label className='float-left'>Name:</Form.Label>
        //                                 <Form.Control type="text" placeholder="Enter full name"
        //                                     value={fullname}
        //                                     onChange={(e) => {
        //                                         setFullname(e.target.value)
        //                                     }} />
        //                             </Form.Group>
        //                         </Col>
        //                     </Form.Row>
        //                     <Form.Row>
        //                         <Col xs={12}>
        //                             <Form.Group as={Col} Name="phoneno">
        //                                 <Form.Label className='float-left'>Phone No:</Form.Label>
        //                                 <Form.Control type="text" placeholder="Enter phone no"
        //                                     value={phoneno}
        //                                     onChange={(e) => {
        //                                         setPhoneno(e.target.value)
        //                                     }} />
        //                             </Form.Group>
        //                         </Col>
        //                     </Form.Row>
        //                     <Form.Row>
        //                         <Col xs={12}>
        //                             <Form.Group as={Col} Name="cnic">
        //                                 <Form.Label className='float-left'>CNIC:</Form.Label>
        //                                 <Form.Control type="text" placeholder="Enter CNIC"
        //                                     value={cnic}
        //                                     onChange={(e) => {
        //                                         setCnic(e.target.value)
        //                                     }} />
        //                             </Form.Group>
        //                         </Col>


        //                     </Form.Row>
        //                     <Form.Row>

        //                         <Col xs={12}>
        //                             <Form.Group as={Col} Name="address">
        //                                 <Form.Label className='float-left'>Address:</Form.Label>
        //                                 <Form.Control type="text" placeholder="Enter your address"
        //                                     value={address}
        //                                     onChange={(e) => {
        //                                         setAddress(e.target.value)
        //                                     }} />
        //                             </Form.Group>
        //                         </Col>
        //                     </Form.Row>
        //                     <Form.Row>
        //                         <Col xs={12}>
        //                             <Form.Group as={Col} Name="description">
        //                                 <Form.Label className='float-left'>Describe in detail:</Form.Label>
        //                                 <Form.Control type="text" placeholder="Enter Description"
        //                                     value={description}
        //                                     onChange={(e) => {
        //                                         setDescription(e.target.value)
        //                                     }} />
        //                             </Form.Group>
        //                         </Col>

        //                     </Form.Row>

        //                     <Button disabled={loading} className={register.registerbtn} type="submit" value='save'>
        //                         Register Complaint</Button>

        //                 </Form>


        //             </div>
        //         </>
        //         : null}
        //     {displayHistory ?
        //         <div className={classes.comp}>
        //             <br />
        //             <h2 className='text-center mb-4'>Registered Complaints</h2>
        //             {userData ? userData.map((complaint, index) => {
        //                 return (
        //                     <>
        //                         <div className={classes.contentRow}>
        //                             <div className={classes.contentColumn}>
        //                                 <Table responsive borderless >

        //                                     <tr className={classes.table}>
        //                                         <td ><b>Name:</b></td>
        //                                         <td>{complaint.fullname}</td>
        //                                     </tr>

        //                                     <tr>
        //                                         <td><b>CNIC:</b></td>
        //                                         <td>{complaint.cnic}</td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td><b>Address:</b></td>
        //                                         <td> {complaint.address}</td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td><b>Phone No:</b></td>
        //                                         <td>{complaint.phoneno}</td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td><b>Description:</b></td>
        //                                         <td>{complaint.description}</td>
        //                                     </tr>


        //                                     <tr>
        //                                         <td>
        //                                             <Button onClick={() => { deleteComplaint(complaint.id) }} className={classes.btn}>Delete</Button>
        //                                             {' '}
        //                                             <Button onClick={() => { handleUpdateClick(complaint) }} className={classes.btn}>Edit</Button>

        //                                         </td>
        //                                     </tr>

        //                                 </Table>
        //                             </div>

        //                         </div >
        //                     </>
        //                 )
        //             }) : <h3> Oops! No Registered Complaint</h3>

        //             }
        //         </div>
        //         : null}

        //     {displayEdit ?
        //         <div className={register.registercontainer}>
        //             <h2 className='text-center mb-4'>Edit Complaint</h2>
        //             {error && <Alert variant='danger'>{error}</Alert>}

        //             <Form className={register.complaintform} onSubmit={handleEditFormSubmit}>
        //                 <Form.Row>
        //                     <Col xs={12}>
        //                         <Form.Group as={Col} Name="fullname">
        //                             <Form.Label className='float-left'>Name:</Form.Label>
        //                             <Form.Control type="text" placeholder="Enter full name"
        //                                 value={editfullname}
        //                                 onChange={(e) => {
        //                                     seteditFullname(e.target.value)
        //                                 }
        //                                 } />
        //                         </Form.Group>
        //                     </Col>
        //                 </Form.Row>
        //                 <Form.Row>
        //                     <Col xs={12}>
        //                         <Form.Group as={Col} Name="phoneno">
        //                             <Form.Label className='float-left'>Phone No:</Form.Label>
        //                             <Form.Control type="text" placeholder="Enter phone no"
        //                                 value={editphoneno}
        //                                 onChange={(e) => {
        //                                     seteditPhoneno(e.target.value)
        //                                 }} />
        //                         </Form.Group>
        //                     </Col>
        //                 </Form.Row>
        //                 <Form.Row>
        //                     <Col xs={12}>
        //                         <Form.Group as={Col} Name="cnic">
        //                             <Form.Label className='float-left'>CNIC:</Form.Label>
        //                             <Form.Control type="text" placeholder="Enter CNIC"
        //                                 value={editcnic}
        //                                 onChange={(e) => {
        //                                     seteditCnic(e.target.value)
        //                                 }} />
        //                         </Form.Group>
        //                     </Col>


        //                 </Form.Row>
        //                 <Form.Row>

        //                     <Col xs={12}>
        //                         <Form.Group as={Col} Name="address">
        //                             <Form.Label className='float-left'>Address:</Form.Label>
        //                             <Form.Control type="text" placeholder="Enter your address"
        //                                 value={editaddress}
        //                                 onChange={(e) => {
        //                                     seteditAddress(e.target.value)
        //                                 }} />
        //                         </Form.Group>
        //                     </Col>
        //                 </Form.Row>
        //                 <Form.Row>
        //                     <Col xs={12}>
        //                         <Form.Group as={Col} Name="description">
        //                             <Form.Label className='float-left'>Describe in detail:</Form.Label>
        //                             <Form.Control type="text" placeholder="Enter age"
        //                                 value={editdescription}
        //                                 onChange={(e) => {
        //                                     seteditDescription(e.target.value)
        //                                 }
        //                                 } />
        //                         </Form.Group>
        //                     </Col>



        //                 </Form.Row>
        //                 <Button disabled={loading} className={register.registerbtn} type="submit" value='save'>
        //                     Edit Complaint</Button>

        //             </Form>


        //         </div>
        //         : null}
        // </>
