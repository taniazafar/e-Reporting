import React, { useState, useEffect } from 'react'
import { Form, Col, Button, Alert, Table, Tooltip, OverlayTrigger } from 'react-bootstrap'
import classes from './CriminalRecord.module.css'
import firebase from '../../Fire'
import { Header } from './Header'
import { Footer } from './Footer'
import { FaSearch } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { FaEdit } from "react-icons/fa"
import { IconContext } from "react-icons"
export const CriminalRecordHistory = () => {
    const [error, setError] = useState("")
    const [showRecords, setShowRecords] = useState(true)
    const [showEditForm, setShowEditForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const deleteTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete
        </Tooltip>
    );
    const EditTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Edit
        </Tooltip>
    );

    const [searchTerm1, setSearchTerm1] = useState('')
    const [userData, setUserdata] = useState()

    useEffect(() => {
        const submitRef = firebase.database().ref('Criminal Record')
        submitRef.on('value', (snapshot) => {

            const record = snapshot.val()
            const CriminalRecord = []
            for (let id in record) {
                CriminalRecord.push({ id, ...record[id] })
            }
            setUserdata(CriminalRecord)

        })
    }, [])
    const deleteRecord = (id) => {
        const deleteRef = firebase.database().ref('Criminal Record').child(id)
        deleteRef.remove()
    }

    const [editfirstname, setFirstnameedit] = useState()
    const [editlastname, setLastnameedit] = useState()
    const [editgender, setGenderedit] = useState('')
    const [editdob, setDobedit] = useState('')
    const [editresidence, setResidenceedit] = useState()
    const [editarrests, setArrestsedit] = useState()
    const [editheight, setHeightedit] = useState('')
    const [editeyecolor, setEyecoloredit] = useState('')
    const [editphysicalappearance, setPhysicalappearanceedit] = useState('')
    const [editdescription, setDescriptionedit] = useState('')
    const [userId, setUserId] = useState('')

    const handleEditClick = (record) => {

        setFirstnameedit(record.firstname)
        setLastnameedit(record.lastname)
        setGenderedit(record.gender)
        setDobedit(record.dob)
        setResidenceedit(record.residence)
        setArrestsedit(record.arrests)
        setHeightedit(record.height)
        setEyecoloredit(record.eyecolor)
        setPhysicalappearanceedit(record.physicalappearance)
        setDescriptionedit(record.description)
        setUserId(record.id)
        setShowRecords(false)
        setShowEditForm(true)


    }
    async function handleEditFormSubmit() {

        try {

            const editRef = firebase.database().ref('Criminal Record').child(userId)
            setError("")
            setLoading(true)

            await editRef.update({
                firstname: editfirstname,
                lastname: editlastname,
                gender: editgender,
                dob: editdob,
                residence: editresidence,
                arrests: editarrests,
                height: editheight,
                eyecolor: editeyecolor,
                physicalappearance: editphysicalappearance,
                description: editdescription,

            })
            setShowRecords(true)

        } catch {
            setError("Failed to Edit")
        }

        setLoading(false)


    }

    return (
        <>
            <Header />
            {showRecords ?
                <div className={classes.complaintform}>
                    <h3>Criminal Record</h3>
                    <div className={classes.tokensearch}>

                        <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                            <input className={classes.ser} type='text' placeholder='Search...'
                                onChange={(e) => {
                                    setSearchTerm1(e.target.value)
                                }} />
                            <FaSearch />
                        </IconContext.Provider>

                    </div>
                    <Table responsive bordered>

                        <thead>
                            <tr>
                                <th >First Name</th>
                                <th >Last Name</th>
                                <th >Gender</th>
                                <th >DOB</th>
                                <th >Residence</th>
                                <th >Arrests</th>
                                <th >Height</th>
                                <th >Eye Color</th>
                                <th >Physical Appearance</th>
                                <th >Description</th>
                                <th ></th>
                                <th ></th>
                            </tr>
                        </thead>
                        {userData ? userData.filter((record) => {
                            if (searchTerm1 == '') {
                                return record
                            }
                            else if (searchTerm1 == record.firstname) {
                                return record
                            }

                        }).map((record, key) => {

                            return (
                                <>
                                    <tbody>
                                        <tr>
                                            <td >{record.firstname}</td>
                                            <td>{record.lastname}</td>
                                            <td>{record.gender}</td>
                                            <td>{record.dob}</td>
                                            <td>{record.residence}</td>
                                            <td>{record.arrests}</td>
                                            <td>{record.height}</td>
                                            <td>{record.eyecolor}</td>
                                            <td> {record.physicalappearance}</td>
                                            <td>{record.description}</td>
                                            <td>
                                                <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                                    <OverlayTrigger
                                                        placement="right"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={deleteTooltip}
                                                    >
                                                        <AiFillDelete onClick={() => { deleteRecord(record.id) }} />
                                                    </OverlayTrigger>
                                                </IconContext.Provider>

                                            </td>
                                            <td>
                                                <IconContext.Provider value={{ style: { fontSize: '25px' } }}>

                                                    <OverlayTrigger
                                                        placement="right"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={EditTooltip}
                                                    >
                                                        <FaEdit onClick={() => { handleEditClick(record) }} />
                                                    </OverlayTrigger>


                                                </IconContext.Provider>

                                            </td>

                                        </tr>

                                    </tbody>
                                </>
                            )
                        }) : <h3> Oops! No Record</h3>

                        }
                    </Table>
                </div>
                : null}
            {showEditForm ?
                <>
                    <div className={classes.div4}>
                        <h2 className={classes.form1}><b>Edit Criminal Record</b></h2>
                        <p className={classes.form2}><br />All fields marked with * are mandatory.</p>
                    </div>
                    <div className={classes.complaintform}>
                        {error && <Alert variant='danger'>{error}</Alert>}

                        <Form onSubmit={handleEditFormSubmit} >
                            <Form.Row>

                                <Col xs={4}>
                                    <Form.Group as={Col} Name="firstname">
                                        <Form.Label className={classes.formlabel}>First Name*</Form.Label>
                                        <Form.Control required type="text" placeholder="Enter first name"
                                            value={editfirstname}
                                            onChange={(e) => {
                                                setFirstnameedit(e.target.value)
                                            }} />
                                    </Form.Group>
                                </Col>

                                <Col xs={4}>
                                    <Form.Group as={Col} Name="lastname">
                                        <Form.Label className={classes.formlabel}>Last Name*</Form.Label>
                                        <Form.Control required type="text" placeholder="Enter last name"
                                            value={editlastname}
                                            onChange={(e) => {
                                                setLastnameedit(e.target.value)
                                            }} />
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group as={Col} >
                                        <Form.Label className={classes.formlabel}>Gender*</Form.Label>
                                        <Form.Control required as="select" name="GENDER_TYPE" id="GENDER_TYPE" class="input_fo"
                                            value={editgender}
                                            onChange={(e) => {
                                                setGenderedit(e.target.value)
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
                                            value={editdob}
                                            onChange={(e) => {
                                                setDobedit(e.target.value)
                                            }} />
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group as={Col} Name="residence">
                                        <Form.Label className={classes.formlabel}>Residence State*</Form.Label>
                                        <Form.Control required as="select" placeholder="Enter residence"
                                            value={editresidence}
                                            onChange={(e) => {
                                                setResidenceedit(e.target.value)
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
                                            value={editarrests}
                                            onChange={(e) => {
                                                setArrestsedit(e.target.value)
                                            }} />
                                    </Form.Group>
                                </Col>


                            </Form.Row>
                            <Form.Row>

                                <Col xs={4}>
                                    <Form.Group as={Col} Name="eyecolor">
                                        <Form.Label className={classes.formlabel}>Eye Color*</Form.Label>
                                        <Form.Control required type="text" placeholder="Enter eye color"
                                            value={editeyecolor}
                                            onChange={(e) => {
                                                setEyecoloredit(e.target.value)
                                            }} />
                                    </Form.Group>
                                </Col>

                                <Col xs={4}>
                                    <Form.Group as={Col} Name="height">
                                        <Form.Label className={classes.formlabel}>Height*</Form.Label>
                                        <Form.Control required type="text" placeholder="Enter height"
                                            value={editheight}
                                            onChange={(e) => {
                                                setHeightedit(e.target.value)
                                            }} />
                                    </Form.Group>
                                </Col>
                                <Col xs={4}>
                                    <Form.Group as={Col} Name="physicalappearance">
                                        <Form.Label className={classes.formlabel}>Physical Appearance*</Form.Label>
                                        <Form.Control required as="textarea" placeholder="Enter physical appearance" rows={1}
                                            value={editphysicalappearance}
                                            onChange={(e) => {
                                                setPhysicalappearanceedit(e.target.value)
                                            }} />
                                    </Form.Group>
                                </Col>

                            </Form.Row>

                            <Form.Row>
                                <Col xs={8}>
                                    <Form.Group as={Col} Name="description">
                                        <Form.Label className={classes.formlabel}>Description*</Form.Label>
                                        <Form.Control required as="textarea" placeholder="Enter description" rows={3}
                                            value={editdescription}
                                            onChange={(e) => {
                                                setDescriptionedit(e.target.value)
                                            }} />
                                    </Form.Group>
                                </Col>
                            </Form.Row>


                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={EditTooltip}
                            >
                                <Button disabled={loading} className={classes.registerbtn} type="submit" value='save'>
                                    Edit Record</Button>
                            </OverlayTrigger>
                        </Form>

                    </div>
                </>
                : null}

            <Footer />

        </>
    )


}
