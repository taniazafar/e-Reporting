import React, { useState, useEffect } from 'react'
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap'
import classes from './RecievedComplaints.module.css'
import firebase from '../../Fire'
import { Header } from './Header'
import { IconContext } from "react-icons"
import { FaSearch } from "react-icons/fa"
import { Footer } from './Footer'
import { MdOutlineDoneOutline } from "react-icons/md"
import { FcProcess } from "react-icons/fc"

export function RecievedComplaints() {
    const deleteTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete
        </Tooltip>
    );
    const inprocessTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            In Process
        </Tooltip>
    );
    const completedTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Completed
        </Tooltip>
    );
    const [userData, setUserdata] = useState()
    const [userDataa, setUserdataa] = useState()
    const [userDataaa, setUserdataaa] = useState()
    const [searchTerm1, setSearchTerm1] = useState('')
    const [searchTerm2, setSearchTerm2] = useState('')
    const [searchTerm3, setSearchTerm3] = useState('')

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

    const statusUpdate = (id) => {
        console.log("id", id)

        firebase.database().ref('Register Complaint').child(id).update({


            status: "Completed"
        })
        alert('Action Taken')

    }
    const statusUpdatee = (id) => {
        console.log("id", id)

        firebase.database().ref('Report Against Police').child(id).update({


            status: "Completed"
        })
        alert('Action Taken')

    }
    const statusUpdateee = (id) => {
        console.log("id", id)

        firebase.database().ref('Emergency Reports').child(id).update({


            status: "Completed"
        })
        alert('Action Taken')

    }
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

    useEffect(() => {
        const submitRef = firebase.database().ref('Emergency Reports')
        submitRef.on('value', (snapshot) => {

            const emergency = snapshot.val()
            const emergencyComplaints = []
            for (let id in emergency) {
                emergencyComplaints.push({ id, ...emergency[id] })
            }
            setUserdataaa(emergencyComplaints)

        })
    }, [])


    return (
        <>
            <Header />
            <div className={classes.complaintform}>
                <h3>Complaints History</h3>
                <div className={classes.tokensearch}>

                    <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                        <input className={classes.ser} type='text' placeholder='Search...'
                            onChange={(e) => {
                                setSearchTerm1(e.target.value)
                            }} />
                        <FaSearch />
                    </IconContext.Provider>

                </div>
                <Table responsive bordered>

                    <thead>
                        <tr>
                            <th>Token No</th>
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
                            {/* <th ></th> */}
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

                        if (complaint.status == 'In Process') {

                            return (
                                <>
                                    <tbody>
                                        <tr>
                                            <td >{complaint.tokenno}</td>
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

                                            {complaint.status == "Completed" ?
                                                <td>
                                                    <IconContext.Provider value={{ style: { fontSize: '25px' } }}>

                                                        <OverlayTrigger
                                                            placement="left"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={completedTooltip}
                                                        >
                                                            <MdOutlineDoneOutline />
                                                        </OverlayTrigger>


                                                    </IconContext.Provider>

                                                </td> :
                                                <td>

                                                    <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                                        <OverlayTrigger
                                                            placement="left"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={inprocessTooltip}
                                                        >

                                                            <FcProcess onClick={() => { statusUpdate(complaint.id) }} />
                                                        </OverlayTrigger>
                                                    </IconContext.Provider>

                                                </td>
                                            }

                                        </tr>

                                    </tbody>
                                </>
                            )

                        }

                    }) : <h3> Oops! No Registered Complaint</h3>

                    }
                </Table>
                <br />
                <br />
                <h3>Complaints Against Police</h3>
                <div className={classes.tokensearch}>

                    <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                        <input className={classes.ser} type='text' placeholder='Search...'
                            onChange={(e) => {
                                setSearchTerm2(e.target.value)
                            }} />
                        <FaSearch />
                    </IconContext.Provider>

                </div>
                <br />
                <Table responsive bordered>

                    <thead>
                        <tr>
                            <th>Token No</th>
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
                    {userDataa ? userDataa.filter((complaint) => {
                        if (searchTerm2 == '') {
                            return complaint
                        }
                        else if (searchTerm2 == complaint.tokenno) {
                            return complaint
                        }

                    }).map((complaint, key) => {

                        if (complaint.status == 'In Process') {

                            return (
                                <>
                                    <tbody>
                                        <tr>
                                            <td >{complaint.tokenno}</td>
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

                                            {complaint.status == "Completed" ?
                                                <td>
                                                    <IconContext.Provider value={{ style: { fontSize: '25px' } }}>

                                                        <OverlayTrigger
                                                            placement="left"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={completedTooltip}
                                                        >
                                                            <MdOutlineDoneOutline />
                                                        </OverlayTrigger>


                                                    </IconContext.Provider>

                                                </td> :
                                                <td>

                                                    <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                                        <OverlayTrigger
                                                            placement="left"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={inprocessTooltip}
                                                        >

                                                            <FcProcess onClick={() => { statusUpdatee(complaint.id) }} />
                                                        </OverlayTrigger>
                                                    </IconContext.Provider>

                                                </td>

                                            }

                                        </tr>

                                    </tbody>
                                </>
                            )

                        }

                    }) : <h3> Oops! No Registered Complaint</h3>

                    }
                </Table>

                <br />
                <br />
                <h3>Emergency Reports</h3>
                <div className={classes.tokensearch}>

                    <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                        <input className={classes.ser} type='text' placeholder='Search...'
                            onChange={(e) => {
                                setSearchTerm3(e.target.value)
                            }} />
                        <FaSearch />
                    </IconContext.Provider>

                </div>
                <br />
                <Table responsive bordered>

                    <thead>
                        <tr>
                            <th >Token No</th>
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
                    {userDataaa ? userDataaa.filter((complaint) => {
                        if (searchTerm3 == '') {
                            return complaint
                        }
                        else if (searchTerm3 == complaint.tokenno) {
                            return complaint
                        }

                    }).map((complaint, key) => {

                        if (complaint.status == 'In Process') {

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

                                            {complaint.status == "Completed" ?
                                                <td>
                                                    <IconContext.Provider value={{ style: { fontSize: '25px' } }}>

                                                        <OverlayTrigger
                                                            placement="left"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={completedTooltip}
                                                        >
                                                            <MdOutlineDoneOutline />
                                                        </OverlayTrigger>


                                                    </IconContext.Provider>

                                                </td> :
                                                <td>

                                                    <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                                        <OverlayTrigger
                                                            placement="left"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={inprocessTooltip}
                                                        >

                                                            <FcProcess onClick={() => { statusUpdateee(complaint.id) }} />
                                                        </OverlayTrigger>
                                                    </IconContext.Provider>

                                                </td>
                                            }

                                        </tr>

                                    </tbody>
                                </>
                            )

                        }

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