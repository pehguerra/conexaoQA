import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Conectando QAs ...</h1>
                    <p className="lead">
                        Crie um perfil/portfolio de QA, compartilhe posts e obtenha ajuda
                        de outros QAs
                    </p>
                    <div className="buttons">
                        <Link to="/cadastrar" className="btn btn-primary">Cadastrar</Link>
                        <Link to="/login" className="btn btn-light">Entrar</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing)
