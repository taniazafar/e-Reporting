import React from 'react'
import classes from './Footer.module.css'
import { Row, Col, Container } from 'react-bootstrap'
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
                        <div>
                        <br />
                            Muhammad Tufail Niazi Rd,
                            <br />
                            G 9/4, Islamabad, PK
                            <br />
                            111-345-786

                        </div>

                    </Col>


                </Row>
            </Container>
        </div>
    )
}
