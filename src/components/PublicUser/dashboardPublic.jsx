import * as React from 'react'
import { NavBarPublic } from './NavBarPublic'
import logo from './logo.jpg'
import classes from './dashboardPublic.module.css'
import { Line, Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
const data1 = [
    { argument: 'Jan', value: 65 },
    { argument: 'Feb', value: 59 },
    { argument: 'Mar', value: 80 },
    { argument: 'Apr', value: 56 },
    { argument: 'May', value: 55 },
    { argument: 'Jun', value: 40 },
    { argument: 'Jul', value: 65 },
    { argument: 'Aug', value: 59 },
    { argument: 'Sep', value: 81 },
    { argument: 'Oct', value: 50 },
    { argument: 'Nov', value: 55 },
    { argument: 'Dec', value: 90 },


];
const data2 = [
    { argument: 'Aug', value: 59 },
    { argument: 'Sep', value: 81 },
    { argument: 'Oct', value: 50 },
    { argument: 'Nov', value: 55 },
    { argument: 'Dec', value: 90 },
    { argument: 'Jan', value: 65 },
    { argument: 'Feb', value: 59 },
    { argument: 'Mar', value: 80 },
    { argument: 'Apr', value: 56 },
    { argument: 'May', value: 55 },
    { argument: 'Jun', value: 40 },
    { argument: 'Jul', value: 65 },



];
export const DashboardPublic = () => {
    // const data = {
    //     labels: ["Sunday", "Monday", "Tuesday",
    //         "Wednesday", "Thursday", "Friday", "Saturday"],
    //     datasets: [
    //         {
    //             label: "Hours Studied in Geeksforgeeks",
    //             data: [2, 5, 7, 9, 7, 6, 4],
    //             fill: true,
    //             backgroundColor: "rgba(6, 156,51, .3)",
    //             borderColor: "#02b844",
    //         }
    //     ]
    // }
    const history = useHistory()
    // state = {
    //     dataBar: {
    //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //         datasets: [
    //             {
    //                 label: "% of Votes",
    //                 data: [12, 19, 3, 5, 2, 3],
    //                 backgroundColor: [
    //                     "rgba(255, 134,159,0.4)",
    //                     "rgba(98,  182, 239,0.4)",
    //                     "rgba(255, 218, 128,0.4)",
    //                     "rgba(113, 205, 205,0.4)",
    //                     "rgba(170, 128, 252,0.4)",
    //                     "rgba(255, 177, 101,0.4)"
    //                 ],
    //                 borderWidth: 2,
    //                 borderColor: [
    //                     "rgba(255, 134, 159, 1)",
    //                     "rgba(98,  182, 239, 1)",
    //                     "rgba(255, 218, 128, 1)",
    //                     "rgba(113, 205, 205, 1)",
    //                     "rgba(170, 128, 252, 1)",
    //                     "rgba(255, 177, 101, 1)"
    //                 ]
    //             }
    //         ]
    //     },
    //     barChartOptions: {
    //         responsive: true,
    //         maintainAspectRatio: false,
    //         scales: {
    //             xAxes: [
    //                 {
    //                     barPercentage: 1,
    //                     gridLines: {
    //                         display: true,
    //                         color: "rgba(0, 0, 0, 0.1)"
    //                     }
    //                 }
    //             ],
    //             yAxes: [
    //                 {
    //                     gridLines: {
    //                         display: true,
    //                         color: "rgba(0, 0, 0, 0.1)"
    //                     },
    //                     ticks: {
    //                         beginAtZero: true
    //                     }
    //                 }
    //             ]
    //         }
    //     }
    // }


    // state = {
    //     dataLine: {
    //         labels: ["January", "February", "March", "April", "May", "June", "July"],
    //         datasets: [
    //             {
    //                 label: "My First dataset",
    //                 fill: true,
    //                 lineTension: 0.3,
    //                 backgroundColor: "rgba(225, 204,230, .3)",
    //                 borderColor: "rgb(205, 130, 158)",
    //                 borderCapStyle: "butt",
    //                 borderDash: [],
    //                 borderDashOffset: 0.0,
    //                 borderJoinStyle: "miter",
    //                 pointBorderColor: "rgb(205, 130,1 58)",
    //                 pointBackgroundColor: "rgb(255, 255, 255)",
    //                 pointBorderWidth: 10,
    //                 pointHoverRadius: 5,
    //                 pointHoverBackgroundColor: "rgb(0, 0, 0)",
    //                 pointHoverBorderColor: "rgba(220, 220, 220,1)",
    //                 pointHoverBorderWidth: 2,
    //                 pointRadius: 1,
    //                 pointHitRadius: 10,
    //                 data: [65, 59, 80, 81, 56, 55, 40]
    //             },
    //             {
    //                 label: "My Second dataset",
    //                 fill: true,
    //                 lineTension: 0.3,
    //                 backgroundColor: "rgba(184, 185, 210, .3)",
    //                 borderColor: "rgb(35, 26, 136)",
    //                 borderCapStyle: "butt",
    //                 borderDash: [],
    //                 borderDashOffset: 0.0,
    //                 borderJoinStyle: "miter",
    //                 pointBorderColor: "rgb(35, 26, 136)",
    //                 pointBackgroundColor: "rgb(255, 255, 255)",
    //                 pointBorderWidth: 10,
    //                 pointHoverRadius: 5,
    //                 pointHoverBackgroundColor: "rgb(0, 0, 0)",
    //                 pointHoverBorderColor: "rgba(220, 220, 220, 1)",
    //                 pointHoverBorderWidth: 2,
    //                 pointRadius: 1,
    //                 pointHitRadius: 10,
    //                 data: [28, 48, 40, 19, 86, 27, 90]
    //             }
    //         ]
    //     }
    // };
    function clickHandler() {

        history.push('/')
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
            <button onClick={clickHandler} className={classes.tag1}>
                Logout
            </button>
            <div className={classes.div2}>
                <img className={classes.logo} src={logo} />
                <h4 className={classes.heading1}>ONLINE CRIME <br />
                    REPORTING <br />SYSTEM </h4>
                <div className={classes.vl}></div>
                <h4 className={classes.heading2}>HONESTY  <br />
                    {'&'}
                    <br />INTEGRITY</h4>
                <div className={classes.hl}></div>
            </div>
            <div className={classes.div3}>
                <NavBarPublic />

            </div>
            <div className={classes.chartt}>
                <Paper >
                    <Chart className={classes.cht}
                        data={data1}

                        // data={data2}
                    >
                        <ArgumentAxis />
                        <ValueAxis />

                        <LineSeries className={classes.lne} valueField="value" argumentField="argument" />
                           </Chart>
                    
                </Paper>
            </div>
            <br/>
            <br/>

            <div className={classes.chartt}>
                <Paper >
                    <Chart className={classes.cht}
                        data={data1}

                        // data={data2}
                    >
                        <ArgumentAxis />
                        <ValueAxis />

                        <LineSeries className={classes.lne} valueField="value" argumentField="argument" />
                           </Chart>
                    
                </Paper>
            </div>

            {/* <MDBContainer>
                <Line data={data} />
            </MDBContainer> */}
            {/* <MDBContainer>
                    <h3 className="mt-5">Bar chart</h3>
                    <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
                </MDBContainer> */}
            {/* <MDBContainer>
        <h3 className="mt-5">Line chart</h3>
        <Line data={this.state.dataLine} options={{ responsive: true }} />
      </MDBContainer> */}
            {/* <MDBContainer>
                        <h3 className="mt-5">Complaints</h3>
                        <Line data={this.state.dataLine} options={{ responsive: true }} />
                    </MDBContainer> */}
            {/* <div className={classes.user}>
                <img onClick={handleImage} src={defaultprofile} width="70" height="70" alt='' />
                <br />
                {currentUser.email}
            </div>
            <div className={classes.container}>
                {error && <Alert variant='danger'>{error}</Alert>}

            </div>
            <div className={content.homecontent}>

                <h2>Online Crime Reporting System</h2>

                <img className={content.dashboardimage} src={dashboardimage} width='650' alt='' />
                <br />
                <br />
                <br />
                <b><p>e-Reporting acts as communication system between public and police department</p>
                </b>
                <b><p>Public Usera can report and register complaints by providing certain mandatory information</p>
                </b>
                <b><p>It Saves your time by allowing you to register complaints by sitting anywhere at anytime</p>
                </b>
            </div> */}

            {/* <BarChart /> */}
        </>
    )

}
