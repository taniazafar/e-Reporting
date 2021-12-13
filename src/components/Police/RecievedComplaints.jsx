import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import classes from './RecievedComplaints.module.css'
import firebase from '../../Fire'
import { db } from '../../Fire';
import { NavBarPolice } from '../Police/NavBarPolice'

export function RecievedComplaints() {
    const [userData, setUserdata] = useState()

    useEffect(() => {
        const submitRef = firebase.database().ref('Register Complaint')
        submitRef.on('value', (snapshot) => {

            const complaints = snapshot.val()
            const registeredComplaints = []
            for (let id in complaints) {
                registeredComplaints.push({ id, ...complaints[id] })
            }
            setUserdata(registeredComplaints)

        })
    }, [])


    const deleteComplaint = (id) => {
        const deleteRef = firebase.database().ref('Register Complaint').child(id)
        deleteRef.remove()
    }

    return (
        <>
            <NavBarPolice />
            <div className={classes.complaintform}>
                <Table responsive>

                    <thead>
                        <tr>
                            <th >Full Name</th>
                            <th >CNIC</th>
                            <th >Gender</th>
                            <th >Phone No</th>
                            <th >Email</th>
                            <th >City</th>
                            <th >Category</th>
                            <th >Occupation</th>
                            <th >Address</th>
                            <th >Description</th>
                            <th ></th>
                            <th ></th>
                        </tr>
                    </thead>
                    {userData ? userData.map((complaint, index) => {

                        if (complaint.status == 'Approved') {
                            return (
                                <>
                                    <tbody>
                                        <tr>
                                            <td >{complaint.fullname}</td>
                                            <td>{complaint.cnic}</td>
                                            <td>{complaint.gender}</td>
                                            <td>{complaint.phoneno}</td>
                                            <td>{complaint.email}</td>
                                            <td>{complaint.city}</td>
                                            <td>{complaint.category}</td>
                                            <td>{complaint.occupation}</td>
                                            <td> {complaint.address}</td>
                                            <td>{complaint.description}</td>
                                            <td>
                                                <Button onClick={() => { deleteComplaint(complaint.id) }} className={classes.btn}>Delete</Button>

                                            </td>

                                        </tr>

                                    </tbody>
                                </>
                            )

                        }

                    }) : <h3> Oops! No Registered Complaint</h3>

                    }
                </Table>
            </div>

        </>
    )

}