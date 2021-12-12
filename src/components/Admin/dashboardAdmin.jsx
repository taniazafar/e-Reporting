import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../AuthContext'
import { useHistory } from 'react-router-dom'
import { NavBarAdmin } from './NavBarAdmin'
import defaultprofile from './defaultprofile.png'
import dashboardimage from './dashboardimage.jpg'
import classes from './dashboardAdmin.module.css'
import content from '../Pages/Content.module.css'
import logo from './logo.jpg'

export function DashboardAdmin() {
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
                <NavBarAdmin />

            </div>

        </>
    )
}
