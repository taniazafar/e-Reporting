import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { DashboardPublic } from '../PublicUser/dashboardPublic'
import classes from './WantedCriminals.module.css'
import {Footer} from './Footer'
export function WantedCriminals() {
    return (
        <>
            <div >
                <DashboardPublic />
                Wanted Criminals!
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="image1.jpg" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>
                <Footer />
    

        </>
    )

}
