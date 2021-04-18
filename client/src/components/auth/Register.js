import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const handleChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        if(password !== password2) {
            setAlert('Senhas precisam ser idênticas', 'danger')
        } else {
            register({ name, email, password })
        }
    }

    // redirects if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
        
    return (
        <Fragment>
            <h1 className="large text-primary">Cadastrar</h1>
            <p className="lead"><i className="fas fa-user"></i> Criar Sua Conta</p>
            <form className="form" action="create-profile.html" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Nome" 
                        name="name" 
                        value={name} 
                        onChange={e => handleChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Endereço de Email" 
                        name="email"
                        value={email}
                        onChange={e => handleChange(e)}
                        required
                    />
                    <small className="form-text">
                        Este site usa Gravatar, então caso queira uma imagem para o perfil, user o email Gravatar
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        value={password}
                        onChange={e => handleChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirmar Senha"
                        name="password2"
                        value={password2}
                        onChange={e => handleChange(e)}
                        minLength='6'
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Cadastrar" />
            </form>
            <p className="my-1">
                Já tem uma conta? <Link to="/login">Login</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
