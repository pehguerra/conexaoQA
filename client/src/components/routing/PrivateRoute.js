import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import Spinner from '../layout/Spinner'

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...others }) => (
    <Route 
        {...others} 
        render={props => 
            loading ? (
                <Spinner />
            ) : isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to='/login' />
            )
        } 
    />
)

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToPros = ({ auth }) => ({
    auth
})

export default connect(mapStateToPros)(PrivateRoute)
