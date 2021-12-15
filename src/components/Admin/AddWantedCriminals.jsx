import React, { useState } from 'react'
import firebase from '../../Fire'
import { Header } from './Header'
import { Footer } from './Footer'
import classes from './AddWantedCriminals.module.css'
import { Form, Col, Button, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap'

export const AddWantedCriminals = () => {

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
                <Header />
                <div className={classes.complaintform}>
                    <h3>Add Wanted Criminals</h3>
                    <br />
                    {error && <Alert variant='danger'>{error}</Alert>}

                    <Form onSubmit={handleFormSubmit}>
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
