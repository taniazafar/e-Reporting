import React, { useRef, useState } from 'react'
import { Form, Col, Button, Alert } from 'react-bootstrap';
import classes from './ForgotPasswordAdmin.module.css';
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import {HomeNavBar} from '../Layout/NavBar'

export function ForgotPasswordAdmin() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")



    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('check your inbox for further instructions')
        } catch {
            setError("Failed to Reset Password")
        }

        setLoading(false)
    }

    return (
        <>
        <HomeNavBar/>
            <div className={classes.logincontainer}>
                <h2 className='text-center mb-4'>Password Reset</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                {message && <Alert variant='success'>{message}</Alert>}
                <Form className={classes.loginform} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col xs={12}>
                            <Form.Group as={Col} controlId='email'>
                                <Form.Label className='float-left'>Email:</Form.Label>
                                <Form.Control type='text' placeholder='Enter email' ref={emailRef} required />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Button disabled={loading} className={classes.loginbtn} type='submit'>
                        Reset Password
                    </Button>

                </Form>
                <div className='w=100 text-center mt-2'>
                    <Link to='/LogInAsAdmin'>Log In</Link>
                </div>

                <div className='w=100 text-center mt-2'>
                    Don't have an account? <Link to='/SignInAsAdmin'>Sign Up</Link>
                </div>

            </div>
        </>
    )

}




