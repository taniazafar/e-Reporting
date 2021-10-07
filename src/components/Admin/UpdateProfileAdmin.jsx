import React, { useRef, useState } from 'react'
import { Form, Col, Button, Alert } from 'react-bootstrap';
import classes from './UpdateProfileAdmin.module.css'
import { useAuth } from '../AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { NavBarAdmin } from './NavBarAdmin'


export function UpdateProfileAdmin() {

    const emailRef = useRef()
    const passRef = useRef()
    const confirmpassRef = useRef()
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()



    function handleSubmit(e) {
        e.preventDefault()

        if (passRef.current.value !== confirmpassRef.current.value) {
            return setError("Passwords do not match")
        }
        const promises = []

        setLoading(true)
        setError("")
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passRef.current.value !== currentUser.password) {
            promises.push(updatePassword(passRef.current.value))
        }
        Promise.all(promises)
            .then(() => {
                history.push('/dashboardAdmin')
            }).catch(() => {
                setError("Failed to update profile")

            }).finally(() => {
                setLoading(false)
            })


    }

    return (
        <>
            <NavBarAdmin />
            <div className={classes.signincontainer}>

                <h2 className='text-center mb-4'>Update Profile</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form className={classes.signinform} onSubmit={handleSubmit} >
                    <Form.Row>
                        <Col xs={12}>
                            <Form.Group as={Col} id="email">
                                <Form.Label className='float-left'>Email:</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" ref={emailRef} required
                                    defaultValue={currentUser.email} />
                            </Form.Group>
                        </Col>

                    </Form.Row>
                    <Form.Row>

                        <Col xs={12}>
                            <Form.Group as={Col} id="password">
                                <Form.Label className='float-left'>Password:</Form.Label>
                                <Form.Control type="password" placeholder="leave blank to keep the same" ref={passRef} />
                            </Form.Group>
                        </Col>

                    </Form.Row>
                    <Form.Row>
                        <Col xs={12}>
                            <Form.Group as={Col} id="confirmpassword">
                                <Form.Label className='float-left'>Confirm Password:</Form.Label>
                                <Form.Control type="password" placeholder="leave blank to keep the same" ref={confirmpassRef} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Button disabled={loading} className={classes.signinbtn} type="submit" >
                        Update Profile
                    </Button>
                </Form>
                <div className='w=100 text-center mt-2'>
                    <Link to='/dashboardAdmin'>Cancel</Link>

                </div>
            </div>

        </>
    )
}


