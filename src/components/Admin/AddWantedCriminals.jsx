import React, { useState, useEffect } from 'react'
import firebase from '../../Fire'
import { DashboardAdmin } from './dashboardAdmin'
import classes from './AddWantedCriminals.module.css'
import { Form, Col, Button, Alert, Tooltip, OverlayTrigger, Table, Container } from 'react-bootstrap'
import { storage } from '../../Fire'

export const AddWantedCriminals = () => {

    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);

    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        const submitRef = firebase.database().ref('Wanted Criminals')
        const complaint = {
            fullname,
            age,
            description,
            image
        }
        setError("")
        setLoading(true)
        submitRef.push(complaint)
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                    });
            }
        );
        alert('Report Successfuly Submitted')
    }
    const [userData, setUserdata] = useState()
    useEffect(() => {
        const submitRef = firebase.database().ref('Wanted Criminals')
        submitRef.on('value', (snapshot) => {

            const wantedcriminals = snapshot.val()
            const addWantedCriminals = []
            for (let id in wantedcriminals) {
                addWantedCriminals.push({ id, ...wantedcriminals[id] })
            }
            setUserdata(addWantedCriminals)
        })
    }, [])
    const [imageTab, setImageTab] = useState([]);

    useEffect(() => {
        firebase.storage()
            .ref('images')
            .listAll()
            .then(function (result) {
                result.items.forEach(function (imageRef) {
                    imageRef.getDownloadURL().then(function (url) {
                        imageTab.push(url);
                        setImageTab(imageTab);
                    }).catch(function (error) {
                        // Handle any errors
                    });
                });
            })
            .catch((e) => console.log('Errors while downloading => ', e));
    }, []);


    const deleteComplaint = (id) => {
        const deleteRef = firebase.database().ref('Wanted Criminals').child(id)
        deleteRef.remove()
    }
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click to submit
        </Tooltip>
    )
    const [fullname, setFullname] = useState()
    const [age, setAge] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleFormSubmit() {
        try {
            const submitRef = firebase.database().ref('Wanted Criminals')
            const complaint = {
                fullname,
                age,
                description,
                image
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
            <div>
                <DashboardAdmin />
                <div className={classes.complaintform}>
                    {error && <Alert variant='danger'>{error}</Alert>}

                    <Form  >
                        <Form.Row>
                            <Col xs={6}>
                                <Form.Group as={Col} Name="fullname">
                                    <Form.Label className={classes.formlabel}>Name</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter full name"
                                        value={fullname}
                                        onChange={(e) => {
                                            setFullname(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>

                        </Form.Row>
                        <Form.Row>
                            <Col xs={6}>
                                <Form.Group as={Col} Name="age">
                                    <Form.Label className={classes.formlabel}>Age</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter Age"
                                        value={age}
                                        onChange={(e) => {
                                            setAge(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>

                        </Form.Row>
                        <Form.Row>

                            <Col xs={6}>
                                <Form.Group as={Col} Name="description" >
                                    <Form.Label className={classes.formlabel}>Description</Form.Label>
                                    <Form.Control as="textarea" required placeholder="Enter Description" rows={3}
                                        value={description}
                                        onChange={(e) => {
                                            setDescription(e.target.value)
                                        }} />
                                </Form.Group>
                            </Col>

                        </Form.Row>
                        <Form.Row>

                            <Col xs={6}>
                                <Form.Group as={Col} Name="image" >
                                    <Form.Label className={classes.formlabel}>Upload Image</Form.Label>
                                    <div className=''>
                                        <br />
                                        <br />
                                        <progress value={progress} max="100" />
                                        <br />
                                        <br />
                                        <input type="file" onChange={handleChange} />
                                        <button onClick={handleUpload}>Upload</button>
                                        <br />

                                    </div>
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
                <div className={classes.complaintform1}>
                    <Table responsive>

                        <thead>
                            <tr>
                                <th >Full Name</th>
                                <th >Age</th>
                                <th >Description</th>
                                {/* <th >Image</th> */}
                                <th ></th>
                            </tr>
                        </thead>
                        {userData ? userData.map((wantedCriminal, index) => {

                            return (
                                <>
                                    <tbody>
                                        <tr>
                                            <td >{wantedCriminal.fullname}</td>
                                            <td>{wantedCriminal.age}</td>
                                            <td>{wantedCriminal.description}</td>

                                            <td>
                                                <Button onClick={() => { deleteComplaint(wantedCriminal.id) }} className={classes.btn}>Delete</Button>

                                            </td>
                                        </tr>


                                    </tbody>
                                </>
                            )

                        }) : <h3> Oops! No Registered Complaint</h3>

                        }
                        <tr>
                            <th>
                                Images
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <Container>
                                    {imageTab.map((image, index) => {
                                        <img style={{ height: 200, width: 200 }} src={{ url: image }} />
                                    }
                                    )}
                                </Container>
                            </td>

                        </tr>
                    </Table>
                </div>


            </div >



        </>
    )

}
