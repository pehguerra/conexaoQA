import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({ experience: { _id, company, title, to, from, description } }) => {
    return (
        <div data-test={`profileExperience-${_id}`}>
            <h3 className="text-dark" data-test="profileExperience-company">{company}</h3>
            <p data-test="profileExperience-date">
                <Moment format='DD/MM/YYYY'>{from}</Moment> - {!to ? 'Atual' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
            </p>
            <p data-test="profileExperience-position">
                <strong>Posição: </strong> {title}
            </p>
            <p data-test="profileExperience-description">
                <strong>Descrição: </strong> {description}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.object.isRequired,
}

export default ProfileExperience
