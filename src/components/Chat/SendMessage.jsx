import React, {useState} from 'react'
import { Form, Button} from 'react-bootstrap'

import {db, auth} from '../../Fire'
import firebase from 'firebase'
// import classes from './Chat.module.css';
export function SendMessage() {

    const [msg, setMsg] = useState('')

    async function sendMessage (e) {
        e.preventDefault()
        const {uid,photoURL} = auth.currentUser
        await  db.collection('messages').add({
            text:msg,
            photoURL,
            uid, 
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMsg('')
    }
    return (
        <div>
            <Form onSubmit = {sendMessage}>
                <div className= 'sendMsg'>
        <Form.Control 
        style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }}
        type="text" placeholder="Message..."
            value={msg}
            onChange={(e) => {
                setMsg(e.target.value)
            }} />
                {/* <Input value = {msg} onChange = {(e)=> setMsg(e.target.value)} placeholder='Message...'/> */}
                <Button 
                style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}}
                type = 'submit'> Send</Button>
                </div>
            </Form>
            
        </div>
    )
}


