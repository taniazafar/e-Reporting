import React from 'react'
import { HomeNavBar } from '../Layout/NavBar'
import firebase from 'firebase'
import {auth} from '../../Fire'
import {Button} from 'react-bootstrap'
export function SignIn() {

    function signInWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }
    return (
        // <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
        <div>
            <HomeNavBar />
            <br/>

            <Button 
            style={{ padding: '10px', fontSize: '20px', borderRadius: '0', fontWeight: '600' }}
            
            onClick = {signInWithGoogle}>SignIn with Google</Button>
        </div>
    )
}

 
