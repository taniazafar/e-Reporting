import React from "react"
import {useAuth} from '../AuthContext'
import { Route, Redirect } from "react-router-dom"

export function PrivateRouteAdmin({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/LogInAsAdmin" />
      }}
    ></Route>
  )
}