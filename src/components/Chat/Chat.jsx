import React, {useState, useEffect, useRef} from 'react'
// import { HomeNavBar } from '../Layout/NavBar'
import { SignOut } from './SignOut'

import {db, auth} from '../../Fire'
import { SendMessage } from './SendMessage'
export function Chat() {
    const scroll = useRef()
    const[messages, setMessages] = useState([])
    useEffect(()=> {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
setMessages( snapshot.docs.map(doc => doc.data()))
        })

    }, [])
   
    return (
        <div>
             {/* <HomeNavBar /> */}
             <SignOut/>
             <div className='msgs'>
        {messages.map(({id, text, photoURL, uid}) => (
            <div key = {id} className = {`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
            
            <div>
                <img className= 'imgg' src = {photoURL} alt = ""/>
            <p className= 'pp'>{text}</p>
</div>
                </div>

        ))}

</div>
<SendMessage scroll={scroll} />
            <div ref={scroll}></div>



       

            
        </div>
    )
}

