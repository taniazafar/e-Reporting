import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../../Fire'
import {DashboardPublic} from '../PublicUser/dashboardPublic'
import {SignUp} from './SignUp'

export function GoogleSignUp() {
    
    const [user] = useAuthState(auth)
    return (
        <div>
        {user ? <DashboardPublic/> : <SignUp/>}
        </div>
    )
}

