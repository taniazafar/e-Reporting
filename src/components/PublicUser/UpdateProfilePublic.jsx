import React, { useRef, useState } from 'react'
import { Form, Col, Button, Alert } from 'react-bootstrap'
import classes from './UpdateProfilePublic.module.css'
import { useAuth } from '../AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Footer } from '../Pages/Footer'
import classess from './dashboardPublic.module.css'
import { Header } from './Header'

export function UpdateProfilePublic() {

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
                history.push('/dashboardPolice')
            }).catch(() => {
                setError("Failed to update profile")

            }).finally(() => {
                setLoading(false)
            })
    }


    return (
        <>
            <Header />
            <div className={classess.container}>
                {error && <Alert variant='danger'>{error}</Alert>}

            </div>
            <div className={classes.signincontainer}>

                <h2 className='text-center mb-4 text-white'>Update Profile</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form className={classes.signinform} onSubmit={handleSubmit} >
                    <Form.Row>
                        <Col xs={12}>
                            <Form.Group as={Col} id="email">
                                <Form.Label className='float-left text-white'> Email:</Form.Label>
                                <Form.Control type="email" placeholder="Enter Email" ref={emailRef} required
                                    defaultValue={currentUser.email} />
                            </Form.Group>
                        </Col>

                    </Form.Row>
                    <Form.Row>

                        <Col xs={12}>
                            <Form.Group as={Col} id="password">
                                <Form.Label className='float-left text-white'>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" ref={passRef} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col xs={12}>
                            <Form.Group as={Col} id="confirmpassword">
                                <Form.Label className='float-left text-white'>Confirm Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter password again" ref={confirmpassRef} />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Button disabled={loading} className={classes.signinbtn} type="submit" >
                        Update Profile
                    </Button>
                </Form>
                <div className='w=100 text-center mt-2'>
                    <Link to='/dashboardPolice'>Cancel</Link>

                </div>


            </div>
            <Footer className={classes.foot} />
        </>
    )
}




