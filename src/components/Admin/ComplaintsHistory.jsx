import React, { useState, useEffect } from 'react'
import { Button, Table, Tooltip, OverlayTrigger } from 'react-bootstrap'
import classes from './ComplaintsHistory.module.css'
import firebase from '../../Fire'
import { FaSearch } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { MdOutlinePendingActions } from "react-icons/md"
import { ImCheckboxChecked } from "react-icons/im"
import { IconContext } from "react-icons"
import { DashboardAdmin } from './dashboardAdmin';
export const ComplaintsHistory = () => {
     const deleteTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
               Delete
          </Tooltip>
     );
     const approvedTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
               Approved
          </Tooltip>
     );
     const pendingTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
               Pending
          </Tooltip>
     );
     const [searchTerm1, setSearchTerm1] = useState('')
     const [searchTerm2, setSearchTerm2] = useState('')
     const [PendingIcon, setPendingIcon] = useState(true)
     const [ApprovedIcon, setApprovedIcon] = useState(false)
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
     const forwardComplaint = (id) => {
          console.log("id", id)

          firebase.database().ref('Register Complaint').child(id).update({


               status: "Approved"
          })
          alert('Complaint Forwarded')

     }
     const forwardComplaintAgainstPolice = (id) => {
          console.log("id", id)

          firebase.database().ref('Report Against Police').child(id).update({


               status: "Approved"
          })
          alert('Complaint Forwarded')

     }

     return (
          <>
               <DashboardAdmin />
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
                                                            <OverlayTrigger
                                                                 placement="right"
                                                                 delay={{ show: 250, hide: 400 }}
                                                                 overlay={deleteTooltip}
                                                            >
                                                                 <AiFillDelete onClick={() => { deleteComplaint(complaint.id) }} />
                                                            </OverlayTrigger>
                                                       </IconContext.Provider>

                                                  </td>
                                                  {complaint.status == "Approved" ?
                                                       <td>
                                                            <IconContext.Provider value={{ style: { fontSize: '25px' } }}>

                                                                 <OverlayTrigger
                                                                      placement="left"
                                                                      delay={{ show: 250, hide: 400 }}
                                                                      overlay={approvedTooltip}
                                                                 >
                                                                      <ImCheckboxChecked />
                                                                 </OverlayTrigger>


                                                            </IconContext.Provider>

                                                       </td> :
                                                       <td>

                                                            <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                                                 <OverlayTrigger
                                                                      placement="left"
                                                                      delay={{ show: 250, hide: 400 }}
                                                                      overlay={pendingTooltip}
                                                                 >

                                                                      <MdOutlinePendingActions onClick={() => { forwardComplaint(complaint.id) }} />
                                                                 </OverlayTrigger>
                                                            </IconContext.Provider>

                                                       </td>
                                                  }

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
                                                            <OverlayTrigger
                                                                 placement="right"
                                                                 delay={{ show: 250, hide: 400 }}
                                                                 overlay={deleteTooltip}
                                                            >
                                                                 <AiFillDelete onClick={() => { deleteComplaintAgainstPolice(complaints.id) }} />

                                                            </OverlayTrigger>
                                                       </IconContext.Provider>




                                                  </td>
                                                  {complaints.status == "Approved" ?
                                                       <td>
                                                            <IconContext.Provider value={{ style: { fontSize: '25px' } }}>

                                                                 <OverlayTrigger
                                                                      placement="left"
                                                                      delay={{ show: 250, hide: 400 }}
                                                                      overlay={approvedTooltip}
                                                                 >
                                                                      <ImCheckboxChecked />
                                                                 </OverlayTrigger>
                                                            </IconContext.Provider>

                                                       </td> :
                                                       <td>

                                                            <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                                                 <OverlayTrigger
                                                                      placement="left"
                                                                      delay={{ show: 250, hide: 400 }}
                                                                      overlay={pendingTooltip}
                                                                 >
                                                                      <MdOutlinePendingActions onClick={() => { forwardComplaintAgainstPolice(complaints.id) }} />
                                                                 </OverlayTrigger>
                                                            </IconContext.Provider>

                                                       </td>
                                                  }
                                             </tr>

                                        </tbody>
                                   </>
                              )
                         }) : <h3> Oops! No Registered Complaint</h3>

                         }
                    </Table>
                    {/* 
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
                    </Table> */}
                    {/* <div className={classes.foot}>
                        <Footer />
                    </div> */}


               </div>
               {/* <div className={classes.comp}>
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
               </div> */}
          </>
     )
}


