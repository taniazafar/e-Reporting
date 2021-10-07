import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import classes from '../Pages/Complaint.module.css'
import firebase from '../../Fire'
import { NavBarAdmin } from '../Admin/NavBarAdmin'

export const EmergencyReports = () => {
    const [userData, setUserdata] = useState()

    useEffect(() => {
        const submitRef = firebase.database().ref('Emergency Reports')
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
        const deleteRef = firebase.database().ref('Emergency Reports').child(id)
        deleteRef.remove()
    }

    return (
        <div>
            <NavBarAdmin />
            <div >
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

                                        <tr>
                                            <td><b>Image:</b></td>
                                            <td>{complaint.image}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Phone No:</b></td>
                                            <td>{complaint.phoneno}</td>
                                        </tr>
                                        <tr>
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
        </div>
    )
}
