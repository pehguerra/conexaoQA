import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({ profile: { user: { _id, name, avatar }, status, company, location, skills} }) => {
    return (
        <div className="profile bg-light" data-test={`profile-${_id}`}>
            <img src={avatar} alt="" className="round-img" data-test="profile-avatar" />
            <div>
                <h2 data-test="profile-name">{name}</h2>
                <p data-test="profile-position">{status} {company && <span> na {company}</span>}</p>
                <p className="my-1" data-test="profile-location">{location && <span>{location}</span>}</p>
                <Link to={`/perfil/${_id}`} className='btn btn-primary' data-test="profile-viewMore">Ver Perfil</Link>
            </div>
            <ul data-test="profile-skills">
                {skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i> {skill}
                    </li>
                ))}
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
