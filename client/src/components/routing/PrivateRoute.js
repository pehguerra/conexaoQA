import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...others }) => (
    <Route 
        {...others} 
        render={props => 
            !isAuthenticated && !loading ? 
                (<Redirect to='/login' />
            ) : (
                <Component {...props} />
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
