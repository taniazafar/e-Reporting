import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import classes from './Complaint.module.css'
import firebase from '../../Fire'
import { Header } from '../PublicUser/Header'
import { FaSearch } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { IconContext } from "react-icons"
import { Footer } from './Footer'
export const ComplaintHistory = () => {

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
    return (
        <>
            <div>
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
                                <th >Token No</th>
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

                                                    <AiFillDelete onClick={() => { deleteComplaint(complaint.id) }} />
                                                    
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

                                                    <AiFillDelete onClick={() => { deleteComplaintAgainstPolice(complaints.id) }} />
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

            </div>


        </>
    )
}
