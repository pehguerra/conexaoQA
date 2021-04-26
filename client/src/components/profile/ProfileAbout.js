import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: { bio, skills, user: { name } } }) => {
    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <Fragment>
                    <h2 className="text-primary" data-test="profileAbout-bioName">Bio - {name.trim().split(' ')[0]}</h2>
                    <p data-test="profileAbout-bio">
                        {bio}
                    </p>
                </Fragment>
            )}
            
            <div className="line"></div>
            <h2 className="text-primary">Conhecimentos</h2>
            <div className="skills" data-test="profileAbout-skills">
                {skills.map((skill, index) => (
                    <div className="p-1" key={index}>
                        <i className="fa fa-check"></i> {skill}
                    </div>
                ))}
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileAbout
