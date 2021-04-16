import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({ education: { school, degree, fieldofstudy, to, from, description } }) => {
    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                <Moment format='DD/MM/YYYY'>{from}</Moment> - {!to ? 'Atual' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
            </p>
            <p>
                <strong>Grau: </strong> {degree}
            </p>
            <p>
                <strong>Área de Estudo: </strong> {fieldofstudy}
            </p>
            <p>
                <strong>Descrição: </strong> {description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.object.isRequired,
}

export default ProfileEducation
