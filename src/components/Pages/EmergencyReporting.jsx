import React, { useState, useEffect } from 'react'
import { Form, Col, Button, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap'
import firebase from '../../Fire'
import classes from './EmergencyReporting.module.css'
import { Footer } from './Footer'
import elogo from './elogo.jpg'
import randomInteger from 'random-int';
import { HomeNavBar } from '../Layout/NavBar'
export const EmergencyReporting = () => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click to submit
        </Tooltip>
    );
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [fullname, setFullname] = useState()
    const [cnic, setCnic] = useState('')
    const [gender, setGender] = useState('')
    const [city, setCity] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [status] = useState('Pending')
    const tokenno = randomInteger(1, 100000);
    const [category, setCategory] = useState('')
    const [occupation, setOccupation] = useState('')
    async function handleFormSubmit(e) {
        e.preventDefault();
        try {


            const submitRef = firebase.database().ref('Emergency Reports')
            const emergencyreport = {
                fullname,
                cnic,
                gender,
                city,
                phoneno,
                description,
                email,
                category,
                occupation,
                status,
                tokenno
            }
            setError("")
            setLoading(true)
            await submitRef.push(emergencyreport)
            alert('Report Successfuly Submitted!!')

        } catch {
            setError("Failed to Submit")
        }

        setLoading(false)
    }

    return (

        <>
            <div >
                <div className={classes.header}>
                    <div className={classes.welcome}>
                        <div className={classes.tag}>
                            Welcome to e-Reporting
                        </div>
                    </div>
                </div>
                <div className={classes.div2}>
                    <img className={classes.logo} src={elogo} alt='' />
                    <h4 className={classes.heading1}>ONLINE CRIME <br />
                        REPORTING <br />SYSTEM </h4>
                    <div className={classes.vl}></div>
                    <h4 className={classes.heading2}>HONESTY  <br />
                        {'&'}
                        <br />INTEGRITY</h4>
                    <div className={classes.hl}></div>
                </div>
                <div className={classes.div3}>
                    <HomeNavBar />
                </div>

                <div className={classes.complaintform}>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <h2 className={classes.form1}><b>Complaint Registration Form</b></h2>
                    <p className={classes.form2}><br />All fields marked with * are mandatory.</p>
                    <br />
                    <Form onSubmit={handleFormSubmit} >
                        <Form.Row>
                            <Col xs={6}>
                                <Form.Group as={Col} Name="fullname">
                                    <Form.Label className={classes.formlabel}>Full Name*</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter full name"
                                        value={fullname}
                                        onChange={(e) => {
                                            setFullname(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>
                            <Col xs={6}>
                                <Form.Group as={Col} Name="cnic">
                                    <Form.Label className={classes.formlabel}>CNIC No*</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter CNIC"
                                        value={cnic}
                                        onChange={(e) => {
                                            setCnic(e.target.value)
                                        }} />
                                </Form.Group>

                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col xs={6}>
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
                            <Col xs={6}>
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
                        </Form.Row>
                        <Form.Row>

                            <Col xs={6}>
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
                            <Col xs={6}>
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
                                <Form.Group as={Col} Name="city">
                                    <Form.Label className={classes.formlabel}>City*</Form.Label>

                                    <Form.Control required as='select' name="DD_CITY" id="DD_CITY" title="Select Your City" class="input_fo "
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
                            <Col xs={6}>
                                <Form.Group as={Col} Name="crimetype" >
                                    <Form.Label className={classes.formlabel}>Crime Category*</Form.Label>
                                    <Form.Control as='select' required name="CRIME_CATEGORY" id="CRIME_CATEGORY" class="input_fo "
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


                        </Form.Row>
                        <Form.Row>
                            <Col xs={12}>
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

                </div>



            </div >


            <Footer />
        </>
    )

}
