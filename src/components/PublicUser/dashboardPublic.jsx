import * as React from 'react'
import classes from './dashboardPublic.module.css'
import { Row, Col, } from 'react-bootstrap'
import Demo from './SplineArea'
import LineChart from './LineChart'
import { Header } from './Header'
import { Footer } from '../Pages/Footer'
export const DashboardPublic = () => {

    return (
        <>
            <Header />
            <Row className={classes.row}>
                <Col className={classes.col}>
                    <Demo />
                </Col>
                <Col className={classes.col}>
                    <LineChart />
                </Col>

            </Row>
            <Footer className={classes.foot} />
        </>
    )

}
