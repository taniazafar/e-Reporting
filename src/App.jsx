import React from 'react';
import classes from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { AuthProvider } from './components/AuthContext'

import { SignInForm } from './components/Pages/SignInForm'
import { LogInForm } from './components/Pages/LogInForm'
import { EmergencyReporting } from './components/Pages/EmergencyReporting'

import { DashboardPublic } from './components/PublicUser/dashboardPublic'
import { UpdateProfilePublic } from './components/PublicUser/UpdateProfilePublic'
import { PrivateRoutePublic } from './components/PublicUser/PrivateRoutesPublic'
import { ForgotPasswordPublic } from './components/PublicUser/ForgotPasswordPublic'
import { SignInAsPublicUser } from './components/Pages/SignInAsPublicUser'
import { LogInAsPublicUser } from './components/Pages/LogInAsPublicUser'
import { RegisterComplaint } from './components/Pages/RegisterComplaint'
import { WantedCriminals } from './components/Pages/WantedCriminals'


import { DashboardPolice } from './components/Police/dashboardPolice'
import { UpdateProfilePolice } from './components/Police/UpdateProfilePolice'
import { PrivateRoutePolice } from './components/Police/PrivateRoutesPolice'
import { ForgotPasswordPolice } from './components/Police/ForgotPasswordPolice'
import { LogInAsPolice } from './components/Pages/LogInAsPolice'
import { SignInAsPolice } from './components/Pages/SignInAsPolice'

import { DashboardAdmin } from './components/Admin/dashboardAdmin'
import { UpdateProfileAdmin } from './components/Admin/UpdateProfileAdmin'
import { PrivateRouteAdmin } from './components/Admin/PrivateRoutesAdmin'
import { ForgotPasswordAdmin } from './components/Admin/ForgotPasswordAdmin'
import { SignInAsAdmin } from './components/Pages/SignInAsAdmin'
import { LogInAsAdmin } from './components/Pages/LogInAsAdmin'
import { CriminalRecord } from './components/Admin/CriminalRecord'


function App() {


  return (

    <div className={classes.App}>

      <Router>
      <AuthProvider>
          <Switch>
          <Route exact path='/' component={LogInForm} />
          <Route exact path='/SignInform' component={SignInForm} />
          <Route exact path='/EmergencyReporting' component={EmergencyReporting} />
        
            <Route exact path='/SignInAsPublicUser' component={SignInAsPublicUser} />
            <Route exact path='/LogInAsPublicUser' component={LogInAsPublicUser} />
            <PrivateRoutePublic exact path='/dashboardPublic' component={DashboardPublic} />
            <PrivateRoutePublic exact path='/UpdateProfilePublic' component={UpdateProfilePublic} />
            <Route exact path='/ForgotPasswordPublic' component={ForgotPasswordPublic} />
            <PrivateRoutePublic exact path='/RegisterComplaint' component={RegisterComplaint} />
            <PrivateRoutePublic exact path='/WantedCriminals' component={WantedCriminals} />
            

            <Route exact path='/SignInAsPolice' component={SignInAsPolice} />
            <Route exact path='/LogInAsPolice' component={LogInAsPolice} />
            <PrivateRoutePolice exact path='/dashboardPolice' component={DashboardPolice} />
            <PrivateRoutePolice exact path='/UpdateProfilePolice' component={UpdateProfilePolice} />
            <Route exact path='/ForgotPasswordPolice' component={ForgotPasswordPolice} />
        
            <Route exact path='/SignInAsAdmin' component={SignInAsAdmin} />
            <Route exact path='/LogInAsAdmin' component={LogInAsAdmin} />
            <PrivateRouteAdmin  exact path='/dashboardAdmin' component={DashboardAdmin} />
            <PrivateRouteAdmin exact path='/UpdateProfileAdmin' component={UpdateProfileAdmin} />
            <Route exact path='/ForgotPasswordAdmin' component={ForgotPasswordAdmin} />
            <PrivateRouteAdmin exact path='/CriminalRecord' component={CriminalRecord} />

          </Switch>
        </AuthProvider>

      </Router>

    </div >

  )
}
export default App