import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../AuthContext'
import { useHistory } from 'react-router-dom'
import { NavBarAdmin } from './NavBarAdmin'
import defaultprofile from './defaultprofile.png'
import dashboardimage from './dashboardimage.jpg'
import classes from './dashboardAdmin.module.css'
import content from '../Pages/Content.module.css'

export function DashboardAdmin() {

    const [error, setError] = useState("")
    const { currentUser } = useAuth()
    const history = useHistory()

    async function handleImage() {
        setError("")
        try {
            history.push('/UpdateProfileAdmin')

        } catch {
            setError("Error")
        }

    }

    return (
        <>
            <NavBarAdmin />
            <div className={classes.user}>
                <img onClick={handleImage} src={defaultprofile} width="70" height="70" alt='' />
                <br />
                {currentUser.email}
            </div>
            <div className={classes.container}>
                {error && <Alert variant='danger'>{error}</Alert>}

            </div>
            <div className={content.homecontent}>

                <h2>Online Crime Reporting System</h2>

                <img className={content.dashboardimage} src={dashboardimage} width='650' alt='' />
                <br />
                <br />
                <br />
                <b><p>e-Reporting acts as communication system between public and police department</p>
                </b>
                <b><p>Public Usera can report and register complaints by providing certain mandatory information</p>
                </b>
                <b><p>It Saves your time by allowing you to register complaints by sitting anywhere at anytime</p>
                </b>

            </div>

        </>
    )
}
