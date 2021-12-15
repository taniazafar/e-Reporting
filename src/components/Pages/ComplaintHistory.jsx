import React, { useState, useEffect } from 'react'
import { Table, Tooltip, OverlayTrigger, Popover, Button, Alert } from 'react-bootstrap'
import classes from './Complaint.module.css'
import firebase from '../../Fire'
import { Header } from '../PublicUser/Header'
import { FaSearch } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { IconContext } from "react-icons"
import { Footer } from './Footer'
import { db } from '../../Fire'
import { useAuth } from '../AuthContext'
export const ComplaintHistory = () => {

    const { currentUser } = useAuth()
    const deleteTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Delete
        </Tooltip>
    );
    const [searchTerm1, setSearchTerm1] = useState('')
    const [searchTerm2, setSearchTerm2] = useState('')
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

    const [complaint, setComplaint] = useState([{
        data: [],
        id: [],
    }])
    useEffect(() => {
        db.collection("simpleReports").where("email", "==", `${currentUser.email}`).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                setComplaint([{ ...complaint, data: doc.data(), id: doc.id }]);
            });
        });
        console.log(complaint);
    })
    return (
        <>
            <div>
                <Header />
            
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
                                <th >Status</th>
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
                                            <td >{complaint.status}</td>
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
                    <br />
                    <br />
                    <h3>Complaints Against Police</h3>
                    <div className={classes.tokensearch}>

                        <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                            <input className={classes.ser} type='text' placeholder='Enter Token No'
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
                                <th >Token No</th>
                                <th >Status</th>
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
                        {userDataa ? userDataa.filter((complaints) => {
                            if (searchTerm2 == '') {
                                return complaints
                            }
                            else if (searchTerm2 == complaints.tokenno) {
                                return complaints
                            }

                        }).map((complaints, key) => {

                            return (
                                <>
                                    <tbody>
                                        <tr>
                                            <td >{complaints.tokenno}</td>
                                            <td >{complaints.status}</td>
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
                                                <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                                    <OverlayTrigger
                                                        placement="right"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={deleteTooltip}
                                                    >
                                                        <AiFillDelete onClick={() => { deleteComplaintAgainstPolice(complaints.id) }} />

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

                    {/* <br />
                    <br />
                    <h3>Simple Complaints</h3>

                    <br />
                    <div >
                        <Table responsive bordered>

                            <thead>
                                <tr>
                                    <th >Full Name</th>
                                    <th >CNIC</th>
                                    <th >Gender</th>
                                    <th >Phone No</th>
                                    <th >Email</th>
                                    <th >City</th>
                                    <th >Address</th>
                                    <th >Category</th>
                                    <th >Occupation</th>
                                    <th >Description</th>
                                    <th ></th>
                                </tr>
                            </thead>
                            {complaint ? complaint.map((complaint) => {

                                return (
                                    <>
                                        <tbody>
                                            <tr>
                                                <td>{complaint.name}</td>
                                                <td>{complaint.data.cnic}</td>
                                                <td>{complaint.data.gender}</td>
                                                <td>{complaint.data.phoneNo}</td>
                                                <td>{complaint.data.email}</td>
                                                <td>{complaint.data.city}</td>
                                                <td>{complaint.data.address}</td>
                                                <td>{complaint.data.category}</td>
                                                <td>{complaint.data.occupaion}</td>
                                                <td>{complaint.data.description}</td>
                                                <td>
                                                    <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                                        <OverlayTrigger
                                                            placement="right"
                                                            delay={{ show: 250, hide: 400 }}
                                                            overlay={deleteTooltip}
                                                        >
                                                            <AiFillDelete onClick={() => { deleteComplaintAgainstPolice(complaint.id) }} />

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
                    </div> */}
                    <div className={classes.foot}>
                        <Footer />
                    </div>


                </div>

            </div>


        </>
    )
}
