import React, { useState } from 'react'
import {Alert } from 'react-bootstrap'
import { useAuth } from '../AuthContext'
import { useHistory } from 'react-router-dom'
import { NavBarAdmin } from './NavBarAdmin'
import defaultprofile from './defaultprofile.png'
import classes from './dashboardAdmin.module.css'

export function DashboardAdmin() {

    const [error, setError] = useState("")
    const {currentUser} = useAuth()
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
            <NavBarAdmin/>
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
