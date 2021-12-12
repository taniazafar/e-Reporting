import React from 'react'
import classes from './Footer.module.css'
import { Row, Col, Container } from 'react-bootstrap'
import phone from './phone.svg'
import address from './address.svg'
import { FaFacebook } from 'react-icons/fa'
import { FaTwitter } from "react-icons/fa"
import { FaWhatsapp } from "react-icons/fa"
import { IconContext } from "react-icons"
export const Footer = () => {
    function twitter() {
        window.open("http://twitter.com");
    }
    function facebook() {

        window.open('https://facebook.com')
    }
    function whatsapp() {
        window.open('https://www.whatsapp.com/')
    }
    return (
        <div>

            <Container fluid className={classes.footer}>

                <Row className={classes.row} >
                <Col className={classes.column}>
                        <div>
                            <p ><b>WHAT WE INVESTIGATE</b></p>
                            Cyber Crime
                            <br />
                            Anti-Corruption
                            <br />
                            Counter Terrorism
                            <br />
                            Intellectual Property Rights

                        </div>
                        <div >
                            <IconContext.Provider value={{ style: { fontSize: '40px' } }}>
                                <br />
                                <div className={classes.iconss}>

                                    <FaTwitter onClick={twitter} />
                                    {' '}
                                    <FaFacebook onClick={facebook} />
                                    {' '}
                                    <FaWhatsapp onClick={whatsapp} />
                                </div>
                            </IconContext.Provider>
                        </div>

                    </Col>
                    
                    <Col className={classes.column}>
                        <img src={address} width="70" height="70" />
                        <div className={classes.foot2}>
                            Address:
                            <br />
                            Muhammad Tufail Niazi Rd,
                            <br />
                            G 9/4, Islamabad, PK

                        </div>
                    </Col>
                    <Col className={classes.column}>
                        <img src={phone} width="70" height="70" />
                        <div className={classes.foot1}>
                            Phone Number:
                            <br />
                            111-345-786
                        </div>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    )
}
