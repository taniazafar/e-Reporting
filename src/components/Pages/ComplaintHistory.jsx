import React, { useState, useEffect } from 'react'
import { Row, Container, Col, Button, Table } from 'react-bootstrap'
import classes from './Complaint.module.css'
import firebase from '../../Fire'
import { DashboardPublic } from '../PublicUser/dashboardPublic'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import classess from './Footer.module.css'
import phone from './phone.svg'
import address from './address.svg'
import { FaFacebook } from 'react-icons/fa'
import { FaTwitter } from "react-icons/fa"
import { FaWhatsapp } from "react-icons/fa"
import { IconContext } from "react-icons"

import { Footer } from './Footer'
export const ComplaintHistory = () => {
    function twitter() {
        window.open("http://twitter.com");
    }
    function facebook() {

        window.open('https://facebook.com')
    }
    function whatsapp() {
        window.open('https://www.whatsapp.com/')
    }

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


    const [userDataa, setUserdataa] = useState()

    useEffect(() => {
        const submitRef = firebase.database().ref('Report Against Police')
        submitRef.on('value', (snapshot) => {

            const complaints = snapshot.val()
            const registeredComplaints = []
            for (let id in complaints) {
                registeredComplaints.push({ id, ...complaints[id] })
            }
            setUserdataa(registeredComplaints)

        })
    }, [])

    const deleteComplaintAgainstPolice = (id) => {
        const deleteRef = firebase.database().ref('Report Against Police').child(id)
        deleteRef.remove()
    }
    return (
        <>
            <div>
                <DashboardPublic />
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
                            </tr>
                        </thead>
                        {userData ? userData.map((complaint, index) => {
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
                        }) : <h3> Oops! No Registered Complaint</h3>

                        }
                    </Table>

                    <Table responsive>

                        <thead>
                            <tr>
                                <th >Full Name</th>
                                <th >CNIC</th>
                                <th >Gender</th>
                                <th >Phone No</th>
                                <th >Email</th>
                                <th >City</th>
                                <th >Officer Name</th>
                                <th >Officers's Badge</th>
                                <th >Description</th>
                                <th ></th>
                            </tr>
                        </thead>
                        {userDataa ? userDataa.map((complaints, index) => {
                            return (
                                <>
                                    <tbody>
                                        <tr>
                                            <td>{complaints.fullname}</td>
                                            <td>{complaints.cnic}</td>
                                            <td>{complaints.gender}</td>
                                            <td>{complaints.phoneno}</td>
                                            <td>{complaints.email}</td>
                                            <td>{complaints.city}</td>
                                            <td>{complaints.officername}</td>
                                            <td>{complaints.badge}</td>
                                            <td>{complaints.description}</td>
                                            <td>
                                                <Button onClick={() => { deleteComplaintAgainstPolice(complaints.id) }} className={classes.btn}>Delete</Button>

                                            </td>
                                        </tr>

                                    </tbody>
                                </>
                            )
                        }) : <h3> Oops! No Registered Complaint</h3>

                        }
                    </Table>
                    <div className = {classes.foot}>
                    <Footer />
                    </div>
                   

                </div>

            </div>


        </>
    )
}
