import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import { Link } from 'react-router-dom'

import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'

const Profile = ({ getProfileById, match, profile: { profile, loading }, auth }) => {
    useEffect(() => {
        getProfileById(match.params.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : 
                <Fragment>
                    <Link to="/perfis" className="btn btn-light" data-test="profile-allProfiles">
                        Todos Perfis
                    </Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to="/editar-perfil" className="btn btn-dark" data-test="profile-editProfile">
                        Editar Perfil
                    </Link>)}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-exp bg-white p-2" data-test="profile-experiences">
                            <h2 className="text-primary">Experiências</h2>
                            {profile.experience.length > 0 ? 
                                (<Fragment>
                                    {profile.experience.map(experience => (
                                        <ProfileExperience key={experience._id} experience={experience} />
                                    ))}
                                </Fragment>) 
                                : 
                                (<h4 data-test="profile-noExperiences">Não há experiencias</h4>)
                            }
                        </div>
                        <div className="profile-edu bg-white p-2" data-test="profile-educations">
                            <h2 className="text-primary">Formação Acadêmica</h2>
                            {profile.education.length > 0 ? 
                                (<Fragment>
                                    {profile.education.map(education => (
                                        <ProfileEducation key={education._id} education={education} />
                                    ))}
                                </Fragment>) 
                                : 
                                (<h4 data-test="profile-noEducations">Não há formações acadêmicas</h4>)
                            }
                        </div>

                        {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
                    </div>
                </Fragment>
            }
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = ({ profile, auth }) => ({
    profile, auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)
