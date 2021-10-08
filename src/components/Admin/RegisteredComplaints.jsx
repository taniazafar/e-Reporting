
import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import classes from './RegisteredComplaints.module.css'
import firebase from '../../Fire'
import { NavBarAdmin } from '../Admin/NavBarAdmin'

export const RegisteredComplaints = () => {
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
               <NavBarAdmin />
               <div className = {classes.comp}>
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

                                                  <tr  className={classes.table}>
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