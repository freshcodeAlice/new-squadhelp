import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner';

const PrivateRoute = (props) => {
  const { user, isFetching } = useSelector(state => state.auth);
  const {roles, ...rest} = props;

  if (isFetching) {
    return <Spinner />
  }

  if (user) {
    if (roles && !roles.includes(user.role)) {

      return <Redirect to='/' />
    }
    return <Route {...rest} />
  }

  return null // TODO: fix null render 
}

export default PrivateRoute