// import React, { useState, useEffect } from 'react'
// import { Button, Table } from 'react-bootstrap'
// import classes from '../Pages/Complaint.module.css'
// import firebase from '../../Fire'
// import { db } from '../../Fire';
// import { NavBarAdmin } from '../Admin/NavBarAdmin'


// export function RegisteredComplaints() {


//      const [complaint, setComplaint] = useState([{
//           data: [],
//           id: [],
//      }])

//      useEffect(() => {

//           // const submitRef = firebase.database().ref('Register Complaint')
//           // submitRef.on('value', (snapshot) => {

//           //      const complaints = snapshot.val()
//           //      const registeredComplaints = []
//           //      for (let id in complaints) {
//           //           registeredComplaints.push({ id, ...complaints[id] })
//           //      }
//           //      setUserdata(registeredComplaints)
//           // })
//           let arr = [];
//           db.collection("complaints").get().then((querySnapshot) => {
//                querySnapshot.forEach((doc) => {
//                     // doc.data() is never undefined for query doc snapshots
//                     console.log(doc.data(), doc.id);
//                     arr.push(doc.data());
//                     setComplaint([{ ...complaint, data: doc.data(), id: doc.id }]);
//                });
//           });


//           console.log(arr)
//           console.log(complaint)

//      })

//      const deleteComplaint = (id) => {
//           const deleteRef = firebase.database().ref('Register Complaint').child(id)
//           deleteRef.remove()
//      }

//      const approved = (id) => {
//           console.log(id)
//           db.collection("complaints").doc(id).update({
//                status: "approved"
//           })
//      }
//      return (
//           <>
//                <NavBarAdmin />

//                <div >
//                     <br />
//                     <h2 className='text-center mb-4'>Registered Complaints</h2>
//                     {complaint && complaint.map((complaint) => {
//                          return (
//                               <>
//                                    <div className={classes.contentRow}>
//                                         <div className={classes.contentColumn}>
//                                              <Table responsive borderless >

//                                                   <tr className={classes.table}>
//                                                        <td ><b>Name:</b></td>
//                                                        <td>{complaint.data.name}</td>
//                                                   </tr>

//                                                   <tr>
//                                                        <td><b>CNIC:</b></td>
//                                                        <td>{complaint.data.cnic}</td>
//                                                   </tr>
//                                                   <tr>
//                                                        <td><b>Address:</b></td>
//                                                        <td> {complaint.data.address}</td>
//                                                   </tr>
//                                                   <tr>
//                                                        <td><b>Phone No:</b></td>
//                                                        <td>{complaint.data.phoneNumber}</td>
//                                                   </tr>
//                                                   <tr>
//                                                        <td><b>Description:</b></td>
//                                                        <td>{complaint.data.description}</td>
//                                                   </tr>


//                                                   <tr>
//                                                        <td>
//                                                             <Button onClick={() => { deleteComplaint(complaint.id) }} className={classes.btn}>Delete</Button>

//                                                        </td>
//                                                        <td>
//                                                             <Button onClick={() => approved(complaint.id)} className={classes.btn}>Approved</Button>

//                                                        </td>
//                                                   </tr>

//                                              </Table>
//                                         </div>

//                                    </div >
//                               </>
//                          )
//                     }

//                     )}
//                </div>
//           </>
//      )

// }