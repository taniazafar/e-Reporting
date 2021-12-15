import React, { useState, useEffect } from 'react'
import { Card, Button, Table, Tooltip, OverlayTrigger } from 'react-bootstrap'
import { Header } from '../PublicUser/Header'
import classes from './WantedCriminals.module.css'
import { Footer } from './Footer'
import firebase from '../../Fire'
import { MdReportProblem } from "react-icons/md"
import { IconContext } from "react-icons"
import { useHistory } from 'react-router-dom'
export function WantedCriminals() {
    const [userData, setUserdata] = useState()
    const history = useHistory()
    useEffect(() => {
        const submitRef = firebase.database().ref('Wanted Criminals')
        submitRef.on('value', (snapshot) => {

            const wantedcriminals = snapshot.val()
            const addWantedCriminals = []
            for (let id in wantedcriminals) {
                addWantedCriminals.push({ id, ...wantedcriminals[id] })
            }
            setUserdata(addWantedCriminals)
        })
    }, [])
    const reportWantedCriminal = (id) => {
        history.push('/RegisterComplaint');
    }
    const deleteTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Report
        </Tooltip>
    )
    return (

        <>
            <Header />
            <div className={classes.complaintform1}>
                <h3>Report Wanted Criminals</h3>
                <br />
                <Table responsive bordered>

                    <thead>
                        <tr>
                            <th >Full Name</th>
                            <th >Age</th>
                            <th >Description</th>
                            <th ></th>
                        </tr>
                    </thead>
                    {userData ? userData.map((wantedCriminal, index) => {

                        return (
                            <>
                                <tbody>
                                    <tr>
                                        <td >{wantedCriminal.fullname}</td>
                                        <td>{wantedCriminal.age}</td>
                                        <td>{wantedCriminal.description}</td>

                                        <td>
                                            <IconContext.Provider value={{ style: { fontSize: '30px' } }}>
                                                <OverlayTrigger
                                                    placement="right"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={deleteTooltip}
                                                >
                                                    <MdReportProblem onClick={() => { reportWantedCriminal(wantedCriminal.id) }} />
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


            </div>
            <Footer />

        </>

    )

}
