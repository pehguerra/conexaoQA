import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
    const authLinks = (
        <ul>
            <li><Link to="/perfis" data-test="navbar-QAs">QAs</Link></li>
            <li><Link to="/posts" data-test="navbar-posts">Posts</Link></li>
            <li>
                <Link to="/dashboard" data-test="navbar-dashboard">
                    <i className="fas fa-user"></i>{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li><Link to="/sobre" data-test="navbar-about">Sobre</Link></li>
            <li>
                <Link onClick={logout} to="/" data-test="navbar-logout">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Sair</span>
                </Link>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link to="/perfis" data-test="navbar-QAs">QAs</Link></li>
            <li><Link to="/sobre" data-test="navbar-about">Sobre</Link></li>
            <li><Link to="/cadastrar" data-test="navbar-register">Cadastrar</Link></li>
            <li><Link to="/login" data-test="navbar-login">Login</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code" data-test="navbar-conexaoQA"></i> ConexãoQA</Link>
            </h1>
            <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
    auth
})

export default connect(mapStateToProps, { logout })(Navbar)