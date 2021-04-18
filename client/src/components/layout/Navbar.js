import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li><Link to="/perfis">QAs</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"></i>{' '}
                    <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li>
                <Link onClick={logout} to="/">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className="hide-sm">Sair</span>
                </Link>
            </li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link to="/perfis">QAs</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/cadastrar">Cadastrar</Link></li>
            <li><Link to="/login">Entrar</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> ConexãoQA</Link>
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