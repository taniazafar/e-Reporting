import React, {useState} from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../AuthContext'
import { useHistory } from 'react-router-dom'
import { NavBarPolice } from './NavBarPolice'
import defaultprofile from './defaultprofile.png'
import classes from './dashboardPolice.module.css'
export function DashboardPolice() {

    const {currentUser} = useAuth()
    const [error, setError] = useState("")
    const history = useHistory()

    async function handleImage() {
        setError("")
        try {
            history.push('/UpdateProfilePublic')

        } catch {
            setError("Error")
        }

    }
    return (
        <>
        <NavBarPolice/>
        <div className = {classes.container}>
            {error && <Alert variant='danger'>{error}</Alert>}
            <div className = {classes.user}> 
            <img onClick={handleImage} src = {defaultprofile} width="70" height="70" alt = ''/>
            <br/>
            {currentUser.email}
            </div>
            </div>
        </>
    )
}
