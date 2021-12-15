import React, { useState, useEffect } from 'react'
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap'
import classes from './EmergencyReportsHistory.module.css'
import firebase from '../../Fire'
import { FaSearch } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { IconContext } from "react-icons"
import elogo from './elogo.jpg'
import { HomeNavBar } from '../Layout/NavBar'
import { Footer } from './Footer'
export const EmergencyReportsHistory = () => {
    const deleteTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete
        </Tooltip>
    );
    const [searchTerm1, setSearchTerm1] = useState('')
    const [userData, setUserdata] = useState()

    useEffect(() => {
        const submitRef = firebase.database().ref('Emergency Reports')
        submitRef.on('value', (snapshot) => {

            const emergency = snapshot.val()
            const emergencyComplaints = []
            for (let id in emergency) {
                emergencyComplaints.push({ id, ...emergency[id] })
            }
            setUserdata(emergencyComplaints)

        })
    }, [])

    const deleteComplaint = (id) => {
        const deleteRef = firebase.database().ref('Emergency Reports').child(id)
        deleteRef.remove()
    }

    return (
        <>
            <div className={classes.header}>
                <div className={classes.welcome}>
                    <div className={classes.tag}>
                        Welcome to e-Reporting
                    </div>
                </div>
            </div>
            <div className={classes.div2}>
                <img className={classes.logo} src={elogo} alt='' />
                <h4 className={classes.heading1}>ONLINE CRIME <br />
                    REPORTING <br />SYSTEM </h4>
                <div className={classes.vl}></div>
                <h4 className={classes.heading2}>HONESTY  <br />
                    {'&'}
                    <br />INTEGRITY</h4>
                <div className={classes.hl}></div>
            </div>
            <div className={classes.div3}>
                <HomeNavBar />
            </div>
            <div className={classes.complaintform}>
                <h3>Complaints History</h3>
                <div className={classes.tokensearch}>

                    <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                        <input className={classes.ser} type='text' placeholder='Enter Token No'
                            onChange={(e) => {
                                setSearchTerm1(e.target.value)
                            }} />
                        <FaSearch />
                    </IconContext.Provider>

                </div>
                <Table responsive bordered>

                    <thead>
                        <tr>

                            <th >Token No</th>
                            <th >Full Name</th>
                            <th >CNIC</th>
                            <th >Gender</th>
                            <th >City</th>
                            <th >Phone No</th>
                            <th >Email</th>
                            <th >Category</th>
                            <th >Occupation</th>
                            <th >Description</th>
                            <th ></th>
                        </tr>
                    </thead>
                    {userData ? userData.filter((complaint) => {
                        if (searchTerm1 == '') {
                            return complaint
                        }
                        else if (searchTerm1 == complaint.tokenno) {
                            return complaint
                        }

                    }).map((complaint, key) => {

                        return (
                            <>
                                <tbody>
                                    <tr>
                                        <td >{complaint.tokenno}</td>
                                        <td >{complaint.fullname}</td>
                                        <td>{complaint.cnic}</td>
                                        <td>{complaint.gender}</td>
                                        <td>{complaint.city}</td>
                                        <td>{complaint.phoneno}</td>
                                        <td>{complaint.email}</td>
                                        <td>{complaint.category}</td>
                                        <td>{complaint.occupation}</td>
                                        <td>{complaint.description}</td>
                                        <td>
                                            <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                                <OverlayTrigger
                                                    placement="right"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={deleteTooltip}
                                                >
                                                    <AiFillDelete onClick={() => { deleteComplaint(complaint.id) }} />
                                                </OverlayTrigger>
                                            </IconContext.Provider>

                                        </td>

                                    </tr>

                                </tbody>
                            </>
                        )
                    }) : <h3> Oops! No Registered Complaint</h3>

                    }
                </Table>

                <div className={classes.foot}>
                    <Footer />
                </div>
            </div>



        </>
    )
}
