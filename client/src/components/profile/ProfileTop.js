import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile: { status, company, location, website, social, user: { name, avatar } } }) => {
    return (
        <div className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={avatar}
                alt=""
                data-test="profileTop-avatar"
            />
            <h1 className="large" data-test="profileTop-name">{name}</h1>
            <p className="lead" data-test="profileTop-position">{status} {company && <span> na {company}</span>}</p>
            <p data-test="profileTop-location">{location && <span>{location}</span>}</p>
            <div className="icons my-1" data-test="profileTop-socials">
                {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer" data-test="profileTop-webSite">
                        <i className="fas fa-globe fa-2x"></i>
                    </a>
                )}
                {social && social.linkedin && (
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer" data-test="profileTop-linkedin">
                        <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                )}
                {social && social.medium && (
                    <a href={social.medium} target="_blank" rel="noopener noreferrer" data-test="profileTop-medium">
                        <i className="fab fa-medium fa-2x"></i>
                    </a>
                )}
                {social && social.instagram && (
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer" data-test="profileTop-instagram">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                )}
                {social && social.facebook && (
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer" data-test="profileTop-facebook">
                        <i className="fab fa-facebook fa-2x"></i>
                    </a>
                )}
                {social && social.youtube && (
                    <a href={social.youtube} target="_blank" rel="noopener noreferrer" data-test="profileTop-youtube">
                        <i className="fab fa-youtube fa-2x"></i>
                    </a>
                )}
                {social && social.twitter && (
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer" data-test="profileTop-twitter">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                )}
            </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop