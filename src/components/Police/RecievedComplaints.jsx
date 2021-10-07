
import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import classes from '../Pages/Complaint.module.css'
import firebase from '../../Fire'
import { db } from '../../Fire';
import { NavBarPolice } from '../Police/NavBarPolice'


export function RecievedComplaints() {

    const [complaint, setComplaint] = useState([{
        data: [],
        id: [],
    }])

    useEffect(() => {
        
        db.collection("complaints").where("status", "==", "approved").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                console.log(doc.data(), doc.id);
                setComplaint([{ ...complaint, data: doc.data(), id: doc.id }]);
            });
        });


        // console.log(arr)
        console.log(complaint)

    })

    const deleteComplaint = (id) => {
        const deleteRef = firebase.database().ref('Register Complaint').child(id)
        deleteRef.remove()
    }


    return (
        <>
            <NavBarPolice />

            <div >
                <br />
                <h2 className='text-center mb-4'>Recieved Complaints</h2>
                {complaint && complaint.map((complaint) => {
                    return (
                        <>
                            <div className={classes.contentRow}>
                                <div className={classes.contentColumn}>
                                    <Table responsive borderless >

                                        <tr className={classes.table}>
                                            <td ><b>Name:</b></td>
                                            <td>{complaint.data.name}</td>
                                        </tr>

                                        <tr>
                                            <td><b>CNIC:</b></td>
                                            <td>{complaint.data.cnic}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Address:</b></td>
                                            <td> {complaint.data.address}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Phone No:</b></td>
                                            <td>{complaint.data.phoneNumber}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Description:</b></td>
                                            <td>{complaint.data.description}</td>
                                        </tr>


                                        <tr>
                                            <td>
                                                <Button onClick={() => { deleteComplaint(complaint.id) }} className={classes.btn}>Delete</Button>

                                            </td>
                                    
                                        </tr>

                                    </Table>
                                </div>

                            </div >
                        </>
                    )
                }

                )}
            </div>
        </>
    )

}