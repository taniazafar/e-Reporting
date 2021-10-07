import React from 'react'
// import {useAuthState} from 'react-firebase-hooks/auth'
import firebase from 'firebase'
import {auth} from '../../Fire'
import {Button} from 'react-bootstrap'
// import {useHistory} from 'react-router-dom'
// import { SignInAsPublicUser } from './SignInAsPublicUser'
// import {useAuthState} from 'react-firebase-hooks/auth'
// import {DashboardPublic} from '../PublicUser/dashboardPublic'

export function SignUp() {

    function signUpWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
        
    }
    return (
        <div>
            <Button 
            style={{ padding: '10px', fontSize: '20px', borderRadius: '0', fontWeight: '600' }}
            
            onClick = {signUpWithGoogle}>SignUp with Google</Button>


        </div>
       
        
    )
}

 
