import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'

import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {
    useEffect(() => {
        getCurrentProfile()
    // eslint-disable-next-line
    }, [])

    return (loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead" data-test="dashboard-welcome">
            <i className="fas fa-user"></i> Bem-vindo { user && user.name }
        </p>
        {profile !== null && !('errors' in profile) ? (
            <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />

                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount()} data-test="dashboard-deleteProfile">
                        <i className="fas fa-user-minus"></i> Excluir Conta
                    </button>
                </div>
            </Fragment>
         ) : (
            <Fragment>
                <p data-test="dashboard-noProfile">Você não tem um perfil criado, por favor adicione algumas informações</p>
                <Link to="/criar-perfil" className="btn btn-primary my-1" data-test="dashboard-createProfile">
                    Criar Perfil
                </Link>
            </Fragment>
        )}
    </Fragment>)
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = ({ auth, profile }) => ({
    auth, profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
