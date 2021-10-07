import { HomeNavBar } from '../Layout/NavBar'
import React, { useState, useEffect } from 'react'
import { Form, Col, Button, Alert, Table } from 'react-bootstrap'
import register from './RegisterComplaint.module.css'
import classes from './Complaint.module.css'
import firebase from '../../Fire'
import classess from './EmergencyReporting.module.css'
import { render } from 'react-dom'

import { storage } from '../../Fire'
export const EmergencyReporting = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const [fullname, setFullname] = useState()
    const [phoneno, setPhoneno] = useState('')
    const [description, setDescription] = useState('')

    const [displayComplaint, setDisplayComplaint] = useState(true)
    const [displayHistory, setDisplayHistory] = useState(false)

    async function handleFormSubmit(e) {
        e.preventDefault()
        try {
            const submitRef = firebase.database().ref('Emergency Reports')
            const complaint = {
                fullname,
                phoneno,
                description,
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
        const submitRef = firebase.database().ref('Emergency Reports')
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
    const deleteComplaint = (id) => {
        const deleteRef = firebase.database().ref('Emergency Reports').child(id)
        deleteRef.remove()
    }

    const handleViewHistory = () => {
        setDisplayHistory(true)
        setDisplayComplaint(false)
    }

    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("")
    const [progress, setProgress] = useState(0)


    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])

        }
    }
    async function handleUpload(e) {
        e.preventDefault()
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        try {
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                },
                error => {
                    setError("")
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            setUrl(url)

                        })
                }
            )
            setError("")
            setLoading(true)

        } catch {
            setError("Failed to Submit")
        }

        setLoading(false)


    }

    return (
        <div className =  {classes.div}>
            <HomeNavBar />
            <div className={classess.container}>

            </div>
            {displayComplaint ?
                <>
                    <div>
                        <Button onClick={handleViewHistory} className={register.viewbtn} type="submit" value='save'>
                            <b>View Registered Complaints</b></Button>
                    </div>
                    <div className={register.registercontainer}>
                        <h2 className='text-center mb-4'>Emergency Report</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}

                        <Form className={register.complaintform} onSubmit={handleFormSubmit} >
                            <Form.Row>
                                <Col xs={12}>
                                    <Form.Group as={Col} Name="fullname">
                                        <Form.Label className='float-left'>Full Name:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter full name"
                                            value={fullname}
                                            onChange={(e) => {
                                                setFullname(e.target.value)
                                            }} />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col xs={12}>
                                    <Form.Group as={Col} Name="phoneno">
                                        <Form.Label className='float-left'>Phone No:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter phone no"
                                            value={phoneno}
                                            onChange={(e) => {
                                                setPhoneno(e.target.value)
                                            }} />
                                    </Form.Group>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col xs={12}>
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
                            <Form.Row>
                                <Col xs={12}>
                                    <Form.Group as={Col} Name="image">

                                        <Form.Label className='float-left'>Upload Image:</Form.Label>

                                        <Form.Control type="file"
                                            onChange={handleChange} />
                                        <progress value={progress} max='100' />
                                        <br />
                                        <Button className={register.uploadbtn} onClick={handleUpload}>Upload Image</Button>
                            
                                        {/* <img src={url || " http://via.placeholder.com/100"} alt='There is suppose to be an img' /> */}
                                    </Form.Group>
                                </Col>

                            </Form.Row>
                            <br/>
                        
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
                                                <td><b>Phone No:</b></td>
                                                <td>{complaint.phoneno}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Image:</b></td>

                                                <td> <img src={url || " http://via.placeholder.com/100"} alt='There is suppose to be an img' /></td>
                                            </tr>

                                            <tr>
                                                <td><b>Description:</b></td>
                                                <td>{complaint.description}</td>
                                            </tr>


                                            <tr>
                                                <td>
                                                    <Button onClick={() => { deleteComplaint(complaint.id) }} className={classes.btn}>Delete</Button>
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

        </div>
    )

}

render(<EmergencyReporting />, document.querySelector('#root'))