import * as React from 'react'
import { NavBarPublic } from './NavBarPublic'
import logo from './logo.jpg'
import classes from './dashboardPublic.module.css'
import { Row, Col, } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Demo from './SplineArea'
import LineChart from './LineChart'

export const Header = () => {

    const history = useHistory()

    function clickHandler() {

        history.push('/')
    }
    return (
        <>

            <div className={classes.header}>
                <div className={classes.welcome}>
                    <div className={classes.tag}>
                        Welcome to e-Reporting
                    </div>

                </div>

            </div>
            <button onClick={clickHandler} className={classes.tag1}>
                Logout
            </button>
            <div className={classes.div2}>
                <img className={classes.logo} src={logo} />
                <h4 className={classes.heading1}>ONLINE CRIME <br />
                    REPORTING <br />SYSTEM </h4>
                <div className={classes.vl}></div>
                <h4 className={classes.heading2}>HONESTY  <br />
                    {'&'}
                    <br />INTEGRITY</h4>
                <div className={classes.hl}></div>
            </div>
            <div className={classes.div3}>
                <NavBarPublic />

            </div>
        </>
    )

}
