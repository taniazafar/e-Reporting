import React, { useRef, useState } from 'react'
import { Form, Col, Button, Alert } from 'react-bootstrap';
import classes from './LogInForm.module.css';
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { HomeNavBar } from '../Layout/NavBar'
import firebase from '../../Fire'

export function LogInAsPublicUser() {
    const emailRef = useRef()
    const passRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const publicRef = firebase.database().ref('LogIn Public')
            const logInPublic = {
                email,
                password
            }
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passRef.current.value)
            history.push('/dashboardPublic')
            publicRef.push(logInPublic)
        } catch {
            setError("Failed to Log In")
        }

        setLoading(false)
    }

    return (
        <>
            <HomeNavBar />
            <div className={classes.logincontainer}>
                <h4 className='text-center mb-4'>LogIn As Public User</h4>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form className={classes.loginform} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Col xs={12} >
                            <Form.Group as={Col} id='email' >
                                <Form.Label className='float-left'>Email:</Form.Label>
                                <Form.Control type='text' placeholder='Enter email' ref={emailRef} required
                                    value={email}
                                    onChange={handleEmail}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Form.Row>
                        <Col xs={12}>
                            <Form.Group as={Col} id='password'>
                                <Form.Label className='float-left'>Password:</Form.Label>
                                <Form.Control type='password' placeholder='Enter Password' ref={passRef} required
                                    value={password}
                                    onChange={handlePassword}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>
                    <Button disabled={loading} className={classes.loginbtn} type='submit'>
                        LogIn
                    </Button>

                </Form>
                <div className='w=100 text-center mt-2'>
                    <Link to='/ForgotPasswordPublic'>Forgot Password</Link>
                </div>

                <div className='w=100 text-center mt-2'>
                    Don't have an account? <Link to='/SignInAsPublicUser'>Sign Up</Link>
                </div>

            </div>
        </>
    )

}


