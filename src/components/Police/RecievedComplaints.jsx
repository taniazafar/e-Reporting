
import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import classes from './RecievedComplaints.module.css'
import firebase from '../../Fire'
import { db } from '../../Fire';
import { NavBarPolice } from '../Police/NavBarPolice'


export function RecievedComplaints() {

    // const [complaint, setComplaint] = useState([{
    //     data: [],
    //     id: [],
    // }])

    // useEffect(() => {

    //     db.collection("complaints").where("status", "==", "approved").get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {

    //             console.log(doc.data(), doc.id);
    //             setComplaint([{ ...complaint, data: doc.data(), id: doc.id }]);
    //         });
    //     });


    //     // console.log(arr)
    //     console.log(complaint)

    // })

    // const deleteComplaint = (id) => {
    //     const deleteRef = firebase.database().ref('Register Complaint').child(id)
    //     deleteRef.remove()
    // }
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
            <div className={classes.comp}>
                <br />
                <h2 className='text-center mb-4'>Registered Complaints</h2>
                {userData ? userData.map((complaint, index) => {
                    return (
                        <>
                            <div className={classes.contentRow}>
                                <div className={classes.contentColumn}>
                                    <Table responsive borderless >

                                        <tr className={classes.table}>
                                            <td ><b>Name:</b></td>
                                            <td>{complaint.fullname}</td>
                                        </tr>

                                        <tr className={classes.table}>
                                            <td><b>CNIC:</b></td>
                                            <td>{complaint.cnic}</td>
                                        </tr>
                                        <tr className={classes.table}>
                                            <td><b>Address:</b></td>
                                            <td> {complaint.address}</td>
                                        </tr>
                                        <tr className={classes.table}>
                                            <td><b>Phone No:</b></td>
                                            <td>{complaint.phoneno}</td>
                                        </tr>
                                        <tr className={classes.table}>
                                            <td><b>Description:</b></td>
                                            <td>{complaint.description}</td>
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
                }) : <h3> Oops! No Registered Complaint</h3>

                }
                </div>
            {/* <div className={classes.comp}>
                <br />
                <h2 className='text-center mb-4'>Recieved Complaints</h2>
                {userData ? userData.map((complaint, index) => {
                    return (
                        <>
                            <div className={classes.contentRow}>
                                <div className={classes.contentColumn}>
                                    <Table responsive borderless >

                                        <tr className={classes.table}>
                                            <td ><b>Name:</b></td>
                                            <td>{complaint.data.name}</td>
                                        </tr>

                                        <tr className={classes.table}>
                                            <td><b>CNIC:</b></td>
                                            <td>{complaint.data.cnic}</td>
                                        </tr>
                                        <tr className={classes.table}>
                                            <td><b>Address:</b></td>
                                            <td> {complaint.data.address}</td>
                                        </tr>
                                        <tr className={classes.table}>
                                            <td><b>Phone No:</b></td>
                                            <td>{complaint.data.phoneNumber}</td>
                                        </tr>
                                        <tr className={classes.table}>
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
            </div> */}
            </>
            )

}