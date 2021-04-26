import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({ education: { _id, school, degree, fieldofstudy, to, from, description } }) => {
    return (
        <div data-test={`profileEducation-${_id}`}>
            <h3 className="text-dark" data-test="profileEducation-school">{school}</h3>
            <p data-test="profileEducation-date">
                <Moment format='DD/MM/YYYY'>{from}</Moment> - {!to ? 'Atual' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
            </p>
            <p data-test="profileEducation-degree">
                <strong>Grau: </strong> {degree}
            </p>
            <p data-test="profileEducation-fieldOfStudy">
                <strong>Área de Estudo: </strong> {fieldofstudy}
            </p>
            <p data-test="profileEducation-description">
                <strong>Descrição: </strong> {description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
}

export default ProfileEducation
