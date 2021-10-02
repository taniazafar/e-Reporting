import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../../Fire'
import {dashboardPublic} from '../PublicUser/dashboardPublic'
import {SignInAsPublic} from '../Pages/SignInAsPublic'
import '../Chat/Chat.css';
export function Contact() {
    
    const [user] = useAuthState(auth)
    return (
        <div>
        {user? <dashboardPublic/> : <SignInAsPublic/>}
        
        </div>
    )
}

