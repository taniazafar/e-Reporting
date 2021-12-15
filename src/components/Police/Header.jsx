import * as React from 'react'
import { NavBarPolice } from './NavBarPolice'
import elogo from './elogo.jpg'
import classes from './dashboardPolice.module.css'
import { useHistory } from 'react-router-dom'

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
                <img className={classes.logo} src={elogo} alt =''/>
                <h4 className={classes.heading1}>ONLINE CRIME <br />
                    REPORTING <br />SYSTEM </h4>
                <div className={classes.vl}></div>
                <h4 className={classes.heading2}>HONESTY  <br />
                    {'&'}
                    <br />INTEGRITY</h4>
                <div className={classes.hl}></div>
            </div>
            <div className={classes.div3}>
            <NavBarPolice />

            </div>
        </>
    )

}
