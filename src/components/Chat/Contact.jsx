import React from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../../Fire'
import {Chat} from './Chat'
import {SignIn} from './SignIn'
import './Chat.css';
export function Contact() {
    
    const [user] = useAuthState(auth)
    return (
        <div>
        {user? <Chat/> : <SignIn/>}
        
        </div>
    )
}

