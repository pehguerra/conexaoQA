import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => 
    alerts !== null && alerts.length > 0 && alerts.map(({ id, alertType, msg }) => (
        <div key={id} className={`alert alert-${alertType}`} data-test="alert">
            { msg }
        </div>
    ))

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = ({ alert }) => ({
    alerts: alert
})

export default connect(mapStateToProps)(Alert)
